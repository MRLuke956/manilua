import os
import zipfile
import shutil
import threading
import json
import time
from typing import Dict, Any, List, Optional
import PluginUtils
from http_client import get_global_client
from steam_utils import get_stplug_in_path

logger = PluginUtils.Logger()

API_BASE_URL = 'https://www.piracybound.com/api'

class maniluaManager:    
    def __init__(self, backend_path: str):
        self.backend_path = backend_path
        self._download_state: Dict[int, Dict[str, Any]] = {}
        self._download_lock = threading.Lock()
        self._api_key = None
    
    def set_api_key(self, api_key: str):
        self._api_key = api_key
    
    def get_api_key(self):
        return self._api_key

    def add_dlc_manifest(self, appid: int, dlcid: int, name: Optional[str] = None) -> Dict[str, Any]:
        try:
            appid = int(appid)
            dlcid = int(dlcid)
        except Exception:
            return {'success': False, 'error': 'Invalid appid or dlcid'}

        try:
            target_dir = get_stplug_in_path()
            os.makedirs(target_dir, exist_ok=True)
            manifest_path = os.path.join(target_dir, f"{appid}_{dlcid}.manifest")
            payload = {
                'appid': appid,
                'dlcid': dlcid,
                'name': name or '',
                'ts': int(time.time())
            }
            with open(manifest_path, 'w', encoding='utf-8') as f:
                json.dump(payload, f, ensure_ascii=False)
            logger.log(f"manilua: Wrote DLC manifest {manifest_path}")
            return {'success': True, 'file': manifest_path}
        except Exception as e:
            logger.error(f"manilua: Failed writing DLC manifest for base {appid}, dlc {dlcid}: {e}")
            return {'success': False, 'error': str(e)}
    
    def _set_download_state(self, appid: int, update: Dict[str, Any]) -> None:
        with self._download_lock:
            state = self._download_state.get(appid, {})
            state.update(update)
            self._download_state[appid] = state

    def _looks_like_text_error(self, file_path: str) -> bool:
        try:
            if not os.path.exists(file_path):
                return True
            max_read = 4096
            with open(file_path, 'rb') as f:
                data = f.read(max_read)
            # If file is empty
            if not data:
                return True
            # Heuristics: JSON or HTML error
            head = data[:2]
            try:
                text = data.decode('utf-8', errors='ignore').lower()
            except Exception:
                text = ''
            if head in (b'{', b'[') or text.startswith('{') or text.startswith('['):
                if ('not found' in text) or ('no dlc' in text) or ('not available' in text) or ('error' in text):
                    return True
            if '<html' in text or '<!doctype html' in text:
                return True
            return False
        except Exception:
            return False
    
    def _get_download_state(self, appid: int) -> Dict[str, Any]:
        with self._download_lock:
            return self._download_state.get(appid, {}).copy()
    
    def get_download_status(self, appid: int) -> Dict[str, Any]:
        state = self._get_download_state(appid)
        return {'success': True, 'state': state}
    
    def _download_from_manilua_backend(self, appid: int, endpoint: str = "") -> None:
        try:
            
            self._set_download_state(appid, {
                'status': 'checking',
                'currentApi': f'manilua ({endpoint})',
                'bytesRead': 0,
                'totalBytes': 0,
                'endpoint': endpoint
            })
            
            client = get_global_client()
            if not client:
                raise Exception("Failed to get HTTP client")
            
            
        except Exception as e:
            logger.error(f"manilua: Fatal error in download setup: {e}")
            self._set_download_state(appid, {
                'status': 'failed',
                'error': f'Setup failed: {str(e)}'
            })
            return
        
        try:
            if endpoint == 'manilua':
                download_url = f'{API_BASE_URL}/file/{appid}'
            elif endpoint == 'donation':
                download_url = f'{API_BASE_URL}/donation'
            else:
                download_url = f'{API_BASE_URL}/{endpoint}'


            api_key = self.get_api_key()

            params = {'appid': appid}

            if endpoint == 'ryuu' and api_key:
                from api_manager import APIManager
                api_manager = APIManager(self.backend_path)
                api_manager.set_api_key(api_key)
                user_id_result = api_manager.get_user_id()

                if user_id_result.get('success') and user_id_result.get('userId'):
                    params['userId'] = user_id_result['userId']

            self._set_download_state(appid, {
                'status': 'downloading',
                'endpoint': endpoint,
                'bytesRead': 0,
                'totalBytes': 0
            })

            temp_zip_path = os.path.join(self.backend_path, f"temp_{appid}.zip")
            CHUNK = 1024 * 512  # 512KB
            max_retries = 3
            backoff_base = 0.5
            attempt = 0
            bytes_read = 0
            success = False

            while attempt < max_retries:
                last_state_update_ts = 0.0
                try:
                    import time as _time
                    start_ts = _time.time()
                except Exception:
                    start_ts = 0.0
                try:
                    with client.stream_get(download_url, params=params, auth_token=api_key) as resp:
                        try:
                            resp.raise_for_status()
                        except Exception as _he:
                            raise

                        try:
                            total = int(resp.headers.get('Content-Length', '0'))
                        except Exception:
                            total = 0
                        self._set_download_state(appid, {
                            'status': 'downloading',
                            'bytesRead': 0,
                            'totalBytes': total
                        })

                        bytes_read = 0
                        with open(temp_zip_path, 'wb', buffering=CHUNK) as f:
                            for chunk in resp.iter_bytes(chunk_size=CHUNK):
                                if not chunk:
                                    continue
                                f.write(chunk)
                                bytes_read += len(chunk)
                                try:
                                    import time as _time
                                    now_ts = _time.time()
                                except Exception:
                                    now_ts = 0.0
                                if last_state_update_ts == 0.0 or (now_ts - last_state_update_ts) >= 0.10:
                                    elapsed = (now_ts - start_ts) if (start_ts and now_ts) else 0.0
                                    elapsed = elapsed if elapsed > 0.001 else 0.001
                                    speed_bps = int(bytes_read / elapsed)
                                    eta_secs = int(((total - bytes_read) / speed_bps)) if (total and speed_bps > 0 and total >= bytes_read) else None
                                    update = {
                                        'status': 'downloading',
                                        'bytesRead': bytes_read,
                                        'totalBytes': total,
                                        'speedBps': speed_bps
                                    }
                                    if eta_secs is not None:
                                        update['etaSecs'] = eta_secs
                                    self._set_download_state(appid, update)
                                    last_state_update_ts = now_ts

                    if bytes_read <= 0:
                        raise Exception("Empty download from endpoint")
                    success = True
                    break
                except Exception as e:
                    if os.path.exists(temp_zip_path):
                        try: os.remove(temp_zip_path)
                        except Exception: pass
                    attempt += 1
                    if attempt >= max_retries:
                        self._set_download_state(appid, {
                            'status': 'failed',
                            'error': f'Download failed: {str(e)}'
                        })
                        raise
                    try:
                        import time as _time
                        _time.sleep(backoff_base * (2 ** (attempt - 1)))
                    except Exception:
                        pass

            self._set_download_state(appid, {
                'status': 'downloading',
                'bytesRead': bytes_read,
                'totalBytes': total if 'total' in locals() else bytes_read
            })
            self._set_download_state(appid, {
                'status': 'processing',
                'bytesRead': bytes_read,
                'totalBytes': bytes_read or total
            })

            logger.log(f"manilua: Saved download to {temp_zip_path}")

            try:
                is_zip = zipfile.is_zipfile(temp_zip_path)
            except Exception:
                is_zip = False

            if is_zip:
                self._extract_and_add_lua_from_zip(appid, temp_zip_path, endpoint)
                if os.path.exists(temp_zip_path):
                    os.remove(temp_zip_path)
            else:
                if self._looks_like_text_error(temp_zip_path):
                    try:
                        os.remove(temp_zip_path)
                    except Exception:
                        pass
                    self._set_download_state(appid, {
                        'status': 'not_found',
                        'endpoint': endpoint,
                        'error': 'App not available on endpoint'
                    })
                    return
                try:
                    target_dir = get_stplug_in_path()
                    dest_file = os.path.join(target_dir, f"{appid}.lua")
                    try:
                        os.replace(temp_zip_path, dest_file)
                    except Exception:
                        with open(temp_zip_path, 'rb') as src, open(dest_file, 'wb') as dst:
                            while True:
                                buf = src.read(1024 * 64)
                                if not buf:
                                    break
                                dst.write(buf)
                        try: os.remove(temp_zip_path)
                        except Exception: pass

                    self._set_download_state(appid, {'status': 'installing', 'installedFiles': [dest_file], 'installedPath': dest_file})
                    logger.log(f"manilua: Installed single LUA file for app {appid}: {dest_file}")
                except Exception as e:
                    logger.error(f"manilua: Failed to install non-zip payload for app {appid}: {e}")
                    raise

            self._set_download_state(appid, {
                'status': 'done',
                'success': True,
                'api': f'manilua ({endpoint})'
            })
                
        except Exception as e:
            logger.error(f"manilua: Backend download failed: {str(e)}")
            self._set_download_state(appid, {
                'status': 'failed',
                'error': f'Backend error: {str(e)}'
            })
    
    def _download_dlc_via_ryuu(self, dlcid: int, base_appid: int) -> None:
        try:
            self._set_download_state(dlcid, {
                'status': 'checking',
                'currentApi': 'manilua (ryuu)',
                'bytesRead': 0,
                'totalBytes': 0,
                'endpoint': 'ryuu'
            })

            client = get_global_client()
            if not client:
                raise Exception("Failed to get HTTP client")

            download_url = f'{API_BASE_URL}/ryuu'
            api_key = self.get_api_key()
            params = {
                'appid': int(base_appid),
                'dlc': int(dlcid),
                'dlcid': int(dlcid),
                'type': 'dlc'
            }

            if api_key:
                from api_manager import APIManager
                api_manager = APIManager(self.backend_path)
                api_manager.set_api_key(api_key)
                user_id_result = api_manager.get_user_id()
                if user_id_result.get('success') and user_id_result.get('userId'):
                    params['userId'] = user_id_result['userId']

            self._set_download_state(dlcid, {
                'status': 'downloading',
                'endpoint': 'ryuu',
                'bytesRead': 0,
                'totalBytes': 0
            })

            temp_zip_path = os.path.join(self.backend_path, f"temp_{dlcid}.zip")
            bytes_read = 0
            CHUNK = 1024 * 512
            last_state_update_ts = 0.0

            try:
                with client.stream_get(download_url, params=params, auth_token=api_key) as resp:
                    try:
                        resp.raise_for_status()
                    except Exception:
                        raise
                    try:
                        total = int(resp.headers.get('Content-Length', '0'))
                    except Exception:
                        total = 0
                    self._set_download_state(dlcid, {
                        'status': 'downloading',
                        'bytesRead': 0,
                        'totalBytes': total
                    })

                    try:
                        import time as _time
                        start_ts = _time.time()
                    except Exception:
                        start_ts = 0.0

                    with open(temp_zip_path, 'wb', buffering=CHUNK) as f:
                        for chunk in resp.iter_bytes(chunk_size=CHUNK):
                            if not chunk:
                                continue
                            f.write(chunk)
                            bytes_read += len(chunk)
                            try:
                                import time as _time
                                now_ts = _time.time()
                            except Exception:
                                now_ts = 0.0
                            if last_state_update_ts == 0.0 or (now_ts - last_state_update_ts) >= 0.10:
                                elapsed = (now_ts - start_ts) if (start_ts and now_ts) else 0.0
                                elapsed = elapsed if elapsed > 0.001 else 0.001
                                speed_bps = int(bytes_read / elapsed)
                                eta_secs = int(((total - bytes_read) / speed_bps)) if (total and speed_bps > 0 and total >= bytes_read) else None
                                update = {
                                    'status': 'downloading',
                                    'bytesRead': bytes_read,
                                    'totalBytes': total,
                                    'speedBps': speed_bps
                                }
                                if eta_secs is not None:
                                    update['etaSecs'] = eta_secs
                                self._set_download_state(dlcid, update)
                                last_state_update_ts = now_ts

                if bytes_read <= 0:
                    raise Exception("Empty download from ryuu for DLC")

                self._set_download_state(dlcid, {
                    'status': 'downloading',
                    'bytesRead': bytes_read,
                    'totalBytes': total if 'total' in locals() else bytes_read
                })
                self._set_download_state(dlcid, {
                    'status': 'processing',
                    'bytesRead': bytes_read,
                    'totalBytes': bytes_read or total
                })

                logger.log(f"manilua: Saved DLC download to {temp_zip_path}")

                try:
                    is_zip = zipfile.is_zipfile(temp_zip_path)
                except Exception:
                    is_zip = False

                if not is_zip and self._looks_like_text_error(temp_zip_path):
                    try:
                        os.remove(temp_zip_path)
                    except Exception:
                        pass
                    self._set_download_state(dlcid, {
                        'status': 'not_found',
                        'endpoint': 'ryuu',
                        'error': 'DLC not found on ryuu'
                    })
                    return

                if is_zip:
                    self._extract_and_add_lua_from_zip(dlcid, temp_zip_path, 'ryuu')
                    if os.path.exists(temp_zip_path):
                        os.remove(temp_zip_path)
                else:
                    try:
                        target_dir = get_stplug_in_path()
                        dest_file = os.path.join(target_dir, f"{dlcid}.lua")
                        try:
                            os.replace(temp_zip_path, dest_file)
                        except Exception:
                            with open(temp_zip_path, 'rb') as src, open(dest_file, 'wb') as dst:
                                dst.write(src.read())
                            try:
                                os.remove(temp_zip_path)
                            except Exception:
                                pass
                        self._set_download_state(dlcid, {'status': 'installing', 'installedFiles': [dest_file], 'installedPath': dest_file})
                        logger.log(f"manilua: Installed single LUA file for DLC {dlcid}: {dest_file}")
                    except Exception as e:
                        logger.error(f"manilua: Failed to install non-zip payload for DLC {dlcid}: {e}")
                        raise

                self._set_download_state(dlcid, {
                    'status': 'done',
                    'success': True,
                    'api': 'manilua (ryuu)'
                })
            except Exception as e:
                if os.path.exists(temp_zip_path):
                    try:
                        os.remove(temp_zip_path)
                    except Exception:
                        pass
                self._set_download_state(dlcid, {
                    'status': 'failed',
                    'error': f'Download failed: {str(e)}'
                })
        except Exception as e:
            logger.error(f"manilua: DLC download failed (base {base_appid}, dlc {dlcid}): {str(e)}")
            self._set_download_state(dlcid, {
                'status': 'failed',
                'error': f'Backend error: {str(e)}'
            })

    def _download_dlc_from_endpoint(self, dlcid: int, endpoint: str) -> None:
        try:
            self._set_download_state(dlcid, {
                'status': 'checking',
                'currentApi': f'manilua ({endpoint})',
                'bytesRead': 0,
                'totalBytes': 0,
                'endpoint': endpoint
            })

            client = get_global_client()
            if not client:
                raise Exception("Failed to get HTTP client")

            download_url = f'{API_BASE_URL}/{endpoint}'
            api_key = self.get_api_key()
            params = { 'appid': int(dlcid) }

            self._set_download_state(dlcid, {
                'status': 'downloading',
                'endpoint': endpoint,
                'bytesRead': 0,
                'totalBytes': 0
            })

            temp_zip_path = os.path.join(self.backend_path, f"temp_{dlcid}.zip")
            bytes_read = 0
            CHUNK = 1024 * 512
            last_state_update_ts = 0.0

            try:
                with client.stream_get(download_url, params=params, auth_token=api_key) as resp:
                    try:
                        total = int(resp.headers.get('Content-Length', '0'))
                    except Exception:
                        total = 0
                    self._set_download_state(dlcid, {
                        'status': 'downloading',
                        'bytesRead': 0,
                        'totalBytes': total
                    })

                    with open(temp_zip_path, 'wb', buffering=CHUNK) as f:
                        for chunk in resp.iter_bytes(chunk_size=CHUNK):
                            if not chunk:
                                continue
                            f.write(chunk)
                            bytes_read += len(chunk)
                            try:
                                import time as _time
                                now_ts = _time.time()
                            except Exception:
                                now_ts = 0.0
                            if last_state_update_ts == 0.0 or (now_ts - last_state_update_ts) >= 0.10:
                                self._set_download_state(dlcid, {
                                    'status': 'downloading',
                                    'bytesRead': bytes_read,
                                    'totalBytes': total
                                })
                                last_state_update_ts = now_ts

                if bytes_read <= 0:
                    raise Exception("Empty download from endpoint")

                self._set_download_state(dlcid, {
                    'status': 'downloading',
                    'bytesRead': bytes_read,
                    'totalBytes': total if 'total' in locals() else bytes_read
                })
                self._set_download_state(dlcid, {
                    'status': 'processing',
                    'bytesRead': bytes_read,
                    'totalBytes': bytes_read or total
                })

                logger.log(f"manilua: Saved DLC download to {temp_zip_path}")

                try:
                    is_zip = zipfile.is_zipfile(temp_zip_path)
                except Exception:
                    is_zip = False

                if not is_zip and self._looks_like_text_error(temp_zip_path):
                    try:
                        os.remove(temp_zip_path)
                    except Exception:
                        pass
                    self._set_download_state(dlcid, {
                        'status': 'not_found',
                        'endpoint': endpoint,
                        'error': f'DLC not found on {endpoint}'
                    })
                    return

                if is_zip:
                    self._extract_and_add_lua_from_zip(dlcid, temp_zip_path, endpoint)
                    if os.path.exists(temp_zip_path):
                        os.remove(temp_zip_path)
                else:
                    try:
                        target_dir = get_stplug_in_path()
                        dest_file = os.path.join(target_dir, f"{dlcid}.lua")
                        try:
                            os.replace(temp_zip_path, dest_file)
                        except Exception:
                            with open(temp_zip_path, 'rb') as src, open(dest_file, 'wb') as dst:
                                dst.write(src.read())
                            try:
                                os.remove(temp_zip_path)
                            except Exception:
                                pass
                        self._set_download_state(dlcid, {'status': 'installing', 'installedFiles': [dest_file], 'installedPath': dest_file})
                        logger.log(f"manilua: Installed single LUA file for DLC {dlcid}: {dest_file}")
                    except Exception as e:
                        logger.error(f"manilua: Failed to install non-zip payload for DLC {dlcid}: {e}")
                        raise

                self._set_download_state(dlcid, {
                    'status': 'done',
                    'success': True,
                    'api': f'manilua ({endpoint})'
                })
            except Exception as e:
                if os.path.exists(temp_zip_path):
                    try:
                        os.remove(temp_zip_path)
                    except Exception:
                        pass
                self._set_download_state(dlcid, {
                    'status': 'failed',
                    'error': f'Download failed: {str(e)}'
                })
        except Exception as e:
            logger.error(f"manilua: DLC download failed for {dlcid} from {endpoint}: {str(e)}")
            self._set_download_state(dlcid, {
                'status': 'failed',
                'error': f'Backend error: {str(e)}'
            })
    
    def download_dlc_with_fallback(self, dlcid: int, base_appid: int, endpoints: Optional[List[str]] = None) -> None:
        """Try RYUU first with base app context; if it fails, fall back to other endpoints using DLC id."""
        try:
            dlcid = int(dlcid)
            base_appid = int(base_appid)
        except Exception:
            self._set_download_state(dlcid, {'status': 'failed', 'error': 'Invalid DLC/base app id'})
            return

        order = endpoints if endpoints else ['ryuu', 'oureveryday', 'manilua', 'donation']
        last_error = None
        for ep in order:
            try:
                if ep == 'ryuu':
                    self._set_download_state(dlcid, {'status': 'checking', 'currentApi': 'manilua (ryuu)', 'endpoint': 'ryuu'})
                    try:
                        from api_manager import APIManager
                        api_manager = APIManager(self.backend_path)
                        api_key = self.get_api_key()
                        if api_key:
                            api_manager.set_api_key(api_key)
                        chk = api_manager.check_availability(int(dlcid), 'ryuu', req_type='dlc')
                        if not (chk.get('success') and chk.get('available')):
                            # Skip 'ryuu' quickly if DLC not available/supported
                            self._set_download_state(dlcid, {'status': 'not_found', 'endpoint': 'ryuu', 'error': 'DLC not available on ryuu (pre-check)'})
                            continue
                    except Exception as _e:
                        # Treat pre-check failure as a soft failure; go to next endpoint
                        self._set_download_state(dlcid, {'status': 'failed', 'endpoint': 'ryuu', 'error': f'Pre-check failed: {_e}'})
                        continue
                    self._download_dlc_via_ryuu(dlcid, base_appid)
                else:
                    self._set_download_state(dlcid, {'status': 'checking', 'currentApi': f'manilua ({ep})', 'endpoint': ep})
                    try:
                        from api_manager import APIManager
                        api_manager = APIManager(self.backend_path)
                        api_key = self.get_api_key()
                        if api_key:
                            api_manager.set_api_key(api_key)
                        chk = api_manager.check_availability(int(dlcid), ep, req_type='dlc')
                        if not (chk.get('success') and chk.get('available')):
                            self._set_download_state(dlcid, {'status': 'not_found', 'endpoint': ep, 'error': f'DLC not available on {ep} (pre-check)'})
                            continue
                    except Exception as _e:
                        self._set_download_state(dlcid, {'status': 'failed', 'endpoint': ep, 'error': f'Pre-check failed: {_e}'})
                        continue
                    self._download_dlc_from_endpoint(dlcid, ep)

                st = self._get_download_state(dlcid)
                if st.get('status') == 'done':
                    return
                if st.get('status') in ('failed', 'not_found'):
                    last_error = st.get('error') or f'{ep} failed'
                    continue
                try:
                    import time as _t
                    _t.sleep(0.3)
                except Exception:
                    pass
                st = self._get_download_state(dlcid)
                if st.get('status') == 'done':
                    return
                if st.get('status') != 'failed':
                    last_error = f'Endpoint {ep} did not complete'
                    self._set_download_state(dlcid, {'status': 'failed', 'error': last_error})
            except Exception as e:
                last_error = str(e)
                self._set_download_state(dlcid, {'status': 'failed', 'error': f'Attempt failed: {last_error}'})
                continue

        # All tried and none succeeded
        self._set_download_state(dlcid, {'status': 'failed', 'error': last_error or 'DLC not found on any endpoint'})
    def _extract_and_add_lua_from_zip(self, appid: int, zip_path: str, endpoint: str) -> None:
        try:
            target_dir = get_stplug_in_path()
            installed_files = []
            
            self._set_download_state(appid, {'status': 'extracting'})
            logger.log(f"manilua: Extracting ZIP file {zip_path} to {target_dir}")
            
            with zipfile.ZipFile(zip_path, 'r') as zip_file:
                file_list = zip_file.namelist()
                logger.log(f"manilua: ZIP contains {len(file_list)} files")

                to_extract = [f for f in file_list if f.lower().endswith('.lua') or f.lower().endswith('.manifest')]

                if not to_extract:
                    logger.warn(f"manilua: No .lua/.manifest files found in ZIP, extracting all files")
                    to_extract = file_list
                else:
                    logger.log(f"manilua: Extracting {len(to_extract)} files from ZIP")

                extracted_count = 0
                self._set_download_state(appid, {'status': 'extracting', 'extractedFiles': 0})

                for file_name in to_extract:
                    try:
                        if file_name.endswith('/'):
                            continue
                        arcname = file_name.replace('\\', '/').split('/')[-1]
                        if not arcname:
                            continue
                        if arcname.lower().endswith('.lua'):
                            base_name = os.path.basename(arcname)
                            dest_file = os.path.join(target_dir, base_name)
                        elif arcname.lower().endswith('.manifest'):
                            dest_file = os.path.join(target_dir, os.path.basename(arcname))
                        else:
                            file_ext = os.path.splitext(arcname)[1] or '.txt'
                            dest_file = os.path.join(target_dir, f"{appid}{file_ext}")

                        with zip_file.open(file_name, 'r') as src, open(dest_file, 'wb') as out:
                            shutil.copyfileobj(src, out, length=1024 * 64)
                        
                        installed_files.append(dest_file)
                        extracted_count += 1
                        self._set_download_state(appid, {'status': 'extracting', 'extractedFiles': extracted_count})
                        # Keep logs light: only log first few extractions
                        if extracted_count <= 5:
                            logger.log(f"manilua: Extracted {arcname}")
                        
                    except Exception as e:
                        logger.error(f"manilua: Failed to extract {file_name}: {e}")
                        continue
            
            if not installed_files:
                raise Exception("No files were successfully extracted from ZIP")
            
            logger.log(f"manilua: Successfully installed {len(installed_files)} files from {endpoint}")
            # Brief installing state before done to keep UI consistent
            self._set_download_state(appid, {
                'status': 'installing',
                'installedFiles': installed_files,
                'installedPath': installed_files[0] if installed_files else None
            })
                
        except zipfile.BadZipFile as e:
            logger.error(f'manilua: Invalid ZIP file for app {appid}: {e}')
            raise Exception(f"Invalid ZIP file: {str(e)}")
        except Exception as e:
            logger.error(f'manilua: Failed to extract ZIP for app {appid}: {e}')
            raise
    
    def add_via_lua(self, appid: int, endpoints: Optional[List[str]] = None) -> Dict[str, Any]:
        try:
            appid = int(appid)
        except (ValueError, TypeError):
            return {'success': False, 'error': 'Invalid appid'}
        
        
        self._set_download_state(appid, {
            'status': 'queued',
            'bytesRead': 0,
            'totalBytes': 0
        })
        
        # Prioriza 'ryuu' na ordem padrão
        available_endpoints = ['ryuu', 'oureveryday', 'manilua', 'donation']
        if endpoints:
            available_endpoints = endpoints
            
        def safe_availability_check_wrapper(appid, endpoints_to_check):
            try:
                self._check_availability_and_download(appid, endpoints_to_check)
            except Exception as e:
                logger.error(f"manilua: Unhandled error in availability check thread: {e}")
                self._set_download_state(appid, {
                    'status': 'failed',
                    'error': f'Availability check crashed: {str(e)}'
                })
        
        thread = threading.Thread(
            target=safe_availability_check_wrapper,
            args=(appid, available_endpoints),
            daemon=True
        )
        thread.start()
        
        return {'success': True}
    
    def select_endpoint_and_download(self, appid: int, selected_endpoint: str) -> Dict[str, Any]:
        try:
            appid = int(appid)
        except (ValueError, TypeError):
            return {'success': False, 'error': 'Invalid appid'}
        
        state = self._get_download_state(appid)
        if state.get('status') != 'awaiting_endpoint_choice':
            return {'success': False, 'error': 'Not awaiting endpoint choice'}
        
        available_endpoints = state.get('available_endpoints', [])
        if selected_endpoint not in available_endpoints:
            return {'success': False, 'error': f'Endpoint {selected_endpoint} not available'}
        
        
        def safe_download_wrapper():
            try:
                self._download_from_manilua_backend(appid, selected_endpoint)
            except Exception as e:
                logger.error(f"manilua: Download error: {e}")
                self._set_download_state(appid, {
                    'status': 'failed',
                    'error': f'Download failed: {str(e)}'
                })
        
        thread = threading.Thread(target=safe_download_wrapper, daemon=True)
        thread.start()
        
        return {'success': True}
    
    def _check_availability_and_download(self, appid: int, endpoints_to_check: List[str]) -> None:
        base_order = ['ryuu'] + [e for e in endpoints_to_check if e != 'ryuu']
        ordered = []
        for e in base_order:
            if e not in ordered:
                ordered.append(e)
        self._set_download_state(appid, {
            'status': 'awaiting_endpoint_choice',
            'available_endpoints': ordered,
            'message': 'Choose an endpoint to download from.'
        })

    def remove_via_lua(self, appid: int) -> Dict[str, Any]:
        try:
            appid = int(appid)
        except (ValueError, TypeError):
            return {'success': False, 'error': 'Invalid appid'}

        try:
            stplug_path = get_stplug_in_path()
            removed_files = []

            lua_file = os.path.join(stplug_path, f'{appid}.lua')
            if os.path.exists(lua_file):
                os.remove(lua_file)
                removed_files.append(f'{appid}.lua')
                logger.log(f"manilua: Removed {lua_file}")

            disabled_file = os.path.join(stplug_path, f'{appid}.lua.disabled')
            if os.path.exists(disabled_file):
                os.remove(disabled_file)
                removed_files.append(f'{appid}.lua.disabled')
                logger.log(f"manilua: Removed {disabled_file}")

            for filename in os.listdir(stplug_path):
                if filename.startswith(f'{appid}_') and filename.endswith('.manifest'):
                    manifest_file = os.path.join(stplug_path, filename)
                    os.remove(manifest_file)
                    removed_files.append(filename)
                    logger.log(f"manilua: Removed {manifest_file}")

            if removed_files:
                logger.log(f"manilua: Successfully removed {len(removed_files)} files for app {appid}: {removed_files}")
                return {'success': True, 'message': f'Removed {len(removed_files)} files', 'removed_files': removed_files}
            else:
                return {'success': False, 'error': f'No files found for app {appid}'}

        except Exception as e:
            logger.error(f"manilua: Error removing files for app {appid}: {e}")
            return {'success': False, 'error': str(e)}
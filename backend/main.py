import Millennium
import PluginUtils
import json
import os
import threading
from queue import Queue

from http_client import close_global_client, get_global_client
from api_manager import APIManager
from manilua import maniluaManager
from steam_utils import (
    detect_steam_install_path, 
    has_lua_for_app,
    list_lua_apps,
    get_stplug_in_path,
    get_manilua_apps_with_dates,
    get_current_user_id,
    scan_steamapps_acf,
    scan_stplugin_manifests
)

logger = PluginUtils.Logger()

def GetPluginDir():
    current_file = os.path.realpath(__file__)
    
    if current_file.endswith('/main.py/main.py') or current_file.endswith('\\main.py\\main.py'):
        current_file = current_file[:-8]
    elif current_file.endswith('/main.py') or current_file.endswith('\\main.py'):
        current_file = current_file[:-8]
    
    if current_file.endswith('main.py'):
        backend_dir = os.path.dirname(current_file)
    else:
        backend_dir = current_file
    
    plugin_dir = os.path.dirname(backend_dir)
    
    return plugin_dir

class Logger:
    @staticmethod
    def log(message: str) -> None:
        logger.log(message)

    @staticmethod
    def warn(message: str) -> None:
        logger.warn(message)

    @staticmethod
    def error(message: str) -> None:
        logger.error(message)

class Plugin:
    def __init__(self):
        self.plugin_dir = GetPluginDir()
        self.backend_path = os.path.join(self.plugin_dir, 'backend')
        self.api_manager = APIManager(self.backend_path)
        self.manilua_manager = maniluaManager(self.backend_path)
        self._api_key = None
        self._injected = False
        self._load_api_key()

        if self.has_api_key() and isinstance(self._api_key, str) and self._api_key.strip() != "":
            self.api_manager.set_api_key(self._api_key)
            self.manilua_manager.set_api_key(self._api_key)
    
    def _load_api_key(self):
        api_key_file = os.path.join(self.backend_path, 'api_key.txt')
        try:
            if os.path.exists(api_key_file):
                with open(api_key_file, 'r', encoding='utf-8') as f:
                    self._api_key = f.read().strip()
                if self._api_key:
                    pass
                else:
                    logger.log("manilua: API key file is empty")
            else:
                pass
        except Exception as e:
            logger.error(f"manilua: Failed to load API key: {e}")
    
    def _save_api_key(self, api_key: str):
        api_key_file = os.path.join(self.backend_path, 'api_key.txt')
        try:
            with open(api_key_file, 'w', encoding='utf-8') as f:
                f.write(api_key)
            self._api_key = api_key
        except Exception as e:
            logger.error(f"manilua: Failed to save API key: {e}")
    
    def get_api_key(self):
        return self._api_key
    
    def has_api_key(self):
        return self._api_key is not None and self._api_key.strip() != ""
    
    def _inject_webkit_files(self):
        if self._injected:
            return

        try:
            js_file_path = os.path.join(self.plugin_dir, 'inject.js')

            if os.path.exists(js_file_path):
                Millennium.add_browser_js(js_file_path)
                # Also inject optional guard script to refine UI behavior (e.g., hide DLC button on DLC pages)
                try:
                    extra_js = os.path.join(self.plugin_dir, 'dlc_guard.js')
                    if os.path.exists(extra_js):
                        Millennium.add_browser_js(extra_js)
                        logger.log("manilua: Injected dlc_guard.js")
                except Exception as _e:
                    logger.warn(f"manilua: optional dlc_guard.js injection skipped: {_e}")
                self._injected = True
                logger.log(f"manilua: Injected")
            else:
                logger.error(f"manilua: `inject.js` not found at {js_file_path}")
        except Exception as e:
            logger.error(f'manilua: Failed to inject: {e}')

    def _load(self):
        try:
            detect_steam_install_path()
        except Exception as e:
            logger.log(f'manilua: Steam path detection failed: {e}')

        self._inject_webkit_files()

        if not self.has_api_key():
            logger.log("manilua: No API key configured")
        else:
            logger.log("manilua: API key configured")

        Millennium.ready()

    def _unload(self):
        logger.log("Unloading manilua plugin")
        close_global_client()


# Global plugin instance guard
_plugin_instance = None

def get_plugin():
    global _plugin_instance
    if _plugin_instance is None:
        _plugin_instance = Plugin()
        _plugin_instance._load()
    return _plugin_instance

plugin = get_plugin()

_DLC_QUEUE: Queue = Queue()
try:
    _DLC_WORKERS = max(1, min(3, int(os.environ.get('MANILUA_DLC_WORKERS', '1'))))
except Exception:
    _DLC_WORKERS = 1
_dlc_workers_started = False

def _dlc_worker_loop():
    while True:
        item = _DLC_QUEUE.get()
        try:
            base_id = None
            did_int = None
            # Accept either dict payload {base:..., dlc:...} or plain appid (legacy)
            if isinstance(item, dict):
                try:
                    base_id = int(item.get('base'))
                except Exception:
                    base_id = None
                try:
                    did_int = int(item.get('dlc'))
                except Exception:
                    did_int = None
            else:
                try:
                    did_int = int(item)
                except Exception:
                    did_int = None

            if did_int is not None and base_id is not None:
                # Proper DLC download with base app context + endpoint fallback
                plugin.manilua_manager.download_dlc_with_fallback(did_int, base_id)
            elif did_int is not None:
                # Fallback legacy behavior
                plugin.manilua_manager._download_from_manilua_backend(did_int, 'ryuu')
        except Exception as e:
            logger.error(f'DLC worker: error processing DLC item {item}: {e}')
        finally:
            try:
                _DLC_QUEUE.task_done()
            except Exception:
                pass

def _ensure_dlc_workers():
    global _dlc_workers_started
    if _dlc_workers_started:
        return
    _dlc_workers_started = True
    for _ in range(_DLC_WORKERS):
        t = threading.Thread(target=_dlc_worker_loop, daemon=True)
        t.start()

def hasluaForApp(appid: int) -> str:
    try:
        exists = has_lua_for_app(appid)
        return json.dumps({'success': True, 'exists': exists})
    except Exception as e:
        logger.error(f'hasluaForApp failed for {appid}: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def RyuuGetInstalledDLCs(appid: int) -> str:
    try:
        try:
            appid_int = int(appid)
        except Exception:
            return json.dumps({'success': False, 'error': 'Invalid appid'})

        path = get_stplug_in_path()
        installed_ids = []
        installed_map = {}
        try:
            for fname in os.listdir(path):
                if not fname.endswith('.manifest'):
                    continue
                fpath = os.path.join(path, fname)
                dlc_id = None
                # 1) Try reading JSON fields first
                try:
                    with open(fpath, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        if isinstance(data, dict):
                            val = data.get('dlcid') or data.get('dlc') or data.get('id')
                            if isinstance(val, int):
                                dlc_id = val
                            elif isinstance(val, str) and val.isdigit():
                                dlc_id = int(val)
                except Exception:
                    pass
                # 2) Fallback: filename patterns
                if dlc_id is None:
                    # Pattern A: <base>_<dlc>.manifest (ours)
                    if fname.startswith(f"{appid_int}_"):
                        tail = fname.split('_', 1)[1].rsplit('.manifest', 1)[0]
                        if tail.isdigit():
                            dlc_id = int(tail)
                    # Pattern B: <dlc>_random.manifest (provider ZIPs)
                    else:
                        head = fname.split('_', 1)[0]
                        if head.isdigit():
                            dlc_id = int(head)

                if isinstance(dlc_id, int):
                    if dlc_id not in installed_ids:
                        installed_ids.append(dlc_id)
                        installed_map[str(dlc_id)] = True
        except Exception:
            pass

        has_base_lua = False
        try:
            base_lua = os.path.join(path, f"{appid_int}.lua")
            has_base_lua = os.path.exists(base_lua)
        except Exception:
            has_base_lua = False

        return json.dumps({'success': True, 'dlcs': installed_ids, 'map': installed_map, 'base': has_base_lua})
    except Exception as e:
        logger.error(f'RyuuGetInstalledDLCs failed for {appid}: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def RyuuRemoveDLCs(appid: int, dlcids) -> str:
    try:
        try:
            appid_int = int(appid)
        except Exception:
            return json.dumps({'success': False, 'error': 'Invalid appid'})

        # Normalize list of DLCs to remove
        ids = []
        if isinstance(dlcids, (list, tuple)):
            raw = dlcids
        else:
            try:
                raw = json.loads(dlcids) if isinstance(dlcids, str) else []
            except Exception:
                raw = []
        for x in (raw or []):
            try:
                xi = int(x)
                if xi not in ids:
                    ids.append(xi)
            except Exception:
                continue

        if not ids:
            return json.dumps({'success': False, 'error': 'No DLC IDs provided'})

        path = get_stplug_in_path()
        removed = 0
        errors = []
        for did in ids:
            # remove specific manifest files for this DLC id
            pattern_prefix_a = f"{appid_int}_{did}"
            pattern_prefix_b = f"{did}_"
            try:
                for fname in os.listdir(path):
                    if fname.endswith('.manifest') and (fname.startswith(pattern_prefix_a) or fname.startswith(pattern_prefix_b)):
                        fpath = os.path.join(path, fname)
                        try:
                            os.remove(fpath)
                            removed += 1
                        except Exception as re:
                            errors.append(f'remove {fname}: {re}')
            except Exception as e:
                errors.append(f'listdir: {e}')
            # Best-effort: remove DLC-specific lua if exists
            try:
                dlc_lua = os.path.join(path, f"{did}.lua")
                if os.path.exists(dlc_lua):
                    os.remove(dlc_lua)
                    removed += 1
            except Exception as re:
                errors.append(f'remove {did}.lua: {re}')

        return json.dumps({'success': True, 'removed': removed, 'errors': errors})
    except Exception as e:
        logger.error(f'RyuuRemoveDLCs failed for {appid}: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def RyuuListDLCs(appid: int) -> str:
    try:
        try:
            appid_int = int(appid)
        except Exception:
            return json.dumps({'success': False, 'error': 'Invalid appid'})

        # Use Steam API to list DLCs; this mirrors the frontend fallback but avoids JS errors
        client = APIManager(plugin.backend_path)  # reuse APIManager utilities
        http = get_global_client()
        lang = 'brazilian'
        res = http.get('https://store.steampowered.com/api/appdetails', {
            'appids': appid_int,
            'l': lang
        })
        if not res.get('success'):
            return json.dumps({'success': True, 'dlcs': []})

        data = res.get('data', {})
        entry = data.get(str(appid_int)) if isinstance(data, dict) else None
        if not (isinstance(entry, dict) and entry.get('success') and isinstance(entry.get('data'), dict)):
            return json.dumps({'success': True, 'dlcs': []})

        edata = entry['data']
        dlc_ids = edata.get('dlc') or []
        if not isinstance(dlc_ids, list) or not dlc_ids:
            return json.dumps({'success': True, 'dlcs': []})

        # Try to resolve names in batch via APIManager
        try:
            name_result = plugin.api_manager.get_app_names(dlc_ids, language=lang)
            names = name_result.get('names', {}) if isinstance(name_result, dict) else {}
        except Exception:
            names = {}

        items = []
        for did in dlc_ids:
            try:
                did_int = int(did)
            except Exception:
                continue
            items.append({'appid': did_int, 'name': names.get(str(did_int), '')})

        return json.dumps({'success': True, 'dlcs': items})
    except Exception as e:
        logger.error(f'RyuuListDLCs failed for {appid}: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def RyuuAddDLCs(appid: int, dlcids) -> str:
    try:
        # Normalize list
        ids = []
        if isinstance(dlcids, (list, tuple)):
            raw = dlcids
        else:
            try:
                # Accept JSON string or comma-separated
                raw = json.loads(dlcids) if isinstance(dlcids, str) else []
            except Exception:
                raw = []
        for x in (raw or []):
            try:
                xi = int(x)
                if xi not in ids:
                    ids.append(xi)
            except Exception:
                continue

        if not ids:
            return json.dumps({'success': False, 'error': 'No DLC IDs provided'})

        # Enqueue DLCs and ensure limited concurrency workers are running
        _ensure_dlc_workers()
        for did in ids:
            try:
                # Best-effort: write manifest linking base app to DLC (helps UI/runtime detect DLCs)
                try:
                    name_map = None
                    # If client passed names mapping, attach it (optional future param)
                    if isinstance(dlcids, dict) and 'names' in dlcids:
                        name_map = dlcids.get('names')
                    nm = None
                    if isinstance(name_map, dict):
                        nm = name_map.get(str(did)) or name_map.get(int(did))
                    plugin.manilua_manager.add_dlc_manifest(int(appid), int(did), nm if isinstance(nm, str) else None)
                except Exception as mex:
                    logger.warn(f'RyuuAddDLCs: manifest write failed for base {appid}, dlc {did}: {mex}')
            except Exception:
                pass
            # Queue base+dlc pair to ensure correct API params
            try:
                _DLC_QUEUE.put({'base': int(appid), 'dlc': int(did)})
            except Exception:
                _DLC_QUEUE.put(did)

        return json.dumps({'success': True, 'queued': len(ids)})
    except Exception as e:
        logger.error(f'RyuuAddDLCs failed: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def GetLocalLibrary() -> str:
    """
    Get list of Manilua games with installation dates.
    Returns apps sorted by installation date (most recent first).
    """
    try:
        # Get apps with real installation dates from multiple sources
        apps_with_dates = get_manilua_apps_with_dates()
        
        # Extract just the appids for compatibility
        apps = [appid for appid, _ in apps_with_dates]
        
        # Also include date mapping for frontend use
        date_map = {str(appid): install_date for appid, install_date in apps_with_dates}
        
        return json.dumps({
            'success': True, 
            'apps': apps,
            'install_dates': date_map  # ISO timestamps per appid
        })
    except Exception as e:
        logger.error(f'GetLocalLibrary failed: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def GetLocalPlaytimes() -> str:
    """
    Returns a map of appid -> playtime in minutes for manilua games.
    Reads from a playtime tracking file in the plugin directory.
    """
    try:
        playtime_file = os.path.join(plugin.plugin_dir, 'playtime_data.json')
        playtime_map = {}
        
        if os.path.exists(playtime_file):
            try:
                with open(playtime_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    if isinstance(data, dict):
                        playtime_map = data
            except Exception as e:
                logger.warn(f'GetLocalPlaytimes: Failed to read playtime file: {e}')
        
        return json.dumps({'success': True, 'map': playtime_map})
    except Exception as e:
        logger.error(f'GetLocalPlaytimes failed: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def GetLocalLastSessions() -> str:
    """
    Returns a map of appid -> last session timestamp (ISO format) for manilua games.
    Reads from a session tracking file in the plugin directory.
    """
    try:
        session_file = os.path.join(plugin.plugin_dir, 'session_data.json')
        session_map = {}
        
        if os.path.exists(session_file):
            try:
                with open(session_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    if isinstance(data, dict):
                        session_map = data
            except Exception as e:
                logger.warn(f'GetLocalLastSessions: Failed to read session file: {e}')
        
        return json.dumps({'success': True, 'map': session_map})
    except Exception as e:
        logger.error(f'GetLocalLastSessions failed: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def UpdatePlaytime(appid: int, minutes: int) -> str:
    """
    Updates the playtime for a specific appid.
    Increments existing playtime or sets initial value.
    """
    try:
        playtime_file = os.path.join(plugin.plugin_dir, 'playtime_data.json')
        playtime_map = {}
        
        if os.path.exists(playtime_file):
            try:
                with open(playtime_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    if isinstance(data, dict):
                        playtime_map = data
            except Exception:
                pass
        
        appid_str = str(appid)
        current = playtime_map.get(appid_str, 0)
        try:
            current = int(current)
        except Exception:
            current = 0
        
        playtime_map[appid_str] = current + int(minutes)
        
        with open(playtime_file, 'w', encoding='utf-8') as f:
            json.dump(playtime_map, f, indent=2)
        
        return json.dumps({'success': True, 'total_minutes': playtime_map[appid_str]})
    except Exception as e:
        logger.error(f'UpdatePlaytime failed for {appid}: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def UpdateLastSession(appid: int, timestamp: str = None) -> str:
    """
    Updates the last session timestamp for a specific appid.
    If no timestamp provided, uses current time.
    """
    try:
        from datetime import datetime
        
        session_file = os.path.join(plugin.plugin_dir, 'session_data.json')
        session_map = {}
        
        if os.path.exists(session_file):
            try:
                with open(session_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    if isinstance(data, dict):
                        session_map = data
            except Exception:
                pass
        
        if timestamp is None:
            timestamp = datetime.now().isoformat()
        
        appid_str = str(appid)
        session_map[appid_str] = timestamp
        
        with open(session_file, 'w', encoding='utf-8') as f:
            json.dump(session_map, f, indent=2)
        
        return json.dumps({'success': True, 'timestamp': timestamp})
    except Exception as e:
        logger.error(f'UpdateLastSession failed for {appid}: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def GetAppNames(appids: list, language: str = 'brazilian') -> str:
    try:
        api = plugin.api_manager
        # Ensure ints
        appid_ints = []
        for a in appids or []:
            try:
                appid_ints.append(int(a))
            except Exception:
                continue
        result = api.get_app_names(appid_ints, language)
        return json.dumps(result)
    except Exception as e:
        logger.error(f'GetAppNames failed: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def addViamanilua(appid: int) -> str:
    try:
        if plugin.has_api_key():
            validation_result = plugin.api_manager.get_user_id()
            if not validation_result['success']:
                return json.dumps({
                    'success': False,
                    'error': 'API key is invalid. Please set a valid API key.',
                    'requiresNewKey': True
                })

        endpoints = plugin.api_manager.get_download_endpoints()
        result = plugin.manilua_manager.add_via_lua(appid, endpoints)
        return json.dumps(result)
    except Exception as e:
        logger.error(f'addViamanilua failed for {appid}: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def GetStatus(appid: int) -> str:
    try:
        try:
            appid_int = int(appid)
        except Exception:
            appid_int = appid
        result = plugin.manilua_manager.get_download_status(appid_int)
        return json.dumps(result)
    except Exception as e:
        logger.error(f'GetStatus failed for {appid}: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def GetUserID() -> str:
    try:
        result = plugin.api_manager.get_user_id()
        return json.dumps(result)
    except Exception as e:
        logger.error(f'GetUserID failed: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def SetAPIKey(*args, **kwargs) -> str:
    try:
        api_key = None
        if args:
            api_key = args[0]
        elif 'api_key' in kwargs:
            api_key = kwargs['api_key']
        elif kwargs and len(kwargs) == 1:
            api_key = next(iter(kwargs.values()))
        
        if not api_key or not isinstance(api_key, str):
            return json.dumps({'success': False, 'error': 'Invalid API key'})
        
        # Relax format check: provider may change key prefix

        temp_api_manager = APIManager(plugin.backend_path)
        temp_api_manager.set_api_key(api_key)
        validation_result = temp_api_manager.get_user_id()

        if not validation_result['success']:
            return json.dumps({'success': False, 'error': f'Could not validate key now: {validation_result.get("error", "Temporary error")}'})

        plugin._save_api_key(api_key)
        plugin.api_manager.set_api_key(api_key)
        plugin.manilua_manager.set_api_key(api_key)

        return json.dumps({'success': True, 'message': 'API key configured and validated successfully'})
    except Exception as e:
        logger.error(f'SetAPIKey failed: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def ValidateAPIKey() -> str:
    try:
        if not plugin.has_api_key():
            return json.dumps({'success': False, 'error': 'No API key configured'})

        validation_result = plugin.api_manager.get_user_id()

        if validation_result['success']:
            return json.dumps({'success': True, 'valid': True, 'message': 'API key is valid'})
        else:
            # Don't clear the key; just report invalid so UI can prompt gracefully
            return json.dumps({
                'success': True,
                'valid': False,
                'error': validation_result.get('error', 'API key validation failed'),
                'message': 'API key appears invalid. Please re-enter if the issue persists.'
            })
    except Exception as e:
        logger.error(f'ValidateAPIKey failed: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def GetAPIKeyStatus() -> str:
    try:
        has_key = plugin.has_api_key()
        if has_key:
            api_key = plugin.get_api_key()
            if api_key is not None:
                masked_key = api_key[:12] + '...' + api_key[-4:] if len(api_key) > 16 else api_key[:8] + '...'
            else:
                masked_key = ''

            validation_result = plugin.api_manager.get_user_id()
            is_valid = validation_result['success']

            return json.dumps({
                'success': True,
                'hasKey': True,
                'maskedKey': masked_key,
                'isValid': is_valid,
                'message': 'API key is configured' + (' and valid' if is_valid else ' but invalid')
            })
        else:
            return json.dumps({
                'success': True,
                'hasKey': False,
                'message': 'No API key configured. Please set an API key from www.piracybound.com/manilua'
            })
    except Exception as e:
        logger.error(f'GetAPIKeyStatus failed: {e}')
        return json.dumps({'success': False, 'error': str(e)})


def SelectEndpointAndDownload(appid: int, endpoint: str) -> str:
    try:
        result = plugin.manilua_manager.select_endpoint_and_download(appid, endpoint)
        return json.dumps(result)
    except Exception as e:
        logger.error(f'SelectEndpointAndDownload failed for {appid}, {endpoint}: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def removeViamanilua(appid: int) -> str:
    try:
        result = plugin.manilua_manager.remove_via_lua(appid)
        return json.dumps(result)
    except Exception as e:
        logger.error(f'removeViamanilua failed for {appid}: {e}')
        return json.dumps({'success': False, 'error': str(e)})

def GetSteamInfo() -> str:
    """
    Get Steam installation info including paths and current user.
    Useful for debugging and verifying detection is working.
    """
    try:
        steam_path = detect_steam_install_path()
        user_id = get_current_user_id()
        
        # Check if various directories exist
        paths_info = {}
        if steam_path:
            paths_info['steam_path'] = steam_path
            paths_info['depotcache'] = os.path.exists(os.path.join(steam_path, 'depotcache'))
            paths_info['steamapps'] = os.path.exists(os.path.join(steam_path, 'steamapps'))
            paths_info['userdata'] = os.path.exists(os.path.join(steam_path, 'userdata'))
            
            stplug_path = os.path.join(steam_path, 'config', 'stplug-in')
            paths_info['stplugin'] = os.path.exists(stplug_path)
        
        return json.dumps({
            'success': True,
            'steam_path': steam_path or 'Not detected',
            'current_user_id': user_id or 'Not detected',
            'paths': paths_info
        })
    except Exception as e:
        logger.error(f'GetSteamInfo failed: {e}')
        return json.dumps({'success': False, 'error': str(e)})
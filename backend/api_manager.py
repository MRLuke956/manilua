import json
import time
from typing import Dict, Any, List, Optional
import re
import ast
import PluginUtils
from http_client import get_global_client
from concurrent.futures import ThreadPoolExecutor, as_completed

logger = PluginUtils.Logger()

API_BASE_URL = 'https://www.piracybound.com/api'

class APIManager:    
    def __init__(self, backend_path: str):
        self.backend_path = backend_path
        self._app_name_cache: Dict[int, Dict[str, Any]] = {}
    
    def set_api_key(self, api_key: str):
        self._api_key = api_key
    
    def get_api_key(self):
        return getattr(self, '_api_key', None)
    
    def check_availability(self, appid: int, endpoint: str = "", req_type: Optional[str] = None) -> Dict[str, Any]:
        try:
            client = get_global_client()
            api_key = self.get_api_key()
            # Faster timeouts for availability checks
            params = {
                'appid': appid,
                'endpoint': endpoint
            }
            if isinstance(req_type, str) and req_type:
                params['type'] = req_type
            result = client.get(f'{API_BASE_URL}/check-availability', params, auth_token=api_key, timeout_override=5.0)
            
            if result['success']:
                try:
                    if isinstance(result['data'], str):
                        data = json.loads(result['data'])
                    else:
                        data = result['data']
                    
                    if 'data' in data and isinstance(data['data'], dict):
                        availability_data = data['data']
                    else:
                        availability_data = data
                    
                    response = {
                        'success': True,
                        'available': availability_data.get('available', False),
                        'endpoint': endpoint
                    }
                    if 'debug' in availability_data:
                        response['debug'] = availability_data['debug']
                    
                    return response
                except json.JSONDecodeError:
                    return {'success': False, 'error': 'Invalid response format'}
            else:
                return {'success': False, 'error': result['error']}
                
        except Exception as e:
            logger.error(f'APIManager: Error checking availability for {appid}: {e}')
            return {'success': False, 'error': str(e)}
    
    def fetch_available_endpoints(self) -> Dict[str, Any]:
        try:
            client = get_global_client()
            api_key = self.get_api_key()
            
            result = client.get(f'{API_BASE_URL}/endpoint-rate-limit', {
                'endpoint': 'all'
            }, auth_token=api_key, timeout_override=5.0)
            
            if result['success']:
                try:
                    if isinstance(result['data'], str):
                        data = json.loads(result['data'])
                    else:
                        data = result['data']
                    endpoints = []
                    
                    if isinstance(data, dict):
                        for endpoint_name, endpoint_info in data.items():
                            if isinstance(endpoint_info, dict) and endpoint_info.get('enabled', False):
                                endpoints.append(endpoint_name.replace('/api/', ''))
                    # Ensure 'ryuu' shows first if present
                    if endpoints:
                        ordered = []
                        if 'ryuu' in endpoints:
                            ordered.append('ryuu')
                        for e in endpoints:
                            if e != 'ryuu' and e not in ordered:
                                ordered.append(e)
                    else:
                        ordered = ['ryuu', 'oureveryday', 'manilua', 'donation']
                    return {
                        'success': True,
                        'endpoints': ordered
                    }
                except json.JSONDecodeError as e:
                    logger.warn(f'APIManager: Failed to parse endpoints response: {e}')
                    return {'success': False, 'error': 'Invalid response format'}
            else:
                return {'success': False, 'error': result.get('error', 'Unknown error')}
                
        except Exception as e:
            logger.error(f'APIManager: Error fetching endpoints: {e}')
            return {'success': False, 'error': str(e)}
    
    def get_download_endpoints(self) -> list:
        # Fully offline/static: avoid remote calls to keep UI instant and prevent timeouts
        return ['ryuu', 'oureveryday', 'manilua', 'donation']

    def get_user_id(self) -> Dict[str, Any]:
        try:
            client = get_global_client()
            api_key = self.get_api_key()

            if not api_key:
                return {'success': False, 'error': 'No API key available'}

            result = client.post(f'{API_BASE_URL}/validate-api-key', {
                'key': api_key
            }, timeout_override=12.0)

            if result['success']:
                try:
                    raw = result['data']
                    data = None
                    if isinstance(raw, (dict, list)):
                        data = raw
                    elif isinstance(raw, str):
                        try:
                            data = json.loads(raw)
                        except json.JSONDecodeError:
                            try:
                                data = ast.literal_eval(raw)
                            except Exception:
                                data = None

                    # Normalize dict-like payloads
                    if isinstance(data, dict):
                        is_valid = bool(data.get('isValid') or data.get('valid') or data.get('ok'))
                        user_id = data.get('userId') or data.get('user_id')
                        if is_valid and user_id:
                            return {'success': True, 'userId': user_id}
                        if is_valid:
                            # Accept valid without userId; caller may proceed without it
                            return {'success': True}
                        return {'success': False, 'error': 'Invalid API key or no user ID'}

                    # String fallback heuristics
                    text = str(raw)
                    low = text.lower()
                    if 'true' in low or 'valid' in low or 'ok' in low:
                        # Try to extract user id if present
                        m = re.search(r'user\s*id\s*[":=]\s*"?(\d+)"?', text, re.IGNORECASE)
                        if m:
                            return {'success': True, 'userId': m.group(1)}
                        return {'success': True}

                    # Fallback: treat any 2xx response as valid even if body is unexpected
                    status_code = result.get('status_code')
                    if isinstance(status_code, int) and 200 <= status_code < 300:
                        return {'success': True}
                    return {'success': False, 'error': 'Invalid response format'}
                except Exception as e:
                    logger.warn(f'APIManager: Failed to parse user ID response: {e}')
                    # Fallback: treat any 2xx response as valid even on parse errors
                    status_code = result.get('status_code')
                    if isinstance(status_code, int) and 200 <= status_code < 300:
                        return {'success': True}
                    return {'success': False, 'error': 'Invalid response format'}
            else:
                return {'success': False, 'error': result['error']}

        except Exception as e:
            logger.error(f'APIManager: Error getting user ID: {e}')
            return {'success': False, 'error': str(e)}

    def get_app_names(self, appids: List[int], language: str = 'brazilian', ttl_seconds: int = 3600) -> Dict[str, Any]:
        try:
            client = get_global_client()
            now = time.time()
            names: Dict[int, str] = {}
            images: Dict[int, str] = {}
            to_fetch: List[int] = []

            for appid in appids:
                try:
                    appid_int = int(appid)
                except Exception:
                    continue
                cached = self._app_name_cache.get(appid_int)
                if cached and (now - cached.get('ts', 0)) < ttl_seconds:
                    if isinstance(cached.get('name'), str):
                        names[appid_int] = cached['name']
                    if isinstance(cached.get('image'), str):
                        images[appid_int] = cached['image']
                else:
                    to_fetch.append(appid_int)

            batch = to_fetch[:60]
            # Small worker pool to speed up without hammering API
            max_workers = 4 if len(batch) >= 8 else min(2, len(batch) or 1)

            def _fetch_one(aid: int) -> Dict[str, Any]:
                try:
                    res = client.get('https://store.steampowered.com/api/appdetails', {
                        'appids': aid,
                        'l': language
                    })
                    return {'appid': aid, 'result': res}
                except Exception as ex:
                    return {'appid': aid, 'error': str(ex)}

            if batch:
                with ThreadPoolExecutor(max_workers=max_workers) as ex:
                    futures = [ex.submit(_fetch_one, aid) for aid in batch]
                    for fut in as_completed(futures):
                        info = fut.result()
                        aid = info.get('appid')
                        if 'error' in info:
                            logger.warn(f'APIManager: Failed to fetch app name for {aid}: {info["error"]}')
                            self._app_name_cache[aid] = {'name': None, 'ts': now}
                            continue
                        result = info.get('result', {})
                        if result.get('success'):
                            data = result.get('data')
                            key = str(aid)
                            if isinstance(data, dict) and key in data and isinstance(data[key], dict):
                                entry = data[key]
                                if entry.get('success') and isinstance(entry.get('data'), dict):
                                    edata = entry['data']
                                    name = edata.get('name')
                                    image_url = edata.get('capsule_imagev5') or edata.get('capsule_image') or edata.get('header_image')
                                    if isinstance(name, str) and name.strip():
                                        names[aid] = name
                                    if isinstance(image_url, str) and image_url.strip():
                                        images[aid] = image_url
                                    self._app_name_cache[aid] = {'name': names.get(aid), 'image': images.get(aid), 'ts': now}
                                    continue
                        # Fallback cache entry when format unexpected or not success
                        self._app_name_cache[aid] = {'name': names.get(aid), 'image': images.get(aid), 'ts': now}

            # Build serializable mapping with string keys for JSON
            serializable_names = {str(k): v for k, v in names.items()}
            serializable_images = {str(k): v for k, v in images.items()}
            return {'success': True, 'names': serializable_names, 'images': serializable_images}
        except Exception as e:
            logger.error(f'APIManager: Error in get_app_names: {e}')
            return {'success': False, 'error': str(e)}
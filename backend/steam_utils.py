import os
import sys
import json
import struct
from typing import Optional, List, Dict, Tuple
from datetime import datetime
import Millennium
import PluginUtils

logger = PluginUtils.Logger()

if sys.platform.startswith('win'):
    try:
        import winreg
    except Exception:
        winreg = None 

_steam_install_path: Optional[str] = None

def detect_steam_install_path() -> str:
    global _steam_install_path
    
    if _steam_install_path:
        return _steam_install_path
    
    path = None
    
    if sys.platform.startswith('win') and winreg is not None:
        try:
            with winreg.OpenKey(winreg.HKEY_CURRENT_USER, r"Software\Valve\Steam") as key:
                path, _ = winreg.QueryValueEx(key, 'SteamPath')
        except Exception as e:
            logger.log(f'manilua (steam_utils): Registry lookup failed: {e}')
            path = None
    
    if not path:
        try:
            path = Millennium.steam_path()
        except Exception as e:
            logger.error(f'manilua (steam_utils): Millennium steam_path() failed: {e}')
            path = None
    
    _steam_install_path = path
    return _steam_install_path or ''

def get_steam_config_path() -> str:
    steam_path = detect_steam_install_path()
    if not steam_path:
        raise RuntimeError("Steam installation path not found")
    return os.path.join(steam_path, 'config')

def get_stplug_in_path() -> str:
    config_path = get_steam_config_path()
    stplug_path = os.path.join(config_path, 'stplug-in')
    os.makedirs(stplug_path, exist_ok=True)
    return stplug_path

def has_lua_for_app(appid: int) -> bool:
    try:
        base_path = detect_steam_install_path()
        if not base_path:
            return False
        
        stplug_path = os.path.join(base_path, 'config', 'stplug-in')
        lua_file = os.path.join(stplug_path, f'{appid}.lua')
        disabled_file = os.path.join(stplug_path, f'{appid}.lua.disabled')
        
        exists = os.path.exists(lua_file) or os.path.exists(disabled_file)
        return exists
        
    except Exception as e:
        logger.error(f'manilua (steam_utils): Error checking Lua scripts for app {appid}: {e}')
        return False

def get_user_data_path() -> Optional[str]:
    """Get Steam userdata directory."""
    try:
        steam_path = detect_steam_install_path()
        if not steam_path:
            return None
        userdata_path = os.path.join(steam_path, 'userdata')
        if os.path.exists(userdata_path):
            return userdata_path
        return None
    except Exception as e:
        logger.warn(f'manilua: get_user_data_path failed: {e}')
        return None

def get_current_user_id() -> Optional[str]:
    """Try to detect current Steam user ID from loginusers.vdf or most recent userdata folder."""
    try:
        steam_path = detect_steam_install_path()
        if not steam_path:
            return None
        
        # Try loginusers.vdf first
        config_path = os.path.join(steam_path, 'config')
        loginusers_path = os.path.join(config_path, 'loginusers.vdf')
        if os.path.exists(loginusers_path):
            try:
                with open(loginusers_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    # Parse VDF to find most recent user (simple regex)
                    import re
                    matches = re.findall(r'"(\d{17})"', content)
                    if matches:
                        return matches[0]  # Return first user ID found
            except Exception:
                pass
        
        # Fallback: most recently modified userdata folder
        userdata_path = get_user_data_path()
        if userdata_path and os.path.exists(userdata_path):
            folders = []
            for item in os.listdir(userdata_path):
                item_path = os.path.join(userdata_path, item)
                if os.path.isdir(item_path) and item.isdigit():
                    try:
                        mtime = os.path.getmtime(item_path)
                        folders.append((item, mtime))
                    except Exception:
                        pass
            if folders:
                folders.sort(key=lambda x: x[1], reverse=True)
                return folders[0][0]
        
        return None
    except Exception as e:
        logger.warn(f'manilua: get_current_user_id failed: {e}')
        return None

def parse_acf_file(filepath: str) -> Dict:
    """Parse Steam .acf file (simple VDF parser)."""
    try:
        result = {}
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            # Simple key-value extraction
            import re
            matches = re.findall(r'"([^"]+)"\s+"([^"]+)"', content)
            for key, value in matches:
                result[key] = value
        return result
    except Exception as e:
        logger.warn(f'manilua: parse_acf_file failed for {filepath}: {e}')
        return {}

def scan_steamapps_acf() -> Dict[int, Dict]:
    """Scan steamapps/*.acf files for installed games."""
    apps = {}
    try:
        steam_path = detect_steam_install_path()
        if not steam_path:
            return apps
        
        steamapps_path = os.path.join(steam_path, 'steamapps')
        if not os.path.exists(steamapps_path):
            return apps
        
        for filename in os.listdir(steamapps_path):
            if filename.startswith('appmanifest_') and filename.endswith('.acf'):
                try:
                    appid_str = filename.replace('appmanifest_', '').replace('.acf', '')
                    if not appid_str.isdigit():
                        continue
                    appid = int(appid_str)
                    
                    filepath = os.path.join(steamapps_path, filename)
                    data = parse_acf_file(filepath)
                    
                    # Get modification time
                    try:
                        mtime = os.path.getmtime(filepath)
                        install_date = datetime.fromtimestamp(mtime).isoformat()
                    except Exception:
                        install_date = None
                    
                    apps[appid] = {
                        'name': data.get('name', ''),
                        'installdir': data.get('installdir', ''),
                        'StateFlags': data.get('StateFlags', ''),
                        'LastUpdated': data.get('LastUpdated', ''),
                        'file_date': install_date,
                        'source': 'steamapps_acf'
                    }
                except Exception as e:
                    logger.warn(f'manilua: Error parsing {filename}: {e}')
                    continue
        
        return apps
    except Exception as e:
        logger.error(f'manilua: scan_steamapps_acf failed: {e}')
        return apps

def scan_stplugin_manifests() -> Dict[int, Dict]:
    """Scan stplug-in/*.manifest files for Manilua games."""
    apps = {}
    try:
        stplug_path = get_stplug_in_path()
        if not os.path.exists(stplug_path):
            return apps
        
        for filename in os.listdir(stplug_path):
            if filename.endswith('.manifest'):
                try:
                    filepath = os.path.join(stplug_path, filename)
                    
                    # Try to extract appid from filename or content
                    appid = None
                    
                    # Pattern 1: <appid>.manifest
                    name_part = filename.replace('.manifest', '')
                    if name_part.isdigit():
                        appid = int(name_part)
                    else:
                        # Pattern 2: <base>_<dlc>.manifest
                        parts = name_part.split('_')
                        if len(parts) >= 2 and parts[0].isdigit():
                            appid = int(parts[0])
                    
                    # Also try to read manifest content
                    try:
                        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                            content = f.read()
                            try:
                                data = json.loads(content)
                                if isinstance(data, dict):
                                    manifest_appid = data.get('appid') or data.get('id')
                                    if manifest_appid:
                                        appid = int(manifest_appid)
                            except json.JSONDecodeError:
                                pass
                    except Exception:
                        pass
                    
                    if appid and appid not in apps:
                        try:
                            mtime = os.path.getmtime(filepath)
                            install_date = datetime.fromtimestamp(mtime).isoformat()
                        except Exception:
                            install_date = None
                        
                        apps[appid] = {
                            'manifest_file': filename,
                            'file_date': install_date,
                            'source': 'stplugin_manifest'
                        }
                except Exception as e:
                    logger.warn(f'manilua: Error processing manifest {filename}: {e}')
                    continue
        
        return apps
    except Exception as e:
        logger.error(f'manilua: scan_stplugin_manifests failed: {e}')
        return apps

def scan_depotcache_manifests() -> Dict[int, Dict]:
    """Scan depotcache/*.manifest files."""
    apps = {}
    try:
        steam_path = detect_steam_install_path()
        if not steam_path:
            return apps
        
        depotcache_path = os.path.join(steam_path, 'depotcache')
        if not os.path.exists(depotcache_path):
            return apps
        
        # Depot manifests are binary and named with depot IDs, not app IDs
        # We can only get modification times here
        for filename in os.listdir(depotcache_path):
            if filename.endswith('.manifest'):
                try:
                    filepath = os.path.join(depotcache_path, filename)
                    mtime = os.path.getmtime(filepath)
                    # Store by filename since we can't extract appid directly
                    # This is supplementary data only
                except Exception:
                    continue
        
        return apps  # Return empty for now as depot IDs != app IDs
    except Exception as e:
        logger.warn(f'manilua: scan_depotcache_manifests failed: {e}')
        return apps

def get_manilua_apps_with_dates() -> List[Tuple[int, str]]:
    """Get list of Manilua apps with their installation dates.
    Returns list of (appid, install_date_iso) tuples, sorted by date descending.
    """
    try:
        # Get apps from .lua files (primary source)
        lua_apps = list_lua_apps()
        
        # Get supplementary data from various sources
        acf_data = scan_steamapps_acf()
        stplugin_data = scan_stplugin_manifests()
        
        # Combine data
        apps_with_dates = []
        
        for appid in lua_apps:
            install_date = None
            
            # Try to get date from stplugin manifest first (most accurate for Manilua)
            if appid in stplugin_data and stplugin_data[appid].get('file_date'):
                install_date = stplugin_data[appid]['file_date']
            
            # Fallback to .lua file mtime
            if not install_date:
                try:
                    stplug_path = get_stplug_in_path()
                    lua_file = os.path.join(stplug_path, f'{appid}.lua')
                    if os.path.exists(lua_file):
                        mtime = os.path.getmtime(lua_file)
                        install_date = datetime.fromtimestamp(mtime).isoformat()
                    else:
                        disabled_file = os.path.join(stplug_path, f'{appid}.lua.disabled')
                        if os.path.exists(disabled_file):
                            mtime = os.path.getmtime(disabled_file)
                            install_date = datetime.fromtimestamp(mtime).isoformat()
                except Exception:
                    pass
            
            # Fallback to ACF data
            if not install_date and appid in acf_data and acf_data[appid].get('file_date'):
                install_date = acf_data[appid]['file_date']
            
            # Use epoch as absolute fallback
            if not install_date:
                install_date = datetime.fromtimestamp(0).isoformat()
            
            apps_with_dates.append((appid, install_date))
        
        # Sort by date descending (most recent first)
        apps_with_dates.sort(key=lambda x: x[1], reverse=True)
        
        return apps_with_dates
        
    except Exception as e:
        logger.error(f'manilua: get_manilua_apps_with_dates failed: {e}')
        return []

def list_lua_apps() -> List[int]:
    """List all Manilua apps by scanning .lua files."""
    try:
        base_path = detect_steam_install_path()
        if not base_path:
            return []

        stplug_path = os.path.join(base_path, 'config', 'stplug-in')
        if not os.path.exists(stplug_path):
            return []

        apps_mtime: dict[int, float] = {}
        for filename in os.listdir(stplug_path):
            if filename.endswith('.lua') or filename.endswith('.lua.disabled'):
                name = filename.split('.')[0]
                if not name.isdigit():
                    continue
                appid = int(name)
                path = os.path.join(stplug_path, filename)
                try:
                    mtime = os.path.getmtime(path)
                except Exception:
                    mtime = 0.0
                prev = apps_mtime.get(appid, 0.0)
                if mtime > prev:
                    apps_mtime[appid] = mtime

        sorted_appids = [appid for appid, _ in sorted(apps_mtime.items(), key=lambda item: item[1], reverse=True)]
        return sorted_appids
    except Exception as e:
        logger.error(f'manilua (steam_utils): Error listing Lua apps: {e}')
        return []
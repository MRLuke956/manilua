from typing import Optional, Dict, Any
import PluginUtils
import json as _json
import ssl as _ssl
from urllib import request as _urllib_request
from urllib import parse as _urllib_parse

try:
    import httpx
    from httpx import HTTPStatusError, RequestError
    HTTPX_AVAILABLE = True
except ImportError:
    httpx = None
    HTTPStatusError = None
    RequestError = None
    HTTPX_AVAILABLE = False

try:
    from steam_verification import get_steam_verification
    STEAM_VERIFICATION_AVAILABLE = True
except ImportError:
    get_steam_verification = None
    STEAM_VERIFICATION_AVAILABLE = False

logger = PluginUtils.Logger()

BASE_HEADERS = {
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
}

ALLOWED_HOSTS = {
    'www.piracybound.com',
    'store.steampowered.com',
    # Common Steam CDN hosts used for images
    'shared.fastly.steamstatic.com',
    'cdn.cloudflare.steamstatic.com'
}

def _ensure_allowed_url(url: str):
    try:
        from urllib.parse import urlparse
        parsed = urlparse(url)
        host = parsed.hostname or ''
        if host not in ALLOWED_HOSTS:
            raise Exception(f"Host not allowed: {host}")
    except Exception as e:
        raise

def _get_host(url: str) -> str:
    try:
        from urllib.parse import urlparse
        return (urlparse(url).hostname or '').lower()
    except Exception:
        return ''

class HTTPClient:    
    def __init__(self, timeout: int = 30):
        self._client = None
        self._timeout = timeout

    def _urllib_request(self, method: str, url: str, *, params: Optional[Dict[str, Any]] = None, json: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, timeout: Optional[float] = None):
        _ensure_allowed_url(url)
        headers = headers or {}
        t = timeout or self._timeout
        data_bytes = None
        full_url = url
        if method == 'GET' and params:
            qs = _urllib_parse.urlencode(params, doseq=True)
            sep = '&' if ('?' in url) else '?'
            full_url = f"{url}{sep}{qs}"
        if method == 'POST' and json is not None:
            data_bytes = _json.dumps(json).encode('utf-8')
            headers['Content-Type'] = 'application/json'
        req = _urllib_request.Request(full_url, data=data_bytes, headers=headers, method=method)
        ctx = _ssl.create_default_context()
        with _urllib_request.urlopen(req, timeout=t, context=ctx) as resp:
            status = getattr(resp, 'status', 200)
            raw = resp.read()
            text = raw.decode('utf-8', errors='replace') if isinstance(raw, (bytes, bytearray)) else str(raw)
            try:
                parsed = _json.loads(text)
                return {
                    'success': True,
                    'data': parsed,
                    'status_code': status
                }
            except Exception:
                return {
                    'success': True,
                    'data': text,
                    'status_code': status
                }

    def _ensure_client(self):
        if not HTTPX_AVAILABLE:
            return None
            
        if self._client is None:
            try:
                if httpx is None:
                    raise Exception("httpx library is not available. Please install httpx: pip install httpx")
                client_kwargs = { 'timeout': self._timeout }
                try:
                    client_kwargs['limits'] = httpx.Limits(max_keepalive_connections=32, max_connections=32)
                except Exception:
                    pass
                # Use HTTP/1.1 explicitly to avoid optional http2 dependency
                self._client = httpx.Client(http2=False, **client_kwargs)
            except Exception as e:
                logger.error(f'HTTPClient: Failed to initialize HTTPX client: {e}')
                raise
        return self._client
    
    def get(self, url: str, params: Optional[Dict[str, Any]] = None, auth_token: Optional[str] = None, timeout_override: Optional[float] = None) -> Dict[str, Any]:
        try:
            client = self._ensure_client()
            headers = BASE_HEADERS.copy()
            
            _ensure_allowed_url(url)
            headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114 Safari/537.36 Steam'
            host = _get_host(url)
            if host == 'www.piracybound.com' and STEAM_VERIFICATION_AVAILABLE and get_steam_verification is not None:
                try:
                    verification = get_steam_verification()
                    verification_headers = verification.get_verification_headers()
                    headers.update(verification_headers)
                except Exception:
                    pass
            
            if auth_token:
                headers['Authorization'] = f'Bearer {auth_token}'
            
            t = timeout_override or self._timeout
            if HTTPX_AVAILABLE and client is not None:
                client = self._ensure_client()
                try:
                    # Use a tighter read timeout for availability checks to keep UI snappy
                    is_availability = ('/check-availability' in url)
                    eff_read = min(3.0, t) if is_availability else t
                    timeout = httpx.Timeout(connect=min(5, t), read=eff_read, write=min(5, t), pool=min(5, t))
                except Exception:
                    timeout = t

                max_retries = 1 if ('/check-availability' in url) else 3
                backoff_base = 0.3
                last_err = None
                for attempt in range(max_retries):
                    try:
                        response = client.get(url, params=params or {}, headers=headers, timeout=timeout)
                        response.raise_for_status()
                        try:
                            data = response.json()
                        except Exception:
                            try:
                                enc = getattr(response, 'encoding', None) or 'utf-8'
                                data = response.content.decode(enc, errors='ignore')
                            except Exception:
                                data = getattr(response, 'text', '')
                        return {
                            'success': True,
                            'data': data,
                            'status_code': response.status_code
                        }
                    except Exception as e:
                        last_err = e
                        # Retry only on request-level errors (e.g., timeouts)
                        if HTTPX_AVAILABLE and RequestError is not None and isinstance(e, RequestError) and attempt < (max_retries - 1):
                            try:
                                import time as _t
                                _t.sleep(backoff_base * (2 ** attempt))
                            except Exception:
                                pass
                            continue
                        # Non-retryable or out of attempts; break to outer error handler
                        break
                # Exhausted retries or non-retryable error
                raise last_err if last_err else Exception('Request failed')
            else:
                return self._urllib_request('GET', url, params=params or {}, headers=headers, timeout=t)
        except Exception as e:
            if HTTPX_AVAILABLE and HTTPStatusError is not None and isinstance(e, HTTPStatusError):
                error_msg = f"HTTP {e.response.status_code}: {e.response.text if e.response else 'No response'}"
                logger.error(f'HTTPClient: HTTP error for {url}: {error_msg}')
                return {
                    'success': False,
                    'error': error_msg,
                    'status_code': e.response.status_code if e.response else None
                }
            elif HTTPX_AVAILABLE and RequestError is not None and isinstance(e, RequestError):
                error_msg = f"Request error: {str(e)}"
                logger.warn(f'HTTPClient: Request error for {url}: {error_msg}')
                return {
                    'success': False,
                    'error': error_msg
                }
            else:
                error_msg = f"Unexpected error: {str(e)}"
                logger.error(f'HTTPClient: Unexpected error for {url}: {error_msg}')
                return {
                    'success': False,
                    'error': error_msg
                }
    
    def get_binary(self, url: str, params: Optional[Dict[str, Any]] = None, auth_token: Optional[str] = None) -> Dict[str, Any]:
        try:
            client = self._ensure_client()
            headers = BASE_HEADERS.copy()
            
            _ensure_allowed_url(url)
            headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114 Safari/537.36 Steam'
            host = _get_host(url)
            if host == 'www.piracybound.com' and STEAM_VERIFICATION_AVAILABLE and get_steam_verification is not None:
                try:
                    verification = get_steam_verification()
                    verification_headers = verification.get_verification_headers()
                    headers.update(verification_headers)
                except Exception:
                    pass
            
            if auth_token:
                headers['Authorization'] = f'Bearer {auth_token}'
            
            t = self._timeout
            try:
                timeout = httpx.Timeout(connect=min(5, t), read=t, write=min(5, t), pool=min(5, t))
            except Exception:
                timeout = t
            response = client.get(url, params=params or {}, headers=headers, timeout=timeout)
            response.raise_for_status()
            
            return {
                'success': True,
                'data': response.content,
                'status_code': response.status_code
            }
        except Exception as e:
            if HTTPX_AVAILABLE and HTTPStatusError is not None and isinstance(e, HTTPStatusError):
                error_msg = f"HTTP {e.response.status_code}: {e.response.text if e.response else 'No response'}"
                logger.error(f'HTTPClient: HTTP error for {url}: {error_msg}')
                return {
                    'success': False,
                    'error': error_msg,
                    'status_code': e.response.status_code if e.response else None
                }
            elif HTTPX_AVAILABLE and RequestError is not None and isinstance(e, RequestError):
                error_msg = f"Request error: {str(e)}"
                logger.error(f'HTTPClient: Request error for {url}: {error_msg}')
                return {
                    'success': False,
                    'error': error_msg
                }
            else:
                error_msg = f"Unexpected error: {str(e)}"
                logger.error(f'HTTPClient: Unexpected error for {url}: {error_msg}')
                return {
                    'success': False,
                    'error': error_msg
                }

    def post(self, url: str, data: Optional[Dict[str, Any]] = None, auth_token: Optional[str] = None, timeout_override: Optional[float] = None) -> Dict[str, Any]:
        try:
            headers = BASE_HEADERS.copy()

            _ensure_allowed_url(url)
            headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114 Safari/537.36 Steam'
            host = _get_host(url)
            if host == 'www.piracybound.com' and STEAM_VERIFICATION_AVAILABLE and get_steam_verification is not None:
                try:
                    verification = get_steam_verification()
                    verification_headers = verification.get_verification_headers()
                    headers.update(verification_headers)
                except Exception:
                    pass

            if auth_token:
                headers['Authorization'] = f'Bearer {auth_token}'

            if data:
                headers['Content-Type'] = 'application/json'

            # Per-request timeout override; add small connect/read budget
            t = timeout_override or self._timeout
            if HTTPX_AVAILABLE:
                client = self._ensure_client()
                try:
                    timeout = httpx.Timeout(connect=min(5, t), read=t, write=min(5, t), pool=min(5, t))
                except Exception:
                    timeout = t
                response = client.post(url, json=data or {}, headers=headers, timeout=timeout)
                response.raise_for_status()
                return {
                    'success': True,
                    'data': response.text,
                    'status_code': response.status_code
                }
            else:
                return self._urllib_request('POST', url, json=data or {}, headers=headers, timeout=t)
        except Exception as e:
            if HTTPX_AVAILABLE and HTTPStatusError is not None and isinstance(e, HTTPStatusError):
                error_msg = f"HTTP {e.response.status_code}: {e.response.text if e.response else 'No response'}"
                logger.error(f'HTTPClient: HTTP error for {url}: {error_msg}')
                return {
                    'success': False,
                    'error': error_msg,
                    'status_code': e.response.status_code if e.response else None
                }
            elif HTTPX_AVAILABLE and RequestError is not None and isinstance(e, RequestError):
                error_msg = f"Request error: {str(e)}"
                logger.error(f'HTTPClient: Request error for {url}: {error_msg}')
                return {
                    'success': False,
                    'error': error_msg
                }
            else:
                error_msg = f"Unexpected error: {str(e)}"
                logger.error(f'HTTPClient: Unexpected error for {url}: {error_msg}')
                return {
                    'success': False,
                    'error': error_msg
                }

    def stream_get(self, url: str, params: Optional[Dict[str, Any]] = None, auth_token: Optional[str] = None):
        client = self._ensure_client()
        headers = BASE_HEADERS.copy()
        
        _ensure_allowed_url(url)
        headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114 Safari/537.36 Steam'
        host = _get_host(url)
        if host == 'www.piracybound.com' and STEAM_VERIFICATION_AVAILABLE and get_steam_verification is not None:
            try:
                verification = get_steam_verification()
                verification_headers = verification.get_verification_headers()
                headers.update(verification_headers)
            except Exception:
                pass

        if auth_token:
            headers['Authorization'] = f'Bearer {auth_token}'

        try:
            t = self._timeout
            try:
                timeout = httpx.Timeout(connect=min(5, t), read=t, write=min(5, t), pool=min(5, t))
            except Exception:
                timeout = t
            return client.stream('GET', url, params=params or {}, headers=headers, timeout=timeout)
        except Exception as e:
            logger.error(f'HTTPClient: Stream GET init failed for {url}: {e}')
            raise
    
    def close(self) -> None:
        if self._client is not None:
            try:
                self._client.close()
            except Exception as e:
                logger.error(f'HTTPClient: Error closing client: {e}')
            finally:
                self._client = None


_global_client: Optional[HTTPClient] = None

def get_global_client() -> HTTPClient:
    global _global_client
    if _global_client is None:
        _global_client = HTTPClient()
    return _global_client

def close_global_client() -> None:
    global _global_client
    if _global_client is not None:
        _global_client.close()
        _global_client = None
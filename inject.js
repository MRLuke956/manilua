(function () {
    'use strict';

    const _localeRaw = (typeof navigator !== 'undefined' && (navigator.language || navigator.userLanguage)) ? (navigator.language || navigator.userLanguage).toLowerCase() : 'en';
    const _LOCALE = _localeRaw.startsWith('pt-br') || _localeRaw === 'pt' || _localeRaw.startsWith('pt') ? 'pt-BR' : 'en';
    const I18N = {
        'en': {
            'profile.local_library_title': 'Manilua Library (Local)',
            'profile.local_library_hint': 'Only visible to you on this client',
            'profile.view_on_store': 'View on store',
            'profile.empty': 'No local games found',
            'profile.added_via': 'Added via manilua',
            'profile.refresh': 'Refresh',
            'profile.refreshing': 'Refreshing…',
            'profile.hide': 'Hide',
            'profile.show': 'Show',
            'profile.offline_cache': 'Offline – showing cached list',
            'auth.title': 'manilua Authentication',
            'auth.require_key': 'API Key Required',
            'auth.description': 'Connect to manilua to download game files. An API key is required for authentication.',
            'auth.step1': '1. Get your API key',
            'auth.open_site': 'Open www.piracybound.com/manilua',
            'auth.step2': '2. Enter your API key',
            'auth.input_placeholder': 'Enter your manilua API key...',
            'auth.save': 'Save API Key',
            'auth.saving': 'Saving...',

            'btn.add': 'Add via manilua',
            'btn.remove': 'Remove via manilua',
            'btn.loading': 'Loading...',
            'btn.removing': 'Removing...',

            'tooltip.add': 'Download and install game files via manilua',
            'tooltip.remove': 'Remove game files from manilua library',

            'generic.starting': 'Starting...',
            'generic.error': 'Error',
            'generic.unknown_error': 'Unknown error',
            'generic.this_game': 'This game',

            'status.working': 'Working…',
            'status.checking': 'Checking availability…',
            'status.checking_with_api': 'Checking {api}…',
            'status.checking_availability': 'Checking all endpoints in parallel…',
            'status.queued': 'Initializing download…',
            'status.downloading': 'Downloading package…',
            'status.downloading_from': 'Downloading from {endpoint}…',
            'status.processing': 'Processing ZIP package…',
            'status.extracting': 'Extracting game files…',
            'status.extracting_with_count': 'Extracting game files… ({count} files processed)',
            'status.installing': 'Installing to Steam…',
            'status.installing_with_count': 'Installing files ({count} files)…',
            'status.done': 'Installation complete!',
            'status.failed': 'Download failed',
            'status.failed_prefix': 'Failed',
            'status.awaiting_endpoint_choice': 'Multiple sources available - choose one',
            'title.choose_endpoint': 'manilua - Choose endpoint',
            'endpoint.starting_download': 'Starting download…',
            'endpoint.failed_to_start': 'Failed to start download',

            'banner.in_library': 'IN LIBRARY\u00A0\u00A0',
            'banner.already_in_library': '{gameName} is already in your Steam library',
            'library.in_library': 'In library',
            'progress.game_added': 'Game Added!',

            'op.in_progress': 'Operation already in progress',
            'op.download_in_progress': 'Download already in progress',
            'status.generic_processing': 'Processing…'
            , 'profile.add_dlc': 'Add DLCs'
            , 'dlc.title': 'Available DLCs'
            , 'dlc.fetching': 'Fetching DLCs…'
            , 'dlc.none': 'No DLCs found'
            , 'dlc.add_selected': 'Add selected'
            , 'dlc.error': 'Failed to fetch DLC list'
            , 'dlc.config_missing': 'RYUU endpoint not available'
            , 'dlc.queued': '{count} DLCs queued'
            , 'dlc.installing': 'Installing DLC {index}/{total} — {name}'
            , 'dlc.installed': 'Installed'
            , 'dlc.remove': 'Remove'
            , 'dlc.removed': 'Removed'
            , 'dlc.remove_failed': 'Failed to remove'
            , 'status.not_found_on': 'Not found on {endpoint} — trying next…'
            , 'dlc.not_found_all': 'This DLC was not found on any endpoint'
            , 'playtime.no_record': 'No playtime recorded'
            , 'playtime.never_played': 'Never played'
            , 'lastsession.never': 'Never'
            , 'lastsession.today': 'Today'
            , 'lastsession.yesterday': 'Yesterday'
            , 'lastsession.days_ago': '{days} days ago'
            , 'install.added': 'Added'
            , 'install.today': 'Added today'
            , 'install.yesterday': 'Added yesterday'
            , 'install.days_ago': 'Added {days} days ago'
        },
        'pt-BR': {
            'auth.title': 'Autenticação do manilua',
            'auth.require_key': 'Chave da API necessária',
            'auth.description': 'Conecte-se ao manilua para baixar os arquivos do jogo. Uma chave da API é necessária para autenticação.',
            'auth.step1': '1. Obtenha sua chave da API',
            'auth.open_site': 'Abrir www.piracybound.com/manilua',
            'auth.step2': '2. Insira sua chave da API',
            'auth.input_placeholder': 'Digite sua chave da API do manilua...',
            'auth.save': 'Salvar chave da API',
            'auth.saving': 'Salvando...',

            'btn.add': 'Adicionar via manilua',
            'btn.remove': 'Remover via manilua',
            'btn.loading': 'Carregando...',
            'btn.removing': 'Removendo...',

            'tooltip.add': 'Baixar e instalar arquivos do jogo via manilua',
            'tooltip.remove': 'Remover arquivos do jogo da biblioteca do manilua',

            'generic.starting': 'Iniciando...',
            'generic.error': 'Erro',
            'generic.unknown_error': 'Erro desconhecido',
            'generic.this_game': 'Este jogo',

            'status.working': 'Trabalhando…',
            'status.checking': 'Verificando disponibilidade…',
            'status.checking_with_api': 'Verificando {api}…',
            'status.checking_availability': 'Verificando todos os endpoints em paralelo…',
            'status.queued': 'Inicializando download…',
            'status.downloading': 'Baixando pacote…',
            'status.downloading_from': 'Baixando de {endpoint}…',
            'status.processing': 'Processando pacote ZIP…',
            'status.extracting': 'Extraindo arquivos do jogo…',
            'status.extracting_with_count': 'Extraindo arquivos do jogo… ({count} arquivos processados)',
            'status.installing': 'Instalando na Steam…',
            'status.installing_with_count': 'Instalando arquivos ({count} arquivos)…',
            'status.done': 'Instalação concluída!',
            'status.failed': 'Download falhou',
            'status.failed_prefix': 'Falhou',
            'status.awaiting_endpoint_choice': 'Várias fontes disponíveis - escolha uma',
            'title.choose_endpoint': 'manilua - Escolha o endpoint',
            'endpoint.starting_download': 'Iniciando download…',
            'endpoint.failed_to_start': 'Falha ao iniciar o download',

            'banner.in_library': 'NA BIBLIOTECA\u00A0\u00A0',
            'banner.already_in_library': '{gameName} já está na sua biblioteca da Steam',
            'library.in_library': 'Na biblioteca',
            'progress.game_added': 'Jogo adicionado!',

            'op.in_progress': 'Operação já em andamento',
            'op.download_in_progress': 'Download já em andamento',
            'status.generic_processing': 'Processando…',
            'profile.local_library_title': 'Biblioteca do Manilua (Local)',
            'profile.local_library_hint': 'Visível apenas para você neste cliente',
            'profile.view_on_store': 'Ver na loja',
            'profile.empty': 'Nenhum jogo local encontrado',
            'profile.added_via': 'Adicionado via manilua',
            'profile.refresh': 'Atualizar',
            'profile.refreshing': 'Atualizando…',
            'profile.hide': 'Ocultar',
            'profile.show': 'Mostrar',
            'profile.offline_cache': 'Offline – exibindo lista em cache',
            'profile.add_dlc': 'Adicionar DLCs',
            'dlc.title': 'DLCs disponíveis',
            'dlc.fetching': 'Buscando DLCs…',
            'dlc.none': 'Nenhuma DLC encontrada',
            'dlc.add_selected': 'Adicionar selecionadas',
            'dlc.error': 'Falha ao buscar a lista de DLCs',
            'dlc.config_missing': 'Endpoint RYUU indisponível',
            'dlc.queued': '{count} DLCs enfileiradas',
            'dlc.installing': 'Instalando DLC {index}/{total} — {name}'
            , 'dlc.installed': 'Instalada'
            , 'dlc.remove': 'Remover'
            , 'dlc.removed': 'Removida'
            , 'dlc.remove_failed': 'Falha ao remover'
            , 'status.not_found_on': 'Não encontrada em {endpoint} — tentando próximo…'
            , 'dlc.not_found_all': 'Esta DLC não foi encontrada em nenhum endpoint'
            , 'playtime.no_record': 'Nenhum tempo de jogo registrado'
            , 'playtime.never_played': 'Nunca jogado'
            , 'lastsession.never': 'Nunca'
            , 'lastsession.today': 'Hoje'
            , 'lastsession.yesterday': 'Ontem'
            , 'lastsession.days_ago': 'Há {days} dias'
            , 'install.added': 'Adicionado'
            , 'install.today': 'Adicionado hoje'
            , 'install.yesterday': 'Adicionado ontem'
            , 'install.days_ago': 'Adicionado há {days} dias'
        }
    };

    // Keep a copy of Steam's native image patterns to reproduce exact quality
    let __maniluaSampleImgSrc = null;
    let __maniluaSampleImgSrcset = null;
    let __maniluaSampleImgSizes = null;
    let __maniluaSampleSourceSrcset = null;

    // Ensure the current image meets the required pixel density; if not, swap to a larger variant
    function ensureCrispImage(row, appid) {
        try {
            const img = row.querySelector('picture img') || row.querySelector('img');
            if (!img) return;
            const rect = img.getBoundingClientRect();
            const needed = Math.ceil((rect.width || 184) * (window.devicePixelRatio || 1));
            if (img.naturalWidth && img.naturalWidth >= needed) return;
            const { headerUrl, capsuleLarge } = computeImageUrls(appid, null);
            const best = capsuleLarge || headerUrl;
            img.src = best;
            try { img.removeAttribute('srcset'); } catch(_) {}
            img.setAttribute('srcset', `${best} 1x, ${best} 2x`);
        } catch(_) {}
    }

    // Install a fallback chain so images never stay blank if a URL falha
    function installImageFallback(imgEl, candidates = []) {
        try {
            if (!imgEl || !Array.isArray(candidates) || candidates.length === 0) return;
            // Remove duplicates
            const pic = imgEl.closest && imgEl.closest('picture');
            const sourceEl = pic ? pic.querySelector('source') : null;
            const list = Array.from(new Set(candidates.filter(Boolean)));
            let idx = 0;
            const tryNext = () => {
                if (idx >= list.length) return;
                const next = list[idx++];
                if (!next || next === imgEl.getAttribute('src')) return tryNext();
                try { imgEl.removeAttribute('srcset'); } catch(_) {}
                try { imgEl.removeAttribute('sizes'); } catch(_) {}
                imgEl.src = next;
                imgEl.setAttribute('srcset', `${next} 1x, ${next} 2x`);
                if (sourceEl) {
                    try { sourceEl.setAttribute('srcset', next); } catch(_) {}
                    try { sourceEl.removeAttribute('media'); } catch(_) {}
                }
            };
            const onErr = () => { tryNext(); };
            imgEl.addEventListener('error', onErr);
            // Delayed check in case the first candidate loads at 0 width
            setTimeout(() => { if (!imgEl.complete || imgEl.naturalWidth === 0) tryNext(); }, 150);
        } catch (_) {}
    }
    
    function t(key, vars) {
        const dict = I18N[_LOCALE] || I18N['en'];
        let str = dict[key] || I18N['en'][key] || key;
        if (vars && typeof vars === 'object') {
            Object.keys(vars).forEach(k => {
                const re = new RegExp('\\{' + k + '\\}', 'g');
                str = str.replace(re, String(vars[k]));
            });
        }
        return str;
    }

    function backendLog(message) {
        try {
            if (typeof Millennium !== 'undefined' && typeof Millennium.callServerMethod === 'function') {
                Millennium.callServerMethod('manilua', 'Logger.log', { message: String(message) });
            }
        } catch (err) {
            if (typeof console !== 'undefined' && console.warn) {
                console.warn('[manilua] backendLog failed', err);
            }
        }
    }

    // Remove stats/achievements/buttons copied from the native row to avoid mismatched data
    function stripStatsFromRow(row) {
        try {
            // Remove any nested buttons (not the row itself)
            row.querySelectorAll('[role="button"]').forEach(el => { if (el !== row) el.remove(); });
            // Remove progress bars
            row.querySelectorAll('[role="progressbar"], progress').forEach(el => { try { el.remove(); } catch(_) {} });
            // Remove common textual blocks related to achievements/menus (language-agnostic heuristics)
            Array.from(row.querySelectorAll('div,span')).forEach(el => {
                const t = (el.textContent || '').trim().toLowerCase();
                if (!t) return;
                if (
                    t.startsWith('conquistas') || t.includes('achievements') ||
                    t.includes('minhas estatísticas') || t.includes('minhas estatisticas') ||
                    t.includes('meu conteúdo do jogo') || t.includes('my game content') ||
                    t.includes('my game stats')
                ) {
                    try { el.remove(); } catch(_) {}
                }
            });
        } catch (_) {}
    }

    function observeAndCleanRow(row) {
        try {
            if (!row || row.getAttribute('data-manilua-observed') === '1') return;
            row.setAttribute('data-manilua-observed', '1');
        } catch (_) {}
    }

    function trimModernRow(row) {
        try {
            const unwantedSelector = '[role="progressbar"], progress, [class*="achievement" i], [class*="stats" i], button:not(.manilua-dlc-btn):not(.manilua-btn)';
            row.querySelectorAll(unwantedSelector).forEach(el => {
                try {
                    if (el.classList.contains('manilua-dlc-btn') || 
                        el.classList.contains('manilua-btn') ||
                        el.closest('.manilua-game-title-container')) {
                        return;
                    }
                    el.remove();
                } catch(_) {}
            });
            
            row.querySelectorAll('span, div').forEach(el => {
                if (el.classList.contains('manilua-game-title-container') ||
                    el.classList.contains('manilua-badge') ||
                    el.classList.contains('manilua-playtime-info') ||
                    el.hasAttribute('data-manilua-name-container') ||
                    el.hasAttribute('data-manilua-name-locked') ||
                    el.querySelector('.manilua-game-title-container, .manilua-badge')) {
                    return;
                }
                
                const text = (el.textContent || '').trim().toLowerCase();
                if (text && (text.includes('hour') || text.includes('hora') || 
                            text.includes('last played') || text.includes('última') ||
                            text.includes('achievement') || text.includes('conquista'))) {
                    if (!el.closest('picture') && !el.querySelector('picture, img')) {
                        el.remove();
                    }
                }
            });
        } catch (e) {
            backendLog(`manilua: trimModernRow error: ${e}`);
        }
    }

    function ensureManiluaStyles() {
        try {
            const oldStyle = document.getElementById('manilua-modern-css');
            if (oldStyle) oldStyle.remove();
            
            const style = document.createElement('style');
            style.id = 'manilua-modern-css';
            style.textContent = `
                @keyframes slideInFromLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes pulseGlow {
                    0%, 100% {
                        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), 0 0 0 rgba(103, 193, 245, 0.3);
                    }
                    50% {
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 20px rgba(103, 193, 245, 0.2);
                    }
                }
                
                [data-manilua-modern-row="1"] {
                    display: flex !important;
                    align-items: center !important;
                    gap: 16px !important;
                    padding: 14px 18px !important;
                    background: linear-gradient(90deg, rgba(27, 40, 56, 0.5) 0%, rgba(27, 40, 56, 0.3) 50%, rgba(27, 40, 56, 0.2) 100%) !important;
                    border-radius: 8px !important;
                    margin: 8px 0 !important;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    border: 1px solid rgba(103, 193, 245, 0.2) !important;
                    position: relative !important;
                    overflow: hidden !important;
                    animation: slideInFromLeft 0.4s ease-out !important;
                    will-change: transform, box-shadow !important;
                    contain: layout style paint !important;
                }
                
                [data-manilua-modern-row="1"]::before {
                    content: '' !important;
                    position: absolute !important;
                    left: 0 !important;
                    top: 0 !important;
                    bottom: 0 !important;
                    width: 4px !important;
                    background: linear-gradient(180deg, #a4d007 0%, #75b022 50%, #a4d007 100%) !important;
                    opacity: 0.8 !important;
                    box-shadow: 0 0 10px rgba(164, 208, 7, 0.5) !important;
                    transition: opacity 0.3s ease !important;
                }
                
                [data-manilua-modern-row="1"]:hover {
                    background: linear-gradient(90deg, rgba(45, 66, 89, 0.6) 0%, rgba(45, 66, 89, 0.4) 50%, rgba(45, 66, 89, 0.3) 100%) !important;
                    border-color: rgba(103, 193, 245, 0.5) !important;
                    transform: translateX(6px) scale(1.01) !important;
                    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5), 0 0 30px rgba(103, 193, 245, 0.15) !important;
                }
                
                [data-manilua-modern-row="1"]:hover::before {
                    opacity: 1 !important;
                }
                
                [data-manilua-modern-row="1"] [role="progressbar"],
                [data-manilua-modern-row="1"] progress,
                [data-manilua-modern-row="1"] [class*="achievement"],
                [data-manilua-modern-row="1"] [class*="Achievement"],
                [data-manilua-modern-row="1"] [class*="stats"],
                [data-manilua-modern-row="1"] [class*="Stats"],
                [data-manilua-modern-row="1"] button:not(.manilua-dlc-btn) { 
                    display: none !important;
                }
                
                [data-manilua-modern-row="1"] a[data-manilua-picture="1"] {
                    flex-shrink: 0 !important;
                    width: 184px !important;
                    height: 69px !important;
                    display: block !important;
                    border-radius: 6px !important;
                    overflow: hidden !important;
                    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3) !important;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    position: relative !important;
                }
                
                [data-manilua-modern-row="1"]:hover a[data-manilua-picture="1"] {
                    transform: scale(1.03) translateY(-2px) !important;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(102, 192, 244, 0.2) !important;
                }
                
                [data-manilua-modern-row="1"] a[data-manilua-picture="1"] img,
                [data-manilua-modern-row="1"] a[data-manilua-picture="1"] picture {
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: cover !important;
                    filter: none !important;
                    backdrop-filter: none !important;
                }
                
                [data-manilua-modern-row="1"] a[data-manilua-picture="1"] span,
                [data-manilua-modern-row="1"] a[data-manilua-picture="1"]::after,
                [data-manilua-modern-row="1"] a[data-manilua-picture="1"]::before {
                    display: none !important;
                    content: none !important;
                }
                
                .manilua-game-title-container {
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 8px !important;
                    flex: 1 !important;
                    min-width: 0 !important;
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .manilua-game-title-link {
                    display: block !important;
                    color: #ffffff !important;
                    font-size: 19px !important;
                    font-weight: 700 !important;
                    line-height: 1.3 !important;
                    text-decoration: none !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    cursor: pointer !important;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    word-break: break-word !important;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6), 0 1px 2px rgba(0, 0, 0, 0.8) !important;
                    letter-spacing: 0.3px !important;
                    animation: fadeInUp 0.5s ease-out 0.1s both !important;
                }
                
                .manilua-game-title-link:hover {
                    color: #66c0f4 !important;
                    text-shadow: 0 0 16px rgba(102, 192, 244, 0.6), 0 2px 4px rgba(0, 0, 0, 0.6) !important;
                    transform: translateX(2px) !important;
                }
                
                [data-manilua-name-locked="1"],
                [data-manilua-name-container="1"] {
                    opacity: 1 !important;
                    visibility: visible !important;
                }
                
                @keyframes shimmer {
                    0% {
                        background-position: -200% center;
                    }
                    100% {
                        background-position: 200% center;
                    }
                }
                
                [data-manilua-modern-row="1"] .manilua-badge {
                    display: inline-flex !important;
                    align-items: center !important;
                    gap: 4px !important;
                    padding: 5px 12px !important;
                    font-size: 10px !important;
                    font-weight: 800 !important;
                    line-height: 1 !important;
                    color: #b8e929 !important;
                    background: linear-gradient(135deg, 
                        rgba(117, 176, 34, 0.3) 0%, 
                        rgba(164, 208, 7, 0.25) 50%, 
                        rgba(117, 176, 34, 0.2) 100%) !important;
                    border: 1.5px solid rgba(164, 208, 7, 0.6) !important;
                    border-radius: 5px !important;
                    letter-spacing: 0.08em !important;
                    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7), 0 0 8px rgba(164, 208, 7, 0.4) !important;
                    text-transform: uppercase !important;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    width: fit-content !important;
                    box-shadow: 0 2px 8px rgba(117, 176, 34, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
                    position: relative !important;
                    overflow: hidden !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    z-index: 10 !important;
                    animation: fadeInUp 0.6s ease-out 0.2s both !important;
                }
                
                [data-manilua-modern-row="1"] .manilua-badge::before {
                    content: '' !important;
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    background: linear-gradient(90deg, 
                        transparent 0%, 
                        rgba(255, 255, 255, 0.3) 50%, 
                        transparent 100%) !important;
                    background-size: 200% 100% !important;
                    animation: shimmer 3s linear infinite !important;
                    opacity: 0 !important;
                    transition: opacity 0.3s ease !important;
                }
                
                [data-manilua-modern-row="1"]:hover .manilua-badge {
                    background: linear-gradient(135deg, 
                        rgba(117, 176, 34, 0.4) 0%, 
                        rgba(164, 208, 7, 0.35) 50%, 
                        rgba(117, 176, 34, 0.3) 100%) !important;
                    border-color: rgba(164, 208, 7, 0.8) !important;
                    box-shadow: 0 0 16px rgba(117, 176, 34, 0.5), 
                                0 2px 10px rgba(117, 176, 34, 0.4), 
                                inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
                    transform: translateY(-2px) scale(1.02) !important;
                    color: #d4ff4d !important;
                }
                
                [data-manilua-modern-row="1"]:hover .manilua-badge::before {
                    opacity: 1 !important;
                }
                
                [data-manilua-modern-row="1"] .manilua-playtime-info {
                    display: flex !important;
                    align-items: center !important;
                    gap: 10px !important;
                    font-size: 12px !important;
                    color: rgba(255, 255, 255, 0.7) !important;
                    font-weight: 400 !important;
                    animation: fadeInUp 0.7s ease-out 0.3s both !important;
                    padding: 4px 0 !important;
                }
                
                [data-manilua-modern-row="1"] .manilua-playtime-info .separator {
                    color: rgba(103, 193, 245, 0.6) !important;
                    font-weight: 700 !important;
                    font-size: 10px !important;
                    text-shadow: 0 0 8px rgba(103, 193, 245, 0.3) !important;
                }
                
                [data-manilua-modern-row="1"] .manilua-playtime-info .playtime {
                    font-weight: 700 !important;
                    color: rgba(255, 255, 255, 0.9) !important;
                    background: linear-gradient(90deg, rgba(103, 193, 245, 0.15), transparent) !important;
                    padding: 2px 8px !important;
                    border-radius: 3px !important;
                    border-left: 2px solid rgba(103, 193, 245, 0.5) !important;
                }
                
                [data-manilua-modern-row="1"] .manilua-playtime-info .last-session {
                    font-style: italic !important;
                    color: rgba(255, 255, 255, 0.6) !important;
                    transition: color 0.2s ease !important;
                }
                
                [data-manilua-modern-row="1"]:hover .manilua-playtime-info .last-session {
                    color: rgba(255, 255, 255, 0.75) !important;
                }
            `;
            document.head.appendChild(style);
        } catch (e) {
            backendLog(`manilua: ensureManiluaStyles error: ${e}`);
        }
    }

    class AppState {
        constructor() {
            this.logs = { missingOnce: false, existsOnce: false };
            this.run = { inProgress: false, appid: null };
            this.apiKey = { hasKey: false, maskedKey: '', checked: false };
            this.cache = new Map();
        }

        setRunState(inProgress, appid = null) {
            this.run = { inProgress, appid };
        }

        setApiKey(status) {
            Object.assign(this.apiKey, status);
        }

        cacheResult(key, value, ttl = 30000) {
            this.cache.set(key, { value, expires: Date.now() + ttl });
        }

        getCached(key) {
            const cached = this.cache.get(key);
            if (cached && Date.now() < cached.expires) {
                return cached.value;
            }
            this.cache.delete(key);
            return null;
        }
    }

    const state = new AppState();
    const inFlightAppExists = new Map();
    let addButtonScheduleTimer = null;
    function scheduleAddmaniluaButton(delay) {
        if (addButtonScheduleTimer) return;
        let actualDelay = typeof delay === 'number' ? delay : (250 + Math.floor(Math.random() * 351));
        addButtonScheduleTimer = setTimeout(() => {
            addButtonScheduleTimer = null;
            try { addmaniluaButton(); } catch (e) { backendLog(`scheduleAddmaniluaButton error: ${e}`); }
        }, actualDelay);
    }

    // Simple persistent cache using localStorage with TTL
    function persistSet(key, value, ttlMs) {
        try {
            const payload = { v: value, e: Date.now() + (ttlMs || 0) };
            localStorage.setItem(`manilua:${key}`, JSON.stringify(payload));
        } catch (_) {}
    }
    function persistGet(key) {
        try {
            const raw = localStorage.getItem(`manilua:${key}`);
            if (!raw) return null;
            const payload = JSON.parse(raw);
            if (payload && typeof payload === 'object') {
                if (!payload.e || Date.now() < payload.e) return payload.v;
            }
            localStorage.removeItem(`manilua:${key}`);
        } catch (_) {}
        return null;
    }

    function persistDelete(key) {
        try { localStorage.removeItem(`manilua:${key}`); } catch (_) {}
    }

    function invalidateLocalLibraryCache({ rerender } = { rerender: true }) {
        try {
            state.cache.delete('localLibraryApps');
            persistDelete('localLibraryApps');
			const oldNativeRows = document.getElementById('manilua-local-rows');
			if (oldNativeRows && oldNativeRows.parentNode) oldNativeRows.parentNode.removeChild(oldNativeRows);
			const oldBlock = document.getElementById('manilua-local-library');
			if (oldBlock && oldBlock.parentNode) oldBlock.parentNode.removeChild(oldBlock);
			const looseRows = document.querySelectorAll('.manilua-local-row');
			looseRows.forEach(r => r.remove());
			const modernRows = document.querySelectorAll('[data-manilua-modern-row="1"]');
			modernRows.forEach(r => r.remove());
		} catch (_) {}
        if (rerender) reRenderLocalLibraryUI();
    }

    function reRenderLocalLibraryUI() {
        try {
			const wrap = document.getElementById('manilua-local-library');
			if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
			const rows = document.getElementById('manilua-local-rows');
			if (rows && rows.parentNode) rows.parentNode.removeChild(rows);
			const looseRows = document.querySelectorAll('.manilua-local-row');
			looseRows.forEach(r => r.remove());
			const modernRows = document.querySelectorAll('[data-manilua-modern-row="1"]');
			modernRows.forEach(r => r.remove());
        } catch (_) {}
        setTimeout(() => {
			try { renderLocalLibrarySection(); } catch (_) {}
            updateCountsFromLocalLibrary();
        }, 50);
    }

    function applyLocalLibraryDelta(appId, op /* 'add'|'remove' */) {
        try {
            let apps = persistGet('localLibraryApps') || state.getCached('localLibraryApps') || [];
            if (!Array.isArray(apps)) apps = [];
            const id = Number(appId);
            if (Number.isFinite(id)) {
                if (op === 'add') {
                    if (!apps.includes(id)) apps.push(id);
                } else if (op === 'remove') {
                    apps = apps.filter(x => x !== id);
                }
            }
            state.cacheResult('localLibraryApps', apps, 5 * 60 * 1000);
            persistSet('localLibraryApps', apps, 6 * 60 * 60 * 1000);
            reRenderLocalLibraryUI();
        } catch (_) {}
    }

    function ensureStyles() {
        if (!document.getElementById('manilua-styles')) {
            const style = document.createElement('style');
            style.id = 'manilua-styles';
            style.textContent = `
                :root {
                    --steam-bg-modal: linear-gradient(to bottom, #1b2838 0%, #16202d 100%);
                    --steam-bg-header: #1b2838;
                    --steam-bg-progress: #0e1419;
                    --steam-btn-primary: linear-gradient(to right, #75b022 5%, #588a1a 95%);
                    --steam-btn-primary-hover: linear-gradient(to right, #8bc53f 5%, #75b022 95%);
                    --steam-btn-primary-active: linear-gradient(to right, #5e8e1a 5%, #4d7615 95%);
                    --steam-btn-secondary: linear-gradient(to right, #3d4450 5%, #2a475e 95%);
                    --steam-btn-secondary-hover: linear-gradient(to right, #4e5d6f 5%, #3d5875 95%);
                    --steam-border: #3d4450;
                    --steam-border-btn: #5d8a1e;
                    --steam-border-light: #67c1f5;
                    --steam-text-primary: #c7d5e0;
                    --steam-text-secondary: #8b929a;
                    --steam-text-muted: #acb2b8;
                    --steam-font: "Motiva Sans", Arial, Helvetica, sans-serif;
                    --steam-shadow: 0 0 30px rgba(0, 0, 0, 0.9);
                    --steam-shadow-btn: 0 0 3px rgba(0, 0, 0, 0.5);
                    --steam-shadow-hover: 0 0 8px rgba(0, 0, 0, 0.6);
                    --steam-radius: 3px;
                }

                .manilua-remove-btn {
                    background: linear-gradient(to right, #a12e2e 5%, #7d1f1f 95%) !important;
                    border: 1px solid #a12e2e !important;
                    color: #fff !important;
                }

                .manilua-remove-btn:hover {
                    background: linear-gradient(to right, #c94141 5%, #a12e2e 95%) !important;
                    border-color: #c94141 !important;
                    box-shadow: 0 0 8px rgba(169, 46, 46, 0.5) !important;
                }

                .manilua-overlay {
                    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.9);
                    backdrop-filter: blur(4px); z-index: 99999; display: flex;
                    align-items: center; justify-content: center;
                    animation: fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .manilua-modal {
                    background: var(--steam-bg-modal); border: 1px solid var(--steam-border);
                    box-shadow: var(--steam-shadow); font-family: var(--steam-font);
                    animation: modalSlideIn 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                    width: min(90vw, 500px); max-width: 600px; max-height: 80vh;
                    overflow-y: auto; position: relative; border-radius: var(--steam-radius);
                }
                .manilua-header {
                    background: var(--steam-bg-header); border-bottom: 1px solid var(--steam-border);
                    padding: 16px 20px; display: flex; align-items: center; justify-content: space-between;
                    border-radius: var(--steam-radius) var(--steam-radius) 0 0;
                }
                .manilua-title { 
                    color: var(--steam-text-primary); font-size: 15px; font-weight: 600; 
                    letter-spacing: 0.3px; text-transform: uppercase;
                }
                .manilua-close {
                    color: var(--steam-text-secondary); cursor: pointer; font-size: 24px;
                    padding: 4px 8px; user-select: none; transition: all 0.2s ease;
                    line-height: 1; opacity: 0.7;
                }
                .manilua-close:hover { color: #FFFFFF; opacity: 1; transform: scale(1.1); }
                .manilua-content { padding: 20px 24px 24px 24px; }

                .manilua-btn {
                    border-radius: var(--steam-radius); cursor: pointer; font-size: 13px; 
                    font-family: var(--steam-font); font-weight: 400; letter-spacing: 0.3px;
                    height: 34px; padding: 0 18px; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
                    text-align: center; outline: none; display: inline-flex; align-items: center; 
                    justify-content: center; gap: 6px; margin: 0; text-decoration: none; min-width: 0;
                    position: relative; overflow: hidden;
                }
                .manilua-btn-primary {
                    background: var(--steam-btn-primary); border: 1px solid var(--steam-border-btn);
                    color: #FFFFFF; box-shadow: var(--steam-shadow-btn); text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
                }
                .manilua-btn-primary:hover {
                    background: var(--steam-btn-primary-hover); border-color: #a4d007;
                    box-shadow: 0 0 12px rgba(117, 176, 34, 0.4);
                }
                .manilua-btn-primary:active {
                    background: var(--steam-btn-primary-active); 
                    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                }
                .manilua-btn-secondary {
                    background: var(--steam-btn-secondary); border: 1px solid var(--steam-border);
                    color: var(--steam-text-primary); box-shadow: var(--steam-shadow-btn);
                }
                .manilua-btn-secondary:hover {
                    background: var(--steam-btn-secondary-hover); border-color: var(--steam-border-light);
                    color: #FFFFFF; box-shadow: 0 0 10px rgba(103, 193, 245, 0.3);
                }

                /* Outline variant for secondary actions like DLC */
                .manilua-btn-outline {
                    background: rgba(27, 40, 56, 0.6); border: 1px solid rgba(103, 193, 245, 0.3);
                    color: var(--steam-text-primary); backdrop-filter: blur(4px);
                }
                .manilua-btn-outline:hover {
                    background: rgba(45, 66, 89, 0.8); border-color: rgba(103, 193, 245, 0.6);
                    color: #FFFFFF; box-shadow: 0 0 12px rgba(103, 193, 245, 0.3);
                }
                .manilua-dlc-btn { display: inline-flex; align-items: center; gap: 6px; height: 34px; }
                .manilua-dlc-btn::before { content: '+'; font-weight: 700; opacity: 0.85; font-size: 16px; }

                /* Inline action group beside Steam purchase buttons */
                .manilua-actions-inline, .manilua-dlc-button-container, .manilua-button-container {
                    display: inline-flex; align-items: center; gap: 8px; margin-left: 8px;
                }

                .manilua-status {
                    font-size: 14px; line-height: 1.5; margin-bottom: 14px; color: var(--steam-text-primary);
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); min-height: 20px;
                    font-weight: 400;
                }
                .manilua-progress {
                    background: var(--steam-bg-progress); border: 1px solid rgba(103, 193, 245, 0.2);
                    height: 20px; border-radius: var(--steam-radius); overflow: hidden; 
                    margin-bottom: 14px; position: relative;
                    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
                }
                .manilua-progress-bar {
                    height: 100%; 
                    width: 0%; 
                    background: linear-gradient(to right, #75b022 0%, #a4d007 100%);
                    transition: background 0.4s ease, box-shadow 0.4s ease; 
                    position: relative; 
                    overflow: hidden;
                    box-shadow: 0 0 10px rgba(117, 176, 34, 0.5);
                    will-change: width;
                }
                .manilua-progress-bar::after {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(45deg,
                        transparent 25%, rgba(255,255,255,0.15) 25%,
                        rgba(255,255,255,0.15) 50%, transparent 50%,
                        transparent 75%, rgba(255,255,255,0.15) 75%);
                    background-size: 30px 30px;
                    animation: progressStripes 1.2s linear infinite;
                }
                .manilua-progress-details {
                    display: flex; justify-content: space-between; align-items: center;
                    font-size: 11px; color: var(--steam-text-secondary); margin-bottom: 8px;
                }
                .manilua-downloaded { color: var(--steam-text-muted); }
                .manilua-speed { color: var(--steam-text-muted); }
                .manilua-eta { color: var(--steam-text-muted); }

                @keyframes progressStripes {
                    0% { background-position: 0 0; }
                    100% { background-position: 30px 0; }
                }

                .manilua-endpoints {
                    margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap;
                    animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes modalSlideIn {
                    from { 
                        opacity: 0; 
                        transform: scale(0.95) translateY(-15px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: scale(1) translateY(0); 
                    }
                }

                @keyframes slideInUp {
                    from { 
                        opacity: 0; 
                        transform: translateY(15px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }

                .manilua-input {
                    background: #0e1419; border: 1px solid var(--steam-border); 
                    border-radius: var(--steam-radius); color: var(--steam-text-primary); 
                    font-family: var(--steam-font); padding: 10px 14px; font-size: 14px; 
                    width: 100%; box-sizing: border-box; 
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
                }
                .manilua-input:focus { 
                    outline: none; 
                    border-color: var(--steam-border-light); 
                    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4), 
                                0 0 0 2px rgba(103, 193, 245, 0.2);
                }
                .manilua-input::placeholder { color: var(--steam-text-muted); opacity: 0.6; }

                /* Profile list styling to match Steam */
                .manilua-profile-list { padding: 10px 0; }
                .manilua-row {
                    display: grid; grid-template-columns: 184px 1fr; gap: 14px;
                    align-items: center; padding: 12px; margin: 0 8px 10px 8px;
                    background: rgba(27, 40, 56, 0.4); border: 1px solid rgba(61, 68, 80, 0.6);
                    border-radius: var(--steam-radius);
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    backdrop-filter: blur(2px);
                }
                .manilua-row:hover { 
                    background: rgba(45, 66, 89, 0.5); 
                    border-color: rgba(103, 193, 245, 0.4);
                    transform: translateX(2px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                }
                .manilua-row-left { 
                    width: 184px; height: 69px; display: flex; 
                    align-items: center; justify-content: center; 
                    background: #0e1419; border: 1px solid rgba(61, 68, 80, 0.5);
                    border-radius: var(--steam-radius); overflow: hidden;
                }
                .manilua-row-left img { max-width: 184px; max-height: 69px; display: block; }
                .manilua-row-title { 
                    color: var(--steam-text-primary); font-size: 15px; 
                    line-height: 1.3; margin-bottom: 6px; font-weight: 500;
                }
                .manilua-row-meta { 
                    color: var(--steam-text-secondary); font-size: 12px; 
                    margin-bottom: 8px; opacity: 0.9;
                }
                .manilua-row-actions { display: flex; gap: 8px; flex-wrap: wrap; }
                .manilua-row-actions .manilua-btn { 
                    padding: 6px 12px; font-size: 12px; height: 28px;
                }

                /* Special profile decorations */
                .manilua-yt-tag {
                    color: #ff4444;
                    font-weight: 600;
                    margin-right: 6px;
                    text-shadow: 0 0 8px rgba(255, 68, 68, 0.6);
                }
                .manilua-red-tag {
                    color: #ff4444;
                    font-weight: 600;
                    margin-right: 6px;
                    text-shadow: 0 0 8px rgba(255, 68, 68, 0.6);
                }
                .manilua-gold-breath {
                    color: #ffcc44;
                    text-shadow: 0 0 8px rgba(255, 204, 68, 0.7), 0 0 16px rgba(255, 204, 68, 0.4);
                    animation: maniluaBreath 2.8s ease-in-out infinite;
                    font-weight: 600;
                }
                .manilua-gold-tag { 
                    color: #ffcc44; 
                    font-weight: 600; 
                    margin-right: 6px;
                    text-shadow: 0 0 8px rgba(255, 204, 68, 0.6);
                }
                @keyframes maniluaBreath {
                    0% { 
                        filter: brightness(1); 
                        text-shadow: 0 0 8px rgba(255, 204, 68, 0.7), 0 0 16px rgba(255, 204, 68, 0.4); 
                    }
                    50% { 
                        filter: brightness(1.3); 
                        text-shadow: 0 0 12px rgba(255, 204, 68, 0.9), 0 0 24px rgba(255, 204, 68, 0.6); 
                    }
                    100% { 
                        filter: brightness(1); 
                        text-shadow: 0 0 8px rgba(255, 204, 68, 0.7), 0 0 16px rgba(255, 204, 68, 0.4); 
                    }
                }

                /* Custom scrollbar for Steam-like appearance */
                .manilua-modal::-webkit-scrollbar,
                .manilua-content::-webkit-scrollbar {
                    width: 12px;
                }
                .manilua-modal::-webkit-scrollbar-track {
                    background: rgba(14, 20, 25, 0.6);
                    border-radius: var(--steam-radius);
                }
                .manilua-modal::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #4a5666 0%, #3d4450 100%);
                    border-radius: var(--steam-radius);
                    border: 2px solid rgba(14, 20, 25, 0.6);
                }
                .manilua-modal::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #5d6b7f 0%, #4a5666 100%);
                }

                /* Custom checkbox styling */
                .manilua-checkbox-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin: 6px 0;
                    padding: 8px;
                    background: rgba(27, 40, 56, 0.3);
                    border: 1px solid rgba(61, 68, 80, 0.5);
                    border-radius: var(--steam-radius);
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                }
                .manilua-checkbox-wrapper:hover {
                    background: rgba(45, 66, 89, 0.4);
                    border-color: rgba(103, 193, 245, 0.4);
                    transform: translateX(2px);
                }
                .manilua-checkbox {
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border: 2px solid var(--steam-border);
                    border-radius: 2px;
                    background: #0e1419;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    flex-shrink: 0;
                }
                .manilua-checkbox:hover {
                    border-color: var(--steam-border-light);
                    box-shadow: 0 0 8px rgba(103, 193, 245, 0.3);
                }
                .manilua-checkbox:checked {
                    background: linear-gradient(to right, #75b022 5%, #588a1a 95%);
                    border-color: #75b022;
                    box-shadow: 0 0 10px rgba(117, 176, 34, 0.5);
                }
                .manilua-checkbox:checked::after {
                    content: '✓';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    font-size: 14px;
                    font-weight: bold;
                }
                .manilua-checkbox-label {
                    color: var(--steam-text-primary);
                    font-size: 14px;
                    cursor: pointer;
                    flex: 1;
                }

                /* DLC list container */
                .manilua-dlc-list {
                    max-height: 400px;
                    overflow-y: auto;
                    border: 1px solid var(--steam-border);
                    padding: 8px;
                    background: rgba(14, 20, 25, 0.8);
                    border-radius: var(--steam-radius);
                    margin: 10px 0;
                }
                .manilua-dlc-list::-webkit-scrollbar {
                    width: 10px;
                }
                .manilua-dlc-list::-webkit-scrollbar-track {
                    background: rgba(14, 20, 25, 0.6);
                    border-radius: var(--steam-radius);
                }
                .manilua-dlc-list::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #4a5666 0%, #3d4450 100%);
                    border-radius: var(--steam-radius);
                }
                .manilua-dlc-list::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #5d6b7f 0%, #4a5666 100%);
                }

                /* Loading spinner */
                .manilua-spinner {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border: 3px solid rgba(103, 193, 245, 0.3);
                    border-radius: 50%;
                    border-top-color: #67c1f5;
                    animation: maniluaSpin 0.8s linear infinite;
                }
                @keyframes maniluaSpin {
                    to { transform: rotate(360deg); }
                }

                /* Disabled button state */
                .manilua-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    filter: grayscale(0.3);
                }
                .manilua-btn:disabled:hover {
                    transform: none;
                    box-shadow: var(--steam-shadow-btn);
                }

                /* Info messages */
                .manilua-info-message {
                    background: rgba(27, 40, 56, 0.6);
                    border: 1px solid rgba(103, 193, 245, 0.3);
                    border-radius: var(--steam-radius);
                    padding: 12px 16px;
                    margin-bottom: 14px;
                    color: var(--steam-text-primary);
                    font-size: 14px;
                    line-height: 1.5;
                    backdrop-filter: blur(4px);
                }

                /* Success message */
                .manilua-success-message {
                    background: rgba(117, 176, 34, 0.15);
                    border: 1px solid rgba(117, 176, 34, 0.4);
                    border-radius: var(--steam-radius);
                    padding: 12px 16px;
                    margin-bottom: 14px;
                    color: #a4d007;
                    font-size: 14px;
                    line-height: 1.5;
                }

                /* Error message */
                .manilua-error-message {
                    background: rgba(169, 46, 46, 0.15);
                    border: 1px solid rgba(169, 46, 46, 0.4);
                    border-radius: var(--steam-radius);
                    padding: 12px 16px;
                    margin-bottom: 14px;
                    color: #ff6b6b;
                    font-size: 14px;
                    line-height: 1.5;
                }

                /* Add subtle glow effect to primary actions */
                .manilua-btn-primary::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
                    border-radius: var(--steam-radius);
                    pointer-events: none;
                }

                /* Smooth transitions for all interactive elements */
                .manilua-btn, .manilua-checkbox, .manilua-input, .manilua-row {
                    will-change: transform, box-shadow, background;
                }

                /* Playtime and last session styling for profile pages */
                .gameListRowHours, .gameListRowLastPlayed {
                    transition: color 0.2s ease;
                }
                .manilua-local-row .gameListRowHours {
                    font-weight: 500;
                }
                .manilua-local-row .gameListRowLastPlayed {
                    font-size: 12px;
                }
                
            `;
            document.head.appendChild(style);
        }
    }

    function createModal(options = {}) {
        const overlay = document.createElement('div');
        overlay.className = `manilua-overlay ${options.overlayClass || ''}`;

        const modal = document.createElement('div');
        modal.className = 'manilua-modal';
        modal.style.width = options.width || '400px';

        const header = document.createElement('div');
        header.className = 'manilua-header';

        const title = document.createElement('div');
        title.className = 'manilua-title';
        title.textContent = options.title || 'manilua';

        const closeBtn = document.createElement('div');
        closeBtn.className = 'manilua-close';
        closeBtn.innerHTML = '×';
        closeBtn.onclick = () => overlay.remove();

        const content = document.createElement('div');
        content.className = 'manilua-content';

        header.append(title, closeBtn);
        modal.append(header, content);
        overlay.appendChild(modal);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });

        return { overlay, modal, header, title, closeBtn, content };
    }

    function createButton(text, className = 'manilua-btn-primary', onClick = null) {
        const btn = document.createElement('button');
        btn.className = `manilua-btn ${className}`;
        btn.textContent = text;
        if (onClick) btn.onclick = onClick;
        return btn;
    }

    function createProgressBar() {
        const wrap = document.createElement('div');
        wrap.className = 'manilua-progress';
        wrap.style.display = 'none';

        const bar = document.createElement('div');
        bar.className = 'manilua-progress-bar';
        wrap.appendChild(bar);

        const percent = document.createElement('div');
        percent.className = 'manilua-percent';
        percent.textContent = '0%';
        percent.style.display = 'none';

        const details = document.createElement('div');
        details.className = 'manilua-progress-details';
        details.style.display = 'none';
        const downloadedEl = document.createElement('div');
        downloadedEl.className = 'manilua-downloaded';
        downloadedEl.style.display = 'none';
        const speedEl = document.createElement('div');
        speedEl.className = 'manilua-speed';
        const etaEl = document.createElement('div');
        etaEl.className = 'manilua-eta';
        details.appendChild(downloadedEl);
        details.appendChild(speedEl);
        details.appendChild(etaEl);

        return { wrap, bar, percent, details, downloadedEl, speedEl, etaEl };
    }

    function updateProfileGamesCounts(localCount) {
        try {
            const anchors = Array.from(document.querySelectorAll('a[href*="/games"], a[href*="games"]'))
                .filter(a => a.href && (a.href.includes('tab=all') || a.href.includes('tab=recent') || a.querySelector('.profile_count_link_total')));
            anchors.forEach(a => {
                try {
                    const totalEl = a.querySelector('.profile_count_link_total');
                    let currentFromSpan = null;
                    if (totalEl) {
                        const n = parseInt((totalEl.textContent || '').replace(/[^0-9]/g, ''));
                        if (Number.isFinite(n)) currentFromSpan = n;
                    }

                    const text = a.textContent || '';
                    const m = text.match(/\((\d+)\)/);
                    const curFromText = m ? parseInt(m[1]) : null;

                    const cur = Number.isFinite(currentFromSpan) ? currentFromSpan : (Number.isFinite(curFromText) ? curFromText : 0);
                    const newCount = Math.max(cur, localCount || 0);
                    if (!Number.isFinite(newCount)) return;

                    if (totalEl) {
                        totalEl.textContent = String(newCount);
                    } else {
                        if (m) {
                            const updated = text.replace(/\((\d+)\)/, `(${newCount})`);
                            if (updated !== text) a.textContent = updated;
                        } else {
                            a.textContent = `${text} (${newCount})`;
                        }
                    }
                } catch(_) {}
            });
        } catch (e) {
            backendLog(`updateProfileGamesCounts error: ${e}`);
        }
    }

    async function updateCountsFromLocalLibrary() {
        try {
            const cached = state.getCached('localLibraryApps') || persistGet('localLibraryApps');
            let count = Array.isArray(cached) ? cached.length : null;
            if (count === null) {
                const res = await ApiManager.call('GetLocalLibrary');
                const apps = Array.isArray(res?.apps) ? res.apps : [];
                state.cacheResult('localLibraryApps', apps, 5 * 60 * 1000);
                persistSet('localLibraryApps', apps, 6 * 60 * 60 * 1000);
                count = apps.length;
            }
            updateProfileGamesCounts(count);
        } catch (e) {}
    }

    function getSteamLanguageCode() {
        return (_LOCALE === 'pt-BR') ? 'brazilian' : 'english';
    }

	function isProfileGamesTab() {
		try {
			return /steamcommunity\.com\/profiles\/.+\/games\/?\?tab=(all|recent)/i.test(location.href) || document.querySelector('#all_games') || document.querySelector('#gameslist_container') || document.querySelector('[data-featuretarget="gameslist-root"]');
		} catch (_) { return false; }
	}

	function formatHoursFromMinutes(mins) {
		try {
			const m = Number(mins);
			if (!Number.isFinite(m) || m <= 0) return null;
			const h = m / 60;
			const rounded = Math.round(h * 10) / 10;
			const unit = (_LOCALE === 'pt-BR') ? 'horas' : 'hours';
			return `${rounded.toFixed(1)} ${unit}`;
		} catch (_) { return null; }
	}

	function formatLastSession(timestamp) {
		try {
			if (!timestamp) return t('lastsession.never');
			const lastPlayed = new Date(timestamp);
			if (isNaN(lastPlayed.getTime())) return t('lastsession.never');
			
			const now = new Date();
			const diffMs = now - lastPlayed;
			const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
			
			if (diffDays === 0) return t('lastsession.today');
			if (diffDays === 1) return t('lastsession.yesterday');
			if (diffDays < 30) return t('lastsession.days_ago', { days: diffDays });
			
			// Format date for older sessions
			const day = lastPlayed.getDate();
			const month = lastPlayed.getMonth() + 1;
			const year = lastPlayed.getFullYear();
			return `${day}/${month}/${year}`;
		} catch (_) { return t('lastsession.never'); }
	}
	
	function formatInstallDate(timestamp) {
		try {
			if (!timestamp) return t('install.added');
			const installDate = new Date(timestamp);
			if (isNaN(installDate.getTime())) return t('install.added');
			
			const now = new Date();
			const diffMs = now - installDate;
			const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
			
			if (diffDays === 0) return t('install.today');
			if (diffDays === 1) return t('install.yesterday');
			if (diffDays < 30) return t('install.days_ago', { days: diffDays });
			
			// Format date for older installs
			const day = installDate.getDate();
			const month = installDate.getMonth() + 1;
			const year = installDate.getFullYear();
			return `${day}/${month}/${year}`;
		} catch (_) { return t('install.added'); }
	}

	function waitForIdle(timeout = 60) {
		return new Promise((resolve) => {
			try {
				if (typeof requestIdleCallback === 'function') {
					requestIdleCallback(() => resolve(), { timeout });
					return;
				}
			} catch (_) {}
			setTimeout(() => resolve(), Math.min(100, timeout));
		});
	}

    async function fetchAppMeta(appIds) {
        try {
            const lang = getSteamLanguageCode();
            const names = {};
            const images = {};
            const toFetch = [];

            (appIds || []).forEach((id) => {
                const key = `appMeta_${id}_${lang}`;
                const cached = state.getCached(key) || persistGet(key);
                if (cached && (cached.name || cached.image)) {
                    if (cached.name) names[String(id)] = cached.name;
                    if (cached.image) images[String(id)] = cached.image;
                } else {
                    toFetch.push(id);
                }
            });

            if (toFetch.length > 0) {
                const meta = await ApiManager.call('GetAppNames', { appids: toFetch.slice(0, 60), language: lang });
                if (meta && meta.success) {
                    const ns = meta.names || {};
                    const ims = meta.images || {};
                    Object.keys(ns).forEach(k => { names[k] = ns[k]; });
                    Object.keys(ims).forEach(k => { images[k] = ims[k]; });
                    // cache results per-app for 6 hours
                    const memTtl = 30 * 60 * 1000;
                    const diskTtl = 7 * 24 * 60 * 60 * 1000;
                    toFetch.forEach((id) => {
                        const k = String(id);
                        const key = `appMeta_${id}_${lang}`;
                        state.cacheResult(key, { name: names[k], image: images[k] }, memTtl);
                        persistSet(key, { name: names[k], image: images[k] }, diskTtl);
                    });
                }
            }

            return { names, images };
        } catch (e) {
            backendLog(`fetchAppMeta failed: ${e}`);
            return { names: {}, images: {} };
        }
    }

    let __maniluaSharedIO = null;
    function setupLazyImages(root) {
        try {
            const imgs = Array.from((root || document).querySelectorAll('img[data-src]'));
            if (imgs.length === 0) return;
            if ('IntersectionObserver' in window) {
                if (!__maniluaSharedIO) {
                    __maniluaSharedIO = new IntersectionObserver((entries) => {
                        for (let k = 0; k < entries.length; k++) {
                            const entry = entries[k];
                            if (entry.isIntersecting) {
                                const img = entry.target;
                                try {
                                    const src = img.getAttribute('data-src');
                                    if (src) {
                                        img.src = src;
                                        img.removeAttribute('data-src');
                                    }
                                } catch(_) {}
                                try { __maniluaSharedIO.unobserve(img); } catch(_) {}
                            }
                        }
                    }, { rootMargin: '200px 0px', threshold: 0 });
                }
                imgs.forEach(i => __maniluaSharedIO.observe(i));
            } else {
                imgs.forEach(img => {
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                });
            }
        } catch (e) {
            backendLog(`setupLazyImages error: ${e}`);
        }
    }

    // Helpers for modern list rendering
    function computeImageUrls(appid, metaUrl) {
        try {
            let headerUrl = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/header.jpg`;
            let portraitUrl = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/portrait.png`;
            const capsuleSmall = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/capsule_231x87.jpg`;
            const capsuleLarge = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/capsule_616x353.jpg`;
            const capsuleTiny = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/capsule_184x69.jpg`;
            if (typeof metaUrl === 'string' && metaUrl) {
                if (metaUrl.includes('/portrait')) {
                    portraitUrl = metaUrl;
                    headerUrl = metaUrl.replace('/portrait.png', '/header.jpg');
                } else if (metaUrl.includes('/header')) {
                    headerUrl = metaUrl;
                    portraitUrl = metaUrl.replace('/header.jpg', '/portrait.png');
                }
            }
            return { headerUrl, portraitUrl, capsuleSmall, capsuleLarge, capsuleTiny };
        } catch (_) {
            return {
                headerUrl: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/header.jpg`,
                portraitUrl: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/portrait.png`,
                capsuleSmall: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/capsule_231x87.jpg`,
                capsuleLarge: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/capsule_616x353.jpg`,
                capsuleTiny: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/capsule_184x69.jpg`
            };
        }
    }

    function setModernRowContent(row, appid, name, metaImageUrl) {
        try {
            const anchors = row.querySelectorAll('a[href*="store.steampowered.com/app/"]');
            const newHref = `https://store.steampowered.com/app/${appid}`;
            const finalName = name || `App ${appid}`;
            
            anchors.forEach(a => { 
                a.href = newHref;
                // Se for anchor de texto (sem picture/img), esconde ele (vamos criar nosso próprio)
                if (!a.querySelector('picture') && !a.querySelector('img')) {
                    a.style.display = 'none';
                    a.style.visibility = 'hidden';
                }
            });
            
            if (!row.querySelector('.manilua-game-title-container')) {
                const pictureAnchor = Array.from(anchors).find(a => a.querySelector('picture, img'));
                let insertPoint = pictureAnchor || row.firstChild;
                
                const titleContainer = document.createElement('div');
                titleContainer.className = 'manilua-game-title-container';
                titleContainer.setAttribute('data-manilua-name-container', '1');
                
                const nameLink = document.createElement('a');
                nameLink.href = newHref;
                nameLink.className = 'manilua-game-title-link';
                nameLink.setAttribute('data-manilua-name-locked', '1');
                nameLink.setAttribute('data-manilua-appid', String(appid));
                nameLink.textContent = finalName;
                nameLink.title = finalName;
                
                titleContainer.appendChild(nameLink);
                
                if (insertPoint && insertPoint.nextSibling) {
                    row.insertBefore(titleContainer, insertPoint.nextSibling);
                } else {
                    row.appendChild(titleContainer);
                }
            }

            const picAnchor = Array.from(anchors).find(a => a.querySelector('picture') || a.querySelector('img'));
            if (picAnchor) {
                picAnchor.setAttribute('data-manilua-picture', '1');
                picAnchor.querySelectorAll('span, div').forEach(el => {
                    const hasMedia = el.querySelector('picture, img');
                    if (!hasMedia && !el.classList.contains('manilua-game-title-container')) {
                        el.remove();
                    }
                });
            }

            addManiluaBadge(row);
            if (!isProfileGamesTab()) addDLCButton(row, appid);

            const { headerUrl, portraitUrl, capsuleSmall, capsuleLarge, capsuleTiny } = computeImageUrls(appid, metaImageUrl);
            const imgEl = row.querySelector('picture img') || row.querySelector('img');
            const srcEl = row.querySelector('picture source');
            let appliedFromSample = false;
            
            if (imgEl && (__maniluaSampleImgSrc || __maniluaSampleImgSrcset)) {
                try {
                    if (__maniluaSampleImgSrc) {
                        const newSrc = __maniluaSampleImgSrc.replace(/\/apps\/\d+\//g, `/apps/${appid}/`);
                        imgEl.src = newSrc;
                    }
                    if (__maniluaSampleImgSrcset) {
                        const newSet = __maniluaSampleImgSrcset.replace(/\/apps\/\d+\//g, `/apps/${appid}/`);
                        imgEl.setAttribute('srcset', newSet);
                    }
                    if (__maniluaSampleImgSizes) imgEl.setAttribute('sizes', __maniluaSampleImgSizes);
                    imgEl.setAttribute('loading', 'lazy');
                    imgEl.alt = name || `App ${appid}`;
                    appliedFromSample = true;
                } catch (_) { appliedFromSample = false; }
            }
            
            if (srcEl && __maniluaSampleSourceSrcset) {
                try {
                    const newSrcset = __maniluaSampleSourceSrcset.replace(/\/apps\/\d+\//g, `/apps/${appid}/`);
                    srcEl.setAttribute('srcset', newSrcset);
                } catch (_) {}
            }
            
            if (imgEl && !appliedFromSample) {
                imgEl.setAttribute('loading', 'lazy');
                imgEl.src = capsuleSmall || headerUrl;
                imgEl.alt = name || `App ${appid}`;
                try { imgEl.removeAttribute('srcset'); } catch(_) {}
                try { imgEl.removeAttribute('sizes'); } catch(_) {}
                const ss1 = capsuleSmall || headerUrl;
                const ss2 = capsuleLarge || headerUrl;
                imgEl.setAttribute('srcset', `${ss1} 1x, ${ss2} 2x`);
                imgEl.setAttribute('sizes', '(min-width: 0px) 184px');
            }
            
            if (srcEl && !__maniluaSampleSourceSrcset) srcEl.setAttribute('srcset', `${capsuleSmall}, ${capsuleLarge} 2x`);
            setTimeout(() => ensureCrispImage(row, appid), 0);
            
            if (imgEl) {
                installImageFallback(imgEl, [capsuleSmall, headerUrl, capsuleLarge, capsuleTiny]);
            }
            
        } catch (e) {
            backendLog(`manilua: setModernRowContent ERROR for ${appid}: ${e}`);
        }
    }

    // Fetch precise header_image from Steam API for best quality and apply to our rows
    async function upgradeHeadersForRows(container, ids) {
        try {
            const lang = getSteamLanguageCode();
            const rows = Array.from(container.querySelectorAll('[data-manilua-modern-row="1"]'));
            const appIds = Array.isArray(ids) && ids.length ? ids : rows.map((row) => {
                const a = row.querySelector('a[href*="store.steampowered.com/app/"]');
                const href = a ? a.getAttribute('href') || '' : '';
                const m = href.match(/\/app\/(\d+)/);
                return m ? m[1] : null;
            }).filter(Boolean);
            await Promise.all(appIds.map(async (appid) => {
                try {
                    const url = `https://store.steampowered.com/api/appdetails?appids=${appid}&l=${encodeURIComponent(lang)}`;
                    const resp = await fetch(url, { credentials: 'omit', cache: 'no-cache' });
                    const data = await resp.json().catch(() => null);
                    const rec = data && data[String(appid)] && data[String(appid)].success ? data[String(appid)].data : null;
                    const headerWithT = rec && rec.header_image ? rec.header_image : null;
                    // Apply only to the row(s) matching this appid
                    rows.forEach((row) => {
                        const a = row.querySelector('a[href*="store.steampowered.com/app/"]');
                        const href = a ? a.getAttribute('href') || '' : '';
                        if (!href.includes(`/${appid}`)) return;
                        const img = row.querySelector('picture img') || row.querySelector('img');
                        if (img && !__maniluaSampleImgSrcset) {
                            const small = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/capsule_231x87.jpg`;
                            const large = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/capsule_616x353.jpg`;
                            const tiny = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/capsule_184x69.jpg`;
                            img.src = small;
                            try { img.removeAttribute('srcset'); } catch(_) {}
                            try { img.removeAttribute('sizes'); } catch(_) {}
                            img.setAttribute('srcset', `${small} 1x, ${large} 2x`);
                            img.setAttribute('sizes', '(min-width: 0px) 184px');
                            installImageFallback(img, [small, headerWithT, large, tiny]);
                        }
                        const source = row.querySelector('picture source');
                        if (source) source.setAttribute('srcset', `${small}, ${large} 2x`);
                        setTimeout(() => ensureCrispImage(row, appid), 0);
                    });
                } catch (_) {}
            }));
        } catch (_) {}
    }

    function addGameNameDisplay(row, appid, name) {
        return;
    }
    
    function addManiluaBadge(row) {
        try {
            if (row.querySelector('.manilua-badge')) return;
            
            const titleContainer = row.querySelector('.manilua-game-title-container');
            if (titleContainer) {
                const badge = document.createElement('span');
                badge.className = 'manilua-badge';
                badge.textContent = t('profile.added_via');
                titleContainer.appendChild(badge);
                return;
            }
            
            const titleAnchor = row.querySelector('.manilua-game-title-link');
            if (titleAnchor && titleAnchor.parentElement) {
                const badge = document.createElement('span');
                badge.className = 'manilua-badge';
                badge.textContent = t('profile.added_via');
                titleAnchor.parentElement.appendChild(badge);
            }
        } catch (_) {}
    }

    function addDLCButton(row, appid) {
        try {
            if (isProfileGamesTab()) return;
            if (!row || row.querySelector('.manilua-dlc-btn')) return;
            
            const titleContainer = row.querySelector('.manilua-game-title-container');
            if (titleContainer) {
                const btn = document.createElement('button');
                btn.className = 'manilua-btn manilua-btn-outline manilua-dlc-btn';
                btn.style.marginTop = '4px';
                btn.textContent = t('profile.add_dlc');
                btn.addEventListener('click', () => { try { showDLCModal(appid); } catch(e) { backendLog('dlc modal failed: '+e); } });
                titleContainer.appendChild(btn);
                return;
            }
            
            const btn = document.createElement('button');
            btn.className = 'manilua-btn manilua-btn-outline manilua-dlc-btn';
            btn.textContent = t('profile.add_dlc');
            btn.addEventListener('click', () => { try { showDLCModal(appid); } catch(e) { backendLog('dlc modal failed: '+e); } });
            row.appendChild(btn);
        } catch (_) {}
    }

    // Fetch list of DLCs from RYUU; fallback to Steam store API if unavailable
    async function fetchDLCList(appid) {
        const lang = getSteamLanguageCode();
        // 1) Try RYUU endpoint via backend
        try {
            const res = await ApiManager.call('RyuuListDLCs', { appid });
            if (res && res.success && Array.isArray(res.dlcs) && res.dlcs.length) {
                // Expecting items: { appid, name } or { id, name }
                return res.dlcs.map(x => ({ id: String(x.appid || x.id || x), name: x.name || '' }));
            }
        } catch (_) {}
        // 2) Fallback to Steam appdetails -> dlc ids -> fetch names
        try {
            const base = `https://store.steampowered.com/api/appdetails?appids=${appid}&l=${encodeURIComponent(lang)}`;
            const resp = await fetch(base, { credentials: 'omit', cache: 'no-cache' });
            const data = await resp.json().catch(() => null);
            const d = data && data[String(appid)] && data[String(appid)].success ? data[String(appid)].data : null;
            const dlcIds = Array.isArray(d?.dlc) ? d.dlc.slice(0, 120) : [];
            if (!dlcIds.length) return [];
            // Try backend to resolve names in batch if available
            try {
                const meta = await ApiManager.call('GetAppNames', { appids: dlcIds.slice(0,60), language: lang });
                const names = (meta && meta.names) || {};
                return dlcIds.map(id => ({ id: String(id), name: names[String(id)] || '' }));
            } catch (_) {}
            // Fallback: fetch a few names client-side (limited to 20 for perf)
            const limited = dlcIds.slice(0, 20);
            const items = await Promise.all(limited.map(async (id) => {
                try {
                    const r = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}&l=${encodeURIComponent(lang)}`, { credentials: 'omit', cache: 'no-cache' });
                    const j = await r.json().catch(() => null);
                    const dd = j && j[String(id)] && j[String(id)].success ? j[String(id)].data : null;
                    return { id: String(id), name: dd?.name || String(id) };
                } catch (_) { return { id: String(id), name: String(id) }; }
            }));
            // Include any remaining (no names) if more than 20
            const rest = dlcIds.slice(20).map(id => ({ id: String(id), name: String(id) }));
            return items.concat(rest);
        } catch (_) {
            return [];
        }
    }

    // Ask backend RYUU to add selected DLCs
    async function addDLCsViaRyuu(appid, dlcIds) {
        try {
            const res = await ApiManager.call('RyuuAddDLCs', { appid, dlcids: dlcIds });
            return res || { success: false };
        } catch (e) {
            backendLog(`RyuuAddDLCs failed: ${e}`);
            return { success: false, error: String(e) };
        }
    }

    async function getInstalledDLCs(appid) {
        try {
            const res = await ApiManager.call('RyuuGetInstalledDLCs', { appid });
            const map = (res && res.map) || {};
            return map; // keys as string dlc ids
        } catch (e) {
            return {};
        }
    }

    async function removeDLCsViaRyuu(appid, dlcIds) {
        try {
            const res = await ApiManager.call('RyuuRemoveDLCs', { appid, dlcids: dlcIds });
            return res || { success: false };
        } catch (e) {
            backendLog(`RyuuRemoveDLCs failed: ${e}`);
            return { success: false, error: String(e) };
        }
    }

    // Wait until a given appid download pipeline reaches done/failed
    async function waitForCompletion(appid, timeoutMs = 600000) {
        const start = Date.now();
        while (Date.now() - start < timeoutMs) {
            try {
                const response = await Millennium.callServerMethod('manilua', 'GetStatus', { appid });
                const payload = JSON.parse(response);
                const st = payload?.state || {};
                if (st.status === 'done') return { ok: true };
                if (st.status === 'failed') return { ok: false, error: st.error };
            } catch (_) {}
            await new Promise(r => setTimeout(r, Math.min(500 + (Date.now() - start) / 100, 1500)));
        }
        return { ok: false, error: 'timeout' };
    }

    // Install DLCs one-by-one with a progress modal per DLC showing name and order
    async function installDLCsSequentially(baseAppId, items) {
        for (let i = 0; i < items.length; i++) {
            const { id, name } = items[i];

            // Create a fresh modal for this DLC
            const { overlay, content, title } = createModal({ title: 'manilua', overlayClass: 'manilua-overlay' });
            const header = document.createElement('div');
            header.className = 'manilua-dlc-phase';
            header.style.color = 'var(--steam-text-primary)';
            header.style.marginBottom = '6px';
            header.textContent = t('dlc.installing', { index: i + 1, total: items.length, name: name || String(id) });
            const status = document.createElement('div');
            status.className = 'manilua-status';
            status.textContent = '';
            const { wrap, bar, percent, details } = createProgressBar();
            content.append(header, status, details, wrap, percent);
            document.body.appendChild(overlay);

            // Start backend for this one DLC and monitor
            try { await ApiManager.call('RyuuAddDLCs', { appid: baseAppId, dlcids: [id] }); } catch (_) {}
            try { startProgressMonitoring(id); } catch (_) {}
            const result = await waitForCompletion(id);
            if (!result.ok) {
                try {
                    const stEl = overlay.querySelector('.manilua-status');
                    if (stEl) stEl.textContent = t('dlc.not_found_all');
                } catch(_) {}
                await new Promise(r => setTimeout(r, 1200));
            }
            try { overlay.remove(); } catch (_) {}
            // Small gap between DLCs
            await new Promise(r => setTimeout(r, 300));
        }
    }

    // Modal to list and select DLCs for a given app
    async function showDLCModal(appid) {
        const { overlay, content, title } = createModal({ title: t('dlc.title') });
        const info = document.createElement('div');
        info.className = 'manilua-info-message';
        info.style.display = 'flex';
        info.style.alignItems = 'center';
        info.style.gap = '10px';
        const spinner = document.createElement('div');
        spinner.className = 'manilua-spinner';
        info.appendChild(spinner);
        const infoText = document.createElement('span');
        infoText.textContent = t('dlc.fetching');
        info.appendChild(infoText);
        
        const listWrap = document.createElement('div');
        listWrap.className = 'manilua-dlc-list';
        listWrap.style.display = 'none';
        
        const confirm = createButton(t('dlc.add_selected'), 'manilua-btn-primary');
        confirm.style.marginTop = '10px';
        confirm.disabled = true;
        confirm.style.display = 'none';
        
        content.append(info, listWrap, confirm);
        document.body.appendChild(overlay);

        try {
            const [items, installedMap] = await Promise.all([
                fetchDLCList(appid),
                getInstalledDLCs(appid)
            ]);
            if (!items || items.length === 0) {
                info.className = 'manilua-info-message';
                info.innerHTML = '';
                info.textContent = t('dlc.none');
                return;
            }
            info.style.display = 'none';
            listWrap.style.display = 'block';
            confirm.style.display = 'inline-flex';
            const selected = new Set();
            items.forEach(({ id, name }) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'manilua-checkbox-wrapper';
                
                const cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.className = 'manilua-checkbox';
                cb.value = id;
                cb.id = `manilua-dlc-${id}`;
                cb.addEventListener('change', () => {
                    if (cb.checked) selected.add(id); else selected.delete(id);
                    confirm.disabled = selected.size === 0;
                });
                
                const label = document.createElement('label');
                label.className = 'manilua-checkbox-label';
                label.htmlFor = `manilua-dlc-${id}`;
                label.textContent = name || id;
                
                wrapper.append(cb, label);
                listWrap.appendChild(wrapper);
            });

            confirm.onclick = async () => {
                confirm.disabled = true;
                const ordered = items.filter(it => selected.has(it.id));
                if (!ordered.length) { info.textContent = t('dlc.none'); return; }
                try { overlay.remove(); } catch (_) {}
                try { await installDLCsSequentially(appid, ordered); } catch (_) {}
            };
        } catch (e) {
            info.className = 'manilua-error-message';
            info.innerHTML = '';
            info.textContent = t('dlc.error');
            spinner.remove();
        }
    }

    // Remove stats/achievements/buttons copied from the native row to avoid mismatched data
    function stripStatsFromRow(row) {
        try {
            // Remove any nested buttons (not the row itself)
            row.querySelectorAll('[role="button"]').forEach(el => { if (el !== row) el.remove(); });
            // Remove progress bars
            row.querySelectorAll('[role="progressbar"], progress').forEach(el => { try { el.remove(); } catch(_) {} });
            // Remove common textual blocks related to achievements/menus (Portuguese and English)
            Array.from(row.querySelectorAll('div,span')).forEach(el => {
                const t = (el.textContent || '').trim().toLowerCase();
                if (!t) return;
                if (
                    t.startsWith('conquistas') || t.includes('achievements') ||
                    t.includes('minhas estatísticas') || t.includes('minhas estatisticas') ||
                    t.includes('meu conteúdo do jogo') || t.includes('my game content') ||
                    t.includes('my game stats')
                ) {
                    try { el.remove(); } catch(_) {}
                }
            });
        } catch (_) {}
    }

    // Cleanup only: remove any leftover manilua profile tags (no more adding tags)
    function cleanupManiluaNameTags() {
        try {
            const tags = document.querySelectorAll('.manilua-red-tag, .manilua-yt-tag, .manilua-gold-tag');
            tags.forEach(e => e.remove());
        } catch (_) {}
    }
    
    // Cache de nomes aplicados
    let __maniluaNameCache = new Map();
    
    // Timer de verificação periódica (backup do observer)
    function startNameEnforcementTimer() {
        setInterval(() => {
            __maniluaNameCache.forEach((name, appid) => {
                try {
                    const rows = document.querySelectorAll(`[data-manilua-modern-row="1"]`);
                    rows.forEach(row => {
                        // Verifica anchor
                        const anchor = row.querySelector(`a[data-manilua-appid="${appid}"]`);
                        if (anchor && anchor.textContent !== name) {
                            // Timer corrigindo anchor
                            anchor.textContent = name;
                        }
                        
                        // Verifica display de nome visível
                        const nameDisplay = row.querySelector(`.manilua-game-name[data-appid="${appid}"]`);
                        if (nameDisplay) {
                            if (nameDisplay.textContent !== name) {
                                // Timer corrigindo display
                                nameDisplay.textContent = name;
                            }
                            // Força estilo inline sempre
                            if (nameDisplay.style.color !== 'rgb(255, 255, 255)') {
                                nameDisplay.style.color = '#ffffff';
                                nameDisplay.style.fontWeight = '700';
                                nameDisplay.style.fontSize = '17px';
                            }
                        }
                    });
                } catch(_) {}
            });
        }, 2000); // Verifica a cada 2 segundos
    }
    
    // Observer para reforçar nomes quando Steam sobrescrever
    function enforceGameName(row, appid, name) {
        if (!row || !appid || !name) return;
        __maniluaNameCache.set(String(appid), name);
        
        // Função para aplicar nome (será chamada múltiplas vezes)
        const applyName = () => {
            const textAnchor = Array.from(row.querySelectorAll('a[href*="store.steampowered.com/app/"]'))
                .find(a => !a.querySelector('picture') && !a.querySelector('img'));
            
            if (!textAnchor) return false;
            
            // Já protegido? Pula
            if (textAnchor.getAttribute('data-manilua-name-locked') === '1') {
                return true;
            }
            
            setupAnchorProtection(textAnchor, appid, name);
            return true;
        };
        
        // Aplica imediatamente
        if (!applyName()) return;
        
        // Observa a ROW inteira para detectar quando Steam recriar elementos
        const rowObserver = new MutationObserver(() => {
            // Tenta reaplicar proteção se anchor foi recriado
            applyName();
            
        });
        
        rowObserver.observe(row, {
            childList: true,
            subtree: true
        });
        
        // Row observer instalado
    }
    
    // Função separada para setup de proteção do anchor
    function setupAnchorProtection(textAnchor, appid, name) {
        if (!textAnchor || !appid || !name) return;
        
        // Marca o anchor como protegido
        textAnchor.setAttribute('data-manilua-name-locked', '1');
        textAnchor.setAttribute('data-manilua-appid', String(appid));
        
        // Força o nome imediatamente
        textAnchor.textContent = name;
        
        // PROTEÇÃO AGRESSIVA: Define getter/setter customizado
        try {
            const originalTextContent = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
            Object.defineProperty(textAnchor, 'textContent', {
                get: function() {
                    return name; // SEMPRE retorna nosso nome
                },
                set: function(newValue) {
                    // Só aceita nosso nome ou "App X"
                    if (newValue !== name && newValue !== `App ${appid}`) {
                        // Mudança bloqueada
                        return; // Ignora a tentativa de mudança
                    }
                    originalTextContent.set.call(this, newValue);
                },
                configurable: true
            });
            // Property blocker instalado
        } catch(e) {
            // Property blocker não disponível
        }
        
        // Observer que reaplica o nome se mudar
        let isRestoring = false; // Previne loops infinitos
        const observer = new MutationObserver((mutations) => {
            if (isRestoring) return; // Ignora mutações que nós mesmos causamos
            
            mutations.forEach((mutation) => {
                if (mutation.type === 'characterData' || mutation.type === 'childList') {
                    const currentText = textAnchor.textContent;
                    if (currentText !== name && currentText !== `App ${appid}`) {
                        // Steam sobrescreveu texto, restaurando
                        isRestoring = true;
                        textAnchor.textContent = name;
                        // Reforça os atributos de proteção
                        textAnchor.setAttribute('data-manilua-name-locked', '1');
                        textAnchor.style.pointerEvents = ''; // Garante clicável
                        setTimeout(() => { isRestoring = false; }, 0);
                    }
                }
            });
        });
        
        observer.observe(textAnchor, {
            characterData: true,
            childList: true,
            subtree: true
        });
        
        // Name enforcer instalado
    }

	// Render local library using Steam's native row layout and append to the list
	async function renderLocalLibrarySection() {
		try {
			// Previne múltiplos renders simultâneos
			if (__maniluaRenderInProgress) {
				return;
			}
			__maniluaRenderInProgress = true;
			
			// Garante que o CSS esteja sempre aplicado ANTES de renderizar
			ensureManiluaStyles();
			
			const isGamesTab = isProfileGamesTab();
			if (!isGamesTab) {
				__maniluaRenderInProgress = false;
				return;
			}

			// Do not bail out if classic container exists; modern renderer will clean it up if applicable

			// Always try to refresh from backend first; fallback to cached on failure
			let result = null;
			try { result = await ApiManager.call('GetLocalLibrary'); } catch (_) { result = null; }
			let apps = Array.isArray(result?.apps) ? result.apps : [];
			let installDates = (result && result.install_dates) || {};
			
			if (!apps.length) {
				const cachedApps = state.getCached('localLibraryApps') || persistGet('localLibraryApps');
				const cachedDates = state.getCached('localInstallDates') || persistGet('localInstallDates');
				apps = Array.isArray(cachedApps) ? cachedApps : [];
				installDates = cachedDates || {};
			}
			if (apps.length) {
				state.cacheResult('localLibraryApps', apps, 5 * 60 * 1000);
				persistSet('localLibraryApps', apps, 6 * 60 * 60 * 1000);
				state.cacheResult('localInstallDates', installDates, 10 * 60 * 1000);
				persistSet('localInstallDates', installDates, 12 * 60 * 60 * 1000);
			}

			// Update counters (client-only)
			updateProfileGamesCounts(apps.length);
			if (apps.length === 0) {
				__maniluaRenderInProgress = false;
				return;
			}

			// Prefer modern list rendering when the new games page is detected
			const renderedModern = await (async () => {
				try {
					const root = document.querySelector('[data-featuretarget="gameslist-root"]');
					if (!root) return false;
					// Pick a native row directly to clone the exact modern layout
					const sampleRow = root.querySelector('div[role="button"]');
					if (!sampleRow) return false;
					const innerContainer = sampleRow.parentElement; // holds the rows
					const viewport = innerContainer?.parentElement; // has fixed height style
					if (!innerContainer) return false;
					// Capture native Steam image attributes once to mirror their quality
					try {
						const sImg = sampleRow.querySelector('picture img') || sampleRow.querySelector('img');
						const sSrc = sampleRow.querySelector('picture source');
						if (sImg) {
							const src = sImg.getAttribute('src') || sImg.src;
							if (src) __maniluaSampleImgSrc = src;
							const set = sImg.getAttribute('srcset');
							if (set) __maniluaSampleImgSrcset = set;
							const sizes = sImg.getAttribute('sizes');
							if (sizes) __maniluaSampleImgSizes = sizes;
						}
						if (sSrc) {
							const ss = sSrc.getAttribute('srcset');
							if (ss) __maniluaSampleSourceSrcset = ss;
						}
					} catch(_) {}
					// If we already injected the exact desired count, skip to avoid flicker/duplication
					try {
						const existing = innerContainer.querySelectorAll('[data-manilua-modern-row="1"]').length;
						const want = Math.min(15, (apps && apps.length) ? apps.length : 0);
						if (existing === want && want > 0) return true;
					} catch(_) {}
					// Remove any classic container previously injected
					try { const oldClassic = document.getElementById('manilua-local-rows'); if (oldClassic) oldClassic.remove(); } catch(_) {}
                    // Remove any previously injected rows to prevent duplication
                    innerContainer.querySelectorAll('[data-manilua-modern-row="1"]').forEach(el => el.remove());
                    // Remove old headers
                    try {
                        const oldNativeHeader = innerContainer.querySelector('#manilua-native-header');
                        const oldManiluaHeader = innerContainer.querySelector('#manilua-modern-header');
                        if (oldNativeHeader) oldNativeHeader.remove();
                        if (oldManiluaHeader) oldManiluaHeader.remove();
                    } catch(_) {}

					// Only show the most recent 15 apps
                    const recent = (apps && apps.length) ? apps.slice(0, 15) : [];
                    
                    // CRÍTICO: Buscar nomes ANTES de criar as rows
                    let preloadedNames = {};
                    let preloadedImages = {};
                    try {
                        const meta = await fetchAppMeta(recent);
                        preloadedNames = meta.names || {};
                        preloadedImages = meta.images || {};
                    } catch(e) {
                        backendLog(`manilua: preload metadata error: ${e}`);
                    }
                    
                    const frag = document.createDocumentFragment();
                    // Insert Manilua header before injected rows
                    try {
                        const mh = document.createElement('div');
                        mh.id = 'manilua-modern-header';
                        mh.style.margin = '10px 0 6px 0';
                        mh.style.fontWeight = '600';
                        mh.style.color = 'var(--steam-text-primary, #C6D4DF)';
                        mh.textContent = (_LOCALE === 'pt-BR') ? 'Jogos adicionados pelo Manilua' : 'Manilua games';
                        frag.appendChild(mh);
                    } catch(_) {}
                    for (const appid of recent) {
						// Clone a row template from Steam
						const clone = sampleRow.cloneNode(true);
						
						// CRÍTICO: Remove atributos que o Steam usa para controlar rows
						// Isso desvincula a row do sistema de virtual scrolling do Steam
						clone.removeAttribute('data-panel');
						clone.removeAttribute('data-virtualizer-element');
						clone.removeAttribute('data-index');
						clone.removeAttribute('data-id');
						clone.removeAttribute('aria-posinset');
						clone.removeAttribute('aria-setsize');
						
						// Clonar novamente para remover event listeners
						const cleanClone = clone.cloneNode(true);
						cleanClone.setAttribute('data-manilua-modern-row', '1');
						cleanClone.setAttribute('data-manilua-locked', '1'); // Marca como nossa
						
						// Remove role="button" para evitar interação do Steam
						cleanClone.removeAttribute('role');
						cleanClone.setAttribute('role', 'listitem'); // Muda para listitem
						
						// LIMPA elementos indesejados IMEDIATAMENTE após clonar
						trimModernRow(cleanClone);
						
						// Usa nome pré-carregado e adiciona ao fragment
						const gameName = preloadedNames[String(appid)] || `App ${appid}`;
						const gameImage = preloadedImages[String(appid)] || null;
						setModernRowContent(cleanClone, appid, gameName, gameImage);
						frag.appendChild(cleanClone);
					}

					// Insere todas as rows de uma vez NO INÍCIO (batch DOM operation)
					// Usa prepend para que jogos Manilua apareçam ANTES dos jogos Steam
					if (innerContainer.firstChild) {
						innerContainer.insertBefore(frag, innerContainer.firstChild);
					} else {
						innerContainer.appendChild(frag);
					}
					
					// Adiciona header "Jogos originais da Steam" DEPOIS dos jogos Manilua
					try {
						const firstSteamRow = innerContainer.querySelector('div[role="button"]:not([data-manilua-modern-row])');
						if (firstSteamRow) {
							const hdr = document.createElement('div');
							hdr.id = 'manilua-native-header';
							hdr.style.margin = '20px 0 6px 0';
							hdr.style.fontWeight = '600';
							hdr.style.color = 'var(--steam-text-primary, #C6D4DF)';
							hdr.textContent = (_LOCALE === 'pt-BR') ? 'Jogos originais da Steam' : 'Steam games';
							innerContainer.insertBefore(hdr, firstSteamRow);
						}
					} catch(_) {}
					
					// Segunda limpeza (otimizada)
					const maniluaRows = innerContainer.querySelectorAll('[data-manilua-modern-row="1"]');
					maniluaRows.forEach(trimModernRow);
            // Ensure the viewport accounts for the extra rows so items are visible (defer to idle)
            try {
                waitForIdle(50).then(() => {
                    try {
                        const rowH = Math.ceil(sampleRow.getBoundingClientRect().height || 150);
                        const baseCount = Math.max(1, innerContainer.querySelectorAll('div[role="button"]:not([data-manilua-modern-row])').length);
                        const total = baseCount + recent.length + 1; // +1 header
                        if (viewport && viewport.style) {
                            const h = `${rowH * total}px`;
                            if (viewport.style.height !== h) viewport.style.height = h;
                        }
                    } catch(_) {}
                });
            } catch(_) {}

					// Fetch playtime/session data (names/images already preloaded)
					try {
						const [playResult, sessionResult] = await Promise.all([
							ApiManager.call('GetLocalPlaytimes'),
							ApiManager.call('GetLocalLastSessions')
						]);
						const names = preloadedNames;
						const images = preloadedImages;
						const playMap = (playResult && playResult.map) || {};
						const sessionMap = (sessionResult && sessionResult.map) || {};
						
						// Use cached install dates
						const cachedInstallDates = state.getCached('localInstallDates') || persistGet('localInstallDates') || installDates || {};
						
						// Cache the data
						if (Object.keys(playMap).length) {
							state.cacheResult('localPlaytimes', playMap, 2 * 60 * 1000);
							persistSet('localPlaytimes', playMap, 2 * 60 * 1000);
						}
						if (Object.keys(sessionMap).length) {
							state.cacheResult('localLastSessions', sessionMap, 2 * 60 * 1000);
							persistSet('localLastSessions', sessionMap, 2 * 60 * 1000);
						}
						
						innerContainer.querySelectorAll('[data-manilua-modern-row="1"]').forEach((row) => {
							const anyAnchor = row.querySelector('a[href*="store.steampowered.com/app/"]');
							if (!anyAnchor) return;
							
							const m = anyAnchor.href.match(/\/app\/(\d+)/);
							if (!m) return;
							
							const id = m[1];
							const nm = names[id] || `App ${id}`;
							
							// Add playtime and session info to modern rows
							try {
								// Procura nosso container de título
								const titleContainer = row.querySelector('.manilua-game-title-container');
								if (titleContainer && !row.querySelector('.manilua-playtime-info')) {
									const infoDiv = document.createElement('div');
									infoDiv.className = 'manilua-playtime-info';
									
									// Playtime (only if exists)
									const playMinutes = playMap[id] || playMap[String(id)];
									const playtimeText = formatHoursFromMinutes(playMinutes);
									if (playtimeText) {
										const playtimeSpan = document.createElement('span');
										playtimeSpan.className = 'playtime';
										playtimeSpan.textContent = playtimeText;
										infoDiv.appendChild(playtimeSpan);
										
										// Separator (only if playtime exists)
										const separator = document.createElement('span');
										separator.className = 'separator';
										separator.textContent = '•';
										infoDiv.appendChild(separator);
									}
									
									// Last session or install date
									const sessionTime = sessionMap[id] || sessionMap[String(id)];
									const installTime = cachedInstallDates[id] || cachedInstallDates[String(id)];
									let sessionText = '';
									
									if (sessionTime) {
										sessionText = formatLastSession(sessionTime);
									} else if (installTime) {
										sessionText = formatInstallDate(installTime);
									}
									
									// Only add if we have date info
									if (sessionText && sessionText !== t('lastsession.never')) {
										const sessionSpan = document.createElement('span');
										sessionSpan.className = 'last-session';
										sessionSpan.textContent = sessionText;
										infoDiv.appendChild(sessionSpan);
									}
									
									// Only append if has content
									if (infoDiv.children.length > 0) {
										titleContainer.appendChild(infoDiv);
									}
								}
							} catch (_) {}
						});
						
						// Fallback: fetch directly from Steam API in the browser if we still lack names/images
						const missing = recent.filter(id => !names[String(id)] || !images[String(id)]);
						if (missing.length) {
							try {
								const lang = getSteamLanguageCode();
								await Promise.all(missing.slice(0, 10).map(async (appid) => {
									try {
										const resp = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}&l=${encodeURIComponent(lang)}`, { credentials: 'omit', cache: 'no-cache' });
										const data = await resp.json().catch(() => null);
										if (data && data[String(appid)] && data[String(appid)].success && data[String(appid)].data) {
											const d = data[String(appid)].data;
											const nm2 = d.name;
											const im2 = d.capsule_imagev5 || d.capsule_image || d.header_image;
											innerContainer.querySelectorAll('[data-manilua-modern-row="1"]').forEach((row) => {
												const anchor = row.querySelector('a[href*="store.steampowered.com/app/"]');
												const href = anchor ? anchor.getAttribute('href') || '' : '';
												if (!href.includes(`/${appid}`)) return;
												if (nm2 && anchor) anchor.textContent = nm2;
												if (im2) {
													const img = row.querySelector('img');
													if (img) img.src = im2;
												}
											});
										}
									} catch (_) {}
								}));
								backendLog('manilua: browser fallback meta applied');
							} catch (_) {}
						}
					} catch (_) {}
					
					// Limpeza FINAL: Remove elementos indesejados apenas
					try {
						// Aguarda idle callback ou timeout curto
						await new Promise(resolve => {
							if ('requestIdleCallback' in window) {
								requestIdleCallback(resolve, { timeout: 150 });
							} else {
								setTimeout(resolve, 100);
							}
						});
						
						// Limpeza FINAL (otimizada - uma passada)
						const maniluaRows = innerContainer.querySelectorAll('[data-manilua-modern-row="1"]');
						maniluaRows.forEach(trimModernRow);
					} catch (e) {
						backendLog(`manilua: error in final cleanup: ${e}`);
					}

					setupLazyImages(innerContainer);
					return true;
				} catch (_) {
					return false;
				}
			})();

			if (renderedModern) {
				__maniluaRenderInProgress = false;
				return;
			}
			// If modern root exists but we couldn't render yet, retry a few times and avoid classic fallback
			const modernRootExists = document.querySelector('[data-featuretarget="gameslist-root"]');
			if (modernRootExists) {
				__maniluaRenderInProgress = false;
				try { window.__maniluaModernRetryCount = (window.__maniluaModernRetryCount || 0) + 1; } catch (_) {}
				const tries = window.__maniluaModernRetryCount || 1;
				if (tries <= 10) {
					setTimeout(() => { try { renderLocalLibrarySection(); } catch (_) {} }, 350);
				}
				return;
			}

			// Find or create a dedicated container for manilua rows to avoid duplication with native lists.
			let rowsContainer = document.getElementById('manilua-local-rows');
			if (!rowsContainer) {
				// Try classic owners
				let owner = document.querySelector('#gameslist_content') || document.querySelector('#all_games') || document.querySelector('#gameslist_container') || document.querySelector('#profile_content');
				// Try modern root as fallback
				if (!owner) {
					const modernRoot = document.querySelector('[data-featuretarget="gameslist-root"]');
					owner = modernRoot ? modernRoot.parentElement || modernRoot : null;
				}
				// Try a common content wrapper
				if (!owner) owner = document.querySelector('#responsive_page_template_content') || document.body;
                if (owner) {
                    // Native Steam header, if there is a visible native list container
                    try {
                        const nativeList = owner.querySelector('#gameslist_row_container, [data-featuretarget="gameslist-root"] div[role="button"]');
                        if (nativeList && !owner.querySelector('#manilua-classic-native-header')) {
                            const nh = document.createElement('div');
                            nh.id = 'manilua-classic-native-header';
                            nh.style.margin = '10px 0 6px 0';
                            nh.style.fontWeight = '600';
                            nh.style.color = 'var(--steam-text-primary, #C6D4DF)';
                            nh.textContent = (_LOCALE === 'pt-BR') ? 'Jogos originais da Steam' : 'Steam games';
                            nativeList.parentElement.insertBefore(nh, nativeList);
                        }
                    } catch(_) {}

                    rowsContainer = document.createElement('div');
                    rowsContainer.id = 'manilua-local-rows';
                    // Manilua header before our injected rows
                    try {
                        const header = document.createElement('div');
                        header.id = 'manilua-local-header';
                        header.style.margin = '10px 0 6px 0';
                        header.style.fontWeight = '600';
                        header.style.color = 'var(--steam-text-primary, #C6D4DF)';
                        header.textContent = (_LOCALE === 'pt-BR') ? 'Jogos adicionados pelo Manilua' : 'Manilua games';
                        owner.appendChild(header);
                    } catch(_) {}
                    owner.appendChild(rowsContainer);
                }
			}
			if (!rowsContainer) return;

            // Only show the most recent 15 apps (backend returns newest-first)
            // Clear previous injected rows to prevent duplicates on re-renders
            try {
                // Remove only our rows to avoid nuking unrelated DOM
                const oldRows = rowsContainer.querySelectorAll('.manilua-local-row');
                oldRows.forEach(r => r.remove());
            } catch (_) {}
			const frag = document.createDocumentFragment();
			const recent = (apps && apps.length) ? apps.slice(0, 15) : [];
				recent.forEach((appid) => {
					const row = document.createElement('div');
					row.className = 'gameListRow manilua-local-row';
					row.setAttribute('data-appid', String(appid));

					const logo = document.createElement('div');
					logo.className = 'gameListRowItem gameListRowLogo';
				const logoLink = document.createElement('a');
				logoLink.href = `https://store.steampowered.com/app/${appid}`;
				logoLink.target = '_blank';
				logoLink.rel = 'noopener noreferrer';
				const img = new Image();
				img.alt = '';
				img.setAttribute('data-src', `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/capsule_184x69.jpg`);
				logoLink.appendChild(img);
				logo.appendChild(logoLink);

					const name = document.createElement('div');
                    name.className = 'gameListRowItem gameListRowName ellipsis';
				const link = document.createElement('a');
				link.className = 'gameListRowItemName ellipsis';
				link.href = `https://store.steampowered.com/app/${appid}`;
				link.target = '_blank';
				link.rel = 'noopener noreferrer';
				link.textContent = ''; // Será preenchido antes de inserir no DOM
				link.setAttribute('data-appid', appid); // Para facilitar busca
				const details = document.createElement('div');
				details.className = 'gameListRowItemDetails';
				details.textContent = t('profile.added_via');
				name.appendChild(link);
				name.appendChild(details);

				const hours = document.createElement('div');
				hours.className = 'gameListRowItem gameListRowHours';
				hours.textContent = '';

					const last = document.createElement('div');
					last.className = 'gameListRowItem gameListRowLastPlayed';
					last.textContent = '';

					const clr = document.createElement('br');
					clr.style.clear = 'both';

					row.append(logo, name, hours, last, clr);
					// Add DLC button to classic row (skip on profile games tab)
					try { if (!isProfileGamesTab()) addDLCButton(row, appid); } catch(_) {}
				frag.appendChild(row);
			});

			// Buscar nomes ANTES de inserir no DOM para evitar flash
			backendLog(`manilua: fetching metadata for ${recent.length} apps...`);
			let names = {};
			let images = {};
			try {
                const meta = await fetchAppMeta(recent);
				names = meta.names || {};
				images = meta.images || {};
				backendLog(`manilua: fetched meta for ${Object.keys(names).length} apps`);
			} catch (e) {
				backendLog(`manilua: fetchAppMeta error: ${e}`);
			}
			
			// Aplicar nomes e imagens antes de adicionar ao DOM
			backendLog(`manilua: applying names to ${recent.length} rows, have ${Object.keys(names).length} names`);
			recent.forEach((appid, idx) => {
				try {
					const row = frag.children[idx];
					if (!row) {
						backendLog(`manilua: row ${idx} not found in fragment`);
						return;
					}
					
					const id = String(appid);
					const nm = names[id];
					const im = images[id];
					
					// Atualizar nome (SEMPRE aplica algo, nunca deixa vazio)
					const nameEl = row.querySelector('.gameListRowItemName');
					if (nameEl) {
						const finalName = nm || `App ${id}`;
						nameEl.textContent = finalName;
						backendLog(`manilua: set name for ${id}: "${finalName}"`);
					} else {
						backendLog(`manilua: nameEl not found for ${id}`);
					}
					
					// Atualizar imagem
					if (im) {
						const imgEl = row.querySelector('.gameListRowLogo img');
						if (imgEl) {
							imgEl.setAttribute('data-src', im);
						}
					}
				} catch (e) {
					backendLog(`manilua: error applying name for ${appid}: ${e}`);
					// Em caso de erro, garante que pelo menos o ID aparece
					try {
						const row = frag.children[idx];
						const nameEl = row?.querySelector('.gameListRowItemName');
						if (nameEl && !nameEl.textContent) {
							nameEl.textContent = `App ${appid}`;
						}
					} catch (_) {}
				}
			});
			
			// Agora sim adicionar ao DOM (já com nomes corretos)
			rowsContainer.appendChild(frag);
			
			// Fetch playtime and session data (isolated, won't break name display)
			let playMap = {};
			let sessionMap = {};
			try {
                playMap = state.getCached('localPlaytimes') || persistGet('localPlaytimes') || {};
                sessionMap = state.getCached('localLastSessions') || persistGet('localLastSessions') || {};
                if (!playMap || typeof playMap !== 'object') playMap = {};
                if (!sessionMap || typeof sessionMap !== 'object') sessionMap = {};
                
                const needsRefresh = !Object.keys(playMap).length || !Object.keys(sessionMap).length;
                if (needsRefresh) {
                    try {
                        const [playResult, sessionResult] = await Promise.all([
                            ApiManager.call('GetLocalPlaytimes'),
                            ApiManager.call('GetLocalLastSessions')
                        ]);
                        
                        if (playResult && playResult.success && playResult.map) {
                            playMap = playResult.map;
                            state.cacheResult('localPlaytimes', playMap, 2 * 60 * 1000);
                            persistSet('localPlaytimes', playMap, 2 * 60 * 1000);
                        }
                        
                        if (sessionResult && sessionResult.success && sessionResult.map) {
                            sessionMap = sessionResult.map;
                            state.cacheResult('localLastSessions', sessionMap, 2 * 60 * 1000);
                            persistSet('localLastSessions', sessionMap, 2 * 60 * 1000);
                        }
                    } catch (e) { 
                        backendLog(`manilua: playtime/session fetch error: ${e}`);
                        playMap = {};
                        sessionMap = {};
                    }
                }
			} catch (e) {
				backendLog(`manilua: playtime/session error: ${e}`);
			}
			
			// Apply playtime and session data to rows (names/images already applied)
			try {
				Array.from(document.querySelectorAll('.manilua-local-row')).forEach((row) => {
					const id = row.getAttribute('data-appid');
					if (!id) return;
                    // Apply precise playtime if available (hide if empty)
                    try {
                        const m = playMap && (playMap[id] || playMap[String(id)]);
                        const hoursEl = row.querySelector('.gameListRowHours');
                        if (hoursEl) {
                            const txt = formatHoursFromMinutes(m);
                            if (txt) {
                                hoursEl.textContent = txt;
                                hoursEl.style.color = 'var(--steam-text-primary, #c7d5e0)';
                                hoursEl.style.fontSize = '';
                                hoursEl.style.display = '';
                            } else {
                                // Hide playtime column if no data
                                hoursEl.textContent = '';
                                hoursEl.style.display = 'none';
                            }
                        }
                    } catch (_) {}
                    
                    // Apply last session date if available (use install date if no play session)
                    try {
                        const lastTime = sessionMap && (sessionMap[id] || sessionMap[String(id)]);
                        const installTime = installDates && (installDates[id] || installDates[String(id)]);
                        const lastEl = row.querySelector('.gameListRowLastPlayed');
                        if (lastEl) {
                            let formatted = '';
                            
                            if (lastTime) {
                                // Has play session, show it
                                formatted = formatLastSession(lastTime);
                            } else if (installTime) {
                                // No play session but has install date, show install date
                                formatted = formatInstallDate(installTime);
                            }
                            
                            // Only show if we have actual date data
                            if (formatted && formatted !== t('lastsession.never')) {
                                lastEl.textContent = formatted;
                                lastEl.style.color = 'var(--steam-text-primary, #c7d5e0)';
                                lastEl.style.fontStyle = 'normal';
                                lastEl.style.display = '';
                            } else {
                                // Hide if no data
                                lastEl.textContent = '';
                                lastEl.style.display = 'none';
                            }
                        }
                    } catch (_) {}
				});
			} catch (_) {}

			setupLazyImages(rowsContainer);
		} catch (e) {
			backendLog(`renderLocalLibrarySection error: ${e}`);
		} finally {
			// Sempre reseta a flag, mesmo em caso de erro
			__maniluaRenderInProgress = false;
		}
    }

    class ApiManager {
        static _lastErrorAt = {};
        static _silenced(method) {
            return method === 'GetAPIKeyStatus' || 
                   method === 'GetLocalLibrary' ||
                   method === 'GetLocalPlaytimes' ||
                   method === 'GetLocalLastSessions';
        }
        static _throttleLog(method, ms = 60000) {
            const now = Date.now();
            const last = this._lastErrorAt[method] || 0;
            if (now - last > ms) {
                this._lastErrorAt[method] = now;
                return true;
            }
            return false;
        }
        static async call(method, params = {}) {
            try {
                const response = await Millennium.callServerMethod('manilua', method, params);
                return JSON.parse(response);
            } catch (error) {
                if (this._silenced(method)) {
                    if (this._throttleLog(method)) {
                        backendLog(`API call ${method} failed: ${error}`);
                    }
                    return { success: false, error: String(error) };
                } else {
                backendLog(`API call ${method} failed: ${error}`);
                throw error;
                }
            }
        }

        static async checkAPIKeyStatus() {
            const cached = state.getCached('apiKeyStatus') || persistGet('apiKeyStatus');
            if (cached) return cached;

            try {
                const result = await this.call('GetAPIKeyStatus');
                const status = {
                    hasKey: result.hasKey || false,
                    maskedKey: result.maskedKey || '',
                    isValid: result.isValid,
                    checked: true
                };

                if (result.hasKey && result.isValid === false) {
                    status.hasKey = false;
                    status.maskedKey = '';
                }

                state.setApiKey(status);
                state.cacheResult('apiKeyStatus', status, 60000);
                persistSet('apiKeyStatus', status, 10 * 60 * 1000);
                return status;
            } catch (error) {
                const fallback = { hasKey: false, maskedKey: '', checked: true };
                state.setApiKey(fallback);
                persistSet('apiKeyStatus', fallback, 60 * 1000);
                return fallback;
            }
        }

        static async checkAppExists(appId) {
            const cacheKey = `appExists_${appId}`;
            const cached = state.getCached(cacheKey);
            if (cached !== null) return cached;

            try {
                const result = await this.call('hasluaForApp', { appid: appId });
                const exists = result.success && result.exists;
                state.cacheResult(cacheKey, exists, 120000);
                return exists;
            } catch (error) {
                backendLog(`Error checking app existence: ${error}`);
                return false;
            }
        }
    }

    function showAPIKeyPrompt(appId = null) {
        if (document.querySelector('.manilua-api-overlay')) return;

        const { overlay, content, closeBtn } = createModal({
            title: t('auth.title'),
            width: '500px',
            overlayClass: 'manilua-api-overlay'
        });

        const headerMsg = document.createElement('div');
        headerMsg.className = 'manilua-info-message';
        headerMsg.style.marginBottom = '16px';
        headerMsg.innerHTML = `
            <div style="font-size: 15px; font-weight: 500; margin-bottom: 6px;">${t('auth.require_key')}</div>
            <div style="font-size: 13px; opacity: 0.9; line-height: 1.5;">
                ${t('auth.description')}
            </div>
        `;
        
        const step1 = document.createElement('div');
        step1.style.color = 'var(--steam-text-primary)';
        step1.style.fontSize = '14px';
        step1.style.fontWeight = '500';
        step1.style.marginBottom = '10px';
        step1.textContent = t('auth.step1');
        
        content.appendChild(headerMsg);
        content.appendChild(step1);

        const openSiteBtn = createButton(t('auth.open_site'), 'manilua-btn-primary', () => {
            window.open('https://www.piracybound.com/manilua', '_blank');
        });
        openSiteBtn.style.width = '100%';
        openSiteBtn.style.justifyContent = 'center';

        const step2 = document.createElement('div');
        step2.style.color = 'var(--steam-text-primary)';
        step2.style.fontSize = '14px';
        step2.style.fontWeight = '500';
        step2.style.margin = '20px 0 10px 0';
        step2.textContent = t('auth.step2');

        const apiKeyInput = document.createElement('input');
        apiKeyInput.className = 'manilua-input';
        apiKeyInput.type = 'text';
        apiKeyInput.placeholder = t('auth.input_placeholder');
        apiKeyInput.style.marginBottom = '14px';
        apiKeyInput.addEventListener('input', () => {
            apiKeyInput.style.borderColor = '';
        });

        const saveBtn = createButton(t('auth.save'), 'manilua-btn-primary', async () => {
            const apiKey = apiKeyInput.value.trim();
            if (!apiKey) {
                apiKeyInput.style.borderColor = '#a12e2e';
                apiKeyInput.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(169, 46, 46, 0.3)';
                apiKeyInput.focus();
                return;
            }

            saveBtn.disabled = true;
            const originalText = saveBtn.textContent;
            saveBtn.innerHTML = '<div class="manilua-spinner" style="width: 16px; height: 16px; border-width: 2px;"></div> ' + t('auth.saving');

            try {
                const result = await ApiManager.call('SetAPIKey', { api_key: apiKey });

                if (result.success) {
                    state.setApiKey({ hasKey: true, checked: true });
                    state.cache.delete('apiKeyStatus');
                    overlay.remove();
                    document.removeEventListener('keydown', handleKeydown);
                    backendLog('API key saved successfully');

                    if (appId) {
                        backendLog(`Auto-starting download for app ${appId} after API key setup`);
                        const modal = showDownloadModal();
                        if (modal) {
                            const { status } = modal;
                            status.textContent = t('generic.starting');
                        }

                        ApiManager.call('addViamanilua', { appid: appId })
                            .then((res) => {
                                if (res && res.success) {
                                } else {
                                    backendLog(`Download start error after API key setup: ${(res && res.error) || 'unknown'}`);
                                    if (modal) modal.status.textContent = `${t('generic.error')}: ${(res && res.error) || t('generic.unknown_error')}`;
                                }
                            })
                            .catch((error) => {
                                backendLog(`Download start error after API setup: ${error}`);
                                if (modal) modal.status.textContent = `${t('generic.error')}: ${(error && error.message) || t('generic.unknown_error')}`;
                            });

                        if (modal) {
                            startProgressMonitoring(appId);
                        }
                    }
                } else {
                    throw new Error(result.error || 'Failed to save API key');
                }
            } catch (error) {
                apiKeyInput.style.borderColor = '#a12e2e';
                apiKeyInput.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(169, 46, 46, 0.3)';
                saveBtn.disabled = false;
                saveBtn.innerHTML = originalText;
                backendLog(`Error saving API key: ${error}`);
            }
        });
        saveBtn.style.width = '100%';
        saveBtn.style.justifyContent = 'center';

        content.appendChild(openSiteBtn);
        content.appendChild(step2);
        content.appendChild(apiKeyInput);
        content.appendChild(saveBtn);
        document.body.appendChild(overlay);

        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', handleKeydown);
            }
        };
        document.addEventListener('keydown', handleKeydown);

        closeBtn.onclick = () => {
            overlay.remove();
            document.removeEventListener('keydown', handleKeydown);
        };
    }

    function setSteamTooltip(element, text) {
        element.setAttribute('data-tooltip-text', text);
        element.title = text;
        element.setAttribute('data-panel-tooltip', text);
    }

    function createInLibraryBanner(gameName) {
        const banner = document.createElement('div');
        banner.className = 'game_area_already_owned page_content';
        banner.id = 'manilua-in-library-banner';

        const bannerContent = document.createElement('div');
        bannerContent.className = 'game_area_already_owned_ctn';

        const flag = document.createElement('div');
        flag.className = 'ds_owned_flag ds_flag';
        flag.innerHTML = t('banner.in_library');

        const message = document.createElement('div');
        message.className = 'already_in_library';
        message.textContent = t('banner.already_in_library', { gameName });

        bannerContent.appendChild(flag);
        bannerContent.appendChild(message);
        banner.appendChild(bannerContent);

        return banner;
    }

    function addInLibraryFlag(purchaseSection) {
        if (purchaseSection && !purchaseSection.querySelector('.package_in_library_flag')) {
            const flag = document.createElement('div');
            flag.className = 'package_in_library_flag in_own_library';
            flag.innerHTML = `<span class="icon">☰</span> <span>${t('library.in_library')}</span>`;

            purchaseSection.insertBefore(flag, purchaseSection.firstChild);
        }
    }

    function showDownloadModal() {
        const existingOverlay = document.querySelector('.manilua-overlay');
        if (existingOverlay) {
            // Retorna o modal existente ao invés de criar novo
            return {
                overlay: existingOverlay,
                title: existingOverlay.querySelector('.manilua-title'),
                status: existingOverlay.querySelector('.manilua-status'),
                wrap: existingOverlay.querySelector('.manilua-progress'),
                bar: existingOverlay.querySelector('.manilua-progress-bar'),
                percent: existingOverlay.querySelector('.manilua-percent')
            };
        }

        const { overlay, title, content } = createModal({
            title: 'manilua',
            overlayClass: 'manilua-overlay'
        });

        const status = document.createElement('div');
        status.className = 'manilua-status';
        status.textContent = t('status.working');

        const { wrap, bar, percent, details } = createProgressBar();

        content.append(status, details, wrap, percent);
        document.body.appendChild(overlay);

        return { overlay, title, status, wrap, bar, percent };
    }

    function createEndpointButtons(endpoints, onSelect) {
        const container = document.createElement('div');
        container.className = 'manilua-endpoints';

        endpoints.forEach(endpoint => {
            const btn = createButton(endpoint, 'manilua-btn-primary', () => onSelect(endpoint));
            container.appendChild(btn);
        });

        return container;
    }

    function handleButtonClick(appId, button) {
        state.setRunState(true, appId);

        if (state.apiKey.checked && !state.apiKey.hasKey) {
            button.disabled = false;
            button.textContent = t('btn.add');
            button.style.opacity = '1';
            state.setRunState(false);
            showAPIKeyPrompt(appId);
            return;
        }

        const modal = showDownloadModal();
        if (modal) {
            const { status } = modal;
            status.textContent = t('generic.starting');
        }

        ApiManager.call('addViamanilua', { appid: appId })
            .then((result) => {
                if (!result) {
                    throw new Error('Empty response from server');
                }
                if (result.success) {
                    // Atualiza status do modal
                    if (modal && modal.status) {
                        modal.status.textContent = t('status.checking');
                    }
                } else if (result.requiresNewKey) {
                    if (modal) modal.overlay.remove();
                    state.setApiKey({ hasKey: false, checked: true });
                    showAPIKeyPrompt(appId);
                    button.disabled = false;
                    button.textContent = t('btn.add');
                    button.style.opacity = '1';
                    state.setRunState(false);
                    return;
                } else {
                    const errorMsg = result.error || t('generic.unknown_error');
                    backendLog(`Download failed: ${errorMsg}`);
                    if (modal && modal.status) {
                        modal.status.textContent = `${t('generic.error')}: ${errorMsg}`;
                        modal.status.style.color = '#ff6b6b';
                    }
                    // Fecha modal após 4 segundos em caso de erro
                    setTimeout(() => {
                        if (modal && modal.overlay) modal.overlay.remove();
                    }, 4000);
                    button.disabled = false;
                    button.textContent = t('btn.add');
                    button.style.opacity = '1';
                    state.setRunState(false);
                }
            })
            .catch((error) => {
                const errorMsg = (error && error.message) || error || t('generic.unknown_error');
                backendLog(`Download start error: ${errorMsg}`);

                const errorStr = String(errorMsg).toLowerCase();
                if (errorStr.includes('api') || errorStr.includes('key') || errorStr.includes('auth')) {
                    if (modal && modal.overlay) modal.overlay.remove();
                    showAPIKeyPrompt(appId);
                } else {
                    if (modal && modal.status) {
                        modal.status.textContent = `${t('generic.error')}: ${errorMsg}`;
                        modal.status.style.color = '#ff6b6b';
                    }
                    // Auto-fechar modal após erro
                    setTimeout(() => {
                        if (modal && modal.overlay) modal.overlay.remove();
                    }, 4000);
                }

                button.disabled = false;
                button.textContent = t('btn.add');
                button.style.opacity = '1';
                state.setRunState(false);
            });

        if (modal) {
            startProgressMonitoring(appId);
        }

        if (!state.apiKey.checked) {
            setTimeout(() => {
                ApiManager.checkAPIKeyStatus().catch(() => {
                });
            }, 100);
        }
    }

    function handleRemoveClick(appId, button) {
        backendLog(`handleRemoveClick called with appId: ${appId}`);

        if (!appId) {
            backendLog('No app ID available for removal');
            button.style.pointerEvents = 'auto';
            button.querySelector('span').textContent = 'Remove via manilua';
            button.style.opacity = '1';
            return;
        }

        backendLog(`Calling removeViamanilua API for appId: ${appId}`);
        ApiManager.call('removeViamanilua', { appid: appId })
            .then((result) => {
                if (result.success) {
                    backendLog('Game removed successfully from manilua');

                    state.cache.delete(`appExists_${appId}`);
                    // Update local library cache immediately and re-render
                    applyLocalLibraryDelta(appId, 'remove');

                    const banner = document.querySelector('#manilua-in-library-banner');
                    if (banner) banner.remove();

                    const flags = document.querySelectorAll('.package_in_library_flag');
                    flags.forEach(flag => flag.remove());

                    const buttonContainer = document.querySelector('.manilua-button-container');
                    if (buttonContainer) {
                        buttonContainer.remove();
                    }

                    setTimeout(() => {
                        addmaniluaButton();
                    }, 100);
                } else {
                    backendLog('Failed to remove game from manilua');
                    button.style.pointerEvents = 'auto';
                    button.querySelector('span').textContent = 'Remove via manilua';
                    button.style.opacity = '1';
                }
            })
            .catch((error) => {
                backendLog(`Remove error: ${error}`);
                button.style.pointerEvents = 'auto';
                button.querySelector('span').textContent = 'Remove via manilua';
                button.style.opacity = '1';
            });
    }

    function addmaniluaButton() {
        try {
            const currentAppId = getCurrentAppId();
            if (!currentAppId) {
                if (!state.logs.missingOnce) {
                    state.logs.missingOnce = true;
                }
                return;
            }

            if (!state.logs.existsOnce) {
                state.logs.existsOnce = true;
            }

            // Optimistic render: show the Add button immediately if none exists
            if (!document.querySelector('.manilua-button-container')) {
                createAndInjectButton(currentAppId);
            }

            // Ensure the DLC button is present on store pages
            try { createAndInjectDLCButton(currentAppId); } catch(_) {}

            // Then validate existence in background and swap to Remove if needed (dedup requests)
            if (inFlightAppExists.get(currentAppId)) return;
            inFlightAppExists.set(currentAppId, true);
            ApiManager.checkAppExists(currentAppId).then(exists => {
                if (exists) {
                    const existing = document.querySelector('.manilua-button-container');
                    if (existing) existing.remove();
                    createRemoveButton(currentAppId);
                    showLibraryBanners(currentAppId);
                }
            }).catch((e) => {
                // On error (e.g., not a store app page), keep optimistic Add button
            }).finally(() => {
                inFlightAppExists.delete(currentAppId);
            });
        } catch (error) {
            backendLog(`Error in addmaniluaButton: ${error}`);
        }
    }

    function showLibraryBanners(appId) {
        if (document.querySelector('#manilua-in-library-banner')) {
            return;
        }

        const gameName = getGameName();

        const queueActions = document.querySelector('#queueActionsCtn');
        if (queueActions) {
            const banner = createInLibraryBanner(gameName);
            queueActions.insertAdjacentElement('afterend', banner);
        }

        const maniluaButton = document.querySelector('.manilua-button-container');
        if (maniluaButton) {
            const purchaseSection = maniluaButton.closest('.game_area_purchase_game');
            if (purchaseSection && !purchaseSection.classList.contains('demo_above_purchase')) {
                addInLibraryFlag(purchaseSection);
            }
        }
    }

    function getGameName() {
        const titleElement = document.querySelector('.apphub_AppName') ||
            document.querySelector('.pageheader .breadcrumbs h1') ||
            document.querySelector('h1') ||
            document.querySelector('title');

        if (titleElement) {
            let name = titleElement.textContent || titleElement.innerText || '';
            name = name.replace(/\s+on\s+Steam$/i, '').trim();
            return name || t('generic.this_game');
        }

        return t('generic.this_game');
    }

    function createAndInjectButton(currentAppId) {
        const container = document.querySelector('.game_area_purchase_game_wrapper .game_purchase_action_bg') ||
            document.querySelector('.game_area_purchase_game:not(.demo_above_purchase) .game_purchase_action_bg') ||
            document.querySelector('.game_area_purchase_game:not(.demo_above_purchase) .game_purchase_action') ||
            document.querySelector('.game_area_purchase_game:not(.demo_above_purchase) .btn_addtocart')?.parentElement ||
            document.querySelector('.game_area_purchase_game_wrapper') ||
            document.querySelector('.game_purchase_action_bg') ||
            document.querySelector('.game_purchase_action') ||
            document.querySelector('.btn_addtocart')?.parentElement ||
            document.querySelector('[class*="purchase"]');

        if (!container) {
            if (!state.logs.containerWarned) {
                state.logs.containerWarned = true;
                // backendLog('No suitable container found for button injection');
            }
            return;
        }

        const btnContainer = document.createElement('div');
        btnContainer.className = 'btn_addtocart btn_packageinfo manilua-button-container';

        const button = document.createElement('span');
        button.setAttribute('data-panel', '{"focusable":true,"clickOnActivate":true}');
        button.setAttribute('role', 'button');
        button.className = 'btn_blue_steamui btn_medium';
        button.style.marginLeft = '0px';

        const buttonSpan = document.createElement('span');
        buttonSpan.textContent = t('btn.add');
        button.appendChild(buttonSpan);
        btnContainer.appendChild(button);

        setSteamTooltip(button, t('tooltip.add'));

        button.onclick = () => {
            if (state.run.inProgress) {
                backendLog(t('op.download_in_progress'));
                return;
            }

            button.style.pointerEvents = 'none';
            buttonSpan.textContent = t('btn.loading');
            button.style.opacity = '0.7';

            handleButtonClick(currentAppId, button);
        };

        container.appendChild(btnContainer);
    }

    // Create and inject a DLC button on the store page purchase area
    function createAndInjectDLCButton(currentAppId) {
        try {
            if (document.querySelector('.manilua-dlc-button-container')) return;
            const container = document.querySelector('.game_area_purchase_game_wrapper .game_purchase_action_bg') ||
                document.querySelector('.game_area_purchase_game:not(.demo_above_purchase) .game_purchase_action_bg') ||
                document.querySelector('.game_area_purchase_game:not(.demo_above_purchase) .game_purchase_action') ||
                document.querySelector('.game_area_purchase_game:not(.demo_above_purchase) .btn_addtocart')?.parentElement ||
                document.querySelector('.game_area_purchase_game_wrapper') ||
                document.querySelector('.game_purchase_action_bg') ||
                document.querySelector('.game_purchase_action') ||
                document.querySelector('.btn_addtocart')?.parentElement;
            if (!container) return;

            const btnContainer = document.createElement('div');
            btnContainer.className = 'btn_addtocart btn_packageinfo manilua-dlc-button-container';
            btnContainer.style.marginLeft = '6px';

            const button = document.createElement('span');
            button.setAttribute('data-panel', '{"focusable":true,"clickOnActivate":true}');
            button.setAttribute('role', 'button');
            button.className = 'btn_blue_steamui btn_medium manilua-dlc-btn';
            const inner = document.createElement('span');
            inner.textContent = t('profile.add_dlc');
            button.appendChild(inner);
            button.onclick = () => { try { showDLCModal(currentAppId); } catch(e) { backendLog('showDLCModal failed: '+e); } };

            btnContainer.appendChild(button);
            container.appendChild(btnContainer);
        } catch (_) {}
    }

    function createRemoveButton(currentAppId) {
        const container = document.querySelector('.game_area_purchase_game_wrapper .game_purchase_action_bg') ||
            document.querySelector('.game_area_purchase_game:not(.demo_above_purchase) .game_purchase_action_bg') ||
            document.querySelector('.game_area_purchase_game:not(.demo_above_purchase) .game_purchase_action') ||
            document.querySelector('.game_area_purchase_game:not(.demo_above_purchase) .btn_addtocart')?.parentElement ||
            document.querySelector('.game_area_purchase_game_wrapper') ||
            document.querySelector('.game_purchase_action_bg') ||
            document.querySelector('.game_purchase_action') ||
            document.querySelector('.btn_addtocart')?.parentElement ||
            document.querySelector('[class*="purchase"]');

        if (!container) {
            if (!state.logs.containerWarned) {
                state.logs.containerWarned = true;
                // backendLog('No suitable container found for remove button injection');
            }
            return;
        }

        const btnContainer = document.createElement('div');
        btnContainer.className = 'btn_addtocart btn_packageinfo manilua-button-container';

        const button = document.createElement('span');
        button.setAttribute('data-panel', '{"focusable":true,"clickOnActivate":true}');
        button.setAttribute('role', 'button');
        button.className = 'btn_blue_steamui btn_medium';
        button.style.marginLeft = '2px';

        const buttonSpan = document.createElement('span');
        buttonSpan.textContent = t('btn.remove');
        button.appendChild(buttonSpan);
        btnContainer.appendChild(button);

        setSteamTooltip(button, t('tooltip.remove'));

        button.onclick = () => {
            if (state.run.inProgress) {
                backendLog(t('op.in_progress'));
                return;
            }

            button.style.pointerEvents = 'none';
            buttonSpan.textContent = t('btn.removing');
            button.style.opacity = '0.7';

            handleRemoveClick(currentAppId, button);
        };

        container.appendChild(btnContainer);
    }

    function getCurrentAppId() {
        const urlMatch = window.location.href.match(/\/app\/(\d+)/);
        if (urlMatch) return parseInt(urlMatch[1]);

        const dataAppId = document.querySelector('[data-appid]');
        if (dataAppId) return parseInt(dataAppId.getAttribute('data-appid'));

        return null;
    }

    function startProgressMonitoring(appid) {
        const overlays = document.querySelectorAll('.manilua-overlay');
        const overlay = overlays[overlays.length - 1] || overlays[0];

        const title = overlay?.querySelector('.manilua-title');
        const status = overlay?.querySelector('.manilua-status');
        const wrap = overlay?.querySelector('.manilua-progress');
        const bar = overlay?.querySelector('.manilua-progress-bar');
        const percent = overlay?.querySelector('.manilua-percent');
        const details = overlay?.querySelector('.manilua-progress-details');
        const downloadedEl = overlay?.querySelector('.manilua-downloaded');
        const speedEl = overlay?.querySelector('.manilua-speed');
        const etaEl = overlay?.querySelector('.manilua-eta');
        let done = false;
        let displayPct = 0;
        let targetPct = 0;
        let lastRealPct = 0;

        let startTime = 0;
        let lastStatusChange = Date.now();
        let currentStatus = '';
        
        const smoothProgress = () => {
            if (displayPct < targetPct) {
                const diff = targetPct - displayPct;
                const easingFactor = displayPct > 85 ? 0.012 : (displayPct > 70 ? 0.025 : (displayPct > 50 ? 0.04 : 0.06));
                const increment = Math.max(0.08, diff * easingFactor);
                displayPct = Math.min(targetPct, displayPct + increment);
                
                const roundedPct = Math.floor(displayPct);
                if (bar) {
                    bar.style.width = `${roundedPct}%`;
                    if (roundedPct >= 90) {
                        bar.style.filter = `brightness(${1 + (roundedPct - 90) * 0.02})`;
                    }
                }
                if (percent) {
                    percent.textContent = `${roundedPct}%`;
                    if (roundedPct >= 85) {
                        percent.style.fontWeight = '700';
                        percent.style.textShadow = '0 0 8px rgba(164, 208, 7, 0.6)';
                    }
                }
            }
        };
        
        const smoothTimer = setInterval(smoothProgress, 50);
        
        const timer = setInterval(async () => {
            if (done) {
                clearInterval(timer);
                clearInterval(smoothTimer);
                return;
            }

            try {
                const response = await Millennium.callServerMethod('manilua', 'GetStatus', { appid });
                const payload = JSON.parse(response);
                const st = payload?.state || {};
                
                // Detecta mudança de status para acelerar animação
                if (st.status !== currentStatus) {
                    currentStatus = st.status;
                    lastStatusChange = Date.now();
                }

                if (title) {
                    if (st.status === 'awaiting_endpoint_choice') {
                        title.textContent = t('title.choose_endpoint');
                    } else if (st.currentApi) {
                        title.textContent = `manilua - ${st.currentApi}`;
                    }
                }

                const statusMap = {
                    'checking': st.currentApi ? t('status.checking_with_api', { api: st.currentApi }) : t('status.checking'),
                    'checking_availability': t('status.checking_availability'),
                    'queued': t('status.queued'),
                    'downloading': st.endpoint ? t('status.downloading_from', { endpoint: st.endpoint }) : t('status.downloading'),
                    'processing': t('status.processing'),
                    'extracting': t('status.extracting'),
                    'installing': st.installedFiles ? t('status.installing_with_count', { count: st.installedFiles.length }) : t('status.installing'),
                    'done': t('status.done'),
                    'failed': st.error || t('status.failed'),
                    'not_found': t('status.not_found_on', { endpoint: st.endpoint || 'endpoint' }),
                    'awaiting_endpoint_choice': t('status.awaiting_endpoint_choice')
                };

                const statusText = statusMap[st.status] || st.status || t('status.generic_processing');

                let detailedStatus = statusText;
                if (st.status === 'downloading' && st.bytesRead && st.totalBytes) {
                    const progressMB = (st.bytesRead / (1024 * 1024)).toFixed(1);
                    const totalMB = (st.totalBytes / (1024 * 1024)).toFixed(1);
                    detailedStatus = `${statusText} (${progressMB}MB / ${totalMB}MB)`;
                } else if (st.status === 'extracting' && st.extractedFiles) {
                    detailedStatus = t('status.extracting_with_count', { count: st.extractedFiles });
                } else if (st.status === 'installing' && st.installedPath) {
                    const fileName = st.installedPath.split(/[\\\/]/).pop();
                    detailedStatus = `${statusText} ${fileName}`;
                }

                if (status) {
                    status.textContent = detailedStatus;
                }


                if (overlay && st.status === 'awaiting_endpoint_choice' && st.available_endpoints?.length > 0) {
                    if (!overlay.querySelector('.manilua-endpoints')) {
                        wrap.style.display = 'none';
                        percent.style.display = 'none';

                        const endpointContainer = createEndpointButtons(st.available_endpoints, async (endpoint) => {
                            try {
                                await Millennium.callServerMethod('manilua', 'SelectEndpointAndDownload', {
                                    appid: appid,
                                    endpoint: endpoint
                                });
                                endpointContainer.remove();
                                status.textContent = t('endpoint.starting_download');
                                wrap.style.display = 'block';
                                percent.style.display = 'block';
                            } catch (error) {
                                backendLog(`Error selecting endpoint: ${error}`);
                                status.textContent = t('endpoint.failed_to_start');
                            }
                        });

                        status.parentNode.insertBefore(endpointContainer, status.nextSibling);
                    }
                }

                if (wrap && bar && percent && ['downloading', 'processing', 'extracting', 'installing'].includes(st.status)) {
                    wrap.style.display = 'block';
                    percent.style.display = 'block';
                    if (details) details.style.display = 'flex';

                    let newTarget = targetPct;
                    const timeSinceStatusChange = Date.now() - lastStatusChange;

                    if (st.status === 'downloading') {
                        const total = st.totalBytes || 0;
                        const read = st.bytesRead || 0;
                        if (total > 0 && read >= 0) {
                            const realProgress = (read / total) * 100;
                            const limitedProgress = Math.min(realProgress * 0.85, 85);
                            newTarget = Math.max(targetPct, limitedProgress);
                            
                            if (downloadedEl && speedEl && etaEl) {
                                const now = Date.now();
                                if (!startTime) startTime = now;
                                const elapsed = (now - startTime) / 1000;
                                const speed = elapsed > 0 ? (read / 1024 / 1024) / elapsed : 0;
                                downloadedEl.style.display = 'none';
                                speedEl.textContent = '';
                                etaEl.textContent = '';
                            }
                        } else {
                            const elapsed = timeSinceStatusChange / 1000;
                            const simulatedProgress = Math.min(75, 15 + (elapsed * 4));
                            newTarget = Math.max(targetPct, simulatedProgress);
                            
                            if (percent) percent.style.display = 'block';
                            if (downloadedEl) downloadedEl.style.display = 'none';
                            if (speedEl) speedEl.textContent = '';
                            if (etaEl) etaEl.textContent = '';
                        }
                        newTarget = Math.min(newTarget, 85);
                    } else if (st.status === 'processing') {
                        const processingProgress = 85 + (timeSinceStatusChange / 500);
                        newTarget = Math.max(targetPct, Math.min(90, processingProgress));
                    } else if (st.status === 'extracting') {
                        const fileProgress = st.extractedFiles ? Math.min(3, st.extractedFiles * 0.01) : 0;
                        const extractingBase = 90 + (timeSinceStatusChange / 800);
                        newTarget = Math.max(targetPct, Math.min(94, extractingBase + fileProgress));
                    } else if (st.status === 'installing') {
                        const fileProgress = st.installedFiles ? Math.min(2, st.installedFiles.length * 0.005) : 0;
                        const installingBase = 94 + (timeSinceStatusChange / 1000);
                        newTarget = Math.max(targetPct, Math.min(97, installingBase + fileProgress));
                    }

                    targetPct = Math.min(97, Math.max(0, newTarget));
                    lastRealPct = targetPct;

                    bar.style.background = st.status === 'downloading' ?
                        'linear-gradient(to right, #75b022 5%, #588a1a 95%)' :
                        st.status === 'extracting' ?
                            'linear-gradient(to right, #8bc53f 5%, #75b022 95%)' :
                            'linear-gradient(to right, #a4d007 5%, #8bc53f 95%)';
                    bar.style.boxShadow = '0 0 10px rgba(117, 176, 34, 0.5)';
                }

                if (st.status === 'done') {
                    clearInterval(smoothTimer);
                    if (bar && percent && status) {
                        targetPct = 100;
                        
                        const finishAnimation = () => {
                            const currentProgress = displayPct;
                            if (currentProgress < 100) {
                                const remaining = 100 - currentProgress;
                                const increment = remaining > 5 ? 0.8 : 0.3;
                                displayPct = Math.min(100, currentProgress + increment);
                                
                                bar.style.width = `${Math.floor(displayPct)}%`;
                                percent.textContent = `${Math.floor(displayPct)}%`;
                                
                                const glowIntensity = 0.7 + (displayPct / 100) * 0.3;
                                bar.style.background = `linear-gradient(to right, 
                                    rgba(164, 208, 7, ${glowIntensity}) 0%, 
                                    rgba(139, 197, 63, ${glowIntensity}) 100%)`;
                                bar.style.boxShadow = `0 0 ${15 + (displayPct / 100) * 10}px rgba(164, 208, 7, ${glowIntensity})`;
                                
                                requestAnimationFrame(finishAnimation);
                            } else {
                                bar.style.width = '100%';
                                percent.textContent = '100%';
                                bar.style.background = 'linear-gradient(to right, #a4d007 0%, #8bc53f 100%)';
                                
                                let pulseCount = 0;
                                const pulse = () => {
                                    const intensity = pulseCount % 2 === 0 ? 1 : 0.6;
                                    bar.style.boxShadow = `0 0 ${25 * intensity}px rgba(164, 208, 7, ${intensity})`;
                                    pulseCount++;
                                    if (pulseCount < 4) {
                                        setTimeout(pulse, 200);
                                    }
                                };
                                pulse();
                            }
                        };
                        
                        requestAnimationFrame(finishAnimation);
                        
                        status.textContent = t('progress.game_added');
                        status.style.color = '#a4d007';
                        status.style.fontWeight = '600';
                        status.style.textShadow = '0 0 10px rgba(164, 208, 7, 0.5)';

                        setTimeout(() => {
                            if (wrap) {
                                wrap.style.opacity = '0';
                                wrap.style.transition = 'opacity 0.5s ease';
                                setTimeout(() => wrap.style.display = 'none', 500);
                            }
                            if (percent) {
                                percent.style.opacity = '0';
                                percent.style.transition = 'opacity 0.5s ease';
                                setTimeout(() => percent.style.display = 'none', 500);
                            }
                        }, 800);
                    }

                    setTimeout(() => {
                        if (overlay) {
                            overlay.style.opacity = '0';
                            overlay.style.transition = 'opacity 0.3s ease';
                            setTimeout(() => overlay.remove(), 300);
                        }
                    }, 1800);

                    const btnEl = document.querySelector('.manilua-button-container');
                    if (btnEl) btnEl.remove();

                    done = true;
                    clearInterval(smoothTimer);
                    state.setRunState(false);
                    state.cache.delete(`appExists_${appid}`);
                    // Update local library cache immediately and re-render
                    applyLocalLibraryDelta(appid, 'add');

                    setTimeout(() => {
                        addmaniluaButton();
                    }, 2000);
                }

                if (st.status === 'failed') {
                    const errorMsg = st.error || t('generic.unknown_error');
                    status.textContent = `${t('status.failed_prefix')}: ${errorMsg}`;
                    status.style.color = '#ff6b6b';
                    status.style.fontWeight = '600';
                    
                    // Mostra barra vermelha de erro
                    if (bar && wrap) {
                        wrap.style.display = 'block';
                        bar.style.width = '100%';
                        bar.style.background = 'linear-gradient(to right, #a12e2e 5%, #7d1f1f 95%)';
                        bar.style.boxShadow = '0 0 15px rgba(169, 46, 46, 0.7)';
                    }
                    if (percent) percent.style.display = 'none';
                    if (details) details.style.display = 'none';
                    
                    // Auto-fechar após 5 segundos
                    setTimeout(() => {
                        if (overlay) {
                            overlay.style.opacity = '0';
                            overlay.style.transition = 'opacity 0.3s ease';
                            setTimeout(() => overlay.remove(), 300);
                        }
                    }, 5000);
                    
                    done = true;
                    clearInterval(smoothTimer);
                    state.setRunState(false);
                }

            } catch (error) {
                // Keep silent to avoid noisy logs during transient fetch errors
            }
        }, 400); // Reduzido de 900ms para 400ms para atualizações mais fluidas
    }

    ensureStyles();

    ApiManager.checkAPIKeyStatus().catch(() => {
    });

    // Fast, near-instant injection: try immediately and in a short burst
    addmaniluaButton();
    (function fastScanInject(attempts = 3) {
        let n = 0;
        const fastTimer = setInterval(() => {
            if (document.querySelector('.manilua-button-container')) {
                clearInterval(fastTimer);
                return;
            }
            addmaniluaButton();
            n++;
            if (n >= attempts) clearInterval(fastTimer);
        }, 160);
    })();

    // Keep legacy delayed retries for late-loading pages
    setTimeout(addmaniluaButton, 800);
    setTimeout(addmaniluaButton, 1500);
    setTimeout(addmaniluaButton, 3500);

    // Flag para prevenir renders múltiplos simultâneos
    let __maniluaRenderInProgress = false;
    let __maniluaLastRenderTime = 0;
    
    if (typeof MutationObserver !== 'undefined') {
		let scheduleModernRenderTimer = null;
		const scheduleModernRender = () => {
			if (scheduleModernRenderTimer) return;
			if (__maniluaRenderInProgress) {
				return;
			}
			// Previne renders frequentes demais (no máximo 1 por segundo)
			const now = Date.now();
			if (now - __maniluaLastRenderTime < 1000) {
				return;
			}
			scheduleModernRenderTimer = setTimeout(() => {
				scheduleModernRenderTimer = null;
				__maniluaLastRenderTime = Date.now();
				try { renderLocalLibrarySection(); } catch(_) {}
			}, 1000); // Aumentado de 120ms para 1000ms
		};
		const observer = new MutationObserver(() => {
			scheduleAddmaniluaButton();
			try { cleanupManiluaNameTags(); } catch(_) {}
			// When modern games list populates asynchronously, render our rows
			try {
				const root = document.querySelector('[data-featuretarget="gameslist-root"]');
				if (root && root.querySelector('div[role="button"]') && !root.querySelector('[data-manilua-modern-row="1"]')) {
					scheduleModernRender();
				}
			} catch(_) {}
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Garante que os estilos estejam aplicados
    ensureManiluaStyles();
    
    // DESABILITADO: Timer estava causando loop infinito
    // startNameEnforcementTimer();
    
    // Render local-only library on profile pages with a shorter delay
    setTimeout(() => {
        try { renderLocalLibrarySection(); } catch(_) {}
        updateCountsFromLocalLibrary();
        try { cleanupManiluaNameTags(); } catch(_) {}
    }, 450);
    // Refresh once more after loading to catch late DOM
    setTimeout(() => {
        updateCountsFromLocalLibrary();
        try { cleanupManiluaNameTags(); } catch(_) {}
    }, 2000);

})();
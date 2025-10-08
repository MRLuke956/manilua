(function () {
  'use strict';

  function _text(el) {
    try { return (el && (el.innerText || el.textContent) || '').toLowerCase(); } catch (_) { return ''; }
  }

  function isLikelyDlcAppPage() {
    try {
      var subEl = document.querySelector('.game_purchase_subtitle');
      var descEl = document.querySelector('.game_area_description');
      var sub = _text(subEl);
      var desc = _text(descEl);
      var text = (sub + ' ' + desc);
      if (text.indexOf('requires the base game') !== -1 || text.indexOf('require the base game') !== -1) return true;
      if (text.indexOf('requer') !== -1 && (text.indexOf('jogo base') !== -1 || text.indexOf('no steam para ser acessado') !== -1)) return true;

      var sideEl = document.querySelector('#category_block') || document.querySelector('#genre_block') || document.querySelector('.rightcol');
      var sidebar = _text(sideEl);
      if (sidebar.indexOf('conteúdo adicional') !== -1 || sidebar.indexOf('conteudo adicional') !== -1 || sidebar.indexOf('additional content') !== -1) return true;

      var bcEl = document.querySelector('.breadcrumbs');
      var breadcrumbs = _text(bcEl);
      if (breadcrumbs.indexOf('dlc') !== -1) return true;

      // Fallback: scan heading area
      var bodyText = _text(document.body);
      if (bodyText.indexOf('conteúdo adicional') !== -1 && bodyText.indexOf('requer') !== -1) return true;
    } catch (_) {}
    return false;
  }

  function removeDlcButtons() {
    try {
      var containers = document.querySelectorAll('.manilua-dlc-button-container');
      for (var i = 0; i < containers.length; i++) { try { containers[i].remove(); } catch(e) {} }
      var buttons = document.querySelectorAll('.manilua-dlc-btn');
      for (var j = 0; j < buttons.length; j++) { try { var b = buttons[j]; if (b && b.parentElement && b.parentElement.classList.contains('manilua-dlc-button-container')) continue; b.remove(); } catch(e) {} }
    } catch (_) {}
  }

  function injectHideStyle() {
    try {
      if (document.getElementById('manilua-dlc-hide-style')) return;
      var style = document.createElement('style');
      style.id = 'manilua-dlc-hide-style';
      style.textContent = '.manilua-is-dlc .manilua-dlc-button-container, .manilua-is-dlc .manilua-dlc-btn { display: none !important; }';
      document.head.appendChild(style);
    } catch (_) {}
  }

  function injectCompactButtonStyle() {
    try {
      if (document.getElementById('manilua-dlc-compact-style')) return;
      var style = document.createElement('style');
      style.id = 'manilua-dlc-compact-style';
      style.textContent = [
        '.manilua-dlc-btn { height: 30px !important; }',
        '.manilua-dlc-btn > span { padding: 0 12px !important; font-size: 12px !important; font-weight: 500 !important; }',
        '.manilua-btn.manilua-dlc-btn { height: 30px !important; padding: 0 12px !important; font-size: 12px !important; font-weight: 500 !important; }'
      ].join('\n');
      document.head.appendChild(style);
    } catch(_) {}
  }

  function setDlcButtonText() {
    try {
      var nodes = document.querySelectorAll('.manilua-dlc-btn');
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (!n) continue;
        // Store button: <span class="... manilua-dlc-btn"><span>...</span></span>
        var inner = n.querySelector('span');
        if (inner) {
          inner.textContent = 'Add DLCs';
        } else {
          n.textContent = 'Add DLCs';
        }
      }
    } catch(_) {}
  }

  function getPurchaseRoot() {
    return (
      document.querySelector('.game_area_purchase_game_wrapper .game_purchase_action_bg') ||
      document.querySelector('.game_area_purchase_game:not(.demo_above_purchase) .game_purchase_action_bg') ||
      document.querySelector('.game_area_purchase_game:not(.demo_above_purchase) .game_purchase_action') ||
      document.querySelector('.game_area_purchase_game_wrapper') ||
      document.querySelector('.game_purchase_action_bg') ||
      document.querySelector('.game_purchase_action') ||
      document.querySelector('.rightcol') ||
      document.body
    );
  }

  function installObserver() {
    try {
      var scheduled = false;
      var obs = new MutationObserver(function() {
        if (scheduled) return;
        scheduled = true;
        setTimeout(function() {
          scheduled = false;
          removeDlcButtons();
          injectHideStyle();
        }, 120);
      });
      var root = getPurchaseRoot();
      obs.observe(root, { childList: true, subtree: true });
      // Auto-disconnect after a few seconds; CSS keeps things hidden thereafter
      setTimeout(function() { try { obs.disconnect(); } catch(_) {} }, 4000);
    } catch (_) {}
  }

  function run() {
    if (!document.body) { setTimeout(run, 100); return; }
    injectCompactButtonStyle();
    setDlcButtonText();
    if (isLikelyDlcAppPage()) {
      injectHideStyle();
      try { document.body.classList.add('manilua-is-dlc'); } catch(_) {}
      removeDlcButtons();
      installObserver();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();

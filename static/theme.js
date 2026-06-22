/* ============================================================================
   THEME ✦ dark / light toggle for the LIVE site
   ----------------------------------------------------------------------------
   Builds a floating switch that flips <html data-theme="…"> and remembers the
   choice in localStorage. The actual palette lives in enhance.css (LAYER 5).
   The first paint is set by an inline script in index.html so there's no flash;
   this file just adds the control and keeps it in sync. Default: light.
   React-safe: the button is appended to <body>, outside React's #root.
   ============================================================================ */
(function () {
  'use strict';
  if (window.__themeToggle) return;
  window.__themeToggle = true;

  var KEY = 'theme';
  var SUN =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';

  function current() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  var btn;
  function sync(theme) {
    if (!btn) return;
    // show the icon of the mode you'd switch TO
    btn.innerHTML = theme === 'dark' ? SUN : MOON;
    var to = theme === 'dark' ? 'light' : 'dark';
    btn.setAttribute('aria-label', 'Switch to ' + to + ' theme');
    btn.setAttribute('title', to.charAt(0).toUpperCase() + to.slice(1) + ' mode');
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    sync(theme);
  }

  function build() {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-fab';
    btn.addEventListener('click', function () {
      apply(current() === 'dark' ? 'light' : 'dark');
    });
    document.body.appendChild(btn);
    sync(current());
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();

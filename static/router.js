/* ============================================================================
   ROUTER ✦ real URLs for the SPA tabs
   ----------------------------------------------------------------------------
   Gives the deployed React bundle clean paths without touching its code:
     aacheampong.com/          → Home
     aacheampong.com/story/    → Story        aacheampong.com/skills/   → Skills
     aacheampong.com/projects/ → Projects     aacheampong.com/pipeline/ → Pipeline
     aacheampong.com/experience/ → Experience aacheampong.com/contact/  → Contact
   Each path is a real directory on GitHub Pages serving a copy of index.html,
   so deep links and refreshes work. This script then:
     • activates the tab matching the URL on load
     • pushes the matching URL whenever the active tab changes (nav clicks,
       prev/next buttons, Ohemaa shortcuts — anything that flips the tab)
     • restores the right tab on browser back/forward
   Safe by design: never reparents React's DOM — it only clicks the app's own
   nav buttons and reads the .nav-tab.active state.
   ============================================================================ */
(function () {
  'use strict';
  if (window.__tabRouter) return;
  window.__tabRouter = true;

  var TABS = {
    home:       { label: 'Home',       path: '/',            title: 'Adwoa B. Acheampong | Business Operations & AI Consultant' },
    story:      { label: 'Story',      path: '/story/',      title: 'Story | Adwoa B. Acheampong' },
    projects:   { label: 'Projects',   path: '/projects/',   title: 'Projects | Adwoa B. Acheampong' },
    experience: { label: 'Experience', path: '/experience/', title: 'Experience | Adwoa B. Acheampong' },
    skills:     { label: 'Skills',     path: '/skills/',     title: 'Skills | Adwoa B. Acheampong' },
    pipeline:   { label: 'Pipeline',   path: '/pipeline/',   title: 'Pipeline | Adwoa B. Acheampong' },
    contact:    { label: 'Contact',    path: '/contact/',    title: 'Contact | Adwoa B. Acheampong' }
  };

  /* '/story', '/story/', '/story/index.html' all normalize to '/story' */
  function normalize(path) {
    path = path.toLowerCase().replace(/\/index\.html$/, '/');
    if (path.length > 1) path = path.replace(/\/+$/, '');
    return path;
  }

  function pathToTab() {
    if (window.location.hash === '#contact') return 'contact';
    var seg = normalize(window.location.pathname).split('/').pop();
    return TABS[seg] ? seg : 'home';
  }

  function buttons() {
    return Array.prototype.slice.call(document.querySelectorAll('.nav-tab'));
  }
  function buttonFor(tab) {
    var label = TABS[tab].label.toLowerCase();
    return buttons().filter(function (b) {
      return (b.textContent || '').trim().toLowerCase() === label;
    })[0];
  }
  function activeTab() {
    var active = buttons().filter(function (b) { return /\bactive\b/.test(b.className); })[0];
    if (!active) return null;
    var label = (active.textContent || '').trim().toLowerCase();
    for (var id in TABS) { if (TABS[id].label.toLowerCase() === label) return id; }
    return null;
  }

  var lastTab = null;
  var booted = false;

  function activate(tab) {
    var b = buttonFor(tab);
    if (b && !/\bactive\b/.test(b.className)) b.click();
    document.title = TABS[tab].title;
  }

  /* Called by the observer after every React render: if the active tab no
     longer matches the URL, the change came from inside the app — push it. */
  function sync() {
    if (!booted) return;
    var tab = activeTab();
    if (!tab || tab === lastTab) return;
    lastTab = tab;
    document.title = TABS[tab].title;
    if (normalize(window.location.pathname) !== normalize(TABS[tab].path)) {
      window.history.pushState({ tab: tab }, '', TABS[tab].path);
    }
  }

  function boot() {
    var target = pathToTab();
    var tries = 0;
    (function attempt() {
      if (buttonFor(target)) {
        lastTab = target;
        booted = true;
        activate(target);
        /* Canonicalize legacy '/#contact' style URLs to the real path. */
        if (normalize(window.location.pathname) !== normalize(TABS[target].path)) {
          window.history.replaceState({ tab: target }, '', TABS[target].path);
        }
        return;
      }
      if (++tries < 240) setTimeout(attempt, 50);
    })();
  }

  window.addEventListener('popstate', function () {
    if (!booted) return;
    var target = pathToTab();
    lastTab = target;
    activate(target);
  });

  var observer = new MutationObserver(sync);
  function observe() {
    var root = document.getElementById('root');
    if (root) observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { observe(); boot(); });
  } else {
    observe(); boot();
  }
})();

(function () {
  'use strict';
  var button = document.querySelector('.menu-toggle');
  var menu = document.getElementById('primary-menu');
  if (!button || !menu) return;
  document.documentElement.classList.add('site-js');
  button.hidden = false;
  function closeMenu() {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open menu');
    menu.classList.remove('open');
  }
  button.addEventListener('click', function () {
    var open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('open', open);
    if (open) document.querySelectorAll('.header-email').forEach(function (disclosure) { disclosure.open = false; });
  });
  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      button.focus();
    }
  });
  document.addEventListener('click', function (event) {
    if (!menu.contains(event.target) && !button.contains(event.target)) closeMenu();
  });
  document.addEventListener('focusin', function (event) {
    if (!menu.contains(event.target) && !button.contains(event.target)) closeMenu();
  });
  window.matchMedia('(min-width: 1241px)').addEventListener('change', function (event) {
    var menuHadFocus = menu.contains(document.activeElement);
    var buttonHadFocus = document.activeElement === button;
    closeMenu();
    if (!event.matches && menuHadFocus) button.focus();
    if (event.matches && buttonHadFocus) {
      var link = menu.querySelector('a[aria-current="page"]') || menu.querySelector('a');
      if (link) link.focus();
    }
  });
  // Native fragment navigation does not open a closed disclosure by itself.
  function revealTarget() {
    if (!location.hash) return;
    var id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    var target = document.getElementById(id);
    if (!target) return;
    var details = target.closest('details');
    if (details) details.open = true;
  }
  revealTarget();
  window.addEventListener('hashchange', revealTarget);
})();

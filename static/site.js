(function () {
  'use strict';
  var button = document.querySelector('.menu-toggle');
  var menu = document.getElementById('primary-menu');
  if (!button || !menu) return;
  document.documentElement.classList.add('site-js');
  button.hidden = false;
  function closeMenu() {
    button.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }
  button.addEventListener('click', function () {
    var open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
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
    if (!event.target.closest('.navbar-custom')) closeMenu();
  });
  window.matchMedia('(min-width: 1181px)').addEventListener('change', closeMenu);
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

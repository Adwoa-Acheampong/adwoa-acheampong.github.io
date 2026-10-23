(function () {
  'use strict';
  var key = 'portfolio-theme';
  var root = document.documentElement;
  var theme = 'light';
  try { if (localStorage.getItem(key) === 'dark') theme = 'dark'; } catch (_) {}
  function apply(value) {
    theme = value;
    root.dataset.reviewTheme = value;
    root.style.colorScheme = value;
    document.querySelectorAll('.review-theme-toggle').forEach(function (button) {
      button.setAttribute('aria-pressed', String(value === 'light'));
      button.title = 'Switch to ' + (value === 'dark' ? 'light' : 'dark') + ' mode';
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = value === 'dark' ? '#0c0f10' : '#fbf1d8';
  }
  apply(theme);
  document.addEventListener('DOMContentLoaded', function () {
    apply(theme);
    document.querySelectorAll('.review-theme-toggle').forEach(function (button) {
      button.addEventListener('click', function () {
        apply(theme === 'dark' ? 'light' : 'dark');
        try { localStorage.setItem(key, theme); } catch (_) {}
      });
    });
    window.matchMedia('(min-width: 1241px)').addEventListener('change', function () {
      var menu = document.getElementById('primary-menu');
      var button = document.querySelector('.menu-toggle');
      if (menu) menu.classList.remove('open');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  });
  window.addEventListener('storage', function (event) {
    if (event.key === key) apply(event.newValue === 'dark' ? 'dark' : 'light');
  });
})();

(function () {
  'use strict';
  var disclosure = document.querySelector('.header-email');
  if (!disclosure) return;
  document.addEventListener('click', function (event) {
    if (!disclosure.contains(event.target)) disclosure.open = false;
  });
  document.addEventListener('focusin', function (event) {
    if (!disclosure.contains(event.target)) disclosure.open = false;
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && disclosure.open) {
      disclosure.open = false;
      disclosure.querySelector('summary').focus();
    }
  });
  disclosure.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { disclosure.open = false; });
  });
  window.matchMedia('(min-width: 1241px)').addEventListener('change', function () { disclosure.open = false; });
})();

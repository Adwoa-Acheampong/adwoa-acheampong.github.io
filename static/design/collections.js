(function () {
  'use strict';
  var collection = document.querySelector('[data-collection]');
  var controls = document.querySelector('.collection-browser');
  if (!collection || !controls) return;
  var kind = collection.dataset.collection;
  var form = controls.querySelector('form');
  var search = form.elements.q;
  var category = form.elements.category;
  var status = form.elements.status;
  var items = Array.from(collection.querySelectorAll('[data-search]'));
  var groups = Array.from(collection.querySelectorAll('.static-skill-group'));
  var limit = kind === 'projects' ? 6 : 10;
  var previous = controls.querySelector('.collection-previous');
  var next = controls.querySelector('.collection-next');
  var page = 1;
  function normalize(value) { return value.normalize('NFKD').toLowerCase().trim(); }
  function matches(item) {
    return (!category.value || item.dataset.filterCategory === category.value) &&
      (!status || !status.value || item.dataset.filterStatus === status.value) &&
      normalize(search.value).split(/\s+/).every(function (word) { return normalize(item.dataset.search).includes(word); });
  }
  function render(updateUrl) {
    var filtered = items.filter(matches);
    var pages = Math.max(1, Math.ceil(filtered.length / limit));
    page = Math.max(1, Math.min(page, pages));
    var visible = new Set(filtered.slice((page - 1) * limit, page * limit));
    items.forEach(function (item) { item.hidden = !visible.has(item); });
    groups.forEach(function (group) { group.hidden = !Array.from(group.querySelectorAll('[data-search]')).some(function (item) { return visible.has(item); }); });
    controls.querySelector('.collection-count').textContent = filtered.length + ' of ' + items.length + ' ' + kind +
      (filtered.length ? ' · Showing ' + ((page - 1) * limit + 1) + '–' + Math.min(page * limit, filtered.length) : '');
    controls.querySelector('.collection-page').textContent = 'Page ' + page + ' of ' + pages;
    controls.querySelector('.collection-pager').hidden = pages === 1;
    controls.querySelector('.collection-empty').hidden = filtered.length !== 0;
    previous.disabled = page === 1;
    next.disabled = page === pages;
    [search, category, status].filter(Boolean).forEach(function (control) { control.dataset.active = String(Boolean(control.value)); });
    if (updateUrl) {
      var url = new URL(location.href);
      [search, category, status].filter(Boolean).forEach(function (control) {
        if (control.value) url.searchParams.set(control.name, control.value);
        else url.searchParams.delete(control.name);
      });
      if (page > 1) url.searchParams.set('page', page); else url.searchParams.delete('page');
      // A stale fragment must not silently override newly selected filters on reload.
      url.hash = '';
      history.replaceState(null, '', url);
    }
  }
  function restore() {
    var params = new URL(location.href).searchParams;
    [search, category, status].filter(Boolean).forEach(function (control) { control.value = params.get(control.name) || ''; });
    page = Math.max(1, Number.parseInt(params.get('page'), 10) || 1);
    render(false);
    revealFragment();
  }
  function clear() {
    search.value = ''; category.value = ''; if (status) status.value = '';
    page = 1; render(true);
  }
  function revealFragment() {
    var id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    var target = document.getElementById(id);
    var item = target && target.closest('[data-search]');
    if (!item) return;
    search.value = ''; category.value = ''; if (status) status.value = '';
    page = Math.floor(items.indexOf(item) / limit) + 1;
    render(false);
    if (item.tagName === 'DETAILS') item.open = true;
    requestAnimationFrame(function () { item.scrollIntoView({block:'start'}); });
  }
  form.addEventListener('submit', function (event) { event.preventDefault(); });
  form.addEventListener('input', function () { page = 1; render(true); });
  form.addEventListener('change', function () { page = 1; render(true); });
  form.addEventListener('reset', function (event) { event.preventDefault(); clear(); });
  controls.querySelector('.collection-empty-reset').addEventListener('click', function () { clear(); search.focus(); });
  function turn(delta, button) {
    page += delta; render(true);
    if (button.disabled) (delta > 0 ? previous : next).focus();
    controls.scrollIntoView({block:'start', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  }
  previous.addEventListener('click', function () { turn(-1, previous); });
  next.addEventListener('click', function () { turn(1, next); });
  window.addEventListener('popstate', restore);
  window.addEventListener('hashchange', revealFragment);
  controls.hidden = false;
  restore();
})();

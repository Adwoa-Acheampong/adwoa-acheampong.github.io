(function () {
  'use strict';
  var posts = Array.from(document.querySelectorAll('.blog-social-post'));
  var button = document.querySelector('.blog-embed-load');
  var status = document.querySelector('.blog-embed-status');
  if (!posts.length || !button || !status) return;
  var active = false;
  var generation = 0;
  var script;
  function theme() {
    return document.documentElement.dataset.reviewTheme === 'dark' ? 'dark' : 'light';
  }
  function render() {
    if (!window.twttr || !window.twttr.widgets) return;
    var current = ++generation;
    status.textContent = 'Loading X posts...';
    Promise.all(posts.map(function (post) {
      var frame = post.querySelector('.blog-post-frame');
      var fallback = post.querySelector('.blog-post-fallback');
      var target = document.createElement('div');
      frame.replaceChildren(target);
      fallback.hidden = false;
      var url = new URL(post.dataset.postUrl);
      if (url.hostname !== 'x.com' || !/^\/[a-zA-Z0-9_]+\/status\/\d+$/.test(url.pathname)) return false;
      return window.twttr.widgets.createTweet(url.pathname.split('/').pop(), target, {
        theme: theme(), dnt: true, conversation: 'none', align: 'center'
      }).then(function (element) {
        if (current !== generation) return false;
        fallback.hidden = Boolean(element);
        return Boolean(element);
      }).catch(function () { return false; });
    })).then(function (results) {
      if (current !== generation) return;
      status.textContent = results.every(Boolean) ? 'X posts loaded.' : 'Some X posts could not load. Their text and original links are available.';
      button.hidden = results.every(Boolean);
      button.disabled = false;
      button.textContent = 'Retry X posts';
    });
  }
  button.hidden = false;
  button.addEventListener('click', function () {
    active = true;
    button.disabled = true;
    if (window.twttr && window.twttr.widgets) { render(); return; }
    status.textContent = 'Connecting to X...';
    if (script) script.remove();
    script = document.createElement('script');
    script.src = 'https://platform.x.com/widgets.js';
    script.async = true;
    script.addEventListener('load', function () {
      if (window.twttr && window.twttr.ready) window.twttr.ready(render);
      else { button.disabled = false; status.textContent = 'X is unavailable. The original text and links remain available.'; }
    });
    script.addEventListener('error', function () {
      button.disabled = false;
      status.textContent = 'X is unavailable. The original text and links remain available.';
    });
    document.head.append(script);
    setTimeout(function () {
      if (button.disabled) {
        button.disabled = false;
        status.textContent = 'X is taking longer than expected. The original text and links remain available.';
      }
    }, 15000);
  });
  new MutationObserver(function () { if (active) render(); }).observe(document.documentElement, {attributes:true, attributeFilter:['data-review-theme']});
})();

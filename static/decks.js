/* ============================================================================
   DECKS ✦ collapsible cards for the LIVE site (mobile)
   ----------------------------------------------------------------------------
   Turns long cards into tap-to-expand "decks" so phone pages don't scroll
   forever. The original ask: "transform content into collapsible decks to
   prevent excessive scrolling, especially on mobile."

   Safe by design — it NEVER reparents or removes React's DOM. It only:
     • adds classes (.enh-deck / .enh-collapsed on the card, .enh-head on the
       header element). Hiding is done in CSS (enhance.css · LAYER 4).
     • listens for clicks via ONE delegated handler on document.
   A MutationObserver re-applies after the SPA swaps pages. Idempotent via a
   data-enh flag. Desktop (>768px) is left exactly as-is.
   ============================================================================ */
(function () {
  'use strict';
  if (window.__enhDecks) return;
  window.__enhDecks = true;

  var isMobile = function () {
    return window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
  };

  /* Which cards become decks, and which element is their always-visible head.
     Only static (non-stateful) cards are targeted, so React never re-renders
     them in place and the added classes stay put. */
  var CONFIG = [
    {
      card: '.skill-card',
      head: function (c) {
        // skill groups have skill bars → head is the icon+title row (first child);
        // value cards → head is their <h4>
        return c.querySelector('.skill-bar-wrap')
          ? c.firstElementChild
          : (c.querySelector('h4') || c.firstElementChild);
      },
    },
    { card: '.experience-card-v2', head: function (c) { return c.querySelector('.experience-role'); } },
    { card: '.story-chapter', head: function (c) { return c.querySelector('.story-chapter-header'); } },
  ];

  function apply() {
    // Decks work on every viewport. Folded by default on phones (where scroll
    // hurts most); expanded-but-collapsible on desktop.
    var collapseByDefault = isMobile();
    CONFIG.forEach(function (cfg) {
      var cards = document.querySelectorAll(cfg.card);
      [].forEach.call(cards, function (card) {
        if (card.getAttribute('data-enh')) return;
        var head = cfg.head(card);
        if (!head) return;
        card.setAttribute('data-enh', '1');
        card.classList.add('enh-deck');
        if (collapseByDefault) card.classList.add('enh-collapsed');
        head.classList.add('enh-head');
      });
    });
  }

  // One delegated click handler — survives every React re-render.
  document.addEventListener('click', function (e) {
    var head = e.target.closest ? e.target.closest('.enh-head') : null;
    if (!head) return;
    var deck = head.closest('.enh-deck');
    if (deck) deck.classList.toggle('enh-collapsed');
  });

  // Re-apply after the SPA swaps a page (debounced; disconnect while mutating
  // so our own class changes don't re-trigger the observer).
  var timer = null;
  var observer = new MutationObserver(function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      observer.disconnect();
      apply();
      observe();
    }, 120);
  });
  function observe() {
    var root = document.getElementById('root') || document.body;
    if (root) observer.observe(root, { childList: true, subtree: true });
  }

  function init() { apply(); observe(); }

  if (document.getElementById('root')) init();
  else document.addEventListener('DOMContentLoaded', init);
})();

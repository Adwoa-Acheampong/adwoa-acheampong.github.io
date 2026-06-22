/* ============================================================================
   OHEMAA ✦ Adwoa B. Acheampong's real-time AI executive assistant
   Self-contained vanilla JS widget. No dependencies. Injects its own CSS.
   Deploy: <script src="/static/ohemaa.js" defer></script> before </body>.
   Persona: regal, warm, sharp. Speaks of the portfolio as "we", Adwoa 3rd person.
   Knowledge base mirrors the LIVE site content (constants/content.js).
   Palette matches the site: royal-black + gold (#e5b947) + ivory.
   ============================================================================ */
(function () {
  'use strict';
  if (window.__ohemaaLoaded) return;
  window.__ohemaaLoaded = true;

  /* Adwoa's portrait (the live asset). Graceful monogram fallback if absent. */
  var PORTRAIT = 'https://adwoa-acheampong.github.io/static/media/adwoa-potrait.a57ec23d8b550e556a34.png';
  var RESUME_URL = 'https://adwoa-acheampong.github.io/Adwoa%20B.%20Acheampong%20-%20Business%20Operations%20%26%20EA%20(Resume).pdf';
  var PSYCHO_URL = 'https://adwoa-acheampong.github.io/Adwoa-Acheampong-1730042535173-Psychometric.pdf';

  /* ---------------------------------------------------------------- KNOWLEDGE */
  var KB = {
    identity: {
      name: 'Adwoa B. Acheampong',
      alias: 'Miracle',
      title: 'Business Operations Architect & Growth Engineer',
      tagline: 'Tenacious innovator blending Ghanaian system insights with global, data-driven strategy.',
      philosophy: 'Guided by Adinkra wisdom and unyielding grit.',
      superpower: 'Builds scalable systems that turn visions into high-performing businesses.'
    },
    metrics: [
      '120% revenue growth at Baa & Bean Café (GHS 12k → 30k+ daily)',
      '83.3% engagement lift and daily sales GHS 1,200 → 2,700 at Automobiles Ghana',
      '30% office-productivity gain through AppScript + AI automation',
      'Now Statutory Operations Director leading a team of five at JonMon-Sacs Ghana'
    ],
    expertise: [
      'Operations Architecture & SOP Development',
      'Data Analytics — SQL, Power BI, Tableau, Python',
      'Process Optimization & Automation (Google AppScript + AI)',
      'Growth Strategy & Revenue Optimization',
      'Team Leadership, Compliance & Project Management',
      'Full-stack building — React, JavaScript, Node'
    ],
    projects: [
      { name: 'AGL ERP Systems',
        brief: 'The live operations platform at agl.software — Kanban command boards, secure QR-code staff login, role-aware ERP dashboards, a Staff Hub PWA, and 30+ automated tests for Automobiles Ghana Limited.' },
      { name: 'Restaurant Sales Insights — Data Analysis',
        brief: 'Full-year 2023 sales analysis in Python/Pandas — 365 data points, moving-average trends, and executive-ready visualisations.' }
    ],
    pipeline: [
      'Blkk Legacy — the Ghana-based Pan-African holding system connecting training, production, commerce, and community distribution through a stage-gated 18–24 month validation plan.',
      'Blkk Star Hub — the digital commerce spine, beginning with Merchant Hub to prove merchant adoption, customer demand, repeat purchase, unit economics, and working-capital discipline.',
      'Blkk Label — the brand house and manufacturing arm, turning trained capability into culturally authored apparel, fragrance, body care, wellness, and jewellery products with disciplined quality control.'
    ],
    experience: [
      'Statutory Operations Director — JonMon-Sacs Ghana Ltd (Jul 2025 – Present)',
      'Operations Manager — Baa & Bean Café (Feb – Jul 2024)',
      'Operations Consultant — Automobiles Ghana Ltd (2024 & 2026)',
      'Administration Manager — Zein Real Estate (Mar 2023 – Jan 2024)',
      'Marketing Executive — Trident Real Estate Group (2022 – 2023)'
    ],
    certifications: [
      'Data Analysis — ALX', 'Intermediate SQL — DataCamp',
      'Data Analysis Essentials — Cisco', 'Business Management — Oxford Home Study Centre'
    ],
    psychometric: {
      profile: 'A high-agency systems thinker with exceptional executive function.',
      strengths: ['Strategic clarity under pressure', 'Cross-functional synthesis', 'High accountability orientation'],
      workStyle: 'Deep-work focused and outcome-driven; she thrives in high-complexity rooms.'
    },
    contact: {
      email: 'adwoaacheampong728@gmail.com',
      phone: '(233) 276-291-485',
      location: 'Accra, Ghana',
      linkedin: 'https://linkedin.com/in/adwoa-acheampong',
      github: 'https://github.com/adwoa-acheampong'
    }
  };

  var INTERVIEW_Q = [
    "First — what's the nature of the opportunity you're exploring with Adwoa?",
    'What scale are you operating at — startup, growth-stage, or enterprise?',
    "What's your timeline for bringing someone of Adwoa's caliber on board?",
    "What's the primary challenge you need solved?",
    "And finally — how did you discover Adwoa's work?"
  ];
  var INTERVIEW_LABELS = ['Opportunity', 'Scale', 'Timeline', 'Core challenge', 'Discovered via'];

  var HISTORY_KEY = 'ohemaa_history', SEEN_KEY = 'ohemaa_seen';
  var state = { open: false, expanded: false, interview: 0, answers: [], busy: false };

  /* ------------------------------------------------------------------- STYLES */
  var css = [
    '.ohemaa-launcher{position:fixed;right:24px;bottom:84px;width:64px;height:64px;border-radius:50%;cursor:pointer;z-index:999999;border:none;padding:0;background:transparent;animation:ohemaaRing 2.5s ease-in-out infinite;-webkit-tap-highlight-color:transparent;}',
    '.ohemaa-launcher:hover{transform:translateY(-2px) scale(1.04);}',
    '.ohemaa-launcher .ohemaa-ava{animation:ohemaaNudge 4.5s ease-in-out 2.5s infinite;}',
    '.ohemaa-launcher,.ohemaa-panel,.ohemaa-panel *{font-family:"DM Sans","Helvetica Neue",sans-serif;box-sizing:border-box;}',
    '.ohemaa-ava{display:block;width:64px;height:64px;border-radius:50%;overflow:hidden;position:relative;border:2px solid #e5b947;background:radial-gradient(circle at 32% 26%,#f0d478 0%,#e5b947 45%,#9a7b32 100%);background-repeat:no-repeat;box-shadow:0 6px 18px rgba(17,17,17,.45);}',
    '.ohemaa-ava.loaded{background-image:url("' + PORTRAIT + '");background-size:165%;background-position:50% 3%;}',
    '.ohemaa-ava.mono::after{content:"A";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:"Cormorant Garamond",Georgia,serif;font-weight:600;color:#111;font-size:60%;}',
    '.ohemaa-ava.mono::before{content:"\\2726";position:absolute;top:7%;left:50%;transform:translateX(-50%);font-size:24%;color:#111;opacity:.75;}',
    '.ohemaa-tooltip{position:fixed;right:26px;bottom:156px;z-index:999999;background:rgba(17,17,17,.96);color:#f5f0e8;padding:8px 14px;border-radius:10px;font-size:13px;font-weight:500;white-space:nowrap;opacity:0;transform:translateY(6px);pointer-events:none;transition:opacity .25s,transform .25s;border:1px solid rgba(229,185,71,.45);box-shadow:0 8px 24px rgba(0,0,0,.3);}',
    '.ohemaa-launcher:hover + .ohemaa-tooltip{opacity:1;transform:translateY(0);}',
    '.ohemaa-panel{position:fixed;right:24px;bottom:156px;width:var(--ow,328px);height:var(--oh,486px);max-height:calc(100vh - 180px);background:linear-gradient(160deg,rgba(26,26,26,.97),rgba(17,17,17,.98));-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);border:1px solid rgba(201,168,76,.34);border-radius:20px;z-index:999999;display:flex;flex-direction:column;overflow:hidden;transform-origin:bottom right;transform:scale(0);opacity:0;pointer-events:none;transition:transform .45s cubic-bezier(.34,1.56,.64,1),opacity .3s ease,width .3s ease,height .3s ease;box-shadow:0 24px 70px rgba(0,0,0,.5);}',
    '.ohemaa-panel.open{transform:scale(1);opacity:1;pointer-events:auto;}',
    '.ohemaa-panel.expanded{--ow:482px;--oh:624px;}',
    '.ohemaa-header{display:flex;align-items:center;gap:10px;padding:14px;background:linear-gradient(180deg,rgba(229,185,71,.16),rgba(229,185,71,0));border-bottom:1px solid rgba(201,168,76,.24);}',
    '.ohemaa-h-ava{width:40px;height:40px;flex:0 0 40px;animation:avatarGlow 3s ease-in-out infinite;}',
    '.ohemaa-h-ava .ohemaa-ava{width:40px;height:40px;}',
    '.ohemaa-h-meta{flex:1;min-width:0;line-height:1.2;}',
    '.ohemaa-name{color:#f5f0e8;font-family:"Cormorant Garamond",serif;font-weight:600;font-size:17px;letter-spacing:.02em;display:flex;align-items:center;gap:7px;}',
    '.ohemaa-status{width:8px;height:8px;border-radius:50%;background:#3fbf6a;box-shadow:0 0 0 0 rgba(63,191,106,.6);animation:statusPulse 2s infinite;}',
    '.ohemaa-sub{color:#e5b947;font-size:10.5px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;}',
    '.ohemaa-actions{display:flex;gap:2px;}',
    '.ohemaa-actions button{background:none;border:none;color:#c8c0b0;cursor:pointer;font-size:17px;line-height:1;padding:6px;border-radius:8px;transition:background .2s,color .2s;}',
    '.ohemaa-actions button:hover{background:rgba(201,168,76,.18);color:#f5f0e8;}',
    '.ohemaa-body{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:10px;scrollbar-width:thin;scrollbar-color:rgba(201,168,76,.4) transparent;}',
    '.ohemaa-body::-webkit-scrollbar{width:6px;}',
    '.ohemaa-body::-webkit-scrollbar-thumb{background:rgba(201,168,76,.4);border-radius:6px;}',
    '.ohemaa-msg{max-width:85%;padding:10px 13px;font-size:13.5px;line-height:1.55;white-space:pre-wrap;word-wrap:break-word;animation:bubbleIn .35s cubic-bezier(.34,1.56,.64,1) both;}',
    '.ohemaa-msg.bot{align-self:flex-start;background:rgba(42,42,42,.92);color:#f0ebe0;border-left:3px solid #e5b947;border-radius:18px 18px 18px 4px;}',
    '.ohemaa-msg.user{align-self:flex-end;background:linear-gradient(135deg,rgba(229,185,71,.26),rgba(154,123,50,.32));color:#fdfcf9;border:1px solid rgba(229,185,71,.4);border-radius:18px 18px 4px 18px;animation-name:bubbleInRight;}',
    '.ohemaa-msg a{color:#f0d478;text-decoration:underline;}',
    '.ohemaa-typing{align-self:flex-start;display:flex;gap:4px;padding:12px 14px;background:rgba(42,42,42,.92);border-left:3px solid #e5b947;border-radius:18px 18px 18px 4px;}',
    '.ohemaa-typing span{width:7px;height:7px;border-radius:50%;background:#e5b947;display:inline-block;animation:ohemaaBounce 1.2s infinite;}',
    '.ohemaa-typing span:nth-child(2){animation-delay:.2s;}.ohemaa-typing span:nth-child(3){animation-delay:.4s;}',
    '.ohemaa-chips{display:flex;flex-wrap:wrap;gap:7px;align-self:flex-start;max-width:97%;margin-top:2px;}',
    '.ohemaa-chip{background:rgba(229,185,71,.08);color:#f0d478;border:1px solid rgba(201,168,76,.5);border-radius:18px;padding:7px 13px;font-size:12.5px;font-weight:500;cursor:pointer;transition:background .2s,transform .15s,color .2s;animation:chipPop .4s cubic-bezier(.34,1.56,.64,1) both;}',
    '.ohemaa-chip:hover{background:#e5b947;color:#111;transform:translateY(-2px);}',
    '.ohemaa-doc{align-self:flex-start;max-width:92%;display:flex;align-items:center;gap:12px;padding:12px 14px;background:rgba(42,42,42,.95);border:1px solid rgba(201,168,76,.42);border-radius:14px;position:relative;overflow:hidden;animation:bubbleIn .35s ease both;}',
    '.ohemaa-doc::before{content:"";position:absolute;top:0;left:-60%;width:50%;height:100%;background:linear-gradient(120deg,transparent,rgba(240,212,120,.18),transparent);animation:docCardShimmer 3.2s ease-in-out infinite;}',
    '.ohemaa-doc-ico{font-size:24px;flex:0 0 auto;}',
    '.ohemaa-doc-meta{flex:1;min-width:0;}',
    '.ohemaa-doc-title{color:#f5f0e8;font-size:13px;font-weight:600;}',
    '.ohemaa-doc-file{color:#b8963d;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.ohemaa-doc-open{flex:0 0 auto;background:#e5b947;color:#111;border:none;border-radius:9px;padding:7px 14px;font-size:12.5px;font-weight:600;cursor:pointer;z-index:1;transition:transform .15s,box-shadow .2s;}',
    '.ohemaa-doc-open:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(229,185,71,.45);}',
    '.ohemaa-card{align-self:flex-start;max-width:93%;padding:12px 14px;background:rgba(42,42,42,.92);border:1px solid rgba(201,168,76,.3);border-left:3px solid #e5b947;border-radius:14px;font-size:13px;color:#f0ebe0;line-height:1.8;animation:bubbleIn .35s ease both;}',
    '.ohemaa-card a{color:#f0d478;text-decoration:none;}.ohemaa-card a:hover{text-decoration:underline;}',
    '.ohemaa-card .row{display:flex;gap:8px;align-items:center;}',
    '.ohemaa-input-row{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(201,168,76,.24);background:rgba(17,17,17,.6);}',
    '.ohemaa-input{flex:1;background:rgba(245,240,232,.06);border:1px solid rgba(201,168,76,.3);border-radius:12px;padding:11px 13px;color:#f5f0e8;font-size:13.5px;outline:none;transition:border-color .2s;}',
    '.ohemaa-input::placeholder{color:#8a8270;}',
    '.ohemaa-input:focus{border-color:#e5b947;}',
    '.ohemaa-send{flex:0 0 auto;width:42px;height:42px;border-radius:12px;border:none;cursor:pointer;background:linear-gradient(135deg,#e5b947,#b8963d);color:#111;font-size:18px;display:flex;align-items:center;justify-content:center;transition:transform .15s,box-shadow .2s;}',
    '.ohemaa-send:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(229,185,71,.45);}',
    '.ohemaa-foot{text-align:center;font-size:10px;color:#8a8270;padding:6px 0 9px;letter-spacing:.06em;}',
    '@keyframes ohemaaRing{0%,100%{box-shadow:0 0 0 0 rgba(229,185,71,.55),0 8px 22px rgba(17,17,17,.45);}50%{box-shadow:0 0 0 12px rgba(229,185,71,0),0 8px 22px rgba(17,17,17,.45);}}',
    '@keyframes ohemaaBounce{0%,60%,100%{transform:translateY(0);opacity:.5;}30%{transform:translateY(-6px);opacity:1;}}',
    '@keyframes bubbleIn{from{opacity:0;transform:translateX(-18px);}to{opacity:1;transform:translateX(0);}}',
    '@keyframes bubbleInRight{from{opacity:0;transform:translateX(18px);}to{opacity:1;transform:translateX(0);}}',
    '@keyframes chipPop{from{opacity:0;transform:scale(.8);}to{opacity:1;transform:scale(1);}}',
    '@keyframes docCardShimmer{0%{left:-60%;}60%,100%{left:130%;}}',
    '@keyframes avatarGlow{0%,100%{filter:drop-shadow(0 0 2px rgba(229,185,71,.4));}50%{filter:drop-shadow(0 0 9px rgba(229,185,71,.8));}}',
    '@keyframes statusPulse{0%{box-shadow:0 0 0 0 rgba(63,191,106,.6);}70%{box-shadow:0 0 0 6px rgba(63,191,106,0);}100%{box-shadow:0 0 0 0 rgba(63,191,106,0);}}',
    '@keyframes ohemaaNudge{0%,82%,100%{transform:translateY(0) rotate(0);}88%{transform:translateY(-6px) rotate(-7deg);}94%{transform:translateY(-2px) rotate(5deg);}}',
    '@keyframes greetPop{from{opacity:0;transform:scale(.7) translateY(8px);}to{opacity:1;transform:scale(1) translateY(0);}}',
    '@keyframes greetFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-4px);}}',
    '.ohemaa-greet{position:fixed;right:20px;bottom:158px;z-index:999999;max-width:215px;background:linear-gradient(160deg,rgba(42,42,42,.98),rgba(20,20,20,.98));color:#f5f0e8;border:1px solid rgba(229,185,71,.5);border-radius:14px 14px 4px 14px;padding:11px 26px 11px 13px;font-family:"DM Sans",sans-serif;font-size:12.5px;line-height:1.5;box-shadow:0 12px 32px rgba(0,0,0,.45);cursor:pointer;transform-origin:bottom right;animation:greetPop .5s cubic-bezier(.34,1.56,.64,1) both,greetFloat 2.6s ease-in-out 1s infinite;}',
    '.ohemaa-greet b{color:#f0d478;}',
    '.ohemaa-greet .ohemaa-gx{position:absolute;top:5px;right:8px;font-size:12px;color:#b8a06a;opacity:.7;line-height:1;}',
    '.ohemaa-greet .ohemaa-gx:hover{opacity:1;}',
    '.ohemaa-greet::after{content:"";position:absolute;right:18px;bottom:-7px;width:13px;height:13px;background:rgba(20,20,20,.98);border-right:1px solid rgba(229,185,71,.5);border-bottom:1px solid rgba(229,185,71,.5);transform:rotate(45deg);}',
    '@media(max-width:480px){.ohemaa-panel{right:0;left:0;bottom:0;width:100vw!important;height:82vh!important;max-height:82vh;border-radius:20px 20px 0 0;transform-origin:bottom center;}.ohemaa-launcher{right:16px;bottom:76px;}.ohemaa-greet{right:12px;bottom:148px;max-width:200px;}}',
    '@media(prefers-reduced-motion:reduce){.ohemaa-launcher,.ohemaa-launcher .ohemaa-ava,.ohemaa-greet,.ohemaa-h-ava,.ohemaa-status,.ohemaa-doc::before,.ohemaa-msg,.ohemaa-chip{animation:none!important;}.ohemaa-panel{transition:opacity .2s ease!important;}}'
  ].join('\n');

  /* --------------------------------------------------------------- BUILD DOM */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function avatar(size) {
    var a = el('span', 'ohemaa-ava');
    a.setAttribute('role', 'img');
    a.setAttribute('aria-label', 'Adwoa B. Acheampong');
    if (size) { a.style.width = a.style.height = size + 'px'; }
    var probe = new Image();
    probe.referrerPolicy = 'no-referrer';
    probe.onload = function () { a.classList.add('loaded'); };
    probe.onerror = function () { a.classList.add('mono'); };
    probe.src = PORTRAIT;
    return a;
  }
  function escapeText(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

  var styleEl = el('style'); styleEl.id = 'ohemaa-styles'; styleEl.textContent = css;
  document.head.appendChild(styleEl);

  var launcher = el('button', 'ohemaa-launcher');
  launcher.setAttribute('aria-label', 'Ask Ohemaa, Adwoa’s AI assistant');
  launcher.appendChild(avatar(64));
  var tooltip = el('div', 'ohemaa-tooltip', 'Ask Ohemaa');

  var panel = el('div', 'ohemaa-panel');
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Chat with Ohemaa');

  var header = el('div', 'ohemaa-header');
  var hAva = el('div', 'ohemaa-h-ava'); hAva.appendChild(avatar(40));
  var hMeta = el('div', 'ohemaa-h-meta');
  hMeta.appendChild(el('div', 'ohemaa-name', 'Ohemaa <span class="ohemaa-status" title="Online"></span>'));
  hMeta.appendChild(el('div', 'ohemaa-sub', "Adwoa’s AI Assistant"));
  var actions = el('div', 'ohemaa-actions');
  var expandBtn = el('button', null, '⤢'); expandBtn.title = 'Expand';
  var closeBtn = el('button', null, '✕'); closeBtn.title = 'Close';
  actions.appendChild(expandBtn); actions.appendChild(closeBtn);
  header.appendChild(hAva); header.appendChild(hMeta); header.appendChild(actions);

  var body = el('div', 'ohemaa-body');

  var inputRow = el('div', 'ohemaa-input-row');
  var input = el('input', 'ohemaa-input');
  input.type = 'text'; input.placeholder = 'Ask about Adwoa…'; input.setAttribute('aria-label', 'Message Ohemaa');
  var sendBtn = el('button', 'ohemaa-send', '↑'); sendBtn.title = 'Send';
  inputRow.appendChild(input); inputRow.appendChild(sendBtn);

  var foot = el('div', 'ohemaa-foot', 'Powered by Adinkra Intelligence Systems');

  panel.appendChild(header); panel.appendChild(body); panel.appendChild(inputRow); panel.appendChild(foot);

  function mount() {
    document.body.appendChild(launcher);
    document.body.appendChild(tooltip);
    document.body.appendChild(panel);
  }

  /* ------------------------------------------------------------- RENDERING */
  function scrollBottom() { body.scrollTop = body.scrollHeight; }
  function pushHistory(role, text) {
    try {
      var h = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      h.push({ role: role, text: text });
      if (h.length > 60) h = h.slice(-60);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
    } catch (e) {}
  }
  function addUser(text, skipSave) {
    body.appendChild(el('div', 'ohemaa-msg user', escapeText(text))); scrollBottom();
    if (!skipSave) pushHistory('user', text);
  }
  function addBot(text, skipSave) {
    body.appendChild(el('div', 'ohemaa-msg bot', escapeText(text))); scrollBottom();
    if (!skipSave) pushHistory('bot', text);
  }
  function showTyping() {
    var t = el('div', 'ohemaa-typing', '<span></span><span></span><span></span>');
    body.appendChild(t); scrollBottom(); return t;
  }
  function addChips(items) {
    var wrap = el('div', 'ohemaa-chips');
    items.forEach(function (it, i) {
      var c = el('button', 'ohemaa-chip', escapeText(it.label));
      c.style.animationDelay = (i * 0.07) + 's';
      c.addEventListener('click', function () {
        wrap.remove();
        if (it.action) { it.action(); }
        else if (it.intent) { addUser(it.label); route(it.intent); }
      });
      wrap.appendChild(c);
    });
    body.appendChild(wrap); scrollBottom();
  }
  function addDocCard(title, filename, url) {
    var card = el('div', 'ohemaa-doc');
    card.appendChild(el('div', 'ohemaa-doc-ico', '📄'));
    var meta = el('div', 'ohemaa-doc-meta');
    meta.appendChild(el('div', 'ohemaa-doc-title', escapeText(title)));
    meta.appendChild(el('div', 'ohemaa-doc-file', escapeText(filename)));
    card.appendChild(meta);
    var open = el('button', 'ohemaa-doc-open', 'Open');
    open.addEventListener('click', function () { window.open(url, '_blank', 'noopener'); });
    card.appendChild(open);
    body.appendChild(card); scrollBottom();
  }
  function addContactCard() {
    var c = KB.contact;
    var card = el('div', 'ohemaa-card');
    card.innerHTML =
      '<div class="row">✉️ <a href="mailto:' + c.email + '">' + c.email + '</a></div>' +
      '<div class="row">☎️ <a href="tel:' + c.phone.replace(/[^0-9+]/g, '') + '">' + c.phone + '</a></div>' +
      '<div class="row">🔗 <a href="' + c.linkedin + '" target="_blank" rel="noopener">LinkedIn</a></div>' +
      '<div class="row">📍 ' + c.location + '</div>';
    body.appendChild(card); scrollBottom();
  }

  function botSay(text, opts) {
    opts = opts || {};
    state.busy = true;
    var typing = showTyping();
    var delay = opts.delay != null ? opts.delay : Math.min(900, 360 + text.length * 6);
    setTimeout(function () {
      if (typing && typing.parentNode) typing.remove();
      addBot(text);
      if (opts.doc) addDocCard(opts.doc.title, opts.doc.file, opts.doc.url);
      if (opts.contact) addContactCard();
      if (opts.chips) addChips(opts.chips);
      state.busy = false;
      scrollBottom();
    }, delay);
  }

  /* --------------------------------------------------------------- ACTIONS */
  function goToContact() {
    var tabs = [].slice.call(document.querySelectorAll('.nav-tab'));
    var b = tabs.filter(function (x) { return /contact/i.test(x.textContent); })[0];
    if (b) {
      b.click();
      botSay("Taking you to Adwoa’s contact page now. ✦ You’ll find it just behind me.", { delay: 300 });
    } else {
      botSay('Here is how to reach Adwoa directly:', { delay: 300, contact: true });
    }
  }
  function openLink(url) { return function () { window.open(url, '_blank', 'noopener'); }; }

  var WELCOME_CHIPS = [
    { label: 'About Adwoa', intent: 'bio' },
    { label: 'See Resume', intent: 'resume' },
    { label: 'Current Projects', intent: 'projects' },
    { label: 'Quick Interview', intent: 'interview' },
    { label: 'Psychometric Profile', intent: 'psychometric' }
  ];
  var DEFAULT_CHIPS = [
    { label: 'About Adwoa', intent: 'bio' },
    { label: 'Current Projects', intent: 'projects' },
    { label: 'See Resume', intent: 'resume' },
    { label: 'Quick Interview', intent: 'interview' }
  ];

  /* --------------------------------------------------------------- ENGINE */
  function detectIntent(t) {
    t = (' ' + t.toLowerCase() + ' ');
    var has = function () { for (var i = 0; i < arguments.length; i++) { if (t.indexOf(arguments[i]) > -1) return true; } return false; };
    if (has('interview', 'screen', 'pre-screen', 'prescreen', 'assess', 'vet ', 'quick question')) return 'interview';
    if (has('resume', 'cv ', 'curriculum')) return 'resume';
    if (has('psychometric', 'personality')) {
      if (has('file', 'download', 'pdf', 'report', 'document')) return 'psychodoc';
      return 'psychometric';
    }
    if (has('pipeline', 'merchant hub', 'upcoming', 'building next', 'roadmap')) return 'pipeline';
    if (has('project', 'case stud', 'working on', 'portfolio', 'agl', 'agl erp', 'built')) return 'projects';
    if (has('experience', 'background', 'career', 'work history', 'where has', 'roles', 'jobs')) return 'experience';
    if (has('skill', 'expert', 'stack', 'tools', 'certif', 'tech')) return 'skills';
    if (has('contact', 'reach', 'connect', 'hire', 'email', 'work together', 'collaborat', 'get in touch', 'book ', 'call')) return 'contact';
    if (has('what can you', 'what do you do', 'help', 'capab', 'who are you')) return 'capabilities';
    if (has('who is', 'about adwoa', 'tell me', 'bio', 'story', 'about her', ' who ')) return 'bio';
    if (has(' hi ', 'hello', ' hey ', 'akwaaba', 'good morning', 'good afternoon', 'good evening', 'greetings')) return 'greeting';
    if (has('thank', 'medaase', 'cheers', 'appreciate')) return 'thanks';
    return 'fallback';
  }

  function route(intent) {
    switch (intent) {
      case 'greeting':
        botSay("Akwaaba — welcome. ✦ I am Ohemaa, Adwoa’s assistant. How may I serve you today?", { chips: DEFAULT_CHIPS });
        break;
      case 'bio':
        botSay("Adwoa B. Acheampong — “Miracle” — is a Business Operations Architect & Growth Engineer in Accra. She blends Ghanaian system insight with global, data-driven strategy, guided by Adinkra wisdom and unyielding grit. The proof is in her track record: 120% revenue growth at Baa & Bean Café, an 83.3% engagement lift at Automobiles Ghana, and 30% productivity gains through automation.",
          { chips: [{ label: 'Her Projects', intent: 'projects' }, { label: 'Her Experience', intent: 'experience' }, { label: 'Psychometric Profile', intent: 'psychometric' }] });
        break;
      case 'experience':
        botSay("Adwoa has built across operations, real estate, hospitality and automotive:\n\n• " + KB.experience.join('\n• '),
          { chips: [{ label: 'See Resume', intent: 'resume' }, { label: 'Her Projects', intent: 'projects' }, { label: 'Her Skills', intent: 'skills' }] });
        break;
      case 'projects':
        var p = KB.projects.map(function (x) { return '✦ ' + x.name + '\n' + x.brief; }).join('\n\n');
        botSay("Signature work she has shipped:\n\n" + p,
          { chips: [{ label: 'In the Pipeline', intent: 'pipeline' }, { label: 'See Resume', intent: 'resume' }, { label: 'Quick Interview', intent: 'interview' }] });
        break;
      case 'pipeline':
        botSay("What we’re building next:\n\n✦ " + KB.pipeline.join('\n\n✦ '),
          { chips: [{ label: 'Shipped Projects', intent: 'projects' }, { label: 'Reach Adwoa', intent: 'contact' }] });
        break;
      case 'skills':
        botSay("Her toolkit:\n\n• " + KB.expertise.join('\n• ') + "\n\nCertified in: " + KB.certifications.join(' · ') + ".",
          { chips: [{ label: 'Her Projects', intent: 'projects' }, { label: 'See Resume', intent: 'resume' }] });
        break;
      case 'psychometric':
        botSay(KB.psychometric.profile + " Her strengths: " + KB.psychometric.strengths.join(', ').toLowerCase() + ". " + KB.psychometric.workStyle,
          { chips: [{ label: 'Open the full report', intent: 'psychodoc' }, { label: 'About Adwoa', intent: 'bio' }] });
        break;
      case 'resume':
        botSay("Here is Adwoa’s résumé — straight from her desk. Medaase for your interest.",
          { doc: { title: 'Résumé', file: 'Adwoa B. Acheampong — Resume.pdf', url: RESUME_URL }, chips: [{ label: 'Psychometric Report', intent: 'psychodoc' }, { label: 'Quick Interview', intent: 'interview' }] });
        break;
      case 'psychodoc':
        botSay("Her psychometric report — a clear window into how she thinks and leads.",
          { doc: { title: 'Psychometric Report', file: 'Adwoa Acheampong — Psychometric.pdf', url: PSYCHO_URL }, chips: [{ label: 'About Adwoa', intent: 'bio' }] });
        break;
      case 'contact':
        botSay("Let’s get you to Adwoa directly. ✦ Here are her details — or I can open her contact page for you.",
          { contact: true, chips: [{ label: 'Open Contact page', action: goToContact }, { label: 'Connect on LinkedIn', action: openLink(KB.contact.linkedin) }] });
        break;
      case 'capabilities':
        botSay("I can brief you on Adwoa’s story, experience, projects and pipeline, pull her résumé or psychometric report, or run a sharp five-question pre-screen for serious opportunities. Shall I go deeper?",
          { chips: WELCOME_CHIPS });
        break;
      case 'interview':
        startInterview();
        break;
      case 'thanks':
        botSay("Medaase — the pleasure is mine. ✦ Shall I go deeper on anything?", { chips: DEFAULT_CHIPS });
        break;
      default:
        botSay("I want to brief you well. I can speak to Adwoa’s story, experience, projects, pipeline or psychometric profile, share her documents, or run a quick pre-screen — which way shall we go?",
          { chips: DEFAULT_CHIPS });
    }
  }

  function startInterview() {
    state.interview = 1; state.answers = [];
    botSay("Wonderful. ✦ A few sharp questions so I can brief Adwoa properly — answer in your own words. Type “cancel” anytime to stop.", { delay: 320 });
    setTimeout(function () { botSay(INTERVIEW_Q[0], { delay: 280 }); }, 950);
  }
  function stepInterview(ans) {
    if (/^\s*(cancel|stop|exit|quit|never\s?mind)\s*$/i.test(ans)) {
      state.interview = 0; state.answers = [];
      botSay("No trouble at all — we can pick this up whenever you’re ready. ✦", { chips: DEFAULT_CHIPS });
      return;
    }
    state.answers.push(ans);
    if (state.interview < 5) {
      state.interview++;
      botSay(INTERVIEW_Q[state.interview - 1]);
    } else {
      var a = state.answers.slice();
      state.interview = 0; state.answers = [];
      var lines = a.map(function (x, i) { return '• ' + INTERVIEW_LABELS[i] + ': ' + x; }).join('\n');
      botSay("Medaase — here’s the brief I’ve captured for Adwoa:\n\n" + lines + "\n\nI’ll make sure Adwoa reviews this personally. In the meantime, here’s how to reach her directly:",
        { contact: true, chips: [{ label: 'Connect on LinkedIn', action: openLink(KB.contact.linkedin) }, { label: 'Open Contact page', action: goToContact }] });
    }
  }

  function handleSend() {
    var text = input.value.trim();
    if (!text || state.busy) return;
    input.value = '';
    addUser(text);
    if (state.interview > 0) { stepInterview(text); return; }
    route(detectIntent(text));
  }

  /* --------------------------------------------------------------- WELCOME */
  function runWelcome() {
    botSay("Akwaaba — welcome. ✦ I’m Ohemaa, Adwoa’s personal AI assistant.", { delay: 360 });
    setTimeout(function () {
      botSay("I can brief you on her work, run a quick pre-screen, or pull her documents from her desk.", { delay: 360 });
    }, 1150);
    setTimeout(function () {
      botSay("What would you like to know?", { delay: 320, chips: WELCOME_CHIPS });
    }, 2300);
  }
  function restoreHistory() {
    var h = [];
    try { h = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch (e) {}
    if (!h.length) return false;
    h.forEach(function (m) { if (m.role === 'user') addUser(m.text, true); else addBot(m.text, true); });
    scrollBottom();
    return true;
  }

  /* --------------------------------------------------------------- OPEN/CLOSE */
  var firstOpenDone = false;
  function openPanel() {
    if (state.open) return;
    state.open = true;
    if (state.greetHide) state.greetHide();
    panel.classList.add('open');
    launcher.style.display = 'none'; tooltip.style.display = 'none';
    setTimeout(function () { input.focus(); }, 300);
    if (!firstOpenDone) {
      firstOpenDone = true;
      var seen = false;
      try { seen = !!localStorage.getItem(SEEN_KEY); } catch (e) {}
      var restored = restoreHistory();
      if (!seen || !restored) {
        runWelcome();
        try { localStorage.setItem(SEEN_KEY, '1'); } catch (e) {}
      }
    }
  }
  function closePanel() {
    state.open = false;
    panel.classList.remove('open');
    launcher.style.display = ''; tooltip.style.display = '';
  }
  function toggleExpand() { state.expanded = !state.expanded; panel.classList.toggle('expanded', state.expanded); }

  launcher.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);
  expandBtn.addEventListener('click', toggleExpand);
  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); handleSend(); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && state.open) closePanel(); });

  /* --------------------------------------------------------------- GREETING */
  function showGreeting() {
    if (state.open || state.greeted) return;
    state.greeted = true;
    var g = el('div', 'ohemaa-greet',
      '<span class="ohemaa-gx" title="Dismiss">✕</span><b>Akwaaba!</b> 👋 I’m Ohemaa — ask me anything about Adwoa. ✦');
    document.body.appendChild(g);
    var hide = function () {
      if (!g.parentNode) return;
      g.style.animation = 'greetPop .26s cubic-bezier(.4,0,1,1) reverse forwards';
      setTimeout(function () { if (g.parentNode) g.remove(); }, 260);
      state.greetHide = null;
    };
    state.greetHide = hide;
    g.addEventListener('click', function (e) {
      e.stopPropagation();
      var dismiss = e.target && e.target.className === 'ohemaa-gx';
      hide();
      if (!dismiss) openPanel();
    });
    setTimeout(hide, 9000);
  }
  function maybeGreet() {
    /* Keep the first mobile view unobstructed; the launcher remains available. */
    if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return;
    var seen = false;
    try { seen = !!localStorage.getItem(SEEN_KEY); } catch (e) {}
    if (!seen) setTimeout(showGreeting, 2800);
  }

  /* --------------------------------------------------------------- INIT */
  if (document.body) { mount(); maybeGreet(); }
  else document.addEventListener('DOMContentLoaded', function () { mount(); maybeGreet(); });
})();

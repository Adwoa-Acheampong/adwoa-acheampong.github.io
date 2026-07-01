/* ==========================================================================\n+   Portfolio content migration layer\n+   Keeps the deployed React bundle current without disturbing its interactions.\n+   Re-applies after SPA navigation or React state updates.\n+   ========================================================================== */
(function () {
  'use strict';
  if (window.__legacyContentOverrides) return;
  window.__legacyContentOverrides = true;

  function text(el, value) {
    if (el && el.textContent !== value) el.textContent = value;
  }

  function buttonLabel(button, value) {
    if (!button) return;
    var node = Array.prototype.find.call(button.childNodes, function (n) {
      return n.nodeType === 3 && n.nodeValue.trim();
    });
    if (node) node.nodeValue = value + ' ';
    else button.insertBefore(document.createTextNode(value + ' '), button.firstChild);
  }

  function hideCard(card) {
    if (!card) return;
    card.classList.remove('enh-deck', 'enh-collapsed');
    Array.prototype.forEach.call(card.querySelectorAll('.enh-head'), function (head) {
      head.classList.remove('enh-head');
    });
    card.classList.add('content-removed');
    var wrap = card.closest('.scroll-reveal');
    if (wrap) wrap.classList.add('content-removed');
  }

  function updateAglProject() {
    var projectsPage = document.querySelector('.kente-dark-bg');
    if (projectsPage) {
      var projectsSubtitle = projectsPage.querySelector('.section-subtitle');
      if (projectsSubtitle && /Case studies from the field/i.test(projectsSubtitle.textContent)) {
        text(projectsSubtitle, 'Enterprise systems and data engagements built to make complex operations visible, accountable, and scalable.');
      }
    }
    var cards = Array.prototype.slice.call(document.querySelectorAll('.case-study'));
    cards.forEach(function (card) {
      var title = card.querySelector('.case-title');
      if (title && /Avenue Lincoln/i.test(title.textContent)) hideCard(card);
    });

    var card = cards.filter(function (item) {
      var title = item.querySelector('.case-title');
      return title && /AGL Ops|AGL ERP Systems/i.test(title.textContent);
    })[0];
    if (!card) return;

    card.classList.add('agl-system-card');
    var title = card.querySelector('.case-title');
    if (title && !title.querySelector('.agl-title-link')) {
      title.innerHTML = '<a class="agl-title-link" href="https://agl.software" target="_blank" rel="noopener noreferrer">AGL ERP Systems</a>';
    }

    text(card.querySelector('.case-category'), 'Enterprise Systems & Operations');
    text(card.querySelector('.case-client'), '· Automobiles Ghana Limited');
    text(card.querySelector('.case-subtitle'), 'Multi-Department ERP & Staff Operations Suite');
    text(card.querySelector('.case-status-badge'), 'Live Platform');
    text(card.querySelector('.case-hero-desc'),
      'AGL ERP Systems is the live operating layer for Automobiles Ghana Limited — uniting executive oversight, customer pipelines, staff workflows, workshop activity, inventory, and finance in one responsive system. Kanban dashboards move work from enquiry to delivery, while secure QR-code logins give frontline teams instant, role-aware access without password friction.');

    var metrics = [
      ['14+', 'ERP Dashboards'],
      ['Kanban', 'Workflow Control'],
      ['QR', 'Secure Staff Login'],
      ['30+', 'Automated Tests']
    ];
    Array.prototype.forEach.call(card.querySelectorAll('.case-metric'), function (metric, i) {
      if (!metrics[i]) return;
      text(metric.querySelector('.case-metric-value'), metrics[i][0]);
      text(metric.querySelector('.case-metric-label'), metrics[i][1]);
    });

    var narrative = [
      'Core operations were fragmented across spreadsheets, chat threads, paper handoffs, and disconnected department updates. Leadership needed live visibility; teams needed a system fast enough for the floor, workshop, warehouse, and sales desk.',
      'I architected a connected ERP and Staff Hub around the way AGL actually works. Visual Kanban boards make every lead, vehicle, task, and work order accountable. QR-code authentication lets staff enter the right workspace in seconds, while role-based dashboards protect sensitive finance and management views.',
      'AGL now has one operational spine at agl.software: clearer handoffs, auditable activity, real-time management visibility, and a platform designed to scale across branches without returning to spreadsheet chaos.'
    ];
    Array.prototype.forEach.call(card.querySelectorAll('.case-block p'), function (paragraph, i) {
      if (narrative[i]) text(paragraph, narrative[i]);
    });

    var tech = ['Kanban Workflows', 'QR Authentication', 'Role-Based Access', 'PWA', 'Google Sheets API', 'Playwright', 'JavaScript'];
    var techRow = card.querySelector('.case-tech-row');
    if (techRow) {
      techRow.innerHTML = tech.map(function (item) {
        return '<span class="tech-badge">' + item + '</span>';
      }).join('');
    }

    var expand = card.querySelector('.project-expand-btn');
    buttonLabel(expand, card.querySelector('.case-features-list') ? 'Hide System Features' : 'Explore System Features');
    if (expand && !card.querySelector('.agl-live-link')) {
      var link = document.createElement('a');
      link.className = 'project-link agl-live-link';
      link.href = 'https://agl.software';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Open agl.software ↗';
      expand.parentNode.insertBefore(link, expand);
    }

    var features = [
      'Kanban command boards for sales, workshop jobs, approvals, and delivery handoffs',
      'Secure QR-code login for rapid, role-aware access on shared and mobile devices',
      'Executive dashboards for revenue, pipeline, productivity, inventory, and compliance',
      'Staff Hub PWA for attendance, assignments, task evidence, and work-order closure',
      'Vehicle, parts, inventory, POS, and warehouse movement tracking in one system',
      'Automated reporting with Google Sheets synchronization and export-ready records',
      'Permission controls for administrators, managers, supervisors, and frontline staff',
      'Playwright coverage across critical operational flows for safer weekly releases'
    ];
    var featureList = card.querySelector('.case-features-list');
    if (featureList) {
      featureList.innerHTML = features.map(function (item) { return '<li>' + item + '</li>'; }).join('');
    }

    if (!card.querySelector('.agl-proof-gallery')) {
      var gallery = document.createElement('section');
      gallery.className = 'agl-proof-gallery';
      gallery.innerHTML = '<div class="agl-proof-intro"><span>Platform evidence</span><h4>Inside AGL ERP Systems</h4><p>Publication-safe views of the live system. Staff, customer, vehicle, audit, payroll, and internal financial data have been redacted.</p></div>' +
        '<div class="agl-proof-grid">' + [
          ['/images/agl-erp/agl-dashboard.png', 'Executive dashboard', 'A single command view links workshop, finance, people, inventory, and customer operations.'],
          ['/images/agl-erp/agl-workshop-kanban.png', 'Workshop Kanban', 'Live job cards move between intake, in progress, ready, and completed bays.'],
          ['/images/agl-erp/agl-finance-bi.png', 'Finance & BI', 'Management reporting combines revenue, orders, operating expense, margin, utilization, and channel performance.'],
          ['/images/agl-erp/agl-business-reports.png', 'Business reports', 'Teams can assemble period reports from selected operational, workshop, attendance, payroll, and roster modules.'],
          ['/images/agl-erp/agl-print-to-pdf.png', 'Print / Save as PDF', 'Browser-ready report output supports a clean Save as PDF workflow for management packs.'],
          ['/images/agl-erp/agl-hr-performance.png', 'HR performance', 'Role-aware HR views bring attendance, payroll, documents, training, and performance into one workspace.'],
          ['/images/agl-erp/agl-qr-attendance.png', 'QR-secured staff access', 'Shop QR access unlocks attendance controls while keeping staff sessions and payroll views role-aware.'],
          ['/images/agl-erp/agl-quick-actions.png', 'Operational shortcuts', 'One-tap actions reduce navigation time for appointments, customers, stock, expenses, rosters, and the job board.']
        ].map(function (item) {
          return '<figure class="agl-proof-card"><div class="agl-proof-media"><img src="' + item[0] + '" alt="' + item[1] + ' view in AGL ERP Systems" loading="lazy"></div><figcaption><strong>' + item[1] + '</strong><span>' + item[2] + '</span></figcaption></figure>';
        }).join('') + '</div>';
      var narrativeRoot = card.querySelector('.case-narrative') || featureList || card.lastElementChild;
      if (narrativeRoot && narrativeRoot.parentNode) narrativeRoot.parentNode.insertBefore(gallery, narrativeRoot.nextSibling);
    }

    var charts = document.querySelectorAll('.impact-chart-card');
    if (charts[1]) text(charts[1].querySelector('h4'), 'AGL ERP Systems');
  }

  function updateExperience() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.experience-card-v2'));
    var card = cards.filter(function (item) {
      var content = item.textContent || '';
      return /The Merchant Hub|Founder & Operations Architect|AGL Command Center|Staff Hub PWA|Playwright test suite/i.test(content);
    })[0];
    if (!card) return;

    text(card.querySelector('.experience-period'), '2026 - Present');
    text(card.querySelector('.experience-role'), 'Co-founder & Strategist');
    text(card.querySelector('.experience-company'), 'Blkk Legacy');

    var summary = card.querySelector('.experience-summary');
    if (summary) {
      text(summary, 'Co-building the strategy, structure, and validation path for Blkk Legacy: a Ghana-based Pan-African venture system connecting skills training, production, commerce, and culturally grounded brand development.');
    }

    var metrics = [
      ['18-24', 'Month validation plan'],
      ['3', 'Core venture engines'],
      ['Phase 1', 'Pre-capital pilot']
    ];
    Array.prototype.forEach.call(card.querySelectorAll('.experience-metric'), function (metric, i) {
      if (!metrics[i]) return;
      text(metric.querySelector('.metric-value'), metrics[i][0]);
      text(metric.querySelector('.metric-label'), metrics[i][1]);
    });

    var highlights = [
      'Defined the operating thesis for Blkk Legacy as a staged venture system, not a single storefront or campaign.',
      'Mapped the first validation loop across Blkk Legacy, Blkk Star Hub, and Blkk Label so each arm proves demand, controls, and unit economics before expansion.',
      'Translated the business brief into investor-ready strategy, pipeline structure, and public-facing language that separates concept work from live AGL ERP delivery.'
    ];
    var list = card.querySelector('.experience-highlights');
    if (list) {
      list.innerHTML = highlights.map(function (item) { return '<li>' + item + '</li>'; }).join('');
    }
  }

  function updatePipeline() {
    var page = document.querySelector('.adinkra-texture-bg');
    var grid = page && page.querySelector('.pipeline-grid');
    if (!page || !grid) return;

    var heading = page.querySelector('.section-title');
    if (heading && /Pipeline Projects|Blkk Legacy|Pipeline/i.test(heading.textContent)) text(heading, 'Pipeline');
    var subtitle = page.querySelector('.section-subtitle');
    if (subtitle) text(subtitle, 'Three connected engines: the holding system, its commerce spine, and its brand-and-production arm.');

    if (!grid.querySelector('.blkk-pipeline-card')) {
      var projects = [
        {
          slug: 'legacy', status: 'Ideation / Pre-validation', title: 'Blkk Legacy',
          tagline: 'The Pan-African holding company and operating system.',
          image: '/images/blkk-pipeline/blkk-legacy-campus.png',
          imageAlt: 'Concept rendering of the proposed Blkk Legacy campus in Greater Accra',
          vision: 'A Ghana-based system designed to connect vocational training, branded production, digital commerce, and community distribution. The immediate mandate is disciplined validation through an 18–24 month pilot before capital-intensive campus, land, energy, gold, and franchise expansion.',
          bullets: [
            'Stage-gated capital: each arm must prove demand, economics, controls, and regulatory readiness before expansion.',
            'Critical path: legal entity → training → product → digital channel → distribution → reinvestment.',
            'Long-term ambition: local value addition, skilled employment, manufacturing capacity, and generational wealth.'
          ]
        },
        {
          slug: 'star-hub', status: 'Phase 1 Platform', title: 'Blkk Star Hub',
          tagline: 'The digital commerce and platform spine.',
          image: '/images/blkk-pipeline/blkk-star-hub-commerce.png',
          imageAlt: 'Luxury marketplace concept representing commerce inside Blkk Star Hub',
          vision: 'Blkk Star Hub is the digital commerce spine for the Blkk Legacy system. It gives buyers, makers, and merchants one trusted route to market, captures demand, and returns customer data to production, pricing, inventory, and training.',
          bullets: [
            'Phase 1: curated marketplace, merchant onboarding, checkout, fulfilment, and customer feedback.',
            'Farmers Hub, AutoHub, and Estate Hub follow only after the common verification and commerce rails are proven.',
            'Phase 1 validates merchant adoption, GMV, repeat purchase, unit economics, and working-capital discipline.'
          ]
        },
        {
          slug: 'label', status: 'Parallel Phase 1 Arm', title: 'Blkk Label',
          tagline: 'The brand house and manufacturing ecosystem.',
          image: '/images/blkk-pipeline/blkk-label-apparel.png',
          imageAlt: 'Black tailored jacket concept for the Blkk Label luxury brand',
          vision: 'Blkk Label turns training and production into market-ready goods with clear standards, packaging, quality control, and cultural authorship. Its product families build demand for Blkk Star Hub while proving the economics of African luxury made at source.',
          bullets: [
            'Crushed Diamonds, Havilah, and Nubia operate as distinct identities on one shared production platform.',
            'Initial lawful product lines can include tailored apparel, fragrance, body care, wellness, and jewellery finishing.',
            'Regulated hemp-linked products launch only after the required licences, registrations, reviews, and operating controls.'
          ]
        }
      ];

      grid.innerHTML = projects.map(function (item, index) {
        var collapsed = index > 0 || (window.matchMedia && window.matchMedia('(max-width: 680px)').matches);
        var bullets = item.bullets.map(function (bullet) { return '<li>' + bullet + '</li>'; }).join('');
        return '<article class="pipeline-card blkk-pipeline-card blkk-' + item.slug + '-card' + (collapsed ? ' blkk-collapsed' : '') + '">' +
          '<div class="blkk-pipeline-media"><img src="' + item.image + '" alt="' + item.imageAlt + '" loading="lazy"></div>' +
          '<div class="blkk-pipeline-shell"><div class="blkk-pipeline-head"><div>' +
            '<span class="pipeline-status">' + item.status + '</span>' +
            '<h3 class="pipeline-project-title">' + item.title + '</h3>' +
            '<p class="pipeline-tagline">' + item.tagline + '</p>' +
          '</div><button class="blkk-pipeline-toggle" type="button" aria-expanded="' + (collapsed ? 'false' : 'true') + '" aria-label="Toggle ' + item.title + ' details"><span aria-hidden="true"></span></button></div>' +
          '<div class="blkk-pipeline-body"><p class="pipeline-vision">' + item.vision + '</p><ul class="blkk-pipeline-points">' + bullets + '</ul></div></div></article>';
      }).join('');
    }

    var roadmap = page.querySelector('.pipeline-roadmap');
    if (roadmap) {
      text(roadmap.querySelector('.roadmap-title'), 'Validation Roadmap');
      var roadmapCopy = [
        ['Now', 'Build the Phase 1 loop: Blkk Legacy strategy, Blkk Star Hub demand, and Blkk Label product samples on rented infrastructure.'],
        ['Validate', 'Prove customer demand, merchant adoption, production economics, training outcomes, regulatory pathways, and working-capital controls.'],
        ['Scale', 'Expand distribution and infrastructure only after the first operating loop produces repeatable evidence and reinvestable surplus.']
      ];
      Array.prototype.forEach.call(roadmap.querySelectorAll('.roadmap-step'), function (step, i) {
        if (!roadmapCopy[i]) return;
        text(step.querySelector('.roadmap-phase'), roadmapCopy[i][0]);
        text(step.querySelector('p'), roadmapCopy[i][1]);
      });
    }
  }

  if (!window.__blkkPipelineToggle) {
    window.__blkkPipelineToggle = true;
    document.addEventListener('click', function (event) {
      var toggle = event.target.closest && event.target.closest('.blkk-pipeline-toggle');
      if (!toggle) return;
      var card = toggle.closest('.blkk-pipeline-card');
      if (!card) return;
      var collapsed = card.classList.toggle('blkk-collapsed');
      toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    });
  }

  function updateBrandCredit() {
    Array.prototype.forEach.call(document.querySelectorAll('.site-footer p'), function (item) {
      if (/Powered by/i.test(item.textContent)) {
        text(item, '© 2026 Adwoa B. Acheampong — Powered by Adinkra Intelligence Systems');
      }
    });
  }

  function updateContact() {
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="mailto:"]'), function (link) {
      link.href = 'mailto:cc@aacheampong.com';
      var value = link.querySelector('.contact-card p:last-child');
      if (value) text(value, 'cc@aacheampong.com');
      else if (/adwoaacheampong728@gmail\.com/i.test(link.textContent)) text(link, 'cc@aacheampong.com');
    });
  }

  function updateDocumentLinks() {
    Array.prototype.forEach.call(document.querySelectorAll('a[href], button'), function (item) {
      var href = item.getAttribute && item.getAttribute('href');
      var label = (item.textContent || '').trim();
      var resumeHit = /resume/i.test(label) || /Adwoa.*Resume|Resume\.pdf/i.test(href || '');
      var psychoHit = /psychometric|psychometric profile|assessment profile/i.test(label) || /Psychometric/i.test(href || '');

      if (resumeHit && href !== null) {
        item.setAttribute('href', '/resume.html');
        item.removeAttribute('download');
        item.setAttribute('target', '_self');
      }

      if (psychoHit && href !== null) {
        item.setAttribute('href', '/psychometric.html');
        item.removeAttribute('download');
        item.setAttribute('target', '_self');
      }

      if ((resumeHit || psychoHit) && item.tagName === 'BUTTON' && !item.dataset.documentRouted) {
        item.dataset.documentRouted = 'true';
        item.addEventListener('click', function () {
          window.location.href = resumeHit ? '/resume.html' : '/psychometric.html';
        });
      }
    });
  }

  function updateContactHub() {
    if (document.querySelector('.portfolio-contact-qr')) return;
    var containers = Array.prototype.slice.call(document.querySelectorAll('section, main, div'));
    var contactSection = containers.filter(function (section) {
      var text = section.textContent || '';
      return /Let's Collaborate|Get In Touch|Build something extraordinary|cc@aacheampong\.com|adwoaacheampong728@gmail\.com/i.test(text) &&
        /Email|Phone|Location|LinkedIn|Contact/i.test(text);
    }).sort(function (a, b) {
      return (a.textContent || '').length - (b.textContent || '').length;
    })[0];
    if (!contactSection) return;

    var gridCandidates = Array.prototype.slice.call(contactSection.querySelectorAll('div')).filter(function (node) {
      var text = node.textContent || '';
      var style = window.getComputedStyle ? window.getComputedStyle(node) : null;
      return /Email/i.test(text) && /Phone/i.test(text) && /Location/i.test(text) &&
        (!style || style.display === 'grid' || /grid-template-columns/i.test(node.getAttribute('style') || ''));
    });
    var target = contactSection.querySelector('.contact-grid') ||
      contactSection.querySelector('.contact-cards') ||
      gridCandidates.sort(function (a, b) { return (a.textContent || '').length - (b.textContent || '').length; })[0] ||
      contactSection.querySelector('.container') ||
      contactSection;
    target.classList.add('portfolio-contact-layout');

    var card = document.createElement('article');
    card.className = 'contact-card portfolio-contact-qr';
    card.innerHTML =
      '<div class="portfolio-contact-qr-copy">' +
        '<span class="portfolio-contact-kicker">Contact hub</span>' +
        '<h3>Scan to connect</h3>' +
        '<p>Save my contact, open LinkedIn, visit the website, or download the digital business card for later sharing.</p>' +
      '</div>' +
      '<div class="portfolio-contact-qr-media"><img src="/images/contact/adwoa-connect-qr.png" alt="QR code for Adwoa B. Acheampong contact hub"></div>' +
      '<div class="portfolio-contact-qr-actions" aria-label="Contact hub actions">' +
        '<a href="/connect.html">Open hub</a>' +
        '<a href="/contact/adwoa-b-acheampong.vcf" download>Save contact</a>' +
        '<a href="https://www.linkedin.com/in/adwoa-acheampong" target="_blank" rel="noopener noreferrer">LinkedIn</a>' +
        '<a href="/images/contact/adwoa-digital-business-card.png" download>Download card</a>' +
      '</div>';
    target.appendChild(card);
  }

  function routeContactLinks() {
    Array.prototype.forEach.call(document.querySelectorAll('a[href="#contact"]'), function (link) {
      if (link.dataset.contactRouted) return;
      link.dataset.contactRouted = 'true';
      link.addEventListener('click', function (event) {
        var button = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function (item) {
          return /^\s*Contact\s*$/i.test(item.textContent || '');
        })[0];
        if (!button) return;
        event.preventDefault();
        button.click();
        window.history.replaceState(null, '', '#contact');
        setTimeout(updateContactHub, 120);
      });
    });

    if (window.location.hash === '#contact') {
      var activeContact = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function (item) {
        return /^\s*Contact\s*$/i.test(item.textContent || '');
      })[0];
      if (activeContact && !/active/i.test(activeContact.className || '')) activeContact.click();
    }
  }

  var timer;
  var observer = new MutationObserver(function () {
    clearTimeout(timer);
    timer = setTimeout(apply, 80);
  });

  function observe() {
    var root = document.getElementById('root');
    if (root) observer.observe(root, { childList: true, subtree: true });
  }

  function apply() {
    observer.disconnect();
    updateAglProject();
    updateExperience();
    updatePipeline();
    updateBrandCredit();
    updateContact();
    updateDocumentLinks();
    routeContactLinks();
    updateContactHub();
    observe();
  }

  if (document.getElementById('root')) apply();
  else document.addEventListener('DOMContentLoaded', apply);
})();

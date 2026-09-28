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

  function updateHero() {
    text(document.querySelector('.hero-subtitle'), 'Business Operations & AI Consultant');
    text(document.querySelector('.hero-description'), 'Engineering Global Operations Systems that scale locally');
    /* Story-page byline under the "— Adwoa" signature. */
    Array.prototype.forEach.call(document.querySelectorAll('p'), function (p) {
      if (/^Business Operations Architect\s*·\s*Accra, Ghana$/.test((p.textContent || '').trim())) {
        text(p, 'Business Operations & AI Consultant · Accra, Ghana');
      }
    });
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

  function updateDiplomatsProject() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.case-study'));
    var card = cards.filter(function (item) {
      var title = item.querySelector('.case-title');
      return title && /Avenue Lincoln|Adebi Villa/i.test(title.textContent || '');
    })[0];
    if (!card) return;

    card.classList.add('diplomats-system-card');
    var title = card.querySelector('.case-title');
    if (title && !title.querySelector('.diplomats-title-link')) {
      title.innerHTML = '<a class="diplomats-title-link" href="https://diplomats.netlify.app" target="_blank" rel="noopener noreferrer">Adebi Villa / Avenue Lincoln</a>';
    }
    text(card.querySelector('.case-status-badge'), 'Live Site');
    text(card.querySelector('.case-client'), '· Ridge, Accra');
    text(card.querySelector('.case-hero-desc'),
      'A live luxury villa booking and hospitality site at diplomats.netlify.app, positioned for direct reservations, diplomatic-quarter travel, concierge services, and long-stay guest conversion.');

    var expand = card.querySelector('.project-expand-btn');
    if (expand && !card.querySelector('.diplomats-live-link')) {
      var link = document.createElement('a');
      link.className = 'project-link diplomats-live-link';
      link.href = 'https://diplomats.netlify.app';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Open diplomats.netlify.app ↗';
      expand.parentNode.insertBefore(link, expand);
    }

    if (!card.querySelector('.diplomats-proof-gallery')) {
      var gallery = document.createElement('section');
      gallery.className = 'diplomats-proof-gallery agl-proof-gallery';
      gallery.innerHTML =
        '<div class="agl-proof-intro"><span>Live evidence</span><h4>Diplomats / Adebi Villa</h4><p>Screenshot captured from the live Netlify site, preserving the public landing-page look and content.</p></div>' +
        '<div class="agl-proof-grid diplomats-proof-grid">' +
          '<figure class="agl-proof-card"><div class="agl-proof-media"><img src="/images/projects/diplomats-live.png" alt="Live Adebi Villa website screenshot" loading="lazy"></div><figcaption><strong>Adebi Villa live landing page</strong><span>Public booking presence for Avenue Lincoln Estate, Ridge, Accra.</span></figcaption></figure>' +
        '</div>';
      var narrativeRoot = card.querySelector('.case-narrative') || card.lastElementChild;
      if (narrativeRoot && narrativeRoot.parentNode) narrativeRoot.parentNode.insertBefore(gallery, narrativeRoot.nextSibling);
    }
  }

  function updateLiveProjects() {
    var page = document.querySelector('.kente-dark-bg');
    var stack = page && page.querySelector('.case-studies-stack');
    if (!page || !stack || page.querySelector('.live-projects-section')) return;

    var projects = [
      {
        title: 'AGL ERP Systems',
        status: 'LIVE PLATFORM',
        image: '/images/agl-erp/agl-dashboard.png',
        alt: 'AGL ERP Systems dashboard screenshot',
        href: 'https://agl.software',
        functionText: 'Multi-department ERP and staff operations system for Automobiles Ghana Limited.',
        stack: ['JavaScript', 'PWA', 'Google Sheets API', 'QR Auth', 'Kanban', 'Playwright'],
        bullets: [
          'Executive dashboards for finance, workshop, sales, inventory, staff, and reporting.',
          'Role-aware Staff Hub with QR-secured access, attendance, assignments, and work-order evidence.',
          'Operational workflows move leads, vehicle jobs, stock, approvals, and handoffs through accountable boards.'
        ]
      },
      {
        title: 'Adebi Villa / Avenue Lincoln',
        status: 'LIVE SITE',
        image: '/images/projects/diplomats-live.png',
        alt: 'Adebi Villa website screenshot from diplomats.netlify.app',
        href: 'https://diplomats.netlify.app',
        functionText: 'Direct-booking and hospitality conversion site for a luxury villa in Ridge, Accra.',
        stack: ['HTML', 'CSS', 'JavaScript', 'Netlify', 'Web3Forms', 'Booking UX'],
        bullets: [
          'Presents villa positioning, amenities, gallery, video walkthrough, pricing, and concierge promise.',
          'Supports direct enquiry and booking intent outside third-party marketplace dependency.',
          'Acts as the proof of concept for the broader Real Estate Management Hub pipeline venture.'
        ]
      },
      {
        title: 'Blkk Star Hub',
        status: 'RESTRICTED LIVE LANDING',
        image: '/images/projects/blkkstarhub-locked.png',
        alt: 'Blkk Star Hub locked landing page screenshot',
        href: 'https://blkkstarhub.com',
        functionText: 'Multi-tenant digital trade and business operating system for African MSMEs.',
        stack: ['React / Next.js', 'PostgreSQL', 'Typesense', 'Redis', 'RabbitMQ', 'JWT'],
        bullets: [
          'Designed to move informal commerce into structured, searchable, financeable operating records.',
          'Connects tenant workspaces, sector apps, analytics, identity, and controlled marketplace flows.',
          'Public route is locked to protect infrastructure, partner data, and controlled demonstration access.'
        ]
      },
      {
        title: 'BLKK Autos',
        status: 'RESTRICTED LIVE LANDING',
        image: '/images/projects/blkkautos-locked.png',
        alt: 'BLKK Autos locked landing page screenshot',
        href: 'https://blkkstarhub.com/autos-app',
        functionText: 'Automotive-commerce validation wedge for listings, seller workflows, and buyer discovery.',
        stack: ['React Native', 'Expo', 'Expo Router', 'Tailwind CSS', 'Reanimated', 'Web Build'],
        bullets: [
          'One cross-platform architecture for mobile and web rather than separate codebases.',
          'Targets vehicle listings, inventory presentation, seller validation, and customer enquiry flows.',
          'Restricted landing page communicates that MVP access is controlled during validation.'
        ]
      },
      {
        title: 'Adinkra Intelligence Systems',
        status: 'LIVE / ACTIVE PROTOTYPE',
        image: '/images/projects/adinkra-live.png',
        alt: 'Adinkra Intelligence Systems live interface screenshot',
        href: 'https://blkkstarhub.com/adinkra-front',
        functionText: 'Analytics and intelligence interface above tenant ERP and operational systems.',
        stack: ['React 19', 'Vite', 'Tailwind CSS', 'React Router', 'Recharts', 'SheetJS'],
        bullets: [
          'Turns authorized operational data into metrics, charts, and decision-ready executive views.',
          'Built for multi-vertical dashboards, drilldowns, and shared data interpretation.',
          'Positions Adinkra as the intelligence layer across Blkk and client operating systems.'
        ]
      },
      {
        title: 'MIRACLE',
        status: 'LIVE APP',
        image: '/images/projects/miracle-live.png',
        alt: 'MIRACLE live app screenshot',
        href: 'https://miracleapp.site',
        functionText: 'Mobile-first life operating system for faith, focus, habits, and personal follow-through.',
        stack: ['Responsive Web App', 'Gamification', 'Progress Tracking', 'Rewards', 'Local State', 'PWA UX'],
        bullets: [
          'Guides users through goals, routines, rewards, and emotionally resonant progress loops.',
          'Extends product design beyond enterprise tooling into motivation and personal systems.',
          'Live public app with mobile-first interaction patterns and lightweight onboarding.'
        ]
      }
    ];

    var section = document.createElement('section');
    section.className = 'live-projects-section';
    section.innerHTML =
      '<div class="live-projects-intro"><span>Current live work</span><h3>Live Projects</h3><p>Public routes and restricted landing pages captured directly from their live URLs, with function, stack, and current status.</p></div>' +
      '<div class="live-projects-grid">' + projects.map(function (item) {
        var stack = item.stack.map(function (tech) { return '<span>' + tech + '</span>'; }).join('');
        var bullets = item.bullets.map(function (bullet) { return '<li>' + bullet + '</li>'; }).join('');
        return '<article class="live-project-card">' +
          '<a class="live-project-media" href="' + item.href + '" target="_blank" rel="noopener noreferrer"><img src="' + item.image + '" alt="' + item.alt + '" loading="lazy"></a>' +
          '<div class="live-project-copy"><span>' + item.status + '</span><h4>' + item.title + '</h4><p>' + item.functionText + '</p>' +
          '<div class="live-project-stack" aria-label="' + item.title + ' tech stack">' + stack + '</div><ul>' + bullets + '</ul>' +
          '<a href="' + item.href + '" target="_blank" rel="noopener noreferrer">Open live URL ↗</a></div>' +
        '</article>';
      }).join('') + '</div>';

    stack.parentNode.insertBefore(section, stack.nextSibling);
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
    if (heading) text(heading, 'Pipeline Projects');
    var subtitle = page.querySelector('.section-subtitle');
    if (subtitle) text(subtitle, 'Ventures, concepts, and build-stage systems that are not yet fully public production products.');

    var projects = [
      {
        slug: 'merchant-hub', status: 'IN DEVELOPMENT', title: 'The Merchant Hub',
        tagline: 'Founder marketplace / SME operating support',
        image: '/images/blkk-pipeline/blkk-star-hub-commerce.png',
        imageAlt: 'Merchant commerce and founder ecosystem concept visual',
        href: '/portfolio.html',
        action: 'Open project file',
        vision: 'A digital marketplace and founder ecosystem for African SMEs and young entrepreneurs. It keeps the digital heavy lifting — ads, logistics, commerce setup, and operating support — around founders while they build.',
        bullets: [
          'Marketplace, operations support, founder training, executive assistance, and community commerce model.',
          'Includes the susu-inspired community capital concept from the original pipeline.',
          'Kept in Pipeline because the full Merchant Hub venture is not yet a live production platform.'
        ]
      },
      {
        slug: 'real-estate-hub', status: 'CONCEPT STAGE', title: 'Real Estate Management Hub',
        tagline: 'Hospitality-backed property operations',
        image: '/images/projects/diplomats-live.png',
        imageAlt: 'Adebi Villa live site screenshot validating the real estate management concept',
        href: 'https://diplomats.netlify.app',
        action: 'Open live proof of concept',
        vision: 'A property management platform for owners who need professional hosting, training, guest experience, marketing, and reporting rather than simple property listing.',
        bullets: [
          'Proof of concept: Adebi Villa / Avenue Lincoln is live at diplomats.netlify.app.',
          'Pipeline venture remains the broader real-estate management hub, not the already-live villa site.',
          'Targets owners in Accra, Aburi, Cape Coast, and diaspora investors with Ghanaian real estate holdings.'
        ]
      },
      {
        slug: 'blkk-legacy', status: 'VENTURE BUILD', title: 'Blkk Legacy',
        tagline: 'Pan-African venture system',
        image: '/images/blkk-pipeline/blkk-legacy-campus.png',
        imageAlt: 'Blkk Legacy campus and production concept visual',
        href: '/portfolio.html',
        action: 'Open project file',
        vision: 'A staged Ghana-based venture system connecting skills training, production, commerce, and culturally grounded brand development.',
        bullets: [
          'Built around Blkk Legacy, Blkk Star Hub, and Blkk Label validation loops.',
          'Focuses on proving demand, controls, unit economics, and operating discipline before scale.',
          'Kept in Pipeline because the broader venture system is still being validated.'
        ]
      },
      {
        slug: 'agl-ar', status: 'CONCEPT STAGE', title: 'Building AGL',
        tagline: 'AR diagnostics feature',
        image: '/images/agl-erp/agl-workshop-kanban.png',
        imageAlt: 'AGL workshop workflow screenshot used as AR diagnostics concept context',
        href: '/portfolio.html',
        action: 'Open project file',
        vision: 'An augmented-reality mechanic diagnostic concept designed to bring structured vehicle fault data into a technician-facing workflow.',
        bullets: [
          'This is the AGL item that belongs in Pipeline: the AR diagnostic feature, not the live AGL Ops Command Center.',
          'Concept scope includes wearable camera input, AI-assisted fault interpretation, and guided repair steps.',
          'Thumbnail uses the live AGL workshop workflow context; the AR layer itself is still concept-stage.'
        ]
      }
    ];

    grid.innerHTML = projects.map(function (item, index) {
      var collapsed = index > 0 || (window.matchMedia && window.matchMedia('(max-width: 680px)').matches);
      var bullets = item.bullets.map(function (bullet) { return '<li>' + bullet + '</li>'; }).join('');
      var media = item.image ? '<div class="blkk-pipeline-media"><img src="' + item.image + '" alt="' + item.imageAlt + '" loading="lazy"></div>' : '';
      var external = /^https?:\/\//.test(item.href);
      return '<article class="pipeline-card blkk-pipeline-card blkk-' + item.slug + '-card' + (item.image ? '' : ' blkk-no-media') + (collapsed ? ' blkk-collapsed' : '') + '">' +
        media +
        '<div class="blkk-pipeline-shell"><div class="blkk-pipeline-head"><div>' +
          '<span class="pipeline-status">' + item.status + '</span>' +
          '<h3 class="pipeline-project-title">' + item.title + '</h3>' +
          '<p class="pipeline-tagline">' + item.tagline + '</p>' +
        '</div><button class="blkk-pipeline-toggle" type="button" aria-expanded="' + (collapsed ? 'false' : 'true') + '" aria-label="Toggle ' + item.title + ' details"><span aria-hidden="true"></span></button></div>' +
        '<div class="blkk-pipeline-body"><p class="pipeline-vision">' + item.vision + '</p><ul class="blkk-pipeline-points">' + bullets + '</ul>' +
        '<a class="project-link blkk-project-action" href="' + item.href + '"' + (external ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + item.action + '</a></div></div></article>';
    }).join('');

    var roadmap = page.querySelector('.pipeline-roadmap');
    if (roadmap) {
      text(roadmap.querySelector('.roadmap-title'), 'Pipeline Alignment');
      var roadmapCopy = [
        ['Live work', 'AGL ERP Systems, Adebi Villa / Avenue Lincoln, Blkk Star Hub, BLKK Autos, Adinkra Intelligence Systems, and MIRACLE are shown under Projects.'],
        ['Pipeline work', 'The Merchant Hub, Real Estate Management Hub, Blkk Legacy, and Building AGL AR remain here because they are not fully public production products.'],
        ['Rule', 'A live proof of concept can support a pipeline venture, but the live site itself belongs in Projects.']
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

  function updateContactLabels() {
    Array.prototype.forEach.call(document.querySelectorAll('.section-title, h1, h2'), function (heading) {
      if (/^\s*Let's Collaborate\s*$/i.test(heading.textContent || '')) text(heading, 'Contact');
    });
    Array.prototype.forEach.call(document.querySelectorAll('.section-subtitle'), function (subtitle) {
      if (/Build something extraordinary together/i.test(subtitle.textContent || '')) text(subtitle, '');
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

  
  function updateCertifications() {
    var skillsSection = document.querySelector('.skills-grid');
    if (!skillsSection) return;
    
    // Check if certs are already added
    if (document.querySelector('.certifications-container')) return;
    
    var certsHTML = '<div class="certifications-container" style="grid-column: 1 / -1; margin-top: 2rem;">' +
      '<div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem;"><h3 class="section-subtitle" style="text-align: left; margin: 0; color: var(--color-brand-primary);">Education & Certifications</h3><a href="/docs/Adwoa_Acheampong_Certifications.pdf" download class="document-button primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Download All (PDF)</a></div>' +
      '<p style="margin: 0 0 1rem; color: #aaa;">View the visual certificate gallery at <a href="/certifications.html" style="color:#e5b947; font-weight:700;">Certifications</a>.</p>' +
      '<ul style="list-style: none; padding: 0; display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">' +
      '<li style="background: rgba(17,17,17,.5); padding: 1rem; border-radius: 8px; border: 1px solid rgba(229,185,71,.2);"><a href="/docs/certifications/Data-analytics-certificate-Adwoa-Acheampong.png" target="_blank" style="color: #e5b947; text-decoration: none; font-weight: bold;">ALX Data Analyst</a><br><span style="font-size: 0.85em; color: #aaa;">Professional Development Skills (2025)</span></li>' +
      '<li style="background: rgba(17,17,17,.5); padding: 1rem; border-radius: 8px; border: 1px solid rgba(229,185,71,.2);"><a href="/docs/certifications/DataCamp_SQL_Certificate_Adwoa_Acheampong.pdf" target="_blank" style="color: #e5b947; text-decoration: none; font-weight: bold;">DataCamp Intermediate SQL</a><br><span style="font-size: 0.85em; color: #aaa;">(2025)</span></li>' +
      '<li style="background: rgba(17,17,17,.5); padding: 1rem; border-radius: 8px; border: 1px solid rgba(229,185,71,.2);"><a href="/docs/certifications/cisco-data-analytics.pdf" target="_blank" style="color: #e5b947; text-decoration: none; font-weight: bold;">Cisco Data Analytics Essentials</a></li>' +
      '<li style="background: rgba(17,17,17,.5); padding: 1rem; border-radius: 8px; border: 1px solid rgba(229,185,71,.2);"><a href="/docs/certifications/ibm-business-analysis.png" target="_blank" style="color: #e5b947; text-decoration: none; font-weight: bold;">IBM Business Analysis</a><br><span style="font-size: 0.85em; color: #aaa;">Beginner Badge (2026)</span></li>' +
      '<li style="background: rgba(17,17,17,.5); padding: 1rem; border-radius: 8px; border: 1px solid rgba(229,185,71,.2);"><a href="/docs/certifications/Business%20Management%20OHSC.pdf" target="_blank" style="color: #e5b947; text-decoration: none; font-weight: bold;">Oxford Home Study</a><br><span style="font-size: 0.85em; color: #aaa;">Business Management (2025)</span></li>' +
      '<li style="background: rgba(17,17,17,.5); padding: 1rem; border-radius: 8px; border: 1px solid rgba(229,185,71,.2);"><a href="/docs/certifications/Travel_Manager_Certificate_Adwoa_Acheampon.png" target="_blank" style="color: #e5b947; text-decoration: none; font-weight: bold;">Dreamport Travel Manager</a><br><span style="font-size: 0.85em; color: #aaa;">(2024)</span></li>' +
      '</ul></div>';
      
    skillsSection.insertAdjacentHTML('beforeend', certsHTML);
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
    var docs = document.querySelector(".document-links");
    if (docs && !docs.querySelector(".portfolio-doc")) {
      docs.insertAdjacentHTML("beforeend", '<a href="/portfolio.html" class="document-link portfolio-doc">Technical Projects Portfolio</a>');
    }
  }

  function updateHeaderDocumentNav() {
    var menu = document.querySelector('.nav-menu');
    if (!menu || menu.querySelector('.nav-doc-link')) return;

    [
      ['Resume', '/resume.html'],
      ['Project File', '/portfolio.html'],
      ['Certifications', '/certifications.html']
    ].forEach(function (item) {
      var li = document.createElement('li');
      li.innerHTML = '<a class="nav-tab nav-doc-link" href="' + item[1] + '">' + item[0] + '</a>';
      menu.appendChild(li);
    });
  }

  function updateContactHub() {
    if (document.querySelector('.portfolio-contact-qr')) return;
    var containers = Array.prototype.slice.call(document.querySelectorAll('section, main, div'));
    var contactSection = containers.filter(function (section) {
      var text = section.textContent || '';
      return (/Let's Collaborate|Get In Touch|Build something extraordinary|Contact/i.test(text) || section.querySelector('.section-title')) &&
        /Email/i.test(text) &&
        /Phone/i.test(text) &&
        /Location/i.test(text) &&
        section.querySelectorAll('.contact-card').length >= 3;
    }).sort(function (a, b) {
      return (a.textContent || '').length - (b.textContent || '').length;
    })[0];
    if (!contactSection) return;

    var gridCandidates = Array.prototype.slice.call(contactSection.querySelectorAll('div')).filter(function (node) {
      var text = node.textContent || '';
      var style = window.getComputedStyle ? window.getComputedStyle(node) : null;
      return /Email/i.test(text) && /Phone/i.test(text) && /Location/i.test(text) &&
        (!style || style.display === 'grid' || /grid-template-columns/i.test(node.getAttribute('style') || ''));
    }).filter(function (node) {
      return node.querySelectorAll('.contact-card').length >= 3;
    });
    var target = contactSection.querySelector('.contact-grid') ||
      contactSection.querySelector('.contact-cards') ||
      gridCandidates.sort(function (a, b) { return (a.textContent || '').length - (b.textContent || '').length; })[0] ||
      contactSection.querySelector('.container') ||
      contactSection;

    target.classList.add('portfolio-contact-direct');

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

    if (target.parentNode) target.parentNode.insertBefore(card, target.nextSibling);
    else target.appendChild(card);
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

  function routeStaticLinks() {
    var routeMap = {
      '/': 'Home',
      '/story/': 'Story',
      '/projects/': 'Projects',
      '/experience/': 'Experience',
      '/skills/': 'Skills',
      '/pipeline/': 'Pipeline',
      '/contact/': 'Contact'
    };

    Array.prototype.forEach.call(document.querySelectorAll('a[href]'), function (link) {
      if (link.dataset.routeFixed) return;
      var raw = link.getAttribute('href');
      if (!raw || raw.charAt(0) !== '/') return;
      var path = raw.replace(/\/index\.html$/i, '/').replace(/[#?].*$/, '');
      if (path.length > 1 && path.slice(-1) !== '/') path += '/';
      var label = routeMap[path];
      if (!label) return;
      link.dataset.routeFixed = 'true';
      link.addEventListener('click', function (event) {
        var nav = Array.prototype.slice.call(document.querySelectorAll('.nav-tab')).filter(function (button) {
          return (button.textContent || '').trim().toLowerCase() === label.toLowerCase();
        })[0];
        if (!nav) return;
        event.preventDefault();
        nav.click();
      });
    });
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
    updateHero();
    updateAglProject();
    updateDiplomatsProject();
    updateLiveProjects();
    updateExperience();
    updatePipeline();
    updateContactLabels();
    updateBrandCredit();
    updateContact();
    updateDocumentLinks();
    routeContactLinks();
    routeStaticLinks();
    updateHeaderDocumentNav();
    updateContactHub();
    updateCertifications();
    observe();
  }

  if (document.getElementById('root')) apply();
  else document.addEventListener('DOMContentLoaded', apply);
})();

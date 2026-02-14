(function () {
  'use strict';

  // Core option IDs (used for scoring)
  var MOVEMENT_LEADER = 'movement-leader';
  var MDNA = 'mdna';
  var CREATE_CONTENT = 'create-content';

  var OPTIONS_INDIVIDUAL = [
    { id: MOVEMENT_LEADER, label: 'I am a movement leader.' },
    { id: MDNA, label: "I'm aligned with mDNA—the six components of apostolic movement.", tooltip: 'mDNA: Jesus is Lord, disciple-making, missional-incarnational impulse, apostolic ministry, organic systems, communitas. Shorthand for movement-oriented, embodied practice.' },
    { id: CREATE_CONTENT, label: 'I create and publish content (teaching, writing, courses, talks).' },
    { id: 'content-not-multiplying', label: "My content isn't really online, or it's online in a way that doesn't multiply or move.", tooltip: "e.g. scattered across platforms, locked in PDFs or events only, or published in isolation so it doesn't compound or spread." },
    { id: 'low-money', label: "I don't have much income or budget from my content work." },
    { id: 'time-stewardship', label: "I'm short on time—busy with embodied ministry and presence, not just content." }
  ];

  var OPTIONS_ORGANIZATION = [
    { id: MOVEMENT_LEADER, label: 'We are a movement-oriented organization.' },
    { id: MDNA, label: "We're aligned with mDNA—the six components of apostolic movement.", tooltip: 'mDNA: Jesus is Lord, disciple-making, missional-incarnational impulse, apostolic ministry, organic systems, communitas.' },
    { id: CREATE_CONTENT, label: 'We create and publish content (resources, training, curricula).' },
    { id: 'content-not-multiplying', label: "Our content isn't really online, or it's online in a way that doesn't multiply or move.", tooltip: "e.g. scattered across platforms, locked in events or internal use, or published in isolation so it doesn't compound." },
    { id: 'low-money', label: "We don't have much budget for content and distribution." },
    { id: 'time-stewardship', label: "We're stretched—embodied presence and mission take priority over content and platform work." }
  ];

  function getPathway(selectedIds) {
    var set = {};
    selectedIds.forEach(function (id) { set[id] = true; });
    var hasMovementLeader = set[MOVEMENT_LEADER];
    var hasMdna = set[MDNA];
    var hasCreateContent = set[CREATE_CONTENT];
    var coreCount = [hasMovementLeader, hasMdna, hasCreateContent].filter(Boolean).length;
    if (coreCount >= 2) return 'full-fit';
    if (hasCreateContent) return 'content-no-movement';
    return 'affinity';
  }

  var RESULT_COPY = {
    'full-fit': {
      headline: "You're a full fit.",
      body: "We're built for movement leaders and mDNA-aligned creators—whether you're already publishing content or ready to get it moving. Next step: create an account so we can get you moving.",
      primaryCta: { label: 'Create an account', href: '#' },
      secondaryCta: { label: 'Learn more first', href: '#' }
    },
    'content-no-movement': {
      headline: "You create content—we're just not in the same niche yet.",
      body: "Right now we're focused on a specific slice: mDNA-aligned movement leaders whose content isn't multiplying and who have limited budget or time. We don't yet offer much for creators outside that slice, but we're glad you're here.",
      links: [
        { label: 'Explore the Book', href: '#' },
        { label: 'Read Why Movemental', href: '#' }
      ]
    },
    affinity: {
      headline: "You're in the right neighborhood.",
      body: "You may not create content or lead a movement the way we're built for—but we want to take care of you. Explore our writers and resources; we'll keep saying clearly who we're focused on.",
      links: [
        { label: 'Explore the Book', href: '#' },
        { label: 'Read Why Movemental', href: '#' },
        { label: 'About Us', href: '#' }
      ]
    }
  };

  // DOM
  var landing = document.getElementById('fit-landing');
  var question = document.getElementById('fit-question');
  var results = document.getElementById('fit-results');
  var resultsInner = document.getElementById('fit-results-inner');
  var optionsContainer = document.getElementById('fit-options');
  var contextBtns = document.querySelectorAll('.fit-context-btn');
  var landingSubtext = document.querySelector('.fit-landing-subtext');
  var questionPrompt = document.querySelector('.fit-question-prompt');
  var startBtn = document.getElementById('fit-start-btn');
  var continueBtn = document.getElementById('fit-continue-btn');

  var state = {
    context: 'individual',
    selectedIds: []
  };

  function setContext(ctx) {
    state.context = ctx;
    state.selectedIds = [];
    landingSubtext.textContent = landingSubtext.getAttribute('data-' + ctx);
    questionPrompt.textContent = questionPrompt.getAttribute('data-' + ctx);
    contextBtns.forEach(function (btn) {
      var isActive = btn.getAttribute('data-context') === ctx;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
  }

  function renderOptions() {
    var options = state.context === 'organization' ? OPTIONS_ORGANIZATION : OPTIONS_INDIVIDUAL;
    optionsContainer.innerHTML = '';
    options.forEach(function (opt) {
      var checked = state.selectedIds.indexOf(opt.id) !== -1;
      var card = document.createElement('div');
      card.className = 'fit-option';
      card.setAttribute('role', 'checkbox');
      card.setAttribute('aria-checked', checked);
      card.setAttribute('tabindex', '0');
      card.setAttribute('data-id', opt.id);
      card.innerHTML =
        '<span class="fit-option-check">' +
          (checked ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>' : '') +
        '</span>' +
        '<span class="fit-option-label">' + escapeHtml(opt.label) + '</span>' +
        (opt.tooltip
          ? '<button type="button" class="fit-option-tooltip" title="' + escapeHtml(opt.tooltip) + '" aria-label="More info">?</button>'
          : '');
      card.addEventListener('click', function (e) {
        if (e.target.closest('.fit-option-tooltip')) return;
        toggleOption(opt.id);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleOption(opt.id);
        }
      });
      optionsContainer.appendChild(card);
    });
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function toggleOption(id) {
    var idx = state.selectedIds.indexOf(id);
    if (idx === -1) state.selectedIds.push(id);
    else state.selectedIds.splice(idx, 1);
    renderOptions();
  }

  function showStep(step) {
    landing.hidden = step !== 'landing';
    question.hidden = step !== 'question';
    results.hidden = step !== 'results';
  }

  function showResults() {
    var pathway = getPathway(state.selectedIds);
    var copy = RESULT_COPY[pathway];
    var iconClass = 'fit-results--' + pathway;
    results.setAttribute('data-pathway', pathway);
    var iconSvg = pathway === 'full-fit'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';
    var ctasHtml = '';
    if (pathway === 'full-fit') {
      ctasHtml =
        '<div class="fit-results-ctas">' +
          '<a href="' + copy.primaryCta.href + '" class="btn btn-primary">' + copy.primaryCta.label + ' <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>' +
          '<a href="' + copy.secondaryCta.href + '" class="btn btn-ghost">' + copy.secondaryCta.label + '</a>' +
        '</div>';
    } else {
      ctasHtml = '<div class="fit-results-links">' +
        copy.links.map(function (l) {
          return '<a href="' + l.href + '">' + escapeHtml(l.label) + '</a>';
        }).join('') +
      '</div>';
    }
    resultsInner.innerHTML =
      '<div class="fit-results-icon ' + iconClass + '">' + iconSvg + '</div>' +
      '<h2 class="fit-results-headline">' + escapeHtml(copy.headline) + '</h2>' +
      '<p class="fit-results-body">' + escapeHtml(copy.body) + '</p>' +
      ctasHtml;
    resultsInner.className = 'fit-results-inner ' + iconClass;
    showStep('results');
  }

  contextBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setContext(btn.getAttribute('data-context'));
    });
  });

  startBtn.addEventListener('click', function () {
    renderOptions();
    showStep('question');
  });

  continueBtn.addEventListener('click', function () {
    showResults();
  });

  setContext('individual');
})();

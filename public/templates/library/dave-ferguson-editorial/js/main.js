/**
 * Dave Ferguson Editorial — main.js
 * Combines: scroll/nav, read progress, mobile menu, reveal animations,
 * hub tab filtering, course accordion, and floating chatbot.
 */
(function () {
  'use strict';

  /* -------------------------------------------------- *
   *  1. Scroll — nav .scrolled + read progress bar
   * -------------------------------------------------- */
  var nav = document.getElementById('e-nav');
  var progress = document.getElementById('e-read-progress');
  var toggle = document.querySelector('.e-nav__toggle');

  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      progress.style.width = pct + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------------------------------------------------- *
   *  2. Mobile nav toggle
   * -------------------------------------------------- */
  if (toggle) {
    toggle.addEventListener('click', function () {
      if (nav) nav.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', nav && nav.classList.contains('menu-open'));
    });
  }

  /* -------------------------------------------------- *
   *  3. Reveal on scroll (IntersectionObserver)
   * -------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function (r) { obs.observe(r); });
  }

  /* -------------------------------------------------- *
   *  4. Content-hub tab filtering
   * -------------------------------------------------- */
  var tabBar = document.querySelector('.e-hub-tabs');
  if (tabBar) {
    var tabs = tabBar.querySelectorAll('.e-hub-tab');
    var cards = document.querySelectorAll('.e-hub-card[data-type]');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var type = tab.getAttribute('data-filter');
        cards.forEach(function (card) {
          if (type === 'all' || card.getAttribute('data-type') === type) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* -------------------------------------------------- *
   *  5. Course module accordion
   * -------------------------------------------------- */
  document.querySelectorAll('.e-module__header').forEach(function (header) {
    header.addEventListener('click', function () {
      header.parentElement.classList.toggle('open');
    });
  });

  /* -------------------------------------------------- *
   *  6. AI Lab interactions
   * -------------------------------------------------- */
  var aiLabWelcome = document.getElementById('ai-lab-welcome');
  var aiLabChat = document.getElementById('ai-lab-chat');
  var aiLabForm = document.getElementById('ai-lab-form');
  var aiLabInput = document.getElementById('ai-lab-input');

  // "Who is DF?" modal
  var whoModal = document.getElementById('ai-lab-who-modal');
  var whoTrigger = document.getElementById('ai-lab-who-trigger');
  var whoClose = document.getElementById('ai-lab-who-close');
  var whoBackdrop = document.getElementById('ai-lab-who-backdrop');

  function openWhoModal() {
    if (!whoModal) return;
    whoModal.classList.add('ai-lab-who-modal--open');
    whoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (whoClose) whoClose.focus();
  }
  function closeWhoModal() {
    if (!whoModal) return;
    whoModal.classList.remove('ai-lab-who-modal--open');
    whoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (whoTrigger) whoTrigger.addEventListener('click', function (e) { e.preventDefault(); openWhoModal(); });
  if (whoClose) whoClose.addEventListener('click', closeWhoModal);
  if (whoBackdrop) whoBackdrop.addEventListener('click', closeWhoModal);

  // Suggestion cards
  document.querySelectorAll('.ai-lab__card').forEach(function (card) {
    card.addEventListener('click', function () {
      var prompt = card.getAttribute('data-prompt');
      if (prompt && aiLabInput) { aiLabInput.value = prompt; aiLabInput.focus(); }
    });
  });

  // Form submit
  if (aiLabForm) {
    aiLabForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!aiLabInput || !aiLabInput.value.trim()) return;
      if (aiLabWelcome) aiLabWelcome.classList.add('is-hidden');
      if (aiLabChat) aiLabChat.classList.add('is-active');
      aiLabInput.value = '';
    });
  }

  // Cmd+K focus
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k' && aiLabInput) { e.preventDefault(); aiLabInput.focus(); }
    if (e.key === 'Escape' && whoModal && whoModal.classList.contains('ai-lab-who-modal--open')) closeWhoModal();
  });

  /* -------------------------------------------------- *
   *  7. Floating chatbot (FAB + modal)
   * -------------------------------------------------- */
  var CHAT_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  var CLOSE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  var SEND_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';

  var welcomeHtml = '<div class="e-chatbot__msg e-chatbot__msg--bot">' +
    '<div>Hi — this is a demo. Ask a question or say hello!</div>' +
    '<div class="e-chatbot__msg-time">Just now</div></div>';

  var chatbotHtml =
    '<div class="e-chatbot" id="e-chatbot">' +
      '<button type="button" class="e-chatbot__fab" aria-label="Open chat">' + CHAT_ICON + '</button>' +
      '<div class="e-chatbot__backdrop" id="e-chatbot-backdrop" aria-hidden="true"></div>' +
      '<div class="e-chatbot__modal" id="e-chatbot-modal" role="dialog" aria-labelledby="e-chatbot-title" aria-modal="true" aria-hidden="true">' +
        '<div class="e-chatbot__header">' +
          '<h2 class="e-chatbot__title" id="e-chatbot-title">Chat</h2>' +
          '<button type="button" class="e-chatbot__close" id="e-chatbot-close" aria-label="Close chat">' + CLOSE_ICON + '</button>' +
        '</div>' +
        '<div class="e-chatbot__messages" id="e-chatbot-messages">' + welcomeHtml + '</div>' +
        '<div class="e-chatbot__input-wrap"><div class="e-chatbot__input-row">' +
          '<textarea class="e-chatbot__input" id="e-chatbot-input" placeholder="Type a message…" rows="1" maxlength="500"></textarea>' +
          '<button type="button" class="e-chatbot__send" id="e-chatbot-send" aria-label="Send">' + SEND_ICON + '</button>' +
        '</div></div>' +
      '</div>' +
    '</div>';

  function chatTimeLabel() {
    var d = new Date();
    return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  function chatEscape(s) { var div = document.createElement('div'); div.textContent = s; return div.innerHTML; }
  function chatAppend(cls, text) {
    var el = document.getElementById('e-chatbot-messages');
    if (!el) return;
    var div = document.createElement('div');
    div.className = 'e-chatbot__msg ' + cls;
    div.innerHTML = '<div>' + chatEscape(text) + '</div><div class="e-chatbot__msg-time">' + chatTimeLabel() + '</div>';
    el.appendChild(div);
    el.scrollTop = el.scrollHeight;
  }
  function openChatbot() {
    var back = document.getElementById('e-chatbot-backdrop');
    var modal = document.getElementById('e-chatbot-modal');
    var fab = document.querySelector('.e-chatbot__fab');
    if (back) { back.classList.add('is-open'); back.setAttribute('aria-hidden', 'false'); }
    if (modal) { modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); }
    if (fab) fab.setAttribute('aria-expanded', 'true');
    var inp = document.getElementById('e-chatbot-input');
    if (inp) inp.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeChatbot() {
    var back = document.getElementById('e-chatbot-backdrop');
    var modal = document.getElementById('e-chatbot-modal');
    var fab = document.querySelector('.e-chatbot__fab');
    if (back) { back.classList.remove('is-open'); back.setAttribute('aria-hidden', 'true'); }
    if (modal) { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); }
    if (fab) fab.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function sendChatMessage() {
    var input = document.getElementById('e-chatbot-input');
    if (!input) return;
    var text = (input.value || '').trim();
    if (!text) return;
    chatAppend('e-chatbot__msg--user', text);
    input.value = '';
    input.style.height = 'auto';
    setTimeout(function () {
      chatAppend('e-chatbot__msg--bot', 'Thanks for your message. This is a demo — a real chat would connect to a live assistant.');
    }, 600);
  }

  function initChatbot() {
    var root = document.getElementById('e-chatbot-root');
    if (!root) { root = document.createElement('div'); root.id = 'e-chatbot-root'; document.body.appendChild(root); }
    root.innerHTML = chatbotHtml;
    var fab = document.querySelector('.e-chatbot__fab');
    var back = document.getElementById('e-chatbot-backdrop');
    var closeBtn = document.getElementById('e-chatbot-close');
    var sendBtn = document.getElementById('e-chatbot-send');
    var input = document.getElementById('e-chatbot-input');
    if (fab) fab.addEventListener('click', openChatbot);
    if (back) back.addEventListener('click', closeChatbot);
    if (closeBtn) closeBtn.addEventListener('click', closeChatbot);
    if (sendBtn) sendBtn.addEventListener('click', sendChatMessage);
    if (input) {
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); } });
      input.addEventListener('input', function () { this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight, 120) + 'px'; });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var modal = document.getElementById('e-chatbot-modal');
        if (modal && modal.classList.contains('is-open')) closeChatbot();
      }
    });
  }

  initChatbot();
})();

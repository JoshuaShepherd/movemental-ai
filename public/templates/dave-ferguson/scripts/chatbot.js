/**
 * Site-wide floating chatbot — FAB + modal simulation.
 * Injected on every page; uses .e-chatbot-* classes from dave-ferguson-editorial.css
 */
(function () {
  'use strict';

  var CHAT_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  var CLOSE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  var SEND_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';

  var welcomeHtml = '<div class="e-chatbot__msg e-chatbot__msg--bot">' +
    '<div>Hi — this is a demo. Ask a question or say hello!</div>' +
    '<div class="e-chatbot__msg-time">Just now</div>' +
    '</div>';

  var html =
    '<div class="e-chatbot" id="e-chatbot">' +
      '<button type="button" class="e-chatbot__fab" aria-label="Open chat">' + CHAT_ICON + '</button>' +
      '<div class="e-chatbot__backdrop" id="e-chatbot-backdrop" aria-hidden="true"></div>' +
      '<div class="e-chatbot__modal" id="e-chatbot-modal" role="dialog" aria-labelledby="e-chatbot-title" aria-modal="true" aria-hidden="true">' +
        '<div class="e-chatbot__header">' +
          '<h2 class="e-chatbot__title" id="e-chatbot-title">Chat</h2>' +
          '<button type="button" class="e-chatbot__close" id="e-chatbot-close" aria-label="Close chat">' + CLOSE_ICON + '</button>' +
        '</div>' +
        '<div class="e-chatbot__messages" id="e-chatbot-messages">' + welcomeHtml + '</div>' +
        '<div class="e-chatbot__input-wrap">' +
          '<div class="e-chatbot__input-row">' +
            '<textarea class="e-chatbot__input" id="e-chatbot-input" placeholder="Type a message…" rows="1" maxlength="500"></textarea>' +
            '<button type="button" class="e-chatbot__send" id="e-chatbot-send" aria-label="Send">' + SEND_ICON + '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  function timeLabel() {
    var d = new Date();
    return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  function appendUserMessage(text) {
    var el = document.getElementById('e-chatbot-messages');
    if (!el) return;
    var div = document.createElement('div');
    div.className = 'e-chatbot__msg e-chatbot__msg--user';
    div.innerHTML = '<div>' + escapeHtml(text) + '</div><div class="e-chatbot__msg-time">' + timeLabel() + '</div>';
    el.appendChild(div);
    el.scrollTop = el.scrollHeight;
  }

  function appendBotMessage(text) {
    var el = document.getElementById('e-chatbot-messages');
    if (!el) return;
    var div = document.createElement('div');
    div.className = 'e-chatbot__msg e-chatbot__msg--bot';
    div.innerHTML = '<div>' + escapeHtml(text) + '</div><div class="e-chatbot__msg-time">' + timeLabel() + '</div>';
    el.appendChild(div);
    el.scrollTop = el.scrollHeight;
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function openChat() {
    var back = document.getElementById('e-chatbot-backdrop');
    var modal = document.getElementById('e-chatbot-modal');
    var fab = document.querySelector('.e-chatbot__fab');
    if (back) { back.classList.add('is-open'); back.setAttribute('aria-hidden', 'false'); }
    if (modal) { modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); }
    if (fab) fab.setAttribute('aria-expanded', 'true');
    document.getElementById('e-chatbot-input')?.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeChat() {
    var back = document.getElementById('e-chatbot-backdrop');
    var modal = document.getElementById('e-chatbot-modal');
    var fab = document.querySelector('.e-chatbot__fab');
    if (back) { back.classList.remove('is-open'); back.setAttribute('aria-hidden', 'true'); }
    if (modal) { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); }
    if (fab) fab.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function sendMessage() {
    var input = document.getElementById('e-chatbot-input');
    if (!input) return;
    var text = (input.value || '').trim();
    if (!text) return;
    appendUserMessage(text);
    input.value = '';
    input.style.height = 'auto';
    // Simulated reply
    setTimeout(function () {
      appendBotMessage('Thanks for your message. This is a demo — a real chat would connect to a live assistant.');
    }, 600);
  }

  function init() {
    var root = document.getElementById('e-chatbot-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'e-chatbot-root';
      document.body.appendChild(root);
    }
    root.innerHTML = html;

    var fab = document.querySelector('.e-chatbot__fab');
    var back = document.getElementById('e-chatbot-backdrop');
    var closeBtn = document.getElementById('e-chatbot-close');
    var sendBtn = document.getElementById('e-chatbot-send');
    var input = document.getElementById('e-chatbot-input');

    if (fab) fab.addEventListener('click', openChat);
    if (back) back.addEventListener('click', closeChat);
    if (closeBtn) closeBtn.addEventListener('click', closeChat);
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);

    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
      input.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var modal = document.getElementById('e-chatbot-modal');
        if (modal && modal.classList.contains('is-open')) closeChat();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

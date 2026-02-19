(function(){
      var panel=document.getElementById('chat-panel'),openBtn=document.getElementById('chat-open'),closeBtn=document.getElementById('chat-close'),backdrop=document.getElementById('chat-backdrop');
      var hamburger=document.getElementById('hamburger'),nav=document.getElementById('nav');
      function openPanel(){panel.classList.add('is-open');panel.setAttribute('aria-hidden','false');backdrop.classList.add('is-visible');backdrop.setAttribute('aria-hidden','false');closeBtn.focus();}
      function closePanel(){panel.classList.remove('is-open');panel.setAttribute('aria-hidden','true');backdrop.classList.remove('is-visible');backdrop.setAttribute('aria-hidden','true');openBtn.focus();}
      openBtn.addEventListener('click',openPanel);closeBtn.addEventListener('click',closePanel);backdrop.addEventListener('click',closePanel);
      document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('is-open'))closePanel();});
      hamburger.addEventListener('click',function(){var open=nav.classList.toggle('is-open');hamburger.setAttribute('aria-expanded',open);});
    })();

    /* ----- Content tabs ----- */
    (function(){
      var tabs=document.querySelectorAll('.content-tab');
      if(!tabs.length)return;
      tabs.forEach(function(tab){
        tab.addEventListener('click',function(){
          tabs.forEach(function(t){t.classList.remove('active');});
          tab.classList.add('active');
          var filter=tab.getAttribute('data-filter');
          var cards=document.querySelectorAll('[data-type]');
          cards.forEach(function(card){
            if(!filter||filter==='all'){card.style.display='';return;}
            card.style.display=card.getAttribute('data-type')===filter?'':'none';
          });
        });
      });
    })();

    /* ----- Chapter sidebar toggle (reader) ----- */
    (function(){
      var toggle=document.getElementById('sidebar-toggle');
      var sidebar=document.getElementById('reader-sidebar');
      if(!toggle||!sidebar)return;
      toggle.addEventListener('click',function(){
        sidebar.classList.toggle('is-open');
      });
      document.addEventListener('click',function(e){
        if(sidebar.classList.contains('is-open')&&!sidebar.contains(e.target)&&e.target!==toggle&&!toggle.contains(e.target)){
          sidebar.classList.remove('is-open');
        }
      });
    })();

    /* ----- Reading progress bar ----- */
    (function(){
      var bar=document.querySelector('.reader-progress__bar');
      if(!bar)return;
      window.addEventListener('scroll',function(){
        var scrollTop=window.scrollY;
        var docHeight=document.documentElement.scrollHeight-window.innerHeight;
        var pct=docHeight>0?Math.min((scrollTop/docHeight)*100,100):0;
        bar.style.width=pct+'%';
      },{passive:true});
    })();

    /* ----- FAQ Accordion ----- */
    (function(){
      var questions=document.querySelectorAll('.faq-item__question');
      if(!questions.length)return;
      questions.forEach(function(btn){
        btn.addEventListener('click',function(){
          var answer=btn.nextElementSibling;
          var expanded=btn.getAttribute('aria-expanded')==='true';
          questions.forEach(function(b){
            b.setAttribute('aria-expanded','false');
            b.nextElementSibling.classList.remove('is-open');
          });
          if(!expanded){
            btn.setAttribute('aria-expanded','true');
            answer.classList.add('is-open');
          }
        });
      });
    })();

/* ----- Chat suggestion buttons ----- */
(function(){
  var suggestions=document.querySelectorAll('.floating-chat-panel__suggestion');
  var chatInput=document.querySelector('.floating-chat-panel__input');
  suggestions.forEach(function(btn){
    btn.addEventListener('click',function(){
      if(chatInput){chatInput.value=btn.textContent;chatInput.focus();}
    });
  });
})();
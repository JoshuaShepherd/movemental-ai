(function(){
  /* Chat panel */
  var panel=document.getElementById('chat-panel'),openBtn=document.getElementById('chat-open'),closeBtn=document.getElementById('chat-close'),backdrop=document.getElementById('chat-backdrop');
  var hamburger=document.getElementById('hamburger'),nav=document.getElementById('nav');

  function openPanel(){if(!panel)return;panel.classList.add('is-open');panel.setAttribute('aria-hidden','false');backdrop.classList.add('is-visible');backdrop.setAttribute('aria-hidden','false');closeBtn.focus();}
  function closePanel(){if(!panel)return;panel.classList.remove('is-open');panel.setAttribute('aria-hidden','true');backdrop.classList.remove('is-visible');backdrop.setAttribute('aria-hidden','true');openBtn.focus();}

  if(openBtn)openBtn.addEventListener('click',openPanel);
  if(closeBtn)closeBtn.addEventListener('click',closePanel);
  if(backdrop)backdrop.addEventListener('click',closePanel);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel&&panel.classList.contains('is-open'))closePanel();});
  if(hamburger&&nav)hamburger.addEventListener('click',function(){var open=nav.classList.toggle('is-open');hamburger.setAttribute('aria-expanded',open);});

  /* Content tabs */
  document.querySelectorAll('.content-tabs').forEach(function(tabBar){
    var tabs=tabBar.querySelectorAll('.content-tabs__tab');
    tabs.forEach(function(tab){
      tab.addEventListener('click',function(){
        tabs.forEach(function(t){t.classList.remove('is-active');});
        tab.classList.add('is-active');
        var target=tab.getAttribute('data-tab');
        if(target){
          var container=tabBar.nextElementSibling;
          if(!container)return;
          var items=container.querySelectorAll('[data-type]');
          items.forEach(function(item){
            if(target==='all'||item.getAttribute('data-type')===target){
              item.style.display='';
            }else{
              item.style.display='none';
            }
          });
        }
      });
    });
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-item__question').forEach(function(btn){
    btn.addEventListener('click',function(){
      var item=btn.closest('.faq-item');
      var isOpen=item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('is-open');});
      if(!isOpen)item.classList.add('is-open');
    });
  });

  /* Reader sidebar toggle */
  var sidebarToggle=document.getElementById('sidebar-toggle');
  var sidebar=document.getElementById('reader-sidebar');
  if(sidebarToggle&&sidebar){
    sidebarToggle.addEventListener('click',function(){
      sidebar.classList.toggle('is-open');
    });
  }
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

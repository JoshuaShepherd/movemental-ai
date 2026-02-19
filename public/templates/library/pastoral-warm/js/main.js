(function(){
  /* ----- Chat Panel ----- */
  var panel=document.getElementById('chat-panel'),
      openBtn=document.getElementById('chat-open'),
      closeBtn=document.getElementById('chat-close'),
      backdrop=document.getElementById('chat-backdrop');
  var hamburger=document.getElementById('hamburger'),
      nav=document.getElementById('nav');

  if(panel&&openBtn&&closeBtn&&backdrop){
    function openPanel(){panel.classList.add('is-open');panel.setAttribute('aria-hidden','false');backdrop.classList.add('is-visible');backdrop.setAttribute('aria-hidden','false');closeBtn.focus();}
    function closePanel(){panel.classList.remove('is-open');panel.setAttribute('aria-hidden','true');backdrop.classList.remove('is-visible');backdrop.setAttribute('aria-hidden','true');openBtn.focus();}
    openBtn.addEventListener('click',openPanel);
    closeBtn.addEventListener('click',closePanel);
    backdrop.addEventListener('click',closePanel);
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('is-open'))closePanel();});
  }

  if(hamburger&&nav){
    hamburger.addEventListener('click',function(){var open=nav.classList.toggle('is-open');hamburger.setAttribute('aria-expanded',open);});
  }

  /* ----- Tab Switching ----- */
  document.querySelectorAll('.content-tabs').forEach(function(tabBar){
    var tabs=tabBar.querySelectorAll('.content-tabs__tab');
    tabs.forEach(function(tab){
      tab.addEventListener('click',function(){
        tabs.forEach(function(t){t.classList.remove('is-active');});
        tab.classList.add('is-active');
        var filter=tab.getAttribute('data-filter');
        var container=tabBar.nextElementSibling;
        if(!container)return;
        var items=container.querySelectorAll('[data-category]');
        if(items.length===0)return;
        items.forEach(function(item){
          if(!filter||filter==='all'){
            item.style.display='';
          }else{
            var cats=item.getAttribute('data-category').toLowerCase();
            item.style.display=cats.indexOf(filter.toLowerCase())!==-1?'':'none';
          }
        });
      });
    });
  });

  /* ----- FAQ Accordion ----- */
  document.querySelectorAll('.faq-item__question').forEach(function(btn){
    btn.addEventListener('click',function(){
      var item=btn.closest('.faq-item');
      var isOpen=item.classList.contains('is-open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('is-open');});
      if(!isOpen)item.classList.add('is-open');
    });
  });

  /* ----- Book Reader Sidebar Toggle ----- */
  var sidebarToggle=document.getElementById('sidebar-toggle');
  var sidebar=document.getElementById('reader-sidebar');
  if(sidebarToggle&&sidebar){
    sidebarToggle.addEventListener('click',function(){
      sidebar.classList.toggle('is-open');
    });
    // Close sidebar when clicking a chapter on mobile
    sidebar.querySelectorAll('.book-reader__chapter').forEach(function(ch){
      ch.addEventListener('click',function(){
        if(window.innerWidth<=896) sidebar.classList.remove('is-open');
      });
    });
  }

  /* ----- Book Reader Chapter Navigation ----- */
  var chapters=document.querySelectorAll('.book-reader__chapter');
  var progressBar=document.querySelector('.book-reader__progress-bar');
  if(chapters.length>0){
    chapters.forEach(function(ch,idx){
      ch.addEventListener('click',function(){
        chapters.forEach(function(c){c.classList.remove('is-active');});
        ch.classList.add('is-active');
        if(progressBar){
          var pct=((idx+1)/chapters.length)*100;
          progressBar.style.width=pct+'%';
        }
      });
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

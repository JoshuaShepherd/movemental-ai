(function () {
      // ----- Chat Panel -----
      var panel = document.getElementById('chat-panel');
      var openBtn = document.getElementById('chat-open');
      var closeBtn = document.getElementById('chat-close');
      var backdrop = document.getElementById('chat-backdrop');

      if (panel && openBtn && closeBtn && backdrop) {
        function openPanel() {
          panel.classList.add('is-open');
          panel.setAttribute('aria-hidden', 'false');
          backdrop.classList.add('is-visible');
          backdrop.setAttribute('aria-hidden', 'false');
          closeBtn.focus();
        }

        function closePanel() {
          panel.classList.remove('is-open');
          panel.setAttribute('aria-hidden', 'true');
          backdrop.classList.remove('is-visible');
          backdrop.setAttribute('aria-hidden', 'true');
          openBtn.focus();
        }

        openBtn.addEventListener('click', openPanel);
        closeBtn.addEventListener('click', closePanel);
        backdrop.addEventListener('click', closePanel);

        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
        });
      }

      // ----- Tab Switching -----
      var tabLists = document.querySelectorAll('.content-tabs__list');
      tabLists.forEach(function (tabList) {
        var tabs = tabList.querySelectorAll('.content-tabs__tab');
        tabs.forEach(function (tab) {
          tab.addEventListener('click', function (e) {
            e.preventDefault();
            // Deactivate all tabs in this list
            tabs.forEach(function (t) { t.classList.remove('is-active'); });
            tab.classList.add('is-active');

            // Filter content if data-filter is present
            var filter = tab.getAttribute('data-filter');
            if (filter) {
              var gridId = tabList.getAttribute('data-target');
              var grid = gridId ? document.getElementById(gridId) : tabList.closest('section') && tabList.closest('section').querySelector('[data-filterable]');
              if (!grid) {
                grid = document.querySelector('[data-filterable]');
              }
              if (grid) {
                var items = grid.querySelectorAll('[data-type]');
                items.forEach(function (item) {
                  if (filter === 'all' || item.getAttribute('data-type').indexOf(filter) !== -1) {
                    item.style.display = '';
                  } else {
                    item.style.display = 'none';
                  }
                });
              }
            }
          });
        });
      });

      // ----- Chapter Sidebar Toggle (Reader page) -----
      var sidebarToggle = document.getElementById('sidebar-toggle');
      var chapterSidebar = document.getElementById('chapter-sidebar');
      if (sidebarToggle && chapterSidebar) {
        sidebarToggle.addEventListener('click', function () {
          chapterSidebar.classList.toggle('is-open');
        });
        // Close sidebar when a chapter link is clicked on mobile
        var chapterLinks = chapterSidebar.querySelectorAll('.chapter-sidebar__link');
        chapterLinks.forEach(function (link) {
          link.addEventListener('click', function () {
            if (window.innerWidth < 769) {
              chapterSidebar.classList.remove('is-open');
            }
          });
        });
      }

      // ----- Reading Progress Bar -----
      var progressBar = document.querySelector('.reading-progress__bar');
      if (progressBar) {
        window.addEventListener('scroll', function () {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          progressBar.style.width = Math.min(progress, 100) + '%';
        });
      }

      // ----- FAQ Accordion -----
      var faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(function (item) {
        var question = item.querySelector('.faq-item__question');
        if (question) {
          question.addEventListener('click', function () {
            var isOpen = item.classList.contains('is-open');
            // Close all
            faqItems.forEach(function (fi) { fi.classList.remove('is-open'); });
            // Toggle current
            if (!isOpen) {
              item.classList.add('is-open');
            }
          });
        }
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
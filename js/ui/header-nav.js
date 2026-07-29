/* =====================
   STICKY HEADER NAVIGATION
   Facebook-style hide/reappear on scroll
   ===================== */

(function() {
  'use strict';

  var stickyHeader = document.querySelector('.sticky-header');
  var lastScrollY = window.scrollY;
  var ticking = false;
  var isHidden = false;
  var headerHeight = 0;

  function getHeaderHeight() {
    if (stickyHeader) {
      headerHeight = stickyHeader.offsetHeight;
      document.documentElement.style.setProperty('--total-header-height', headerHeight + 'px');
    }
    return headerHeight;
  }

  function handleScroll() {
    var currentScrollY = window.scrollY;

    // Always show near the top of the page
    if (currentScrollY < 30) {
      if (isHidden) {
        stickyHeader.classList.remove('hidden');
        isHidden = false;
      }
      lastScrollY = currentScrollY;
      return;
    }

    // Scrolling down - hide
    if (currentScrollY > lastScrollY + 10) {
      if (!isHidden) {
        stickyHeader.classList.add('hidden');
        isHidden = true;
      }
    }
    // Scrolling up - show
    else if (currentScrollY < lastScrollY - 10) {
      if (isHidden) {
        stickyHeader.classList.remove('hidden');
        isHidden = false;
      }
    }

    lastScrollY = currentScrollY;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  function initStickyHeader() {
    stickyHeader = document.querySelector('.sticky-header');
    if (!stickyHeader) return;

    // Get header height for body padding
    getHeaderHeight();

    // Set initial body padding
    document.body.style.paddingTop = headerHeight + 'px';

    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });

    // Recalculate on resize
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        getHeaderHeight();
        document.body.style.paddingTop = headerHeight + 'px';
      }, 200);
    });

    // Recalculate when fonts load or images load
    if (document.fonts) {
      document.fonts.ready.then(function() {
        getHeaderHeight();
        document.body.style.paddingTop = headerHeight + 'px';
      });
    }

    window.addEventListener('load', function() {
      getHeaderHeight();
      document.body.style.paddingTop = headerHeight + 'px';
    });
  }

  // Navigation helper - sets up back button
  function setupNavBackButton() {
    var backBtn = document.getElementById('navBackBtn');
    var backBtnBottom = document.getElementById('navBackBtnBottom');
    
    if (!backBtn && !backBtnBottom) return;
    
    var urlParams = new URLSearchParams(window.location.search);
    var type = urlParams.get('type');
    var session = urlParams.get('session');
    
    var sessionPage = 'index.html';
    if (type === 'honours' && session === '2013-2014') {
      sessionPage = 'honours-2013-2014.html';
    } else if (type === 'honours' && session === '2024-2025') {
      sessionPage = 'honours-2024-2025.html';
    } else if (type === 'degree' && session === '2013-2014') {
      sessionPage = 'degree-2013-2014.html';
    } else if (type === 'degree' && session === '2024-2025') {
      sessionPage = 'degree-2024-2025.html';
    }
    
    if (backBtn) backBtn.href = sessionPage;
    if (backBtnBottom) backBtnBottom.href = sessionPage;
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initStickyHeader();
      setupNavBackButton();
    });
  } else {
    initStickyHeader();
    setupNavBackButton();
  }

})();
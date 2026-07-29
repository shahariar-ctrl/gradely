/* =====================
   MAIN APPLICATION CONTROLLER
   Handles homepage quick navigation and general app initialization
   ===================== */

(function() {
  'use strict';

  // Session configuration (mirrored from constants.js for homepage use)
  var SESSION_CONFIGS = {
    'honours-2013-2014': {
      id: 'honours-2013-2014',
      label: 'Honours Programme',
      badge: '2013-2014 Session',
      type: 'honours',
      session: '2013-2014',
      subjectsPath: 'configs/subjects/honours-2013-2014/',
      page: 'honours-2013-2014.html'
    },
    'honours-2024-2025': {
      id: 'honours-2024-2025',
      label: 'Honours Programme',
      badge: '2024-2025 Session',
      type: 'honours',
      session: '2024-2025',
      subjectsPath: 'configs/subjects/honours-2024-2025/',
      page: 'honours-2024-2025.html'
    },
    'degree-2013-2014': {
      id: 'degree-2013-2014',
      label: 'Degree Pass Programme',
      badge: '2013-2014 Session',
      type: 'degree',
      session: '2013-2014',
      subjectsPath: 'configs/subjects/degree-2013-2014/',
      page: 'degree-2013-2014.html'
    },
    'degree-2024-2025': {
      id: 'degree-2024-2025',
      label: 'Degree Pass Programme',
      badge: '2024-2025 Session',
      type: 'degree',
      session: '2024-2025',
      subjectsPath: 'configs/subjects/degree-2024-2025/',
      page: 'degree-2024-2025.html'
    }
  };

  /**
   * Initialize homepage quick navigation
   */
  function initHomepageNav() {
    var programSelect = document.getElementById('nav-program');
    var sessionSelect = document.getElementById('nav-session');
    var subjectSelect = document.getElementById('nav-subject');
    var goBtn = document.getElementById('navGoBtn');
    var resetBtn = document.getElementById('navResetBtn');

    if (!programSelect || !sessionSelect || !subjectSelect || !goBtn || !resetBtn) return;

    /**
     * Populate sessions based on selected program
     */
    function populateSessions() {
      var program = programSelect.value;
      sessionSelect.innerHTML = '<option value="">— Select Session —</option>';
      subjectSelect.innerHTML = '<option value="">— Select Subject —</option>';
      subjectSelect.disabled = true;
      goBtn.disabled = true;

      if (!program) return;

      var sessionKeys = Object.keys(SESSION_CONFIGS).filter(function(key) {
        return SESSION_CONFIGS[key].type === program;
      });

      if (sessionKeys.length === 0) return;

      sessionKeys.forEach(function(key) {
        var config = SESSION_CONFIGS[key];
        var option = document.createElement('option');
        option.value = key;
        option.textContent = config.session;
        sessionSelect.appendChild(option);
      });

      sessionSelect.disabled = false;
    }

    /**
     * Populate subjects based on selected session
     */
    function populateSubjects() {
      var sessionId = sessionSelect.value;
      subjectSelect.innerHTML = '<option value="">— Select Subject —</option>';
      subjectSelect.disabled = true;
      goBtn.disabled = true;

      if (!sessionId) return;

      var config = SESSION_CONFIGS[sessionId];
      if (!config) return;

      var deptPath = config.subjectsPath + 'departments.js';
      var script = document.createElement('script');
      script.src = deptPath + '?_=' + Date.now();

      script.onload = function() {
        var depts = window.SESSION_DEPARTMENTS || [];
        var availableDepts = depts.filter(function(d) {
          return d.available !== false && d.path && d.path !== '#';
        });

        if (availableDepts.length > 0) {
          availableDepts.forEach(function(dept) {
            var option = document.createElement('option');
            option.value = dept.path;
            option.textContent = dept.name;
            subjectSelect.appendChild(option);
          });
          subjectSelect.disabled = false;
        } else {
          var placeholder = document.createElement('option');
          placeholder.value = '';
          placeholder.textContent = '— No subjects available —';
          placeholder.disabled = true;
          subjectSelect.appendChild(placeholder);
          subjectSelect.disabled = true;
        }

        delete window.SESSION_DEPARTMENTS;
        script.remove();
        updateGoButton();
      };

      script.onerror = function() {
        var placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = '— No subjects available —';
        placeholder.disabled = true;
        subjectSelect.appendChild(placeholder);
        subjectSelect.disabled = true;
        script.remove();
        updateGoButton();
      };

      document.head.appendChild(script);
    }

    /**
     * Update Go button state
     */
    function updateGoButton() {
      var hasProgram = programSelect.value !== '';
      var hasSession = sessionSelect.value !== '';
      goBtn.disabled = !(hasProgram && hasSession);
    }

    /**
     * Navigate to selected page
     */
    function navigate() {
      var program = programSelect.value;
      var sessionId = sessionSelect.value;
      var subject = subjectSelect.value;

      if (!program || !sessionId) return;

      var config = SESSION_CONFIGS[sessionId];
      if (!config) return;

      if (subject && subject !== '') {
        var url = 'department.html?type=' + config.type +
                  '&session=' + config.session +
                  '&dept=' + subject;
        window.location.href = url;
      } else {
        window.location.href = config.page;
      }
    }

    /**
     * Reset all selections
     */
    function resetAll() {
      programSelect.value = '';
      sessionSelect.innerHTML = '<option value="">— Select Session —</option>';
      subjectSelect.innerHTML = '<option value="">— Select Subject —</option>';
      sessionSelect.disabled = true;
      subjectSelect.disabled = true;
      goBtn.disabled = true;
    }

    // Event listeners
    programSelect.addEventListener('change', function() {
      populateSessions();
      subjectSelect.innerHTML = '<option value="">— Select Subject —</option>';
      subjectSelect.disabled = true;
      updateGoButton();
    });

    sessionSelect.addEventListener('change', function() {
      populateSubjects();
      updateGoButton();
    });

    subjectSelect.addEventListener('change', updateGoButton);

    goBtn.addEventListener('click', navigate);

    resetBtn.addEventListener('click', resetAll);

    // Enter key support
    [programSelect, sessionSelect, subjectSelect].forEach(function(select) {
      select.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !goBtn.disabled) {
          navigate();
        }
      });
    });

    // Initialize
    populateSessions();
    subjectSelect.disabled = true;
    goBtn.disabled = true;

    if (programSelect.value) {
      populateSessions();
    }
  }

  /**
   * Fix body padding for sticky header
   */
  function fixBodyPadding() {
    var header = document.querySelector('.sticky-header');
    if (header) {
      var headerHeight = header.offsetHeight;
      document.body.style.paddingTop = headerHeight + 'px';
    }
  }

  /**
   * Initialize sticky header behavior
   */
  function initStickyHeader() {
    var stickyHeader = document.querySelector('.sticky-header');
    if (!stickyHeader) return;

    var lastScrollY = window.scrollY;
    var ticking = false;
    var isHidden = false;

    function getHeaderHeight() {
      var height = stickyHeader.offsetHeight;
      document.documentElement.style.setProperty('--total-header-height', height + 'px');
      return height;
    }

    function handleScroll() {
      var currentScrollY = window.scrollY;

      if (currentScrollY < 30) {
        if (isHidden) {
          stickyHeader.classList.remove('hidden');
          isHidden = false;
        }
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY + 10) {
        if (!isHidden) {
          stickyHeader.classList.add('hidden');
          isHidden = true;
        }
      } else if (currentScrollY < lastScrollY - 10) {
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

    // Initialize
    getHeaderHeight();
    document.body.style.paddingTop = getHeaderHeight() + 'px';

    window.addEventListener('scroll', onScroll, { passive: true });

    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        document.body.style.paddingTop = getHeaderHeight() + 'px';
      }, 200);
    });

    if (document.fonts) {
      document.fonts.ready.then(function() {
        document.body.style.paddingTop = getHeaderHeight() + 'px';
      });
    }

    window.addEventListener('load', function() {
      document.body.style.paddingTop = getHeaderHeight() + 'px';
    });
  }

  /**
   * Setup back button navigation
   */
  function setupBackButtons() {
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

  // Initialize everything on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize sticky header
    initStickyHeader();

    // Setup back buttons
    setupBackButtons();

    // Initialize homepage navigation if on homepage
    if (document.getElementById('nav-program')) {
      initHomepageNav();
    }

    // Fix body padding after everything loads
    setTimeout(fixBodyPadding, 100);
    window.addEventListener('load', fixBodyPadding);
    window.addEventListener('resize', fixBodyPadding);
  });

})();
/* =====================
   SESSION CONFIGURATION
   ===================== */

(function() {
  'use strict';

  var SESSION_CONFIGS = {
    'honours-2013-2014': {
      id: 'honours-2013-2014',
      label: 'Honours Programme',
      badge: '2013-2014 Session',
      type: 'honours',
      session: '2013-2014',
      gradingConfig: 'honours-2013-2014',
      subjectsPath: 'configs/subjects/honours-2013-2014/',
      departments: []
    },
    'honours-2024-2025': {
      id: 'honours-2024-2025',
      label: 'Honours Programme',
      badge: '2024-2025 Session',
      type: 'honours',
      session: '2024-2025',
      gradingConfig: 'honours-2024-2025',
      subjectsPath: 'configs/subjects/honours-2024-2025/',
      departments: []
    },
    'degree-2013-2014': {
      id: 'degree-2013-2014',
      label: 'Degree Pass Programme',
      badge: '2013-2014 Session',
      type: 'degree',
      session: '2013-2014',
      gradingConfig: 'degree-2013-2014',
      subjectsPath: 'configs/subjects/degree-2013-2014/',
      departments: []
    },
    'degree-2024-2025': {
      id: 'degree-2024-2025',
      label: 'Degree Pass Programme',
      badge: '2024-2025 Session',
      type: 'degree',
      session: '2024-2025',
      gradingConfig: 'degree-2024-2025',
      subjectsPath: 'configs/subjects/degree-2024-2025/',
      departments: []
    }
  };

  // Cache for loaded departments
  var _departmentCache = {};

  // Helper to get session config by ID
  window.getSessionConfig = function(sessionId) {
    return SESSION_CONFIGS[sessionId] || null;
  };

  // Helper to get departments for a session
  window.getDepartmentsForSession = function(sessionId, callback) {
    var config = window.getSessionConfig(sessionId);
    if (!config) {
      if (callback) callback([]);
      return [];
    }

    // Check cache
    if (_departmentCache[sessionId]) {
      if (callback) callback(_departmentCache[sessionId]);
      return _departmentCache[sessionId];
    }

    var deptListPath = config.subjectsPath + 'departments.js';

    // Load dynamically
    var script = document.createElement('script');
    script.src = deptListPath + '?_=' + Date.now();
    script.setAttribute('data-session', sessionId);

    script.onload = function() {
      var departments = window.SESSION_DEPARTMENTS || [];
      _departmentCache[sessionId] = departments;
      if (callback) callback(departments);
      delete window.SESSION_DEPARTMENTS;
      script.remove();
    };

    script.onerror = function() {
      if (callback) callback([]);
      script.remove();
    };

    document.head.appendChild(script);
    return [];
  };

})();
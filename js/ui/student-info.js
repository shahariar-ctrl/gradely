/* =====================
   STUDENT INFO HANDLER
   ===================== */

(function() {
  'use strict';

  var STORAGE_PREFIX = 'gradely_';

  /**
   * Get all student info from form fields
   * @returns {Object} Student info object
   */
  window.getStudentInfo = function() {
    return {
      name: document.getElementById('student-name')?.value || 'Not Provided',
      fatherName: document.getElementById('student-father')?.value || 'Not Provided',
      motherName: document.getElementById('student-mother')?.value || 'Not Provided',
      examRoll: document.getElementById('student-exam-roll')?.value || 'Not Provided',
      registration: document.getElementById('student-reg')?.value || 'Not Provided',
      examYear: document.getElementById('student-exam-year')?.value || 'Not Provided',
      session: document.getElementById('student-session')?.value || 'Not Provided',
      studentType: document.getElementById('student-type')?.value || 'Not Selected',
      college: document.getElementById('student-college')?.value || 'Not Provided',
      subject: document.getElementById('student-subject')?.value || 'Not Provided',
      subjectResult: document.getElementById('student-subject-result')?.value || 'In Progress',
      gpa: document.getElementById('student-final-gpa')?.value || '0.00'
    };
  };

  /**
   * Setup student info listeners with localStorage persistence
   * @param {string} prefix - Storage prefix
   */
  window.setupStudentInfoListeners = function(prefix) {
    var inputIds = [
      'student-name', 'student-father', 'student-mother', 
      'student-exam-roll', 'student-reg', 'student-exam-year', 
      'student-session', 'student-type', 'student-college'
    ];
    
    var storageKey = function(id) {
      return STORAGE_PREFIX + prefix + '_' + id;
    };
    
    var saveField = function(id, value) {
      try {
        localStorage.setItem(storageKey(id), value);
      } catch (e) {
        // Fail silently
      }
    };
    
    var restoreFields = function() {
      inputIds.forEach(function(id) {
        var input = document.getElementById(id);
        if (input) {
          try {
            var saved = localStorage.getItem(storageKey(id));
            if (saved !== null) {
              input.value = saved;
            }
          } catch (e) {
            // Fail silently
          }
        }
      });
    };
    
    var flushAll = function() {
      inputIds.forEach(function(id) {
        var input = document.getElementById(id);
        if (input) {
          saveField(id, input.value);
        }
      });
    };
    
    // Restore saved values
    restoreFields();
    
    // Setup listeners
    inputIds.forEach(function(id) {
      var input = document.getElementById(id);
      if (input) {
        var saveToLocal = function() {
          saveField(id, input.value);
        };
        input.addEventListener('change', saveToLocal);
        input.addEventListener('input', saveToLocal);
      }
    });
    
    // Safety net: save before page unload
    window.addEventListener('beforeunload', flushAll);
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') {
        flushAll();
      }
    });
    window.addEventListener('pagehide', flushAll);
  };

  /**
   * Update student GPA field from CGPA display
   */
  window.updateStudentGPAField = function() {
    var cgpa = document.getElementById('overall-cgpa')?.textContent || '0.00';
    var gpaField = document.getElementById('student-final-gpa');
    if (gpaField) {
      gpaField.value = cgpa;
    }
  };

  /**
   * Clear all stored data and reload
   */
  window.clearAllData = function() {
    try {
      // Only clear items with our prefix
      var keysToRemove = [];
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(function(key) {
        localStorage.removeItem(key);
      });
    } catch (e) {
      // Fail silently
    }
    location.reload();
  };

})();
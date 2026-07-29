/* =====================
   GRADE DROPDOWN HANDLER
   ===================== */

(function() {
  'use strict';

  /**
   * Populate grade dropdowns with options
   * @param {HTMLElement} container - The container element
   * @param {Object} gradeMapping - Grade mapping object
   */
  window.populateGradeDropdowns = function(container, gradeMapping) {
    if (!container) container = document;
    
    var grades = Object.keys(gradeMapping);
    
    var selects = container.querySelectorAll('.grade-select');
    
    selects.forEach(function(select) {
      // Clear existing options except the first placeholder
      while (select.options.length > 1) {
        select.remove(1);
      }
      
      grades.forEach(function(grade) {
        var option = document.createElement('option');
        option.value = grade;
        var gradeInfo = gradeMapping[grade];
        var gpText = gradeInfo ? gradeInfo.gradePoint.toFixed(2) : '0.00';
        option.textContent = grade + ' (' + gpText + ')';
        select.appendChild(option);
      });
    });
  };

  /**
   * Initialize grade selects with change handlers
   * @param {HTMLElement} container - The container element
   * @param {Object} gradeMapping - Grade mapping object
   * @param {Function} updateCallback - Callback after grade change
   */
  window.initGradeSelects = function(container, gradeMapping, updateCallback) {
    if (!container) container = document;
    
    var selects = container.querySelectorAll('.grade-select');
    
    selects.forEach(function(select) {
      // Remove existing listener to avoid duplicates
      select.removeEventListener('change', window._gradeChangeHandler);
      
      // Create handler function
      var handler = function(event) {
        window.handleGradeChange(event, gradeMapping, updateCallback);
      };
      
      // Store reference for removal
      select._gradeChangeHandler = handler;
      select.addEventListener('change', handler);
    });
  };

  /**
   * Handle grade change event
   * @param {Event} event - The change event
   * @param {Object} gradeMapping - Grade mapping object
   * @param {Function} updateCallback - Callback after grade change
   */
  window.handleGradeChange = function(event, gradeMapping, updateCallback) {
    var select = event.target;
    var row = select.closest('tr');
    var marksCell = row ? row.querySelector('.marks-range-cell') : null;
    var grade = select.value;
    
    // Update marks range
    var panel = select.closest('.year-panel');
    var panelId = panel ? panel.id : null;
    var subjectCode = row ? row.dataset.subjectCode : null;
    
    if (grade && gradeMapping[grade]) {
      if (marksCell) {
        marksCell.textContent = gradeMapping[grade].marksRange;
      }
    } else {
      if (marksCell) {
        marksCell.textContent = '—';
      }
    }
    
    // Notify group engine of grade change
    if (panelId && subjectCode && window.SubjectGroupEngine) {
      window.SubjectGroupEngine.handleGradeChange(panelId, subjectCode, grade);
    }
    
    // Call update callback
    if (updateCallback) {
      updateCallback();
    }
  };

  /**
   * Initialize group engine for all panels
   * @param {Object} subjectData - Subject data object
   */
  window.initGroupEngineForAllPanels = function(subjectData) {
    var panels = document.querySelectorAll('.year-panel');
    
    panels.forEach(function(panel) {
      var yearNum = parseInt(panel.id.replace('year-panel-', ''));
      var yearData = subjectData.years[yearNum];
      
      if (yearData && yearData.groups && yearData.groups.length > 0) {
        var gradeMapping = window.currentGradingConfig ? window.currentGradingConfig.grades : {};
        window.SubjectGroupEngine.initGroups(panel.id, yearData.groups, gradeMapping);
      }
    });
  };

})();
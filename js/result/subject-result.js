/* =====================
   SUBJECT RESULT STATUS
   Shows only in Student Information > Subject Result field
   ===================== */

(function() {
  'use strict';

  /**
   * Check if a student has passed 3 or more subjects for a given year
   * @param {HTMLElement} yearPanel - The year panel element
   * @param {Object} gradeMapping - Grade mapping object
   * @returns {boolean|null} True if passed, false if not, null if no grades
   */
  window.hasPassedThreeOrMoreSubjectsForYear = function(yearPanel, gradeMapping) {
    if (!yearPanel) return null;

    var passedCount = 0;
    var totalGradedSubjects = 0;
    var validationErrors = [];

    var selects = yearPanel.querySelectorAll('.grade-select');

    selects.forEach(function(select) {
      var grade = select.value;
      if (grade && grade !== '') {
        totalGradedSubjects++;
        var gradeInfo = gradeMapping[grade];
        if (gradeInfo && gradeInfo.isPass === true) {
          passedCount++;
        }
      }
    });

    var panelId = yearPanel.id;

    if (window.SubjectGroupEngine && typeof window.SubjectGroupEngine.validateGroups === 'function') {
      var groupResult = window.SubjectGroupEngine.validateGroups(panelId);
      if (!groupResult.valid) {
        validationErrors = validationErrors.concat(groupResult.errors);
      }

      var mandatoryResult = window.SubjectGroupEngine.validateMandatory(panelId);
      if (!mandatoryResult.valid) {
        validationErrors = validationErrors.concat(mandatoryResult.errors);
      }
    }

    if (totalGradedSubjects === 0) return null;
    if (validationErrors.length > 0) return null;

    return passedCount >= 3;
  };

  /**
   * Update the subject result status field
   * @param {Object} gradeMapping - Grade mapping object
   */
  window.updateSubjectResultStatus = function(gradeMapping) {
    var resultField = document.getElementById('student-subject-result');
    if (!resultField) return;

    var activePanel = document.querySelector('.year-panel.active');
    if (!activePanel) {
      resultField.value = 'In Progress';
      resultField.className = 'info-input result-in-progress';
      return;
    }

    var result = window.hasPassedThreeOrMoreSubjectsForYear(activePanel, gradeMapping);
    var status = '';
    var statusClass = '';

    if (result === null) {
      status = 'In Progress';
      statusClass = 'result-in-progress';
    } else if (result === true) {
      status = 'Promoted';
      statusClass = 'result-promoted';
    } else {
      status = 'Not Promoted';
      statusClass = 'result-not-promoted';
    }

    resultField.value = status;
    resultField.className = 'info-input ' + statusClass;
  };

  /**
   * Validate all groups across all panels (for download validation)
   * @returns {Object} { valid, errors }
   */
  window.validateAllGroups = function() {
    var allValid = true;
    var allErrors = [];

    var panels = document.querySelectorAll('.year-panel');

    panels.forEach(function(panel) {
      var panelId = panel.id;

      if (window.SubjectGroupEngine && typeof window.SubjectGroupEngine.validateGroups === 'function') {
        var groupResult = window.SubjectGroupEngine.validateGroups(panelId);
        if (!groupResult.valid) {
          allValid = false;
          allErrors = allErrors.concat(groupResult.errors);
        }

        var mandatoryResult = window.SubjectGroupEngine.validateMandatory(panelId);
        if (!mandatoryResult.valid) {
          allValid = false;
          allErrors = allErrors.concat(mandatoryResult.errors);
        }
      }
    });

    return { valid: allValid, errors: allErrors };
  };

})();
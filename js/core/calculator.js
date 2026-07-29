/* =====================
   GPA / CGPA CALCULATOR
   ===================== */

(function() {
  'use strict';

  /**
   * Calculate GPA for a specific year panel
   * @param {HTMLElement} yearPanel - The year panel DOM element
   * @param {Object} gradeMapping - Grade mapping object
   * @returns {Object} { gpa, totalCredits, hasFail }
   */
  window.calculateYearGPA = function(yearPanel, gradeMapping) {
    var totalPoints = 0;
    var totalCredits = 0;
    var hasFail = false;

    if (!yearPanel) {
      return { gpa: null, totalCredits: 0, hasFail: false };
    }

    var rows = yearPanel.querySelectorAll('tbody tr');

    rows.forEach(function(row) {
      var credit = parseFloat(row.dataset.credit) || 0;
      var gradeSelect = row.querySelector('.grade-select');
      var grade = gradeSelect ? gradeSelect.value : '';
      var gradeInfo = gradeMapping[grade];

      if (gradeInfo && !gradeInfo.isPass) {
        hasFail = true;
      }

      if (!isNaN(credit) && credit > 0 && gradeInfo) {
        totalPoints += credit * gradeInfo.gradePoint;
        totalCredits += credit;
      }
    });

    var gpa = hasFail ? null : (totalCredits > 0 ? totalPoints / totalCredits : 0);

    // Update footer elements
    var footerCredit = yearPanel.querySelector('tfoot .footer-credit');
    var footerGpa = yearPanel.querySelector('tfoot .footer-gpa');

    if (footerCredit) {
      footerCredit.textContent = totalCredits;
    }

    if (footerGpa) {
      footerGpa.textContent = hasFail ? 'N/A' : gpa.toFixed(2);
      if (hasFail) {
        footerGpa.classList.add('fail-flag');
      } else {
        footerGpa.classList.remove('fail-flag');
      }
    }

    // Update year stats in the header
    var yearNum = yearPanel.id.replace('year-panel-', '');
    var yearStat = document.getElementById('year' + yearNum + '-stat');
    if (yearStat) {
      var yearGpaSpan = yearStat.querySelector('.stat-value');
      if (yearGpaSpan) {
        yearGpaSpan.textContent = hasFail ? 'N/A' : gpa.toFixed(2);
        if (hasFail) {
          yearGpaSpan.classList.add('fail-flag');
        } else {
          yearGpaSpan.classList.remove('fail-flag');
        }
      }
    }

    return { gpa: gpa, totalCredits: totalCredits, hasFail: hasFail };
  };

  /**
   * Calculate overall CGPA across all years
   * @param {Object} gradeMapping - Grade mapping object
   * @returns {number|null} CGPA or null if fail
   */
  window.calculateOverallCGPA = function(gradeMapping) {
    var totalPoints = 0;
    var totalCredits = 0;
    var hasFail = false;

    var panels = document.querySelectorAll('.year-panel');

    panels.forEach(function(panel) {
      var rows = panel.querySelectorAll('tbody tr');

      rows.forEach(function(row) {
        var credit = parseFloat(row.dataset.credit) || 0;
        var gradeSelect = row.querySelector('.grade-select');
        var grade = gradeSelect ? gradeSelect.value : '';
        var gradeInfo = gradeMapping[grade];

        if (gradeInfo && !gradeInfo.isPass) {
          hasFail = true;
        }

        if (!isNaN(credit) && credit > 0 && gradeInfo) {
          totalPoints += credit * gradeInfo.gradePoint;
          totalCredits += credit;
        }
      });
    });

    var cgpa = hasFail ? null : (totalCredits > 0 ? totalPoints / totalCredits : 0);

    var overallCgpa = document.getElementById('overall-cgpa');
    var overallClass = document.getElementById('overall-class');
    var overallCredit = document.getElementById('overall-credit');

    if (overallCgpa) {
      overallCgpa.textContent = hasFail ? 'N/A' : cgpa.toFixed(2);
      if (hasFail) {
        overallCgpa.classList.add('fail-flag');
      } else {
        overallCgpa.classList.remove('fail-flag');
      }
    }

    if (overallClass) {
      overallClass.textContent = hasFail ? 'Fail — CGPA Not Calculated' : window.getClassDivision(cgpa);
    }

    if (overallCredit) {
      overallCredit.textContent = totalCredits;
    }

    return cgpa;
  };

  /**
   * Get class division based on CGPA
   * @param {number} cgpa - The CGPA value
   * @returns {string} Class division
   */
  window.getClassDivision = function(cgpa) {
    if (cgpa === null || cgpa === undefined) return 'N/A';
    if (cgpa >= 3.75) return 'First Class with Distinction';
    if (cgpa >= 3.25) return 'First Class';
    if (cgpa >= 2.25) return 'Second Class';
    if (cgpa >= 2.00) return 'Third Class';
    return 'Fail';
  };

  /**
   * Update all calculations for all panels
   * @param {Object} gradeMapping - Grade mapping object
   */
  window.updateAllCalculations = function(gradeMapping) {
    var panels = document.querySelectorAll('.year-panel');

    panels.forEach(function(panel) {
      window.calculateYearGPA(panel, gradeMapping);
    });

    window.calculateOverallCGPA(gradeMapping);
  };

})();
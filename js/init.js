/* =====================
   DEPARTMENT PAGE INITIALIZATION
   ===================== */

(function() {
  'use strict';

  /**
   * Show error message on department page
   * @param {string} message - Error message to display
   */
  function showError(message) {
    var container = document.querySelector('.subject-container');
    if (container) {
      container.innerHTML = '\n      <div style="text-align: center; padding: 60px 20px;">\n        <h3 style="color: #c0392b;">⚠️ ' + message + '</h3>\n        <button onclick="window.location.href=\'index.html\'" class="btn-search" style="margin-top: 20px;">← Back to Home</button>\n      </div>\n    ';
    } else {
      alert(message);
      window.location.href = 'index.html';
    }
  }

  /**
   * Get ordinal suffix for year number
   * @param {number} i - The number
   * @returns {string} Ordinal suffix
   */
  function getOrdinalSuffix(i) {
    var j = i % 10;
    var k = i % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  }

  /**
   * Switch active year tab
   * @param {number} year - Year number to switch to
   */
  function switchYearTab(year) {
    var tabs = document.querySelectorAll('.year-tab');
    var panels = document.querySelectorAll('.year-panel');

    tabs.forEach(function(tab) {
      var tabYear = parseInt(tab.dataset.year);
      if (tabYear === year) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    panels.forEach(function(panel) {
      var panelId = panel.id;
      var panelYear = parseInt(panelId.replace('year-panel-', ''));
      if (panelYear === year) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    if (window.currentGradingConfig && typeof window.updateSubjectResultStatus === 'function') {
      window.updateSubjectResultStatus(window.currentGradingConfig.grades);
    }
  }

  /**
   * Generate HTML for a year panel
   * @param {number} yearNum - Year number
   * @param {Object} yearData - Year data object
   * @param {Object} subjectData - Subject data object
   * @param {string} educationType - 'honours' or 'degree'
   * @returns {string} HTML string
   */
  function generateYearPanel(yearNum, yearData, subjectData, educationType) {
    var yearNames = ['', 'First', 'Second', 'Third', 'Fourth'];
    var yearName = yearNames[yearNum];

    var subjectsHtml = '';

    yearData.subjects.forEach(function(subject) {
      var isMandatory = false;
      if (yearData.mandatory && yearData.mandatory.indexOf(subject.code) !== -1) {
        isMandatory = true;
      }

      var dataAttrs = 'data-subject-code="' + subject.code + '" data-credit="' + subject.credit + '"';
      if (isMandatory) {
        dataAttrs += ' data-mandatory="true"';
      }

      subjectsHtml += '\n      <tr ' + dataAttrs + '>\n        <td class="font-mono">' + subject.code + '</td>\n        <td class="sub-name">' + subject.name + '</td>\n        <td>' + subject.credit + '</td>\n        <td><select class="grade-select"><option value="">—</option></select></td>\n        <td class="marks-range-cell">—</td>\n      </tr>\n    ';
    });

    return '\n    <div class="card">\n      <div class="card-header">\n        📅 ' + subjectData.departmentName + ' ' + (subjectData.educationType === 'honours' ? 'Honours' : 'Degree') + ' ' + yearName + ' Year\n      </div>\n      <div class="card-body">\n        <div class="table-wrapper">\n          <table class="result-table">\n            <thead>\n              <tr><th>Code</th><th>Subject Name</th><th>Credit</th><th>Grade</th><th>Marks Range</th></tr>\n            </thead>\n            <tbody>\n              ' + subjectsHtml + '\n            </tbody>\n            <tfoot>\n              <tr><td colspan="2">Year Total</td><td class="footer-credit">0</td><td class="footer-gpa">0.00</td><td></td></tr>\n            </tfoot>\n          </table>\n        </div>\n      </div>\n    </div>\n    <div class="download-bar">\n      <button class="btn-primary" onclick="downloadYearResult(' + yearNum + ', \'' + subjectData.departmentName + '\', getStudentInfo(), \'' + educationType + '\')">📥 Download ' + yearName + ' Year Result</button>\n      <button class="btn-refresh" onclick="window.clearAllData()">Reload</button>\n    </div>\n  ';
  }

  /**
   * Render the department page with subject data
   * @param {Object} subjectData - Subject data object
   * @param {Object} gradingConfig - Grading configuration
   * @param {Object} sessionConfig - Session configuration
   */
  function renderDepartmentPage(subjectData, gradingConfig, sessionConfig) {
    if (!subjectData || !subjectData.years) {
      console.error('Invalid subjectData passed to renderDepartmentPage');
      showError('Invalid department data. Please try again.');
      return;
    }

    console.log('Rendering department page for:', subjectData.departmentName);

    // Set page title
    var educationLabel = subjectData.educationType === 'honours' ? 'Honours' : 'Degree';
    document.title = subjectData.departmentName + ' (' + educationLabel + ') - Gradely, National University Academic Result Tool';

    var titleEl = document.querySelector('.subject-title');
    var descEl = document.querySelector('.subject-description');
    var dividerSpan = document.querySelector('.section-divider span');

    // Update session badge
    var badgeEl = document.querySelector('.session-badge');
    if (!badgeEl) {
      var header = document.querySelector('.subject-header');
      if (header) {
        var badge = document.createElement('span');
        badge.className = 'session-badge';
        header.querySelector('.subject-title')?.appendChild(badge);
        badgeEl = badge;
      }
    }
    if (badgeEl) {
      badgeEl.textContent = sessionConfig ? sessionConfig.session || '' : '';
    }

    if (titleEl) {
      titleEl.textContent = 'Bachelor of ' + educationLabel + ' in ' + subjectData.departmentName;
    }
    if (descEl) {
      descEl.textContent = 'Department of ' + subjectData.departmentName + ' - CGPA Calculator & Academic Information';
    }

    var subjectField = document.getElementById('student-subject');
    if (subjectField) {
      if (subjectData.shortName) {
        subjectField.value = subjectData.shortName;
      } else {
        subjectField.value = subjectData.departmentName + ' (' + educationLabel + ')';
      }
    }

    if (dividerSpan) {
      dividerSpan.textContent = 'Department of ' + subjectData.departmentName + ' (' + (sessionConfig ? sessionConfig.session : subjectData.syllabus) + ')';
    }

    var yearTabsContainer = document.querySelector('.year-tabs');
    var panelsContainer = document.querySelector('.year-panels-container');

    if (!yearTabsContainer || !panelsContainer) {
      console.error('Required containers not found');
      return;
    }

    yearTabsContainer.innerHTML = '';
    panelsContainer.innerHTML = '';

    var yearCount = Object.keys(subjectData.years).length;
    console.log('Rendering', yearCount, 'years');

    var educationType = subjectData.educationType;

    for (var i = 1; i <= yearCount; i++) {
      var year = subjectData.years[i];
      if (!year) continue;

      var tab = document.createElement('button');
      tab.className = 'year-tab ' + (i === 1 ? 'active' : '');
      tab.dataset.year = i;
      tab.textContent = i + getOrdinalSuffix(i) + ' Year';

      (function(yearNum) {
        tab.onclick = function() {
          switchYearTab(yearNum);
        };
      })(i);

      yearTabsContainer.appendChild(tab);

      var panel = document.createElement('div');
      panel.id = 'year-panel-' + i;
      panel.className = 'year-panel ' + (i === 1 ? 'active' : '');
      panel.innerHTML = generateYearPanel(i, year, subjectData, educationType);
      panelsContainer.appendChild(panel);
    }

    window.currentGradingConfig = gradingConfig;
    window.currentSubjectData = subjectData;
    window.currentSessionConfig = sessionConfig;

    // Populate dropdowns
    window.populateGradeDropdowns(document, gradingConfig.grades);
    window.initYearTabs();

    // Initialize group engine if available
    if (typeof window.initGroupEngineForAllPanels === 'function') {
      window.initGroupEngineForAllPanels(subjectData);
    }

    // Setup grade change handlers
    window.initGradeSelects(document, gradingConfig.grades, function() {
      window.updateAllCalculations(gradingConfig.grades);
      window.updateStudentGPAField();
      if (typeof window.updateSubjectResultStatus === 'function') {
        window.updateSubjectResultStatus(gradingConfig.grades);
      }
    });

    // Initial calculations
    window.updateAllCalculations(gradingConfig.grades);

    setTimeout(function() {
      if (typeof window.updateSubjectResultStatus === 'function') {
        window.updateSubjectResultStatus(gradingConfig.grades);
      }
    }, 200);

    var prefix = subjectData.educationType + '-' + (sessionConfig ? sessionConfig.session : subjectData.syllabus) + '-' + subjectData.departmentName;
    window.setupStudentInfoListeners(prefix);
    window.updateStudentGPAField();

    // Setup transcript download button
    var transcriptBtn = document.getElementById('downloadTranscriptBtn');
    if (transcriptBtn) {
      transcriptBtn.onclick = function() {
        window.downloadFullTranscript(
          subjectData.departmentName,
          window.getStudentInfo(),
          gradingConfig.grades
        );
      };
    }

    console.log('Department page rendered successfully');
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    var urlParams = new URLSearchParams(window.location.search);
    var type = urlParams.get('type');
    var session = urlParams.get('session');
    var dept = urlParams.get('dept');

    // Only run on department page
    if (!document.querySelector('.subject-container')) return;

    console.log('Loading department:', { type, session, dept });

    if (!type || !session || !dept) {
      console.error('Missing URL parameters');
      window.location.href = 'index.html';
      return;
    }

    var sessionId = type + '-' + session;
    var sessionConfig = window.getSessionConfig(sessionId);

    if (!sessionConfig) {
      console.error('Session config not found for:', sessionId);
      alert('Invalid session configuration. Please go back and try again.');
      window.location.href = 'index.html';
      return;
    }

    var gradingConfig = window.getGradingConfig(type, session);
    if (!gradingConfig) {
      console.error('Grading config not found for:', type, session);
      alert('Grading system not configured for this syllabus. Coming soon!');
      window.location.href = 'index.html';
      return;
    }

    console.log('Grading config loaded:', gradingConfig.name);

    // Load subject data
    var subjectDataPath = sessionConfig.subjectsPath + dept + '.js';
    console.log('Loading subject data from:', subjectDataPath);

    try {
      var existingScript = document.querySelector('script[data-dept="' + dept + '"][data-session="' + sessionId + '"]');
      if (existingScript) {
        existingScript.remove();
      }

      var script = document.createElement('script');
      script.src = subjectDataPath + '?_=' + Date.now();
      script.setAttribute('data-dept', dept);
      script.setAttribute('data-session', sessionId);

      script.onload = function() {
        console.log('Subject data loaded:', window.subjectData);
        if (window.subjectData && window.subjectData.years) {
          renderDepartmentPage(window.subjectData, gradingConfig, sessionConfig);
        } else {
          console.error('window.subjectData is undefined or missing years after script load');
          showError('Department data not found. Coming soon!');
        }
        script.remove();
      };

      script.onerror = function(err) {
        console.error('Failed to load subject data:', subjectDataPath, err);
        showError('Department "' + dept + '" not available for ' + type + '-' + session + '. Coming soon!');
        script.remove();
      };

      document.head.appendChild(script);
    } catch (error) {
      console.error('Error loading department:', error);
      showError('Department not available yet. Coming soon!');
    }
  });

})();
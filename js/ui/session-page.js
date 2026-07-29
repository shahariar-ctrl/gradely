/* =====================
   SESSION PAGE RENDERER
   Renders department cards for a specific session
   ===================== */

(function() {
  'use strict';

  var loadedSessions = {};
  var modalStylesAdded = false;

  /**
   * Show coming soon modal
   * @param {string} deptName - Department name
   * @param {string} deptCode - Department code
   * @param {string} sessionLabel - Session label
   */
  function showComingSoonModal(deptName, deptCode, sessionLabel) {
    // Remove existing modal if any
    var existingModal = document.getElementById('comingSoonModal');
    if (existingModal) {
      existingModal.remove();
    }

    // Add styles if not already present
    if (!modalStylesAdded) {
      var style = document.createElement('style');
      style.id = 'comingSoonModalStyles';
      style.textContent = `
        .scrim {
          position: fixed;
          inset: 0;
          background: rgba(9,12,26,0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity .25s ease;
          z-index: 9999;
        }
        .scrim.open {
          opacity: 1;
          pointer-events: auto;
        }
        .scrim .card {
          width: min(370px, 85vw);
          background: #ffffff;
          border-radius: 19px;
          padding: 0 0 22px;
          box-shadow: 0 28px 56px -17px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.03);
          transform: translateY(14px) scale(.96);
          opacity: 0;
          transition: transform .32s cubic-bezier(.2,.8,.2,1), opacity .25s ease;
          overflow: hidden;
          position: relative;
        }
        .scrim.open .card {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        .scrim .top {
          height: 84px;
          background: linear-gradient(135deg, #6D28D9, #2563EB);
          position: relative;
          overflow: hidden;
        }
        .scrim .top::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 85% 0%, rgba(255,255,255,0.25), transparent 55%);
        }
        .scrim .icon {
          width: 53px;
          height: 53px;
          border-radius: 15px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          left: 24px;
          bottom: -26px;
          box-shadow: 0 10px 22px -8px rgba(37,99,235,0.45);
        }
        .scrim .icon svg {
          width: 24px;
          height: 24px;
        }
        .scrim .content {
          padding: 38px 24px 0;
        }
        .scrim .dept-bn {
          font-family: 'Noto Serif Bengali', 'Segoe UI', serif;
          font-size: 21px;
          font-weight: 700;
          color: #1C2333;
          margin: 0 0 2px;
        }
        .scrim .dept-en {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: #6D28D9;
          margin: 0 0 14px;
        }
        .scrim .msg {
          font-size: 14px;
          color: #1C2333;
          line-height: 1.5;
          margin: 0 0 12px;
        }
        .scrim .msg strong {
          color: #6D28D9;
        }
        .scrim .note {
          font-size: 12px;
          color: #6B7280;
          line-height: 1.5;
          padding: 10px 12px;
          background: #F5F3FF;
          border-radius: 10px;
          margin: 0 0 22px;
        }
        .scrim .actions {
          display: flex;
          justify-content: flex-end;
          padding: 0 24px;
        }
        .scrim .ok-btn {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #6D28D9, #2563EB);
          border: none;
          padding: 9px 22px;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 8px 18px -6px rgba(109,40,217,0.5);
          transition: transform .15s ease, box-shadow .15s ease;
        }
        .scrim .ok-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 22px -6px rgba(109,40,217,0.6);
        }
        .scrim .ok-btn:active {
          transform: translateY(0);
        }
        .scrim .ok-btn:focus-visible {
          outline: 2px solid #2563EB;
          outline-offset: 2px;
        }
        @media (max-width: 480px) {
          .scrim .card { width: min(340px, 88vw); }
          .scrim .dept-bn { font-size: 17px; }
          .scrim .msg { font-size: 12.5px; }
          .scrim .note { font-size: 11px; padding: 8px 10px; }
          .scrim .ok-btn { font-size: 12px; padding: 7px 18px; }
          .scrim .content { padding: 30px 18px 0; }
          .scrim .actions { padding: 0 18px; }
          .scrim .icon { width: 45px; height: 45px; left: 18px; bottom: -22px; }
          .scrim .icon svg { width: 20px; height: 20px; }
          .scrim .top { height: 72px; }
          .scrim .dept-en { font-size: 10.5px; }
        }
      `;
      document.head.appendChild(style);
      modalStylesAdded = true;
    }

    // Create modal HTML
    var modalHtml = `
      <div class="scrim" id="comingSoonModal">
        <div class="card" role="alertdialog" aria-labelledby="dept-bn" aria-describedby="msg">
          <div class="top">
            <div class="icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#6D28D9" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M12 7v5l3.2 2"></path>
              </svg>
            </div>
          </div>
          <div class="content">
            <p class="dept-bn" id="dept-bn">${deptName}</p>
            <p class="dept-en">${deptCode || ''}</p>
            <p class="msg" id="msg">
              The result calculator will be <strong>available soon</strong>.
            </p>
            <p class="note">This syllabus version (${sessionLabel || ''}) may have a different grading system.</p>
          </div>
          <div class="actions">
            <button class="ok-btn" onclick="closeComingSoonModal()">Got it</button>
          </div>
        </div>
      </div>
    `;

    // Append modal to body
    var modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer.firstElementChild);

    // Open modal after small delay
    requestAnimationFrame(function() {
      var modal = document.getElementById('comingSoonModal');
      if (modal) {
        modal.classList.add('open');
      }
    });

    // Close on backdrop click
    var modalElement = document.getElementById('comingSoonModal');
    if (modalElement) {
      modalElement.addEventListener('click', function(e) {
        if (e.target === this) {
          closeComingSoonModal();
        }
      });
    }

    // Close on Escape key
    var escHandler = function(e) {
      if (e.key === 'Escape') {
        closeComingSoonModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  /**
   * Close coming soon modal
   */
  window.closeComingSoonModal = function() {
    var modal = document.getElementById('comingSoonModal');
    if (modal) {
      modal.classList.remove('open');
      setTimeout(function() {
        if (modal.parentNode) {
          modal.parentNode.removeChild(modal);
        }
      }, 300);
    }
  };

  /**
   * Create department card element
   * @param {Object} dept - Department object
   * @param {Object} sessionConfig - Session configuration
   * @returns {HTMLElement} Card element
   */
  function createDeptCard(dept, sessionConfig) {
    var card = document.createElement('div');
    var isAvailable = dept.available !== false && dept.path && dept.path !== '#';
    
    card.className = 'dept-card' + (!isAvailable ? ' coming-soon' : '');
    
    if (isAvailable) {
      card.onclick = function() {
        var url = 'department.html?type=' + sessionConfig.type + 
                  '&session=' + sessionConfig.session + 
                  '&dept=' + dept.path;
        window.location.href = url;
      };
    } else {
      card.onclick = function() {
        var sessionLabel = sessionConfig.session || '';
        showComingSoonModal(dept.name, dept.code, sessionLabel);
      };
    }
    
    var sessionLabel = sessionConfig.session || '';
    var badgeHtml = isAvailable ? '<div class="session-year">' + sessionLabel + '</div>' : '';
    var soonHtml = !isAvailable ? '<div class="soon-badge">Coming Soon</div>' : '';
    
    card.innerHTML = `
      <div class="dept-name">${dept.name}</div>
      <div class="dept-code">${dept.code || ''}</div>
      ${badgeHtml}
      ${soonHtml}
    `;
    
    return card;
  }

  /**
   * Render departments for a session
   * @param {string} sessionId - Session ID
   */
  function renderDepartmentsForSession(sessionId) {
    var grid = document.getElementById('session-grid');
    if (!grid) return;
    
    if (loadedSessions[sessionId]) return;
    
    var config = window.getSessionConfig(sessionId);
    if (!config) {
      grid.innerHTML = '<div class="loading-text" style="grid-column:1/-1;text-align:center;padding:20px;color:#c0392b;">Session configuration not found.</div>';
      return;
    }
    
    grid.innerHTML = '<div class="loading-text" style="grid-column:1/-1;text-align:center;padding:20px;color:#666;">Loading departments...</div>';
    
    window.getDepartmentsForSession(sessionId, function(departments) {
      loadedSessions[sessionId] = true;
      grid.innerHTML = '';
      
      if (!departments || departments.length === 0) {
        var placeholder = document.createElement('div');
        placeholder.className = 'dept-card coming-soon';
        placeholder.style.gridColumn = '1 / -1';
        placeholder.style.textAlign = 'center';
        placeholder.style.padding = '40px';
        placeholder.innerHTML = `
          <div style="font-size:1.2rem;color:#999;">No departments available for this session yet</div>
          <div style="font-size:0.85rem;color:#bbb;margin-top:8px;">Coming soon</div>
        `;
        grid.appendChild(placeholder);
        return;
      }
      
      departments.forEach(function(dept) {
        var card = createDeptCard(dept, config);
        grid.appendChild(card);
      });
    });
  }

  /**
   * Initialize a session page
   * @param {string} sessionId - Session ID
   */
  window.initSessionPage = function(sessionId) {
    renderDepartmentsForSession(sessionId);
  };

  // Load grade scale into table on session pages
  function loadGradeScale(gradingConfig) {
    var tbody = document.querySelector('#grade-scale-table tbody');
    if (!tbody || !gradingConfig || !gradingConfig.grades) return;
    
    var grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'];
    
    grades.forEach(function(grade) {
      var g = gradingConfig.grades[grade];
      if (g) {
        var row = tbody.insertRow();
        var gradeClass = 'grade-' + grade.toLowerCase().replace('+', '-plus').replace('-', '-minus');
        row.insertCell(0).textContent = g.marksRange;
        row.insertCell(1).innerHTML = '<span class="grade-badge ' + gradeClass + '">' + grade + '</span>';
        row.insertCell(2).textContent = g.gradePoint.toFixed(2);
      }
    });
  }

  // Auto-initialize grade scale based on page
  var pageConfigs = {
    'honours-2013-2014': window.honours2013Grading,
    'honours-2024-2025': window.honours2024Grading,
    'degree-2013-2014': window.degree2013Grading,
    'degree-2024-2025': window.degree2024Grading
  };

  document.addEventListener('DOMContentLoaded', function() {
    // Get session ID from page URL
    var path = window.location.pathname;
    var pageName = path.split('/').pop().replace('.html', '');
    
    var gradingConfig = pageConfigs[pageName];
    if (gradingConfig) {
      loadGradeScale(gradingConfig);
    }
    
    // Auto-initialize session page
    if (document.getElementById('session-grid')) {
      var sessionId = pageName;
      if (sessionId && sessionId !== 'index' && sessionId !== 'department') {
        window.initSessionPage(sessionId);
      }
    }
  });

})();
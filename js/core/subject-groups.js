/* =====================
   SUBJECT GROUP ENGINE
   Universal group engine for pair-type and choice-type subject groups
   ===================== */

(function() {
  'use strict';

  var groupStates = {};

  var SubjectGroupEngine = {

    /**
     * Initialize groups for a year panel
     * @param {string} panelId - The panel ID
     * @param {Array} groups - Group configuration array
     * @param {Object} gradeMapping - Grade mapping object
     */
    initGroups: function(panelId, groups, gradeMapping) {
      var panel = document.getElementById(panelId);
      if (!panel) return;

      // Store group config on the panel
      panel.dataset.groups = JSON.stringify(groups);

      // Initialize state for each group
      groupStates[panelId] = {};

      groups.forEach(function(group, groupIndex) {
        var groupKey = 'group-' + groupIndex;
        groupStates[panelId][groupKey] = {
          config: group,
          activeUnits: new Set(),
          isLocked: false
        };

        if (group.groupType === 'pair') {
          group.members.forEach(function(pair, pairIndex) {
            var pairKey = 'pair-' + pairIndex;
            var hasGrade = pair.some(function(code) {
              var select = panel.querySelector('[data-subject-code="' + code + '"] .grade-select');
              return select && select.value && select.value !== '';
            });
            if (hasGrade) {
              groupStates[panelId][groupKey].activeUnits.add(pairKey);
            }
          });
        } else if (group.groupType === 'choice') {
          group.members.forEach(function(code) {
            var select = panel.querySelector('[data-subject-code="' + code + '"] .grade-select');
            if (select && select.value && select.value !== '') {
              groupStates[panelId][groupKey].activeUnits.add(code);
            }
          });
        }

        this.applyLocking(panelId, groupKey);
      }.bind(this));
    },

    /**
     * Handle grade change for a specific subject
     * @param {string} panelId - The panel ID
     * @param {string} subjectCode - The subject code
     * @param {string} gradeValue - The selected grade value
     */
    handleGradeChange: function(panelId, subjectCode, gradeValue) {
      var panel = document.getElementById(panelId);
      if (!panel) return;

      var groups = JSON.parse(panel.dataset.groups || '[]');
      var groupIndex = -1;
      var groupKey = null;
      var foundGroup = null;

      for (var i = 0; i < groups.length; i++) {
        var group = groups[i];

        if (group.groupType === 'pair') {
          for (var p = 0; p < group.members.length; p++) {
            if (group.members[p].indexOf(subjectCode) !== -1) {
              groupIndex = i;
              groupKey = 'group-' + i;
              foundGroup = group;
              break;
            }
          }
        } else if (group.groupType === 'choice') {
          if (group.members.indexOf(subjectCode) !== -1) {
            groupIndex = i;
            groupKey = 'group-' + i;
            foundGroup = group;
            break;
          }
        }

        if (foundGroup) break;
      }

      if (!foundGroup || !groupKey) return;

      var state = groupStates[panelId];
      if (!state || !state[groupKey]) return;

      var groupState = state[groupKey];
      var hasGrade = gradeValue && gradeValue !== '';

      if (foundGroup.groupType === 'pair') {
        var pairIndex = -1;
        for (var pi = 0; pi < foundGroup.members.length; pi++) {
          if (foundGroup.members[pi].indexOf(subjectCode) !== -1) {
            pairIndex = pi;
            break;
          }
        }
        if (pairIndex === -1) return;

        var pairKey = 'pair-' + pairIndex;

        if (hasGrade) {
          groupState.activeUnits.add(pairKey);
        } else {
          var pair = foundGroup.members[pairIndex];
          var otherCode = pair[0] === subjectCode ? pair[1] : pair[0];
          var otherSelect = panel.querySelector('[data-subject-code="' + otherCode + '"] .grade-select');
          var otherHasGrade = otherSelect && otherSelect.value && otherSelect.value !== '';

          if (!otherHasGrade) {
            groupState.activeUnits.delete(pairKey);
          }
        }
      } else if (foundGroup.groupType === 'choice') {
        if (hasGrade) {
          groupState.activeUnits.add(subjectCode);
        } else {
          groupState.activeUnits.delete(subjectCode);
        }
      }

      this.applyLocking(panelId, groupKey);
    },

    /**
     * Apply locking to inactive units in a group
     * @param {string} panelId - The panel ID
     * @param {string} groupKey - The group key
     */
    applyLocking: function(panelId, groupKey) {
      var panel = document.getElementById(panelId);
      if (!panel) return;

      var state = groupStates[panelId];
      if (!state || !state[groupKey]) return;

      var groupState = state[groupKey];
      var config = groupState.config;
      var maxActive = config.maxActive || 0;
      var activeCount = groupState.activeUnits.size;
      var shouldLock = activeCount >= maxActive && maxActive > 0;

      if (config.groupType === 'pair') {
        config.members.forEach(function(pair, pairIndex) {
          var pairKey = 'pair-' + pairIndex;
          var isActive = groupState.activeUnits.has(pairKey);
          var shouldDisable = shouldLock && !isActive;

          pair.forEach(function(code) {
            var select = panel.querySelector('[data-subject-code="' + code + '"] .grade-select');
            if (select) {
              var isMandatory = this.isSubjectMandatory(panel, code);
              if (!isMandatory && !isActive) {
                select.disabled = shouldDisable;
              } else if (isActive) {
                select.disabled = false;
              }
            }
          }.bind(this));
        }.bind(this));
      } else if (config.groupType === 'choice') {
        config.members.forEach(function(code) {
          var isActive = groupState.activeUnits.has(code);
          var shouldDisable = shouldLock && !isActive;
          var isMandatory = this.isSubjectMandatory(panel, code);

          var select = panel.querySelector('[data-subject-code="' + code + '"] .grade-select');
          if (select && !isMandatory && !isActive) {
            select.disabled = shouldDisable;
          } else if (isActive) {
            select.disabled = false;
          }
        }.bind(this));
      }
    },

    /**
     * Check if a subject is mandatory
     * @param {HTMLElement} panel - The panel element
     * @param {string} subjectCode - The subject code
     * @returns {boolean} True if mandatory
     */
    isSubjectMandatory: function(panel, subjectCode) {
      var row = panel.querySelector('[data-subject-code="' + subjectCode + '"]');
      return row && row.dataset.mandatory === 'true';
    },

    /**
     * Validate all groups for a panel
     * @param {string} panelId - The panel ID
     * @returns {Object} { valid, errors }
     */
    validateGroups: function(panelId) {
      var panel = document.getElementById(panelId);
      if (!panel) return { valid: true, errors: [] };

      var groups = JSON.parse(panel.dataset.groups || '[]');
      var errors = [];
      var state = groupStates[panelId];

      groups.forEach(function(group, groupIndex) {
        var groupKey = 'group-' + groupIndex;
        var groupState = state && state[groupKey];
        if (!groupState) return;

        if (group.groupType === 'pair') {
          group.members.forEach(function(pair, pairIndex) {
            var pairKey = 'pair-' + pairIndex;
            if (groupState.activeUnits.has(pairKey)) {
              var code1 = pair[0];
              var code2 = pair[1];
              var select1 = panel.querySelector('[data-subject-code="' + code1 + '"] .grade-select');
              var select2 = panel.querySelector('[data-subject-code="' + code2 + '"] .grade-select');
              var grade1 = select1 ? select1.value : '';
              var grade2 = select2 ? select2.value : '';

              if (!grade1 || grade1 === '') {
                errors.push('Subject ' + code1 + ' in pair ' + (pairIndex + 1) + ' is active but missing a grade');
              }
              if (!grade2 || grade2 === '') {
                errors.push('Subject ' + code2 + ' in pair ' + (pairIndex + 1) + ' is active but missing a grade');
              }
            }
          });
        }
      });

      return { valid: errors.length === 0, errors: errors };
    },

    /**
     * Validate mandatory subjects for a panel
     * @param {string} panelId - The panel ID
     * @returns {Object} { valid, errors }
     */
    validateMandatory: function(panelId) {
      var panel = document.getElementById(panelId);
      if (!panel) return { valid: true, errors: [] };

      var errors = [];
      var selects = panel.querySelectorAll('[data-mandatory="true"] .grade-select');

      selects.forEach(function(select) {
        if (!select.value || select.value === '') {
          var row = select.closest('tr');
          var code = row ? row.dataset.subjectCode : 'Unknown';
          errors.push('Mandatory subject ' + code + ' does not have a grade');
        }
      });

      return { valid: errors.length === 0, errors: errors };
    },

    /**
     * Reset groups for a panel
     * @param {string} panelId - The panel ID
     */
    resetGroups: function(panelId) {
      delete groupStates[panelId];
    }
  };

  // Expose to window
  window.SubjectGroupEngine = SubjectGroupEngine;

})();
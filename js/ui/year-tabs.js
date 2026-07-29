/* =====================
   YEAR TABS NAVIGATION
   ===================== */

(function() {
  'use strict';

  window.initYearTabs = function() {
    var tabs = document.querySelectorAll('.year-tab');
    var panels = document.querySelectorAll('.year-panel');
    
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var year = tab.dataset.year;
        
        tabs.forEach(function(t) {
          t.classList.remove('active');
        });
        
        panels.forEach(function(p) {
          p.classList.remove('active');
        });
        
        tab.classList.add('active');
        var activePanel = document.getElementById('year-panel-' + year);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  };

})();
/* =====================
   GRADING SYSTEM LOADER
   ===================== */

(function() {
  'use strict';

  window.getGradingConfig = function(type, session) {
    var key = type + '-' + session;

    var configs = {
      'honours-2013-2014': window.honours2013Grading,
      'honours-2024-2025': window.honours2024Grading,
      'degree-2013-2014': window.degree2013Grading,
      'degree-2024-2025': window.degree2024Grading
    };

    return configs[key] || null;
  };

})();
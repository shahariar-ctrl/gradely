/* =====================
   DOWNLOAD POPUP HELPER
   Replaces the old direct-HTML-file download with a modal popup
   offering a "Download PDF" action, while reusing the exact existing
   Year Result / Full Transcript HTML layout unchanged.

   FIXED: The PDF is now generated directly in-browser (html2canvas +
   jsPDF) instead of calling window.print().
   ===================== */

(function() {
  'use strict';

  var downloadPopupFileName = 'Result';
  var scriptLoadPromises = {};
  var lastDownloadRegenerate = null;
  var previewGeneration = 0;
  var previewLoadedGeneration = -1;
  var refreshDebounceTimer = null;

  /**
   * Lazily loads an external script exactly once
   * @param {string} src - Script source URL
   * @returns {Promise} Promise that resolves when script is loaded
   */
  function loadScriptOnce(src) {
    if (scriptLoadPromises[src]) return scriptLoadPromises[src];
    
    scriptLoadPromises[src] = new Promise(function(resolve, reject) {
      var el = document.createElement('script');
      el.src = src;
      el.onload = function() { resolve(); };
      el.onerror = function() { reject(new Error('Failed to load ' + src)); };
      document.head.appendChild(el);
    });
    
    return scriptLoadPromises[src];
  }

  /**
   * Load html2canvas + jsPDF libraries
   * @returns {Promise} Promise that resolves when libraries are loaded
   */
  function loadPdfLibraries() {
    return Promise.all([
      loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),
      loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
    ]);
  }

  /**
   * Wait for all images in the document to load
   * @param {Document} doc - The document object
   * @returns {Promise} Promise that resolves when images are loaded
   */
  function waitForImages(doc) {
    var imgs = Array.prototype.slice.call(doc.images || []);
    return Promise.all(imgs.map(function(img) {
      if (img.complete) return Promise.resolve();
      return new Promise(function(resolve) {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve);
      });
    }));
  }

  /**
   * Sanitize filename for download
   * @param {string} name - The filename
   * @returns {string} Sanitized filename
   */
  function sanitizeFileName(name) {
    return (name || 'Result').toString().trim().replace(/\s+/g, '_').replace(/[\\/:*?"<>|]/g, '');
  }

  /**
   * Re-render the preview in place using the latest form values
   */
  function refreshDownloadPreview() {
    if (!lastDownloadRegenerate) return;

    var modalBody = document.querySelector('#downloadModal .modal-body');
    var scrollTop = modalBody ? modalBody.scrollTop : null;

    lastDownloadRegenerate();

    if (modalBody && scrollTop !== null) {
      modalBody.scrollTop = scrollTop;
    }
  }

  /**
   * Schedule a refresh with debouncing
   */
  function scheduleRefreshDownloadPreview() {
    clearTimeout(refreshDebounceTimer);
    refreshDebounceTimer = setTimeout(refreshDownloadPreview, 250);
  }

  /**
   * Run callback when preview is ready
   * @param {Function} callback - The callback function
   */
  function runWhenPreviewReady(callback) {
    var iframe = document.getElementById('downloadPreviewFrame');
    if (!iframe) return;

    if (previewLoadedGeneration === previewGeneration) {
      callback(iframe);
    } else {
      var existingOnload = iframe.onload;
      iframe.onload = function(e) {
        if (existingOnload) existingOnload(e);
        callback(iframe);
      };
    }
  }

  /**
   * Handle PDF download button click
   */
  function handleDownloadPdf() {
    clearTimeout(refreshDebounceTimer);
    refreshDownloadPreview();

    var pdfBtn = document.getElementById('downloadPdfBtn');
    var originalBtnText = pdfBtn ? pdfBtn.textContent : null;
    
    if (pdfBtn) {
      pdfBtn.disabled = true;
      pdfBtn.textContent = 'Generating PDF...';
    }

    runWhenPreviewReady(function(iframe) {
      loadPdfLibraries()
        .then(function() {
          var doc = iframe.contentDocument;
          var pageEl = doc.getElementById('a4Page');
          if (!pageEl) throw new Error('Result page element not found in preview.');
          return waitForImages(doc).then(function() {
            return window.html2canvas(pageEl, {
              scale: 2,
              useCORS: true,
              allowTaint: true,
              backgroundColor: '#ffffff'
            });
          });
        })
        .then(function(canvas) {
          var jsPDF = window.jspdf.jsPDF;
          var pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
          var imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
          pdf.save(sanitizeFileName(downloadPopupFileName) + '.pdf');
        })
        .catch(function(err) {
          console.error('PDF generation failed:', err);
          alert('Could not generate the PDF. Please try again.');
        })
        .finally(function() {
          if (pdfBtn) {
            pdfBtn.disabled = false;
            pdfBtn.textContent = originalBtnText;
          }
        });
    });
  }

  /**
   * Show download popup modal
   * @param {string} html - The HTML content to preview
   * @param {string} fileNameBase - Base filename
   */
  window.showDownloadPopup = function(html, fileNameBase) {
    downloadPopupFileName = fileNameBase || 'Result';

    var iframe = document.getElementById('downloadPreviewFrame');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'downloadPreviewFrame';
      iframe.style.position = 'fixed';
      iframe.style.top = '0';
      iframe.style.left = '-99999px';
      iframe.style.width = '210mm';
      iframe.style.height = '297mm';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);
    }

    previewGeneration++;
    var thisGeneration = previewGeneration;
    
    iframe.onload = function() {
      previewLoadedGeneration = thisGeneration;
    };
    
    iframe.srcdoc = html;

    var modalEl = document.getElementById('downloadModal');
    if (modalEl && window.bootstrap) {
      var modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  };

  /**
   * Wire up regenerate hooks for download functions
   */
  function wireRegenerateHooks() {
    if (typeof window.downloadYearResult === 'function' && !window.downloadYearResult.__refreshWrapped) {
      var origYearResult = window.downloadYearResult;
      window.downloadYearResult = function(year, departmentName, studentInfo, educationType) {
        lastDownloadRegenerate = function() {
          origYearResult(year, departmentName, window.getStudentInfo ? window.getStudentInfo() : studentInfo, educationType);
        };
        return origYearResult(year, departmentName, studentInfo, educationType);
      };
      window.downloadYearResult.__refreshWrapped = true;
    }

    if (typeof window.downloadFullTranscript === 'function' && !window.downloadFullTranscript.__refreshWrapped) {
      var origFullTranscript = window.downloadFullTranscript;
      window.downloadFullTranscript = function(departmentName, studentInfo, gradeMapping) {
        lastDownloadRegenerate = function() {
          origFullTranscript(departmentName, window.getStudentInfo ? window.getStudentInfo() : studentInfo, gradeMapping);
        };
        return origFullTranscript(departmentName, studentInfo, gradeMapping);
      };
      window.downloadFullTranscript.__refreshWrapped = true;
    }
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    wireRegenerateHooks();

    var pdfBtn = document.getElementById('downloadPdfBtn');
    if (pdfBtn) {
      pdfBtn.addEventListener('click', handleDownloadPdf);
    }

    var modalEl = document.getElementById('downloadModal');
    if (modalEl) {
      modalEl.addEventListener('input', function(e) {
        if (e.target && e.target.classList && e.target.classList.contains('info-input')) {
          scheduleRefreshDownloadPreview();
        }
      });
      modalEl.addEventListener('change', function(e) {
        if (e.target && e.target.classList && e.target.classList.contains('info-input')) {
          scheduleRefreshDownloadPreview();
        }
      });
    }
  });

})();
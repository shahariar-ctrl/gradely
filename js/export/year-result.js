/* =====================
   DOWNLOAD SINGLE YEAR RESULT (HTML Format)
   ===================== */

(function() {
  'use strict';

  /**
   * Download a single year result as HTML for PDF generation
   * @param {number} year - The year number (1-4)
   * @param {string} departmentName - Department name
   * @param {Object} studentInfo - Student info object
   * @param {string} educationType - 'honours' or 'degree'
   */
  window.downloadYearResult = function(year, departmentName, studentInfo, educationType) {
    var panel = document.getElementById('year-panel-' + year);
    if (!panel) {
      alert('Year panel not found.');
      return;
    }

    var gpa = panel.querySelector('.footer-gpa')?.textContent || '0.00';
    var yearNames = ['', 'First', 'Second', 'Third', 'Fourth'];
    var yearName = yearNames[year] || 'Year';
    var examYear = (studentInfo.examYear !== 'Not Provided' && studentInfo.examYear) ? studentInfo.examYear : '2020';

    var programmeDisplay = (educationType === 'degree') ? 'Degree Pass' : 'Honours';

    var currentPath = window.location.href;
    var basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    var absoluteLogoPath = basePath + 'resource/nulogo.png';
    var absoluteQrPath = basePath + 'resource/qr-code.png';

    // Get all subjects with grades
    var subjects = [];
    var rows = panel.querySelectorAll('tbody tr');

    rows.forEach(function(row) {
      var gradeSelect = row.querySelector('.grade-select');
      var grade = gradeSelect ? gradeSelect.value : '';

      if (grade && grade !== '') {
        subjects.push({
          code: row.querySelector('.font-mono')?.textContent || '',
          name: row.querySelector('.sub-name')?.textContent || '',
          credit: row.dataset.credit || '',
          grade: grade
        });
      }
    });

    // Get result status
    var resultStatus = 'In Progress';
    var subjectResultField = document.getElementById('student-subject-result');
    if (subjectResultField && subjectResultField.value) {
      resultStatus = subjectResultField.value;
    }

    // Format values
    var examRoll = (studentInfo.examRoll !== 'Not Provided' && studentInfo.examRoll) ? studentInfo.examRoll : '';
    var studentName = (studentInfo.name !== 'Not Provided' && studentInfo.name) ? studentInfo.name : '';
    var college = (studentInfo.college !== 'Not Provided' && studentInfo.college) ? studentInfo.college : '';
    var session = (studentInfo.session !== 'Not Provided' && studentInfo.session) ? studentInfo.session : '';
    var studentType = (studentInfo.studentType !== 'Not Selected' && studentInfo.studentType) ? studentInfo.studentType : '';
    var subject = (studentInfo.subject !== 'Not Provided' && studentInfo.subject) ? studentInfo.subject : '';

    // Registration number - EXACTLY 11 digits
    var regNumber = (studentInfo.registration !== 'Not Provided' && studentInfo.registration) ? studentInfo.registration.toString() : '';
    var regDigits = regNumber.split('');

    var regCells = '';
    for (var i = 0; i < 11; i++) {
      var digit = (regDigits[i] !== undefined) ? regDigits[i] : '';
      regCells += '<td align="center">' + digit + '</td>';
    }

    // Create course rows
    var courseRows = '';

    if (subjects.length === 0) {
      courseRows = '\n    <tr>\n      <td colspan="14" style="text-align:center; padding:20px; color:#999;">No grades recorded for this year</td>\n    </tr>';
    } else {
      subjects.forEach(function(subject) {
        var gradeStyle = '';
        var displayGrade = subject.grade;

        var passGrades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D'];
        if (passGrades.indexOf(subject.grade) !== -1) {
          gradeStyle = 'color: #000000; font-weight: bold;';
        } else if (subject.grade === 'F') {
          gradeStyle = 'color: #000000; font-weight: bold;';
        } else {
          gradeStyle = 'color: #000;';
          displayGrade = '—';
        }

        courseRows += '\n    <tr>\n      <td colspan="1" class="c">' + (subject.code || '&nbsp;') + '</td>\n      <td colspan="7">' + (subject.name || '&nbsp;') + '</td>\n      <td colspan="2" class="c">' + (subject.credit || '&nbsp;') + '</td>\n      <td colspan="4" class="c grade-cell" style="' + gradeStyle + '">' + displayGrade + '</td>\n    </tr>';
      });
    }

    var html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Gradely - ' + yearName + ' Year Result</title>\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css">\n<style>\n  @page { size: auto; margin: 0; }\n  * { box-sizing: border-box; }\n  html, body {\n    margin: 0;\n    padding: 0;\n    background: #d6d0c8;\n    font-family: Arial, sans-serif;\n    font-size: 13px;\n  }\n  .page-wrapper {\n    display: flex;\n    justify-content: center;\n    padding: 20px 0;\n  }\n  .page {\n    width: 210mm;\n    height: 297mm;\n    background: #fff;\n    position: relative;\n    overflow: hidden;\n    box-shadow: 0 0 10px rgba(0,0,0,0.15);\n  }\n  .content-scale {\n    position: absolute;\n    top: 14mm;\n    left: 14mm;\n    right: 14mm;\n    transform-origin: top left;\n  }\n  .header h1 { color: #1a6fba; font-size: 22px; font-weight: 700; margin: 6px 0 2px; }\n  .header h2 { font-size: 14px; font-weight: 700; color: #000; margin: 0; }\n  .header p  { font-size: 13px; color: #000; margin: 0; }\n  .divider { border: none; margin: 12px 0 0; }\n  .main-table { width: 100%; border-collapse: collapse; table-layout: fixed; }\n  .main-table td, .main-table th { border: 1px solid #aaa; padding: 5px 8px; font-size: 13px; }\n  .main-table td.lbl { font-weight: 700; white-space: nowrap; }\n  .gap-row td { border-left: none; border-right: none; height: 8px; padding: 0 !important; background: #fff; }\n  .section-title { text-align: center; font-weight: 700; font-size: 13px; padding: 6px 8px; }\n  .main-table th { font-weight: 700; text-align: left; }\n  .main-table th.c, .main-table td.c { text-align: center; }\n  .main-table th.grade-cell, .main-table td.grade-cell {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: clip;\n  }\n  .sig-block {\n    position: absolute;\n    right: 14mm;\n    bottom: 48mm;\n    text-align: center;\n    font-weight: 700;\n    font-size: 13px;\n    line-height: 1.6;\n  }\n  .bottom-block {\n    position: absolute;\n    left: 14mm;\n    bottom: 14mm;\n  }\n  .qr-box { border: 1.5px dashed #888; display: inline-block; padding: 4px; }\n  .gen-text { font-size: 12px; margin-top: 5px; }\n  .gen-text span { font-weight: 700; }\n  @media print {\n    html, body { background: #fff; }\n    .page-wrapper { padding: 0; }\n    .page { box-shadow: none; }\n  }\n</style>\n</head>\n<body>\n<div class="page-wrapper">\n<div class="page" id="a4Page">\n  <div class="content-scale" id="contentScale">\n    <div class="header text-center">\n      <img src="' + absoluteLogoPath + '" width="70" onerror="this.style.display=\'none\'; this.parentElement.innerHTML += \'<div style=\\\'width:70px;height:70px;margin:0 auto;background:#1a6fba;display:flex;align-items:center;justify-content:center;border-radius:50%;\\\'><span style=\\\'font-size:20px;color:white;font-weight:bold;\\\'>NU</span></div>\';">\n      <h1>National University, Bangladesh</h1>\n      <h2>Bachelor ' + programmeDisplay + ' (Honours) ' + yearName + ' Year Examination - ' + examYear + '</h2>\n      <p>Online Result Sheet</p>\n    </div>\n    <hr class="divider">\n    <table class="main-table">\n      <colgroup>\n        <col style="width: 130px">\n        <col style="width: 130px">\n        <col style="width: 115px">\n        <col style="width: 28px"><col style="width: 28px"><col style="width: 28px"><col style="width: 28px">\n        <col style="width: 28px"><col style="width: 28px"><col style="width: 28px"><col style="width: 28px">\n        <col style="width: 28px"><col style="width: 28px"><col style="width: 28px">\n      </colgroup>\n      <tr>\n        <td class="lbl" bgcolor="#E8F1FF">Examination Roll</td>\n        <td>' + examRoll + '</td>\n        <td class="lbl" bgcolor="#E8F1FF">Registration No.</td>\n        ' + regCells + '\n      </tr>\n      <tr class="gap-row"><td colspan="14"> </td></tr>\n      <tr>\n        <td class="lbl" bgcolor="#E8F1FF">Name of Student</td>\n        <td colspan="13">' + studentName + '</td>\n      </tr>\n      <tr>\n        <td class="lbl" bgcolor="#E8F1FF">College</td>\n        <td colspan="13">' + college + '</td>\n      </tr>\n      <tr>\n        <td class="lbl" bgcolor="#E8F1FF">Session</td>\n        <td colspan="4">' + session + '</td>\n        <td class="lbl" colspan="4" bgcolor="#E8F1FF">Student Type</td>\n        <td colspan="5">' + studentType + '</td>\n      </tr>\n      <tr>\n        <td class="lbl" bgcolor="#E8F1FF">Subject</td>\n        <td colspan="13">' + subject + '</td>\n      </tr>\n      <tr>\n        <td class="lbl" bgcolor="#E8F1FF">Result</td>\n        <td colspan="5">' + resultStatus + '</td>\n        <td colspan="2" class="lbl" bgcolor="#E8F1FF">GPA</td>\n        <td colspan="6">' + gpa + '</td>\n      </tr>\n      <tr class="gap-row"><td colspan="14"> </td></tr>\n      <tr>\n        <td colspan="14" class="section-title" bgcolor="#E8F1FF">' + programmeDisplay + ' ' + yearName + ' Year Course wise Grade</td>\n      </tr>\n      <tr>\n        <th colspan="1" class="c" bgcolor="#E8F1FF">Course Code</th>\n        <th colspan="7" bgcolor="#E8F1FF" style="text-align:center;">Title of Course</th>\n        <th colspan="2" class="c" bgcolor="#E8F1FF">Credit</th>\n        <th colspan="4" class="c grade-cell" bgcolor="#E8F1FF">Letter Grade</th>\n      </tr>\n      ' + courseRows + '\n    </table>\n  </div>\n  <div class="sig-block">\n    sd/-<br>\n    Controller of Examinations<br>\n    NATIONAL UNIVERSITY\n  </div>\n  <div class="bottom-block">\n    <div class="qr-box">\n      <img src="' + absoluteQrPath + '" width="90" height="90" alt="QR Code" style="display: block;" onerror="this.style.display=\'none\'; this.parentElement.innerHTML += \'<div style=\\\'width:90px;height:90px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:10px;\\\'>QR</div>\';">\n    </div>\n    <div class="gen-text">\n      <span>Result Published Date:</span><br>\n      <span>Generated on</span> ' + new Date().toLocaleDateString() + ' by National University\n    </div>\n  </div>\n</div>\n</div>\n<script>\n  (function () {\n    function fitContent() {\n      var content = document.getElementById(\'contentScale\');\n      var sig = document.querySelector(\'.sig-block\');\n      var page = document.getElementById(\'a4Page\');\n      if (!content || !sig || !page) return;\n      content.style.transform = \'scale(1)\';\n      var pageRect = page.getBoundingClientRect();\n      var contentRect = content.getBoundingClientRect();\n      var sigRect = sig.getBoundingClientRect();\n      var buffer = 10;\n      var availableHeight = (sigRect.top - pageRect.top) - (contentRect.top - pageRect.top) - buffer;\n      var naturalHeight = content.scrollHeight;\n      if (availableHeight > 0 && naturalHeight > availableHeight) {\n        var scale = availableHeight / naturalHeight;\n        content.style.transform = \'scale(\' + scale + \')\';\n      } else {\n        content.style.transform = \'scale(1)\';\n      }\n    }\n    if (document.readyState === \'complete\') {\n      fitContent();\n    } else {\n      window.addEventListener(\'load\', fitContent);\n    }\n    window.addEventListener(\'resize\', fitContent);\n    if (window.matchMedia) {\n      window.matchMedia(\'print\').addListener(fitContent);\n    }\n    window.addEventListener(\'beforeprint\', fitContent);\n  })();\n</script>\n</body>\n</html>';

    var now = new Date();
    var dd = String(now.getDate()).padStart(2, '0');
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var yy = String(now.getFullYear()).slice(-2);
    var dateStr = dd + mm + yy;

    var fileName = "NU Hon's " + yearName + " Year ResultPDF_" + (examRoll || 'Student') + "_" + (regNumber || '');
    window.showDownloadPopup(html, fileName);
  };

})();
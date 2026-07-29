/* =====================
   DOWNLOAD FULL TRANSCRIPT (HTML Format)
   ===================== */

(function() {
  'use strict';

  /**
   * Download full transcript as HTML for PDF generation
   * @param {string} departmentName - Department name
   * @param {Object} studentInfo - Student info object
   * @param {Object} gradeMapping - Grade mapping object
   */
  window.downloadFullTranscript = function(departmentName, studentInfo, gradeMapping) {
    var cgpa = document.getElementById('overall-cgpa')?.textContent || '0.00';

    var resultStatus = 'In Progress';
    var subjectResultField = document.getElementById('student-subject-result');
    if (subjectResultField && subjectResultField.value) {
      resultStatus = subjectResultField.value;
    }

    var currentPath = window.location.href;
    var basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    var absoluteLogoPath = basePath + 'resource/nulogo.png';
    var absoluteQrPath = basePath + 'resource/qr-code.png';

    // Get total credits
    var totalPossibleCredits = 0;
    if (window.currentSubjectData && window.currentSubjectData.totalCredits) {
      totalPossibleCredits = window.currentSubjectData.totalCredits;
    } else {
      var panels = document.querySelectorAll('.year-panel');
      panels.forEach(function(panel) {
        var rows = panel.querySelectorAll('tbody tr');
        rows.forEach(function(row) {
          var credit = parseFloat(row.dataset.credit) || 0;
          totalPossibleCredits += credit;
        });
      });
    }

    // Collect all years data - ONLY subjects with grades
    var yearsData = [];
    var completedCredits = 0;

    var allPanels = document.querySelectorAll('.year-panel');
    allPanels.forEach(function(panel) {
      var yearNum = panel.id.replace('year-panel-', '');
      var yearNames = ['', 'First', 'Second', 'Third', 'Fourth'];
      var yearName = yearNames[parseInt(yearNum)];
      var gpa = panel.querySelector('.footer-gpa')?.textContent || '0.00';

      var subjects = [];
      var yearCompletedCredits = 0;

      var rows = panel.querySelectorAll('tbody tr');
      rows.forEach(function(row) {
        var gradeSelect = row.querySelector('.grade-select');
        var grade = gradeSelect ? gradeSelect.value : '';
        var credit = parseFloat(row.dataset.credit) || 0;

        if (grade && grade !== '') {
          var code = row.querySelector('.font-mono')?.textContent || '';
          var name = row.querySelector('.sub-name')?.textContent || '';

          subjects.push({
            code: code,
            name: name,
            credit: credit,
            grade: grade
          });

          completedCredits += credit;
          yearCompletedCredits += credit;
        }
      });

      yearsData.push({
        yearNum: yearNum,
        yearName: yearName,
        gpa: gpa,
        completedCredits: yearCompletedCredits,
        subjects: subjects
      });
    });

    // Format values
    var examRoll = (studentInfo.examRoll !== 'Not Provided' && studentInfo.examRoll) ? studentInfo.examRoll : '';
    var studentName = (studentInfo.name !== 'Not Provided' && studentInfo.name) ? studentInfo.name : '';
    var fatherName = (studentInfo.fatherName !== 'Not Provided' && studentInfo.fatherName) ? studentInfo.fatherName : '';
    var motherName = (studentInfo.motherName !== 'Not Provided' && studentInfo.motherName) ? studentInfo.motherName : '';
    var college = (studentInfo.college !== 'Not Provided' && studentInfo.college) ? studentInfo.college : '';
    var session = (studentInfo.session !== 'Not Provided' && studentInfo.session) ? studentInfo.session : '';
    var studentType = (studentInfo.studentType !== 'Not Selected' && studentInfo.studentType) ? studentInfo.studentType : '';
    var subject = (studentInfo.subject !== 'Not Provided' && studentInfo.subject) ? studentInfo.subject : '';
    var regNumber = (studentInfo.registration !== 'Not Provided' && studentInfo.registration) ? studentInfo.registration.toString() : '';

    var regSessionCombined = '';
    if (regNumber && session) regSessionCombined = regNumber + ' - ' + session;
    else if (regNumber) regSessionCombined = regNumber;
    else if (session) regSessionCombined = session;

    var creditDisplay = completedCredits + '/' + totalPossibleCredits;
    var resultDisplay = (resultStatus === 'In Progress') ? 'In Progress' : ('CGPA: ' + cgpa);

    // Build year cells
    var yearCellsHtml = '';

    yearsData.forEach(function(year) {
      var subjectRows = '';

      if (year.subjects.length === 0) {
        subjectRows = '\n          <tr>\n            <td colspan="2" style="text-align:center; padding:8px; color:#999; font-size:11px;">No grades</td>\n          </tr>';
      } else {
        year.subjects.forEach(function(subject) {
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

          var codeWithCredit = subject.code + '(' + (subject.credit || '0') + ')';
          subjectRows += '\n          <tr>\n            <td style="border:1px solid #aaa; padding:4px 6px; text-align:center; font-size:12px; white-space:nowrap;">' + codeWithCredit + '</td>\n            <td style="border:1px solid #aaa; padding:4px 6px; text-align:center; font-size:12px; white-space:nowrap; ' + gradeStyle + '">' + displayGrade + '</td>\n          </tr>';
        });
      }

      yearCellsHtml += '\n    <td style="border: 1px solid #aaa; padding: 4px; vertical-align: top; width: 25%; ">\n      <table style="border-collapse: collapse; width: 100%;">\n        <tr>\n          <th style="border: 1px solid #aaa; padding: 4px 6px; text-align: center; font-weight: 700; font-size: 12px; ">Course Code(credit)</th>\n          <th style="border: 1px solid #aaa; padding: 4px 6px; text-align: center; font-weight: 700; font-size: 12px; ">LG</th>\n        </tr>\n        ' + subjectRows + '\n      </table>\n    </td>\n';
    });

    var html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Gradely - Full Transcript</title>\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css">\n<style>\n  @page { size: auto; margin: 0; }\n  * { box-sizing: border-box; }\n  html, body {\n    margin: 0;\n    padding: 0;\n    background: #d6d0c8;\n    font-family: Arial, sans-serif;\n    font-size: 13px;\n  }\n  .page-wrapper {\n    display: flex;\n    justify-content: center;\n    padding: 20px 0;\n  }\n  .page {\n    width: 210mm;\n    height: 297mm;\n    background: #fff;\n    position: relative;\n    overflow: hidden;\n    box-shadow: 0 0 10px rgba(0,0,0,0.15);\n  }\n  .content-scale {\n    position: absolute;\n    top: 14mm;\n    left: 14mm;\n    right: 14mm;\n    transform-origin: top left;\n  }\n  .header { display: flex; align-items: center; gap: 14px; text-align: center; }\n  .header-text { flex: 1; }\n  .year-table-heading { text-align: center; font-size: 18px; font-weight: 549; margin-top: 18px; margin-bottom: 2px; color: #000; }\n  .header img { flex-shrink: 0; }\n  .header h1 { color: #1a6fba; font-size: 22px; font-weight: 700; margin: 0 0 2px; }\n  .header h2 { font-size: 14px; font-weight: 700; color: #000; margin: 0; }\n  .header p { font-size: 13px; color: #000; margin: 0; }\n  .divider { border: none; margin: 12px 0 0; }\n  .info-table { width: 100%; border-collapse: collapse; border: 1px solid #ccc; margin-bottom: 20px; }\n  .info-table td { border-bottom: 1px solid #ccc; padding: 4px 16px; font-size: 14px; color: #111; vertical-align: middle; }\n  .info-table tr:last-child td { border-bottom: none; }\n  .info-table td.info-label { width: 42%; border-right: 1px solid #ccc; font-weight: 600; }\n  .info-table td.info-value { font-weight: 400; }\n  .info-table tr.row-bold td { font-weight: 600; }\n  .info-table .credit-hint { font-size: 12px; font-weight: 400; color: #666; }\n  .outer-year-table {\n    width: 100%;\n    border-collapse: collapse;\n    margin-top: 20px;\n  }\n  .outer-year-table td {\n    border: 1px solid #aaa;\n    text-align: center;\n  }\n  .outer-year-table td.year-name-cell {\n    font-size: 14px;\n    font-weight: 700;\n    padding: 6px 0;\n  }\n  .outer-year-table td.gpa-cell {\n    font-weight: 700;\n    font-size: 13px;\n    padding: 6px 0;\n  }\n  .outer-year-table td.year-data-cell {\n    padding: 4px;\n    vertical-align: top;\n  }\n  .sig-block {\n    position: absolute;\n    right: 14mm;\n    bottom: 48mm;\n    text-align: center;\n    font-weight: 700;\n    font-size: 13px;\n    line-height: 1.6;\n  }\n  .bottom-block {\n    position: absolute;\n    left: 14mm;\n    bottom: 14mm;\n  }\n  .qr-box { border: 1.5px dashed #888; display: inline-block; padding: 4px; }\n  .gen-text { font-size: 12px; margin-top: 5px; }\n  .gen-text span { font-weight: 700; }\n  @media print {\n    html, body { background: #fff; }\n    .page-wrapper { padding: 0; }\n    .page { box-shadow: none; }\n  }\n</style>\n</head>\n<body>\n<div class="page-wrapper">\n<div class="page" id="a4Page">\n  <div class="content-scale" id="contentScale">\n    <div class="header">\n      <img src="' + absoluteLogoPath + '" width="50" onerror="this.style.display=\'none\'; this.parentElement.innerHTML += \'<div style=\\\'width:50px;height:50px;background:#1a6fba;display:flex;align-items:center;justify-content:center;border-radius:50%;\\\'><span style=\\\'font-size:16px;color:white;font-weight:bold;\\\'>NU</span></div>\';">\n      <div class="header-text">\n        <h1>National University, Bangladesh</h1>\n        <h2>Bachelor Degree (Honours) Examination - 2023</h2>\n        <p style="font-weight:700;text-decoration:underline;">Consolidated Result</p>\n      </div>\n    </div>\n    <hr class="divider">\n    <table class="info-table">\n      <tr class="row-bold">\n        <td class="info-label">Student\'s Name</td>\n        <td class="info-value">' + studentName + '</td>\n      </tr>\n      <tr>\n        <td class="info-label">Father\'s Name</td>\n        <td class="info-value">' + fatherName + '</td>\n      </tr>\n      <tr>\n        <td class="info-label">Mother\'s Name</td>\n        <td class="info-value">' + motherName + '</td>\n      </tr>\n      <tr>\n        <td class="info-label">Name of College</td>\n        <td class="info-value">' + college + '</td>\n      </tr>\n      <tr>\n        <td class="info-label">Exam. Roll</td>\n        <td class="info-value">' + examRoll + '</td>\n      </tr>\n      <tr>\n        <td class="info-label">Registration No - Session</td>\n        <td class="info-value">' + regSessionCombined + '</td>\n      </tr>\n      <tr>\n        <td class="info-label">Subject Name</td>\n        <td class="info-value">' + subject + '</td>\n      </tr>\n      <tr>\n        <td class="info-label">Credit <span class="credit-hint">(Completed/Total)</span></td>\n        <td class="info-value">' + creditDisplay + '</td>\n      </tr>\n      <tr class="row-bold">\n        <td class="info-label">Result</td>\n        <td class="info-value">' + resultDisplay + '</td>\n      </tr>\n    </table>\n    <div class="year-table-heading">Course Wise Letter Grade</div>\n    <table class="outer-year-table">\n      <tr>\n        <td class="year-name-cell">First Year</td>\n        <td class="year-name-cell">Second Year</td>\n        <td class="year-name-cell">Third Year</td>\n        <td class="year-name-cell">Fourth Year</td>\n      </tr>\n      <tr>\n        ' + yearCellsHtml + '\n      </tr>\n      <tr>\n        <td class="gpa-cell">GPA: ' + (yearsData[0] ? yearsData[0].gpa : '0.00') + '</td>\n        <td class="gpa-cell">GPA: ' + (yearsData[1] ? yearsData[1].gpa : '0.00') + '</td>\n        <td class="gpa-cell">GPA: ' + (yearsData[2] ? yearsData[2].gpa : '0.00') + '</td>\n        <td class="gpa-cell">GPA: ' + (yearsData[3] ? yearsData[3].gpa : '0.00') + '</td>\n      </tr>\n    </table>\n  </div>\n  <div class="sig-block">\n    sd/-<br>\n    Controller of Examinations<br>\n    NATIONAL UNIVERSITY\n  </div>\n  <div class="bottom-block">\n    <div class="qr-box">\n      <img src="' + absoluteQrPath + '" width="90" height="90" alt="QR Code" style="display: block;" onerror="this.style.display=\'none\'; this.parentElement.innerHTML += \'<div style=\\\'width:90px;height:90px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;font-size:10px;\\\'>QR</div>\';">\n    </div>\n    <div class="gen-text">\n      <span>Transcript Published Date:</span><br>\n      <span>Generated on</span> ' + new Date().toLocaleDateString() + ' by National University\n    </div>\n  </div>\n</div>\n</div>\n<script>\n  (function () {\n    function fitContent() {\n      var content = document.getElementById(\'contentScale\');\n      var sig = document.querySelector(\'.sig-block\');\n      var page = document.getElementById(\'a4Page\');\n      if (!content || !sig || !page) return;\n      content.style.transform = \'scale(1)\';\n      var pageRect = page.getBoundingClientRect();\n      var contentRect = content.getBoundingClientRect();\n      var sigRect = sig.getBoundingClientRect();\n      var buffer = 10;\n      var availableHeight = (sigRect.top - pageRect.top) - (contentRect.top - pageRect.top) - buffer;\n      var naturalHeight = content.scrollHeight;\n      if (availableHeight > 0 && naturalHeight > availableHeight) {\n        var scale = availableHeight / naturalHeight;\n        content.style.transform = \'scale(\' + scale + \')\';\n      } else {\n        content.style.transform = \'scale(1)\';\n      }\n    }\n    if (document.readyState === \'complete\') {\n      fitContent();\n    } else {\n      window.addEventListener(\'load\', fitContent);\n    }\n    window.addEventListener(\'resize\', fitContent);\n    if (window.matchMedia) {\n      window.matchMedia(\'print\').addListener(fitContent);\n    }\n    window.addEventListener(\'beforeprint\', fitContent);\n  })();\n</script>\n</body>\n</html>';

    var now = new Date();
    var dd = String(now.getDate()).padStart(2, '0');
    var mm = String(now.getMonth() + 1).padStart(2, '0');
    var yy = String(now.getFullYear()).slice(-2);
    var dateStr = dd + mm + yy;

    var fileName = "NU Hon's Consolidated ResultPDF_" + (examRoll || 'Student') + "_" + (regNumber || '');
    window.showDownloadPopup(html, fileName);
  };

})();
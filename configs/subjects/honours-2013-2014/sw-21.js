/* =====================
   SOCIAL WORK - Honours 2013-2014 Syllabus
   ===================== */

window.subjectData = {
  departmentName: "Social Work",
  shortName: "21 - Social Work",
  educationType: "honours",
  syllabus: "2013-2014",
  totalCredits: 128,
  
  years: {
    1: {
      yearName: "First Year",
      mandatory: ["212101", "212103", "212105", "212107", "212109", "211501"],
      subjects: [
        { code: "212101", name: "Introduction to Social Work", credit: 4 },
        { code: "212103", name: "Bangladesh Studies: History, Culture And Heritage", credit: 4 },
        { code: "212105", name: "History and Philosophy of Social Work", credit: 4 },
        { code: "212107", name: "Human Psychology and Social Work", credit: 4 },
        { code: "212109", name: "Economics and Development", credit: 4 },
        { code: "211501", name: "History of the Emergence of Independent Bangladesh", credit: 4 }
      ]
    },
    2: {
      yearName: "Second Year",
      groups: [
        {
          groupType: "choice",
          members: ["222111", "222113"],
          maxActive: 1
        }
      ],
      mandatory: ["222101", "222103", "222105", "222107", "222109"],
      subjects: [
        { code: "222101", name: "Human Biology: Growth and Development", credit: 4 },
        { code: "222103", name: "Social Policy and Planning", credit: 4 },
        { code: "222105", name: "Social Problems Analysis", credit: 4 },
        { code: "222107", name: "Introduction to Anthropology", credit: 4 },
        { code: "222109", name: "Computer and Information Technology", credit: 4 },
        { code: "222111", name: "Introduction to Sociology", credit: 4 },
        { code: "222113", name: "Bangladesh Economy", credit: 4 },
        { code: "221109", name: "English (Compulsory)", credit: 0 }
      ]
    },
    3: {
      yearName: "Third Year",
      mandatory: ["232101", "232103", "232105", "232107", "232109", "232111", "232113", "232115"],
      subjects: [
        { code: "232101", name: "Social Work Methods: Case work and Group work", credit: 4 },
        { code: "232103", name: "Theories in Social Work Practice", credit: 4 },
        { code: "232105", name: "Voluntarism and NGOs in Bangladesh", credit: 4 },
        { code: "232107", name: "Community Organization and Development", credit: 4 },
        { code: "232109", name: "Social Welfare Administration", credit: 4 },
        { code: "232111", name: "Social Research Methods", credit: 4 },
        { code: "232113", name: "Human Rights and Social Justice", credit: 4 },
        { code: "232115", name: "Social Work and Mental Health", credit: 4 }
      ]
    },
    4: {
      yearName: "Fourth Year",
      mandatory: ["242101", "242103", "242105", "242107", "242109", "242111", "242113", "242115", "242117", "242118"],
      subjects: [
        { code: "242101", name: "Social Work with Families and Children", credit: 4 },
        { code: "242103", name: "Social Work with Older People", credit: 4 },
        { code: "242105", name: "Disaster Management and Social Work", credit: 4 },
        { code: "242107", name: "Social Work in Health Care Settings", credit: 4 },
        { code: "242109", name: "Rural and Urban Social Work", credit: 4 },
        { code: "242111", name: "Social Work and Gender Issues", credit: 4 },
        { code: "242113", name: "Social Work and Law", credit: 4 },
        { code: "242115", name: "Project Planning and Management in Social Work", credit: 4 },
        { code: "242117", name: "Field Work Practicum", credit: 4 },
        { code: "242118", name: "Viva-voce", credit: 4 }
      ]
    }
  }
};
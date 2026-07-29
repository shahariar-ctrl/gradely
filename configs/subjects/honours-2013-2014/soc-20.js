/* =====================
   SOCIOLOGY - Honours 2013-2014 Syllabus
   ===================== */

window.subjectData = {
  departmentName: "Sociology",
  shortName: "20 - Sociology",
  educationType: "honours",
  syllabus: "2013-2014",
  totalCredits: 128,
  
  years: {
    1: {
      yearName: "First Year",
      groups: [
        {
          groupType: "choice",
          members: ["212009", "212111", "211909"],
          maxActive: 1
        }
      ],
      mandatory: ["212001", "212003", "212005", "212007", "211501"],
      subjects: [
        { code: "212001", name: "Introduction to Sociology", credit: 4 },
        { code: "212003", name: "History of Sociology", credit: 4 },
        { code: "212005", name: "Basic Concepts of Sociology", credit: 4 },
        { code: "212007", name: "Social Institutions", credit: 4 },
        { code: "212009", name: "Introducing Sociology", credit: 4 },
        { code: "212111", name: "Introduction to Social Work", credit: 4 },
        { code: "211909", name: "Introduction to Political Theory", credit: 4 },
        { code: "211501", name: "History of the Emergence of Independent Bangladesh", credit: 4 }
      ]
    },
    2: {
      yearName: "Second Year",
      groups: [
        {
          groupType: "choice",
          members: ["222009", "222115"],
          maxActive: 1
        }
      ],
      mandatory: ["222001", "222003", "222005", "222007", "222209"],
      subjects: [
        { code: "222001", name: "Social Stratification", credit: 4 },
        { code: "222003", name: "Sociological Theories", credit: 4 },
        { code: "222005", name: "Research Methodology-I", credit: 4 },
        { code: "222007", name: "Bangladesh Society and Culture", credit: 4 },
        { code: "222009", name: "Sociology of Bangladesh", credit: 4 },
        { code: "222115", name: "Bangladesh Society and Culture", credit: 4 },
        { code: "222209", name: "Bangladesh Economy", credit: 4 },
        { code: "221109", name: "English (Compulsory)", credit: 0 }
      ]
    },
    3: {
      yearName: "Third Year",
      mandatory: ["232001", "232003", "232005", "232007", "232009", "232011", "232013", "232015"],
      subjects: [
        { code: "232001", name: "Social Change and Development", credit: 4 },
        { code: "232003", name: "Sociology of Religion", credit: 4 },
        { code: "232005", name: "Sociology of Family", credit: 4 },
        { code: "232007", name: "Rural Sociology", credit: 4 },
        { code: "232009", name: "Urban Sociology", credit: 4 },
        { code: "232011", name: "Industrial Sociology", credit: 4 },
        { code: "232013", name: "Social Demography", credit: 4 },
        { code: "232015", name: "Social Problems in Bangladesh", credit: 4 }
      ]
    },
    4: {
      yearName: "Fourth Year",
      groups: [
        {
          groupType: "choice",
          members: ["242007", "242009", "242011", "242013"],
          maxActive: 2
        }
      ],
      mandatory: ["242001", "242003", "242005", "242015", "242017", "242018"],
      subjects: [
        { code: "242001", name: "Modern Sociological Theories", credit: 4 },
        { code: "242003", name: "Research Methodology-II", credit: 4 },
        { code: "242005", name: "Sociology of Gender", credit: 4 },
        { code: "242007", name: "Political Sociology", credit: 4 },
        { code: "242009", name: "Sociology of Education", credit: 4 },
        { code: "242011", name: "Environmental Sociology", credit: 4 },
        { code: "242013", name: "Sociology of Health and Medicine", credit: 4 },
        { code: "242015", name: "Social Policy and Planning", credit: 4 },
        { code: "242017", name: "Sociology of Mass Communication", credit: 4 },
        { code: "242018", name: "Viva-voce", credit: 4 }
      ]
    }
  }
};
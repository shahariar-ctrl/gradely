/* =====================
   ECONOMICS - Honours 2013-2014 Syllabus
   ===================== */

window.subjectData = {
  departmentName: "Economics",
  shortName: "22 - Economics",
  educationType: "honours",
  syllabus: "2013-2014",
  totalCredits: 128,
  
  years: {
    1: {
      yearName: "First Year",
      groups: [
        {
          groupType: "choice",
          members: ["212009", "212111"],
          maxActive: 1
        }
      ],
      mandatory: ["212201", "212203", "212205", "212207", "211501"],
      subjects: [
        { code: "212201", name: "Basic Microeconomics", credit: 4 },
        { code: "212203", name: "Basic Macroeconomics", credit: 4 },
        { code: "212205", name: "Basic Mathematics", credit: 4 },
        { code: "212207", name: "Basic Statistics", credit: 4 },
        { code: "212009", name: "Introducing Sociology", credit: 4 },
        { code: "212111", name: "Introduction to Social Work", credit: 4 },
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
      mandatory: ["222201", "222203", "222205", "222207", "221909"],
      subjects: [
        { code: "222201", name: "Intermediate Microeconomics", credit: 4 },
        { code: "222203", name: "Mathematical Economics", credit: 4 },
        { code: "222205", name: "Introduction to Business (In English/Bengali)", credit: 4 },
        { code: "222207", name: "Computer and Information Technology", credit: 4 },
        { code: "221909", name: "Political Organization and Political System of UK and USA", credit: 4 },
        { code: "222009", name: "Sociology of Bangladesh", credit: 4 },
        { code: "222115", name: "Bangladesh Society and Culture", credit: 4 },
        { code: "221109", name: "English (Compulsory)", credit: 0 }
      ]
    },
    3: {
      yearName: "Third Year",
      mandatory: ["232201", "232203", "232205", "232207", "232209", "232211", "232213", "232215"],
      subjects: [
        { code: "232201", name: "Intermediate Macroeconomics", credit: 4 },
        { code: "232203", name: "Statistics for Economics", credit: 4 },
        { code: "232205", name: "Studies on Bangladesh Economy", credit: 4 },
        { code: "232207", name: "Development of Economics", credit: 4 },
        { code: "232209", name: "International Economics-I", credit: 4 },
        { code: "232211", name: "Public Finance", credit: 4 },
        { code: "232213", name: "Urban Economics", credit: 4 },
        { code: "232215", name: "Agricultural and Rural Economics", credit: 4 }
      ]
    },
    4: {
      yearName: "Fourth Year",
      groups: [
        {
          groupType: "choice",
          members: ["242215", "242217", "242219", "242221"],
          maxActive: 2
        }
      ],
      mandatory: ["242201", "242203", "242205", "242207", "242209", "242211", "242213", "242222"],
      subjects: [
        { code: "242201", name: "Money, Banking and Finance", credit: 4 },
        { code: "242203", name: "International Economics-II", credit: 4 },
        { code: "242205", name: "Research Methodology", credit: 4 },
        { code: "242207", name: "Industrial Economics", credit: 4 },
        { code: "242209", name: "Environmental and Resource Economics", credit: 4 },
        { code: "242211", name: "Population and Health Economics", credit: 4 },
        { code: "242213", name: "Economic Thought", credit: 4 },
        { code: "242215", name: "Econometrics", credit: 4 },
        { code: "242217", name: "Economic Systems and Development Patterns", credit: 4 },
        { code: "242219", name: "Economics of Planning", credit: 4 },
        { code: "242221", name: "Islamic Economics", credit: 4 },
        { code: "242222", name: "Viva-voce", credit: 4 }
      ]
    }
  }
};
/* =====================
   ANTHROPOLOGY - Honours 2013-2014 Syllabus
   ===================== */

window.subjectData = {
  departmentName: "Anthropology",
  shortName: "40 - Anthropology",
  educationType: "honours",
  syllabus: "2013-2014",
  totalCredits: 128,
  
  years: {
    1: {
      yearName: "First Year",
      mandatory: ["214001", "214003", "214005", "214007", "211501", "212209"],
      subjects: [
        { code: "214001", name: "Introduction to Anthropology", credit: 4 },
        { code: "214003", name: "Kinship", credit: 4 },
        { code: "214005", name: "Introduction to Biological Anthropology and Archaeology", credit: 4 },
        { code: "214007", name: "Other Cultures", credit: 4 },
        { code: "211501", name: "History of the Emergence of Independent Bangladesh", credit: 4 },
        { code: "212209", name: "Principles of Economics", credit: 4 }
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
      mandatory: ["224001", "224003", "224005", "224007", "222209"],
      subjects: [
        { code: "224001", name: "Early Anthropological Theory", credit: 4 },
        { code: "224003", name: "Research Methodology-I", credit: 4 },
        { code: "224005", name: "Economic Anthropology", credit: 4 },
        { code: "224007", name: "European Social History and Culture", credit: 4 },
        { code: "222009", name: "Sociology of Bangladesh", credit: 4 },
        { code: "222115", name: "Bangladesh Society and Culture", credit: 4 },
        { code: "222209", name: "Bangladesh Economy", credit: 4 },
        { code: "221109", name: "English (Compulsory)", credit: 0 }
      ]
    },
    3: {
      yearName: "Third Year",
      mandatory: ["234001", "234003", "234005", "234007", "234009", "234011", "234013", "234015"],
      subjects: [
        { code: "234001", name: "Anthropological Theory-II", credit: 4 },
        { code: "234003", name: "Political Anthropology", credit: 4 },
        { code: "234005", name: "Peasant Society", credit: 4 },
        { code: "234007", name: "Religion and Anthropology", credit: 4 },
        { code: "234009", name: "Environmental Anthropology", credit: 4 },
        { code: "234011", name: "Gender Issues", credit: 4 },
        { code: "234013", name: "Ethnic Identity and Nationalism", credit: 4 },
        { code: "234015", name: "Reading Ethnographic Texts", credit: 4 }
      ]
    },
    4: {
      yearName: "Fourth Year",
      mandatory: ["244001", "244003", "244005", "244007", "244009", "244011", "244013", "244015", "244017", "244018"],
      subjects: [
        { code: "244001", name: "Contemporary Anthropological Theory", credit: 4 },
        { code: "244003", name: "Research Methods-II", credit: 4 },
        { code: "244005", name: "Anthropology of Development", credit: 4 },
        { code: "244007", name: "Medical Anthropology", credit: 4 },
        { code: "244009", name: "Urban Anthropology", credit: 4 },
        { code: "244011", name: "South Asian Society and Culture", credit: 4 },
        { code: "244013", name: "Language, Society and Culture", credit: 4 },
        { code: "244015", name: "Social Inequality", credit: 4 },
        { code: "244017", name: "Emerging Issues in Anthropology", credit: 4 },
        { code: "244018", name: "Viva-voce", credit: 4 }
      ]
    }
  }
};
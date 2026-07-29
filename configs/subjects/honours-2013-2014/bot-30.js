/* =====================
   BOTANY - Honours 2013-2014 Syllabus
   ===================== */

window.subjectData = {
  departmentName: "Botany",
  shortName: "30 - Botany",
  educationType: "honours",
  syllabus: "2013-2014",
  totalCredits: 128,
  
  years: {
    1: {
      yearName: "First Year",
      groups: [
        {
          groupType: "pair",
          members: [
            ["212807", "212808"],
            ["213105", "213106"]
          ],
          maxActive: 2
        }
      ],
      mandatory: ["213001", "213003", "213005", "213006", "211501"],
      subjects: [
        { code: "213001", name: "Microbiology", credit: 3 },
        { code: "213003", name: "Mycology", credit: 3 },
        { code: "213005", name: "Phycology", credit: 3 },
        { code: "213006", name: "Practical-I", credit: 3 },
        { code: "212807", name: "Chemistry-I", credit: 4 },
        { code: "212808", name: "Chemistry-I Practical", credit: 2 },
        { code: "213105", name: "Zoology-I", credit: 4 },
        { code: "213106", name: "Zoology Practical-I", credit: 2 },
        { code: "211501", name: "History of the Emergence of Independent Bangladesh", credit: 4 }
      ]
    },
    2: {
      yearName: "Second Year",
      groups: [
        {
          groupType: "pair",
          members: [
            ["222807", "222809"],
            ["223107", "223108"]
          ],
          maxActive: 2
        }
      ],
      mandatory: ["223001", "223003", "223005", "223006"],
      subjects: [
        { code: "223001", name: "Higher Cryptogams", credit: 4 },
        { code: "223003", name: "Taxonomy of Angiosperms", credit: 4 },
        { code: "223005", name: "Plant Anatomy and Embryology", credit: 4 },
        { code: "223006", name: "Practical-II", credit: 4 },
        { code: "222807", name: "General Chemistry-II", credit: 4 },
        { code: "222809", name: "Environmental Chemistry", credit: 2 },
        { code: "223107", name: "Zoology-II", credit: 4 },
        { code: "223108", name: "Zoology Practical-II", credit: 2 },
        { code: "221109", name: "English (Compulsory)", credit: 0 }
      ]
    },
    3: {
      yearName: "Third Year",
      mandatory: ["233001", "233003", "233005", "233007", "233009", "233011", "233013", "233014"],
      subjects: [
        { code: "233001", name: "Gymnosperm, Paleobotany and Palynology", credit: 4 },
        { code: "233003", name: "Plant Physiology and Plant Nutrition", credit: 4 },
        { code: "233005", name: "Plant Biochemistry", credit: 4 },
        { code: "233007", name: "Ecology and Environmental Science", credit: 4 },
        { code: "233009", name: "Plant Pathology", credit: 4 },
        { code: "233011", name: "Cytology and Cytogenetics", credit: 4 },
        { code: "233013", name: "Genetics", credit: 4 },
        { code: "233014", name: "Practical-III", credit: 4 }
      ]
    },
    4: {
      yearName: "Fourth Year",
      groups: [
        {
          groupType: "choice",
          members: ["243001", "243003", "243005"],
          maxActive: 2
        }
      ],
      mandatory: ["243007", "243009", "243011", "243013", "243015", "243016", "243018"],
      subjects: [
        { code: "243001", name: "Agronomy and Horticulture", credit: 4 },
        { code: "243003", name: "Economic Botany, Ethnobotany and Pharmacognosy", credit: 4 },
        { code: "243005", name: "Limnology and Aquaculture", credit: 4 },
        { code: "243007", name: "Biodiversity and Evolution", credit: 4 },
        { code: "243009", name: "Plant Breeding", credit: 4 },
        { code: "243011", name: "Molecular Biology and Bioinformatics", credit: 4 },
        { code: "243013", name: "Biostatistics and Research Methodology", credit: 4 },
        { code: "243015", name: "Biotechnology and Genetic Engineering", credit: 4 },
        { code: "243016", name: "Practical Paper-IV", credit: 4 },
        { code: "243018", name: "Viva-Voce", credit: 4 }
      ]
    }
  }
};
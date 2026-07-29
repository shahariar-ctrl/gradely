/* =====================
   ZOOLOGY - Honours 2013-2014 Syllabus
   ===================== */

window.subjectData = {
  departmentName: "Zoology",
  shortName: "31 - Zoology",
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
            ["212905", "212906"],
            ["213007", "213008"]
          ],
          maxActive: 2
        }
      ],
      mandatory: ["213101", "213103", "213104", "211501"],
      subjects: [
        { code: "213101", name: "Introduction to Zoology", credit: 4 },
        { code: "213103", name: "Animal diversity-1: Protozoa and Non-chordates", credit: 4 },
        { code: "213104", name: "Zoology Practical-I", credit: 4 },
        { code: "212807", name: "Chemistry-I", credit: 4 },
        { code: "212808", name: "Chemistry Practical-I", credit: 2 },
        { code: "212905", name: "Biochemistry-I", credit: 4 },
        { code: "212906", name: "Biochemistry-I Practical", credit: 2 },
        { code: "213007", name: "Botany-I", credit: 4 },
        { code: "213008", name: "Botany-I Practical", credit: 2 },
        { code: "211501", name: "History of the Emergence of Independent Bangladesh", credit: 4 }
      ]
    },
    2: {
      yearName: "Second Year",
      groups: [
        {
          groupType: "pair",
          members: [
            ["223007", "223008"],
            ["222807", "222809"],
            ["222909", "222910"]
          ],
          maxActive: 2
        }
      ],
      mandatory: ["223101", "223103", "223105", "223106"],
      subjects: [
        { code: "223101", name: "Animal Diversity – II: Lower chordates and Chordates", credit: 4 },
        { code: "223103", name: "Comparative Anatomy: Protozoa, Non-chordates and Chordates", credit: 4 },
        { code: "223105", name: "Environmental Biology", credit: 4 },
        { code: "223106", name: "Zoology Practical -II", credit: 4 },
        { code: "223007", name: "Botany-II", credit: 4 },
        { code: "223008", name: "Botany Practical-II", credit: 2 },
        { code: "222807", name: "General Chemistry-II", credit: 4 },
        { code: "222809", name: "Environmental Chemistry", credit: 2 },
        { code: "222909", name: "Biochemistry-II", credit: 4 },
        { code: "222910", name: "Biochemistry Practical –II", credit: 2 },
        { code: "221109", name: "English (Compulsory)", credit: 0 }
      ]
    },
    3: {
      yearName: "Third Year",
      mandatory: ["233101", "233103", "233105", "233107", "233109", "233111", "233113", "233114"],
      subjects: [
        { code: "233101", name: "Evolution, Palaeontology and Zoogeography", credit: 4 },
        { code: "233103", name: "Ecology", credit: 4 },
        { code: "233105", name: "Genetics and Animal Breeding", credit: 4 },
        { code: "233107", name: "Developmental Biology and Ethology", credit: 4 },
        { code: "233109", name: "Human Physiology", credit: 4 },
        { code: "233111", name: "Systematics, Demography and Family Planning", credit: 4 },
        { code: "233113", name: "Cell and Molecular Biology", credit: 4 },
        { code: "233114", name: "Zoology Practical-III", credit: 4 }
      ]
    },
    4: {
      yearName: "Fourth Year",
      mandatory: ["243101", "243103", "243105", "243107", "243109", "243111", "243113", "243115", "243116", "243118"],
      subjects: [
        { code: "243101", name: "Applied and Economic Zoology", credit: 4 },
        { code: "243103", name: "Genetic Engineering and Biotechnology", credit: 4 },
        { code: "243105", name: "Biostatistics and Research Methodology", credit: 4 },
        { code: "243107", name: "Microbiology and Radiation Biology", credit: 4 },
        { code: "243109", name: "Parasitology", credit: 4 },
        { code: "243111", name: "Entomology", credit: 4 },
        { code: "243113", name: "Fisheries Biology", credit: 4 },
        { code: "243115", name: "Wildlife Biology", credit: 4 },
        { code: "243116", name: "Zoology Practical-IV", credit: 4 },
        { code: "243118", name: "Viva-voce", credit: 4 }
      ]
    }
  }
};
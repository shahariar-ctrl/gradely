/* =====================
   SANSKRIT - Honours 2013-2014 Syllabus
   ===================== */

window.subjectData = {
  departmentName: "Sanskrit",
  shortName: "13 - Sanskrit",
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
      mandatory: ["211301", "211303", "211305", "211307", "211501"],
      subjects: [
        { code: "211301", name: "Sanskrit Language - I", credit: 4 },
        { code: "211303", name: "History of Vedic Literature", credit: 4 },
        { code: "211305", name: "History of Sanskrit Literature", credit: 4 },
        { code: "211307", name: "Sanskrit Story Literature", credit: 4 },
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
      mandatory: ["221301", "221303", "221305", "221307", "222209"],
      subjects: [
        { code: "221301", name: "Sanskrit Language-2", credit: 4 },
        { code: "221303", name: "Sanskrit Poetry", credit: 4 },
        { code: "221305", name: "Sanskrit Prose", credit: 4 },
        { code: "221307", name: "Sanskrit Poetics", credit: 4 },
        { code: "222009", name: "Sociology of Bangladesh", credit: 4 },
        { code: "222115", name: "Bangladesh Society and Culture", credit: 4 },
        { code: "222209", name: "Bangladesh Economy", credit: 4 },
        { code: "221109", name: "English (Compulsory)", credit: 0 }
      ]
    },
    3: {
      yearName: "Third Year",
      mandatory: ["231301", "231303", "231305", "231307", "231309", "231311", "231313", "231315"],
      subjects: [
        { code: "231301", name: "Sanskrit Grammar-I", credit: 4 },
        { code: "231303", name: "Vedic Literature and Grammar", credit: 4 },
        { code: "231305", name: "Sanskrit Drama (Kalidasa and Pre-Kalidasa)", credit: 4 },
        { code: "231307", name: "Vedic and Sanskrit Prosody", credit: 4 },
        { code: "231309", name: "Linguistics and Sanskrit Philology", credit: 4 },
        { code: "231311", name: "Indian Philosophy", credit: 4 },
        { code: "231313", name: "Ancient Indian History and Culture", credit: 4 },
        { code: "231315", name: "Manuscript Studies", credit: 4 }
      ]
    },
    4: {
      yearName: "Fourth Year",
      mandatory: ["241301", "241303", "241305", "241307", "241309", "241311", "241313", "241315", "241317", "241318"],
      subjects: [
        { code: "241301", name: "Sanskrit Grammar-2", credit: 4 },
        { code: "241303", name: "Sanskrit Epic", credit: 4 },
        { code: "241305", name: "Purana and Philosophical Poem", credit: 4 },
        { code: "241307", name: "Post-Kalidasa Sanskrit Drama", credit: 4 },
        { code: "241309", name: "Sanskrit Ethical Poem", credit: 4 },
        { code: "241311", name: "Sanskrit Historical Poem", credit: 4 },
        { code: "241313", name: "Ancient Indian Politics", credit: 4 },
        { code: "241315", name: "Archaeology of Bengal", credit: 4 },
        { code: "241317", name: "Essay, Composition and Translation", credit: 4 },
        { code: "241318", name: "Viva-voce", credit: 4 }
      ]
    }
  }
};
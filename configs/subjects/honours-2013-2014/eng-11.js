/* =====================
   ENGLISH - Honours 2013-2014 Syllabus
   ===================== */

window.subjectData = {
  departmentName: "English",
  shortName: "11 - English",
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
      mandatory: ["211101", "211103", "211105", "211107", "211501"],
      subjects: [
        { code: "211101", name: "English Reading Skills", credit: 4 },
        { code: "211103", name: "English Writing Skills", credit: 4 },
        { code: "211105", name: "Introduction to Poetry", credit: 4 },
        { code: "211107", name: "Introduction to Prose: Fiction and Non-Fiction", credit: 4 },
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
      mandatory: ["221101", "221103", "221105", "221107", "221909"],
      subjects: [
        { code: "221101", name: "Introduction to Drama", credit: 4 },
        { code: "221103", name: "Romantic Poetry", credit: 4 },
        { code: "221105", name: "Advanced Reading and Writing", credit: 4 },
        { code: "221107", name: "History of English Literature", credit: 4 },
        { code: "222009", name: "Sociology of Bangladesh", credit: 4 },
        { code: "222115", name: "Bangladesh Society and Culture", credit: 4 },
        { code: "221909", name: "Political Organization and The Political System of UK and USA", credit: 4 },
        { code: "221109", name: "English (Compulsory)", credit: 0 }
      ]
    },
    3: {
      yearName: "Third Year",
      mandatory: ["231101", "231103", "231105", "231107", "231109", "231111", "231113", "231115"],
      subjects: [
        { code: "231101", name: "Elizabeth and Jacobean Drama", credit: 4 },
        { code: "231103", name: "16th and 17th Century Poetry", credit: 4 },
        { code: "231105", name: "17th and 18th Century Non-Fictional Prose", credit: 4 },
        { code: "231107", name: "Restoration and Eighteenth Century Fiction", credit: 4 },
        { code: "231109", name: "Restoration and Eighteenth Century Poetry and Drama", credit: 4 },
        { code: "231111", name: "Victorian Poetry", credit: 4 },
        { code: "231113", name: "Introduction to Literary Criticism (Up to Romantic Period)", credit: 4 },
        { code: "231115", name: "Introduction to Linguistics", credit: 4 }
      ]
    },
    4: {
      yearName: "Fourth Year",
      groups: [
        {
          groupType: "choice",
          members: ["241117", "241119"],
          maxActive: 1
        }
      ],
      mandatory: ["241101", "241103", "241105", "241107", "241109", "241111", "241113", "241115", "241120"],
      subjects: [
        { code: "241101", name: "Nineteenth Century Novel", credit: 4 },
        { code: "241103", name: "Twentieth Century Poetry", credit: 4 },
        { code: "241105", name: "Modern Drama", credit: 4 },
        { code: "241107", name: "Twentieth Century Novel", credit: 4 },
        { code: "241109", name: "American Poetry", credit: 4 },
        { code: "241111", name: "American Literature: Fiction and Drama", credit: 4 },
        { code: "241113", name: "Classics in Translation", credit: 4 },
        { code: "241115", name: "Literary Criticism (From Victorian to Modern Age)", credit: 4 },
        { code: "241117", name: "Continental Literature", credit: 4 },
        { code: "241119", name: "Approaches and Methods of Language Teaching", credit: 4 },
        { code: "241120", name: "Viva-voce", credit: 4 }
      ]
    }
  }
};
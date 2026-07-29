/* =====================
   PHILOSOPHY - Honours 2013-2014 Syllabus
   ===================== */

window.subjectData = {
  departmentName: "Philosophy",
  shortName: "17 - Philosophy",
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
      mandatory: ["211701", "211703", "211705", "211707", "211501"],
      subjects: [
        { code: "211701", name: "Problems of Philosophy", credit: 4 },
        { code: "211703", name: "History of Western Philosophy: Ancient and Medieval", credit: 4 },
        { code: "211705", name: "General Ethics", credit: 4 },
        { code: "211707", name: "Psychology", credit: 4 },
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
      mandatory: ["221701", "221703", "221705", "221707", "221909"],
      subjects: [
        { code: "221701", name: "History of Western Philosophy: Modern", credit: 4 },
        { code: "221703", name: "Muslim Philosophy", credit: 4 },
        { code: "221705", name: "Indian Philosophy: Atheistic School", credit: 4 },
        { code: "221707", name: "General Logic", credit: 4 },
        { code: "222009", name: "Sociology of Bangladesh", credit: 4 },
        { code: "222115", name: "Bangladesh Society and Culture", credit: 4 },
        { code: "221909", name: "Political Organization and Political System of UK and USA", credit: 4 },
        { code: "221109", name: "English (Compulsory)", credit: 0 }
      ]
    },
    3: {
      yearName: "Third Year",
      mandatory: ["231701", "231703", "231705", "231707", "231709", "231711", "231713", "231715"],
      subjects: [
        { code: "231701", name: "Ancient Philosophical Classics: Plato and Aristotle", credit: 4 },
        { code: "231703", name: "Modern Philosophical Classics: Hume and Kant", credit: 4 },
        { code: "231705", name: "Symbolic Logic", credit: 4 },
        { code: "231707", name: "Moral Philosophy of Immanuel Kant and J.S. Mill", credit: 4 },
        { code: "231709", name: "Philosophy of the Bengalees: Ancient and Medieval", credit: 4 },
        { code: "231711", name: "Muslim Philosophers", credit: 4 },
        { code: "231713", name: "Indian Philosophy: Theistic School", credit: 4 },
        { code: "231715", name: "Philosophy of Education", credit: 4 }
      ]
    },
    4: {
      yearName: "Fourth Year",
      mandatory: ["241701", "241703", "241705", "241707", "241709", "241711", "241713", "241715", "241717", "241718"],
      subjects: [
        { code: "241701", name: "Contemporary Western Philosophy", credit: 4 },
        { code: "241703", name: "Marxist Philosophy", credit: 4 },
        { code: "241705", name: "Aesthetics", credit: 4 },
        { code: "241707", name: "Political Philosophy: Ancient and Medieval", credit: 4 },
        { code: "241709", name: "Philosophy of the Bengalees: Modern and Contemporary", credit: 4 },
        { code: "241711", name: "Philosophy of Mind", credit: 4 },
        { code: "241713", name: "Social Philosophers", credit: 4 },
        { code: "241715", name: "Meta Ethics", credit: 4 },
        { code: "241717", name: "Philosophy of Religion", credit: 4 },
        { code: "241718", name: "Viva-voce", credit: 4 }
      ]
    }
  }
};
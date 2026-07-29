/* =====================
   ISLAMIC STUDIES - Honours 2013-2014 Syllabus
   ===================== */

window.subjectData = {
  departmentName: "Islamic Studies",
  shortName: "18 - Islamic Studies",
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
      mandatory: ["211801", "211803", "211805", "211807", "211501"],
      subjects: [
        { code: "211801", name: "Quranic Studies", credit: 4 },
        { code: "211803", name: "Introduction to Islam", credit: 4 },
        { code: "211805", name: "Introduction to Islamic Dawah", credit: 4 },
        { code: "211807", name: "Al-Kalam", credit: 4 },
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
      mandatory: ["221801", "221803", "221805", "221807", "221909"],
      subjects: [
        { code: "221801", name: "Introductory Knowledge of Quran", credit: 4 },
        { code: "221803", name: "Study of Al-Hadith", credit: 4 },
        { code: "221805", name: "Al-Sirat al-Nabawiyya", credit: 4 },
        { code: "221807", name: "Social System and Family Welfare in Islam", credit: 4 },
        { code: "222009", name: "Sociology of Bangladesh", credit: 4 },
        { code: "222115", name: "Bangladesh Society and Culture", credit: 4 },
        { code: "221909", name: "Political Organization and Political System of UK and USA", credit: 4 },
        { code: "221109", name: "English (Compulsory)", credit: 0 }
      ]
    },
    3: {
      yearName: "Third Year",
      mandatory: ["231801", "231803", "231805", "231807", "231809", "231811", "231813", "231815"],
      subjects: [
        { code: "231801", name: "Study of al-Tafsir", credit: 4 },
        { code: "231803", name: "Principles and History of Tafsir Literature", credit: 4 },
        { code: "231805", name: "Muslim Philosophy and Philosophers", credit: 4 },
        { code: "231807", name: "Sufism and some Prominent Sufis and their Contribution", credit: 4 },
        { code: "231809", name: "Economic System in Islam", credit: 4 },
        { code: "231811", name: "Study of Islamic Law, Personal Law and Law of Inheritance in Islam", credit: 4 },
        { code: "231813", name: "Ethics and Values in Islam", credit: 4 },
        { code: "231815", name: "History of Muslim World", credit: 4 }
      ]
    },
    4: {
      yearName: "Fourth Year",
      mandatory: ["241801", "241803", "241805", "241807", "241809", "241811", "241813", "241815", "241817", "241818"],
      subjects: [
        { code: "241801", name: "Sayings of the Holy Prophet (SM.) In the Practical Life", credit: 4 },
        { code: "241803", name: "Principles and History of Hadith Literature", credit: 4 },
        { code: "241805", name: "Principles and History of Islamic Jurisprudence", credit: 4 },
        { code: "241807", name: "Political System in Islam", credit: 4 },
        { code: "241809", name: "Study of Major Religions of the World", credit: 4 },
        { code: "241811", name: "Banking and Insurance in Islam", credit: 4 },
        { code: "241813", name: "Muslims' Contribution to Science & Technology", credit: 4 },
        { code: "241815", name: "Islamic Civilization", credit: 4 },
        { code: "241817", name: "Human Rights in Islam", credit: 4 },
        { code: "241818", name: "Viva-Voce", credit: 4 }
      ]
    }
  }
};
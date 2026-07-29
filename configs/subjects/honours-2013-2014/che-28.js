/* =====================
   CHEMISTRY - Honours 2013-2014 Syllabus
   ===================== */

window.subjectData = {
  departmentName: "Chemistry",
  shortName: "28 - Chemistry",
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
            ["213607", "213608"],
            ["212707", "212709"]
          ],
          maxActive: 2
        }
      ],
      mandatory: ["212801", "212803", "212805", "212806", "213709", "213711", "211501"],
      subjects: [
        { code: "212801", name: "Physical Chemistry-I", credit: 3 },
        { code: "212803", name: "Fundamentals of Organic Chemistry", credit: 3 },
        { code: "212805", name: "Fundamentals of Inorganic Chemistry", credit: 3 },
        { code: "212806", name: "Chemistry Practical: Qualitative inorganic analysis, inorganic preparations and elementary crystal chemistry", credit: 3 },
        { code: "213709", name: "Fundamentals of Mathematics", credit: 4 },
        { code: "213711", name: "Calculus-I", credit: 2 },
        { code: "212707", name: "Physics-I (Mechanics, Properties of Matter, Waves & Optics)", credit: 4 },
        { code: "212709", name: "Physics-II (Heat, Thermodynamics and Radiation)", credit: 2 },
        { code: "211501", name: "History of the Emergence of Independent Bangladesh", credit: 4 }
      ]
    },
    2: {
      yearName: "Second Year",
      groups: [
        {
          groupType: "pair",
          members: [
            ["222707", "222708"],
            ["223707", "223708"]
          ],
          maxActive: 2
        }
      ],
      mandatory: ["222801", "222803", "222805", "222806"],
      subjects: [
        { code: "222801", name: "Physical Chemistry-II", credit: 4 },
        { code: "222803", name: "Organic Chemistry", credit: 4 },
        { code: "222805", name: "Chemistry of the Representative Elements", credit: 4 },
        { code: "222806", name: "Quantitative Inorganic Analysis (Practical)", credit: 4 },
        { code: "222707", name: "Physics-III (Electricity and Modern Physics)", credit: 4 },
        { code: "222708", name: "Physics-IV (Physics Practical)", credit: 2 },
        { code: "223707", name: "Calculus-II", credit: 4 },
        { code: "223708", name: "Math Lab (Practical)", credit: 2 },
        { code: "221109", name: "English (Compulsory)", credit: 0 }
      ]
    },
    3: {
      yearName: "Third Year",
      mandatory: ["232801", "232803", "232805", "232807", "232809", "232811", "232813", "232814", "232816"],
      subjects: [
        { code: "232801", name: "Physical Chemistry-III", credit: 4 },
        { code: "232803", name: "Stereochemistry", credit: 4 },
        { code: "232805", name: "Advanced Concepts of Atomic Structure and Chemical Bonding", credit: 4 },
        { code: "232807", name: "Coordination Chemistry and Organometallic Chemistry", credit: 4 },
        { code: "232809", name: "Fundamentals of Analytical Chemistry", credit: 4 },
        { code: "232811", name: "Industrial Chemistry", credit: 4 },
        { code: "232813", name: "Agricultural Chemistry", credit: 4 },
        { code: "232814", name: "Physical Chemistry Practical", credit: 2 },
        { code: "232816", name: "Organic Chemistry Practical (Detection & Preparation)", credit: 2 }
      ]
    },
    4: {
      yearName: "Fourth Year",
      mandatory: ["242801", "242803", "242805", "242807", "242809", "242811", "242813", "242815", "242816", "242818", "242820"],
      subjects: [
        { code: "242801", name: "Physical Chemistry-IV", credit: 4 },
        { code: "242803", name: "Selected Topics in Organic Chemistry", credit: 4 },
        { code: "242805", name: "Selected Topics in Inorganic Chemistry", credit: 4 },
        { code: "242807", name: "Nuclear Chemistry", credit: 4 },
        { code: "242809", name: "Organic Polymers", credit: 4 },
        { code: "242811", name: "Reaction Mechanism", credit: 4 },
        { code: "242813", name: "Separation Techniques", credit: 4 },
        { code: "242815", name: "Chemical Spectroscopy", credit: 4 },
        { code: "242816", name: "Practical Chemistry (Organic)", credit: 2 },
        { code: "242818", name: "Practical Chemistry (Industrial)", credit: 2 },
        { code: "242820", name: "Viva-voce", credit: 4 }
      ]
    }
  }
};
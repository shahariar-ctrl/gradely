/* =====================
   PHYSICS - Honours 2013-2014 Syllabus
   ===================== */

window.subjectData = {
  departmentName: "Physics",
  shortName: "27 - Physics",
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
            ["213607", "213608"]
          ],
          maxActive: 2
        }
      ],
      mandatory: ["212701", "212703", "212705", "212706", "213709", "213711", "211501"],
      subjects: [
        { code: "212701", name: "Mechanics", credit: 3 },
        { code: "212703", name: "Properties of Matter, Waves & Oscillations", credit: 3 },
        { code: "212705", name: "Heat, Thermodynamics and Radiation", credit: 3 },
        { code: "212706", name: "Physics Practical-I", credit: 3 },
        { code: "213709", name: "Fundamentals of Mathematics", credit: 4 },
        { code: "213711", name: "Calculus-I", credit: 2 },
        { code: "212807", name: "Chemistry-I", credit: 4 },
        { code: "212808", name: "Chemistry-I Practical", credit: 2 },
        { code: "213607", name: "Introduction to Statistics", credit: 4 },
        { code: "213608", name: "Statistics Practical-I", credit: 2 },
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
            ["223707", "223708"],
            ["223609", "223610"]
          ],
          maxActive: 2
        }
      ],
      mandatory: ["222701", "222703", "222705", "222706"],
      subjects: [
        { code: "222701", name: "Electricity & Magnetism", credit: 4 },
        { code: "222703", name: "Geometrical & Physical Optics", credit: 4 },
        { code: "222705", name: "Classical Mechanics", credit: 4 },
        { code: "222706", name: "Physics Practical-II", credit: 4 },
        { code: "223707", name: "Calculus-II", credit: 4 },
        { code: "223708", name: "Math Lab (Practical)", credit: 2 },
        { code: "222807", name: "General Chemistry-II", credit: 4 },
        { code: "222809", name: "Environmental Chemistry", credit: 2 },
        { code: "223609", name: "Methods of Statistics", credit: 4 },
        { code: "223610", name: "Statistics Practical-II", credit: 2 },
        { code: "221109", name: "English (Compulsory)", credit: 0 }
      ]
    },
    3: {
      yearName: "Third Year",
      mandatory: ["232701", "232703", "232705", "232707", "232709", "232711", "232713", "232714"],
      subjects: [
        { code: "232701", name: "Atomic & Molecular Physics", credit: 4 },
        { code: "232703", name: "Quantum Mechanics-I", credit: 4 },
        { code: "232705", name: "Computer Fundamentals and Numerical Analysis", credit: 4 },
        { code: "232707", name: "Electronics-I", credit: 4 },
        { code: "232709", name: "Nuclear Physics-I", credit: 4 },
        { code: "232711", name: "Solid State Physics-I", credit: 4 },
        { code: "232713", name: "Mathematical Physics", credit: 4 },
        { code: "232714", name: "Physics Practical-III", credit: 4 }
      ]
    },
    4: {
      yearName: "Fourth Year",
      mandatory: ["242701", "242703", "242705", "242707", "242709", "242711", "242713", "242715", "242716", "242718"],
      subjects: [
        { code: "242701", name: "Nuclear Physics-II", credit: 4 },
        { code: "242703", name: "Solid State Physics-II", credit: 4 },
        { code: "242705", name: "Quantum Mechanics-II", credit: 4 },
        { code: "242707", name: "Electronics-II", credit: 4 },
        { code: "242709", name: "Classical Electrodynamics", credit: 4 },
        { code: "242711", name: "Statistical Mechanics", credit: 4 },
        { code: "242713", name: "Computer Application and Programming", credit: 4 },
        { code: "242715", name: "Theory of Relativity and Cosmology", credit: 4 },
        { code: "242716", name: "Physics Practical-IV", credit: 4 },
        { code: "242718", name: "Viva-Voce", credit: 4 }
      ]
    }
  }
};
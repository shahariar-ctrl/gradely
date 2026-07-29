/* =====================
   MATHEMATICS - Honours 2013-2014 Syllabus
   ===================== */

window.subjectData = {
  departmentName: "Computer Science",
  shortName: "39 - Computer Science",
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
      mandatory: ["213701", "213703", "213705", "213707", "211501"],
      subjects: [
        { code: "213701", name: "Fundamentals of Mathematics", credit: 3 },
        { code: "213703", name: "Calculus - I", credit: 3 },
        { code: "213705", name: "Linear Algebra", credit: 3 },
        { code: "213707", name: "Analytic and Vector Geometry", credit: 3 },
        { code: "212807", name: "Chemistry-I", credit: 4 },
        { code: "212808", name: "Chemistry-I Practical", credit: 2 },
        { code: "213607", name: "Introduction to Statistics", credit: 4 },
        { code: "213608", name: "Statistics Practical-I", credit: 2 },
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
            ["222807", "222809"],
            ["223609", "223610"]
          ],
          maxActive: 2
        }
      ],
      mandatory: ["223701", "223703", "223705", "223706"],
      subjects: [
        { code: "223701", name: "Calculus - II", credit: 4 },
        { code: "223703", name: "Ordinary Differential Equations", credit: 4 },
        { code: "223705", name: "Computer Programming (Fortran)", credit: 4 },
        { code: "223706", name: "Math Lab (Practical)", credit: 4 },
        { code: "222707", name: "Physics-III (Electricity and Modern Physics)", credit: 4 },
        { code: "222708", name: "Physics-IV (Physics Practical)", credit: 2 },
        { code: "222807", name: "General Chemistry II", credit: 4 },
        { code: "222809", name: "Environmental Chemistry", credit: 2 },
        { code: "223609", name: "Methods of Statistics", credit: 4 },
        { code: "223610", name: "Statistics Practical-II", credit: 2 },
        { code: "221109", name: "English (Compulsory)", credit: 0 }
      ]
    },
    3: {
      yearName: "Third Year",
      mandatory: ["233701", "233703", "233705", "233707", "233709", "233711", "233713", "233714"],
      subjects: [
        { code: "233701", name: "Abstract Algebra", credit: 4 },
        { code: "233703", name: "Real Analysis", credit: 4 },
        { code: "233705", name: "Numerical Analysis", credit: 4 },
        { code: "233707", name: "Complex Analysis", credit: 4 },
        { code: "233709", name: "Differential Geometry", credit: 4 },
        { code: "233711", name: "Mechanics", credit: 4 },
        { code: "233713", name: "Linear Programming", credit: 4 },
        { code: "233714", name: "Math Lab (Practical)", credit: 4 }
      ]
    },
    4: {
      yearName: "Fourth Year",
      groups: [
        {
          groupType: "choice",
          members: ["243713", "243715", "243717"],
          maxActive: 2
        }
      ],
      mandatory: ["243701", "243703", "243705", "243707", "243709", "243711", "243718", "243720"],
      subjects: [
        { code: "243701", name: "Theory of Numbers", credit: 4 },
        { code: "243703", name: "Topology & Functional Analysis", credit: 4 },
        { code: "243705", name: "Methods of Applied Mathematics", credit: 4 },
        { code: "243707", name: "Tensor Analysis", credit: 4 },
        { code: "243709", name: "Partial Differential Equations", credit: 4 },
        { code: "243711", name: "Hydrodynamics", credit: 4 },
        { code: "243713", name: "Discrete Mathematics", credit: 4 },
        { code: "243715", name: "Astronomy", credit: 4 },
        { code: "243717", name: "Mathematical Modeling in Biology", credit: 4 },
        { code: "243718", name: "Math Lab (Practical)", credit: 4 },
        { code: "243720", name: "Viva-Voce (Comprehensive)", credit: 4 }
      ]
    }
  }
};
export const dashboardSeed = {
  title: 'Student Success Overview',
  years: [2022, 2023, 2024, 2025, 2026],
  filters: {
    academicPeriod: 'This Year vs Last Year',
    gender: ['All genders', 'Male', 'Female', 'Non-binary'],
    ethnicity: ['All ethnicities', 'Caucasian', 'Minority'],
    domicile: ['All domiciles', 'Domestic', 'International'],
    majorNames: ['All majors', 'Liberal Arts', 'Finance', 'Business', 'Human Resources', 'Social Science', 'Computer Science', 'Electrical Engineering', 'Bio-Tech Engineering']
  },
  kpis: {
    applications: { current: 14055, previous: 4637 },
    admissionRate: { current: 18.8, previous: 15.2 },
    topMajor: { current: 'Business', previous: 'Humanities Business' },
    totalEnrollment: { current: 8357, previous: 3521 },
    retentionRate: { current: 86.0, previous: 81.1 }
  },
  applicationTrends: [
    { year: 2022, LiberalArts: 1610, Finance: 520, Business: 410, HumanResources: 390, SocialScience: 360, ComputerScience: 280, ElectricalEngineering: 210, BioTechEngineering: 140 },
    { year: 2023, LiberalArts: 2920, Finance: 880, Business: 790, HumanResources: 740, SocialScience: 680, ComputerScience: 570, ElectricalEngineering: 420, BioTechEngineering: 310 },
    { year: 2024, LiberalArts: 2360, Finance: 980, Business: 1280, HumanResources: 1220, SocialScience: 1110, ComputerScience: 950, ElectricalEngineering: 810, BioTechEngineering: 620 },
    { year: 2025, LiberalArts: 2540, Finance: 1150, Business: 1500, HumanResources: 1380, SocialScience: 1260, ComputerScience: 1190, ElectricalEngineering: 1010, BioTechEngineering: 760 },
    { year: 2026, LiberalArts: 3100, Finance: 1480, Business: 1720, HumanResources: 1510, SocialScience: 1380, ComputerScience: 1610, ElectricalEngineering: 1280, BioTechEngineering: 920 }
  ],
  demographics: {
    ethnicity: [{ label: 'Caucasian', value: 53 }, { label: 'Minority', value: 47 }],
    gender: [{ label: 'Male', value: 63 }, { label: 'Female', value: 37 }],
    studentType: [{ label: 'Freshman', value: 82 }, { label: 'Transfer', value: 18 }],
    domicile: [{ label: 'Domestic', value: 67 }, { label: 'International', value: 33 }]
  },
  terminationReasons: [
    { reason: 'Academic standing', count: 96 },
    { reason: 'Financial reasons', count: 71 },
    { reason: 'Transferred', count: 58 },
    { reason: 'Personal reasons', count: 43 },
    { reason: 'Unknown', count: 22 }
  ]
};

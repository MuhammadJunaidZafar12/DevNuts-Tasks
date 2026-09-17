import mongoose from 'mongoose';

const dashboardSchema = new mongoose.Schema(
  {
    title: String,
    years: [Number],
    filters: {
      academicPeriod: String,
      gender: [String],
      ethnicity: [String],
      domicile: [String],
      majorNames: [String],
    },
    kpis: {
      applications: {
        current: Number,
        previous: Number,
      },
      admissionRate: {
        current: Number,
        previous: Number,
      },
      topMajor: {
        current: String,
        previous: String,
      },
      totalEnrollment: {
        current: Number,
        previous: Number,
      },
      retentionRate: {
        current: Number,
        previous: Number,
      },
    },
    applicationTrends: [
      {
        year: Number,
        LiberalArts: Number,
        Finance: Number,
        Business: Number,
        HumanResources: Number,
        SocialScience: Number,
        ComputerScience: Number,
        ElectricalEngineering: Number,
        BioTechEngineering: Number,
      },
    ],
    demographics: {
      ethnicity: [{ label: String, value: Number }],
      gender: [{ label: String, value: Number }],
      studentType: [{ label: String, value: Number }],
      domicile: [{ label: String, value: Number }],
    },
    terminationReasons: [{ reason: String, count: Number }],
  },
  { timestamps: true }
);

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

export default Dashboard;

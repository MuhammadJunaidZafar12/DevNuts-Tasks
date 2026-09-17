import Dashboard from '../models/Dashboard.js';
import { dashboardSeed } from '../data/dashboardSeed.js';

export const getDashboard = async (req, res) => {
    const dashboard = await Dashboard.findOne().lean();

    if (!dashboard) {
        return res.status(404).json({ success: false, message: 'Dashboard data is not available.' });
    }

    return res.json({ success: true, data: dashboard });
};

export const seedDashboard = async (req, res) => {
    const dashboard = await Dashboard.findOneAndUpdate({}, { $set: dashboardSeed }, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
    }).lean();

    return res.status(201).json({ success: true, message: 'Sample dashboard data saved.', data: dashboard });
};

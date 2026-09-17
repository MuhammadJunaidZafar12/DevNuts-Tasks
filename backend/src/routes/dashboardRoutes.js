import express from 'express';
import { getDashboard, seedDashboard } from '../controller/dashboardController.js';

const router = express.Router();

router.get('/', getDashboard);
router.post('/seed', seedDashboard);

export default router;

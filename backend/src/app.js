import express from 'express';
import cors from 'cors';
import dashboardRoutes from './routes/dashboardRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Analytics API is running.' });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/dashboard', dashboardRoutes);

export default app;
# Northstar Analytics Dashboard

A full-stack analytics dashboard inspired by a reference design for a student success and institutional performance view. The project is split into two main parts:

- Frontend: React + Vite application for the analytics dashboard UI
- Backend: Express + MongoDB API that serves dashboard data to the client

## Project Overview

This project recreates a modern admin dashboard that presents:

- KPI cards for applications, admission rate, top major, enrollment, and retention
- Application trends grouped by academic year and major
- Demographic breakdowns for ethnicity, gender, student type, and domicile
- Retention insights based on termination reasons
- Filterable analytics views for different years and majors

The app is structured to demonstrate a clean full-stack flow where the frontend requests data from the backend and renders it into charts, scorecards, and dashboard panels.

## Tech Stack

### Frontend
- React
- Vite
- Recharts
- CSS for dashboard styling

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- dotenv for environment variables

## Project Structure

```text
TASK DEVNUTS/
├── README.md
├── frontend/
│   ├── README.md
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       └── assets/
├── backend/
│   ├── README.md
│   ├── package.json
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   ├── controller/
│   │   ├── data/
│   │   ├── models/
│   │   └── routes/
│   └── .env
└── .gitignore
```

## Business Goal

The application is designed to give institutional stakeholders a quick and clear overview of student performance and enrollment trends. It presents operational and strategic metrics in a single dashboard, making it easier to monitor patterns and compare current performance against previous periods.

## Local Setup

### 1. Install backend dependencies

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/northstar
PORT=3000
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder if needed:

```env
VITE_API_URL=http://localhost:3000/api
```

## Run the App

### Start backend

```bash
cd backend
npm run dev
```

### Start frontend

```bash
cd frontend
npm run dev
```

Then open the local Vite URL in the browser to view the dashboard.

## API Overview

The backend exposes the following endpoints:

- `GET /api/health` → checks whether the server is running
- `GET /api/dashboard` → returns the full dashboard dataset
- `POST /api/dashboard/seed` → creates or refreshes the seeded dashboard document

## Data Flow

1. The frontend loads the dashboard by calling the backend API.
2. The backend reads the dashboard document from MongoDB.
3. The dashboard data is returned as structured KPI and chart values.
4. The React app transforms that data into metric cards, comparison tables, and charts.

## Notes

- The project is focused on dashboard layout and data presentation rather than authentication or user management.
- The backend is intentionally designed to return a single dashboard payload for a read-heavy analytics experience.
- The frontend is built to be responsive and easy to understand for operational reporting use cases.

## Future Improvements

Possible extensions for this project include:

- authentication and role-based access
- advanced filtering and drill-down views
- downloadable reports and CSV export
- real database integration for dynamic institutional records
- improved chart interactions and layout customization

## Summary

This repository demonstrates a practical full-stack implementation of a data-driven analytics dashboard. It combines modern frontend design with a lightweight backend service and MongoDB data model to create a complete product-style experience from a reference design.

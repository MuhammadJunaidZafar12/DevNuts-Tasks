# Northstar Analytics Frontend

This folder contains the React frontend for the student analytics dashboard. It is responsible for rendering the UI, fetching dashboard data from the backend, and displaying institutional metrics in a clean, presentation-ready format.

## Purpose

The frontend recreates the design and structure of a university or institutional analytics dashboard based on a provided reference image. It focuses on:

- KPI summary cards
- application trend charts
- demographic distribution visuals
- retention and performance insights
- clean, responsive layout for dashboard reporting

## Tech Stack

- React
- Vite
- Recharts for charts and graphs
- CSS for styling and layout

## Frontend Structure

```text
frontend/
├── src/
│   ├── App.jsx          # Main dashboard UI and data fetching logic
│   ├── App.css          # Dashboard styling and layout
│   ├── index.css        # Base styles and global resets
│   ├── main.jsx         # Application entry point
│   └── assets/          # Static assets
├── index.html
├── vite.config.js
├── package.json
├── eslint.config.js
├── public/
└── README.md
```

## Main Features

### Dashboard Overview
The main dashboard page displays:

- Applications
- Admission rate
- Top major
- Total enrollment
- Annual retention

### Interactive Filters
The UI includes filters for:

- year selection
- major selection
- comparison period

These filters control which dataset is displayed on the analytics charts.

### Visual Components
The dashboard relies on Recharts to present:

- bar chart for application trends by major
- donut charts for demographic distribution
- metric cards for key values
- legends and labels for improved readability

## Data Flow

The frontend uses the backend API to fetch the dashboard dataset:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

Once the data is loaded, the app stores it in local state and renders the dashboard sections dynamically.

## How the App Works

1. The app loads dashboard data from `GET /api/dashboard`.
2. It stores the response in React state.
3. It calculates visible chart data based on the selected year and major.
4. It renders KPI cards and chart sections with the fetched values.

## Setup

### Install dependencies

```bash
cd frontend
npm install
```

### Run in development mode

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Environment Variables

Create a `.env` file in the `frontend` folder if needed:

```env
VITE_API_URL=http://localhost:3000/api
```

This value should point to the backend API so the dashboard can fetch live data.

## Notes

- The app is designed to match the dashboard reference closely.
- It does not implement login or signup because the task specifically required a dashboard-only experience.
- The UI is focused on clarity, readability, and institutional reporting rather than complex user flows.

## Summary

The frontend is the presentation layer of the analytics system. It consumes the backend data model and turns it into a polished, interactive dashboard that is suitable for monitoring institutional performance and key student metrics.

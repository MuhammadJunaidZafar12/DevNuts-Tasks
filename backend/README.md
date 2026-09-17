# Northstar Analytics API

This folder contains the Express and MongoDB backend for the student analytics dashboard. It stores sample institutional data in MongoDB and exposes it to the React frontend through a small JSON API.

## What This Task Does

The task recreates the type of admin dashboard shown in the supplied reference image:

- KPI cards for applications, admission rate, top major, enrollment, and retention.
- Application trends grouped by academic year and major.
- Demographic distributions for ethnicity, gender, student type, and domicile.
- Termination reasons used as retention signals.
- A responsive frontend that reads all dashboard values from the backend.
- No login or signup flow, as requested.

## Backend Structure

```text
backend/
├── src/
│   ├── config/db.js                 # MongoDB connection
│   ├── controller/dashboardController.js
│   ├── data/dashboardSeed.js        # Human-readable sample records
│   ├── models/Dashboard.js           # Mongoose schema
│   ├── routes/dashboardRoutes.js    # API routes
│   ├── app.js                       # Express middleware and routes
│   └── server.js                    # Startup, connection, and seed
├── .env
└── package.json
```

## Installation

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/northstar
PORT=3000
```

The MongoDB Atlas user must have access to the database and your current IP must be allowed under Atlas **Network Access**. The connection string must use the actual cluster host from Atlas, not the placeholder above.

## Run the API

```bash
npm run dev
```

The project can also be started directly with:

```bash
node src/server.js
```

When the server starts, it connects to MongoDB and uses `findOneAndUpdate` with `upsert` to save the sample document if it does not already exist. This means the frontend can fetch data immediately after startup.

## API Endpoints

### `GET /api/health`

Checks whether Express is running.

Example response:

```json
{
  "success": true,
  "message": "Analytics API is running."
}
```

### `GET /api/dashboard`

Returns the dashboard document used by the React application.

Example response shape:

```json
{
  "success": true,
  "data": {
    "kpis": {
      "applications": { "current": 14055, "previous": 4637 },
      "admissionRate": { "current": 18.8, "previous": 15.2 }
    },
    "applicationTrends": [],
    "demographics": {},
    "terminationReasons": []
  }
}
```

### `POST /api/dashboard/seed`

Manually inserts or refreshes the sample dashboard document. It is useful after deleting the MongoDB document during development.

```bash
curl -X POST http://localhost:3000/api/dashboard/seed
```

## MongoDB Data Design

The `Dashboard` model intentionally keeps related dashboard data in one document. This is suitable for a read-heavy dashboard because the overview screen can load all charts in one request.

- `kpis`: current and previous values for the summary cards.
- `applicationTrends`: one row per year with a field for each major.
- `demographics`: percentage arrays used by donut charts.
- `terminationReasons`: labels and counts used by the retention list.
- `filters`: options returned by MongoDB so the frontend does not hardcode filter choices.

For example, `{ "label": "International", "value": 33 }` means 33% of the displayed student population is international.

## Error Handling

If `MONGODB_URI` is missing or Atlas cannot be reached, the backend logs the connection error and exits with code 1. This prevents the application from appearing healthy while the database is unavailable.

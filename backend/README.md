# Northstar Analytics API

This folder contains the backend for the analytics dashboard. It exposes a small Express API that serves structured dashboard data to the React frontend and stores the dataset in MongoDB using Mongoose.

## Purpose

The backend is responsible for:

- connecting to MongoDB
- storing the dashboard seed data
- serving the dashboard payload to the frontend
- exposing health and seeding routes for development and testing

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv

## Backend Structure

```text
backend/
├── src/
│   ├── app.js                       # Express app setup and API routing
│   ├── server.js                   # Server startup and database connection
│   ├── config/
│   │   └── db.js                   # MongoDB connection logic
│   ├── controller/
│   │   └── dashboardController.js   # Dashboard API handlers
│   ├── data/
│   │   └── dashboardSeed.js         # Seed dataset used for the dashboard
│   ├── models/
│   │   └── Dashboard.js             # Dashboard schema and model
│   └── routes/
│       └── dashboardRoutes.js       # Dashboard routes
├── package.json
├── README.md
└── .env
```

## Core Logic

### 1. Server startup
The `server.js` file starts the Express application and establishes the MongoDB connection. After the connection is successful, it seeds default data if the dashboard document does not already exist.

### 2. Data schema
The `Dashboard` model stores all dashboard information in a single document. This keeps the UI data access simple and efficient because the frontend can fetch a single payload instead of multiple requests.

The schema includes:

- `kpis` for summary metrics
- `applicationTrends` for data across years and majors
- `demographics` for donut chart values
- `terminationReasons` for retention analysis
- `filters` for supported UI filter options

### 3. API controller logic
The controller handles:

- `getDashboard` → fetches the dashboard document from MongoDB
- `seedDashboard` → creates or updates the default sample document using `findOneAndUpdate` with `upsert`

### 4. Route handling
The router exposes the dashboard endpoints used by the frontend.

## API Endpoints

### `GET /api/health`

Checks if the API server is running.

Example response:

```json
{
  "success": true,
  "message": "Analytics API is running."
}
```

### `GET /api/dashboard`

Returns the complete dashboard object used by the frontend.

Example response:

```json
{
  "success": true,
  "data": {
    "kpis": {
      "applications": { "current": 14055, "previous": 4637 }
    },
    "applicationTrends": [],
    "demographics": {},
    "terminationReasons": []
  }
}
```

### `POST /api/dashboard/seed`

Creates or refreshes the dashboard document in the database with seed values.

```bash
curl -X POST http://localhost:3000/api/dashboard/seed
```

## Environment Setup

Create a `.env` file inside the backend folder:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/northstar
PORT=3000
```

Important notes:

- MongoDB Atlas must allow your current IP address.
- The connection string must use the real cluster host.
- `PORT` should match the port used by the frontend API URL.

## Run the Backend

### Install packages

```bash
cd backend
npm install
```

### Start server in development mode

```bash
npm run dev
```

### Or start directly

```bash
node src/server.js
```

## Why the Backend Is Structured This Way

The application is optimized for a dashboard workflow where one page needs several metrics and chart datasets at once. Instead of making many individual API calls, the server stores related information in one dashboard document, reducing frontend complexity and improving performance for read-heavy analytics views.

## Error Handling

The backend checks for:

- missing MongoDB connection string
- failed database connection
- unavailable dashboard document

If the database connection fails, the server logs the error and exits rather than silently appearing online.

## Summary

The backend provides the data layer behind the analytics dashboard. It is intentionally simple but effective: a single API service, a structured MongoDB document, and a seeded data model that supports the dashboard UI efficiently.

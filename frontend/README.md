# Northstar Student Analytics Dashboard

This React application recreates the supplied education analytics dashboard. It is a responsive, read-only admin experience for understanding applications, enrollment, demographics, and retention signals.
## What Was Implemented

- Navigation for overview, applications, enrollment, student profile, and retention.
- Live-data status and an export-to-print button.
- Filters for comparison period, academic year, and major.
- KPI cards for applications, admission rate, top major, total enrollment, and annual retention.
- Grouped bar chart for applications by major and year.
- Donut charts for ethnicity, gender, student type, and domicile.
- Termination reasons with proportional bars.
- Loading and API error states.
- Responsive desktop, tablet, and mobile layouts.
- No authentication screens, as requested.
## Installation and Run

```bash
cd frontend
npm install
npm run dev
```
Vite normally opens the app at `http://localhost:5173`. The frontend reads data from `http://localhost:3000/api/dashboard`.

For another backend URL, create `frontend/.env`:

```env
Restart Vite after changing environment variables.

## How It Works

When `App` mounts, `useEffect` calls `GET /api/dashboard` and stores the MongoDB response in React state. Selecting `2026` narrows the trend chart to that year; selecting `Business` narrows it to the Business series. Filter options come from the backend `filters` object.

Recharts `BarChart` uses `applicationTrends`, where each major is a series and `year` is the horizontal axis. `PieChart` converts values such as `{ "label": "Domestic", "value": 67 }` into a 67% / 33% donut.
The desktop view uses a sidebar and multi-column grid. On small screens the sidebar becomes horizontal navigation, cards become two columns, and chart panels stack vertically.

The production build is created in `dist/`. Set `VITE_API_URL` to the deployed Express API before building for production.

## Technology

React 19, Vite, Recharts, Express, Mongoose, and MongoDB Atlas.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

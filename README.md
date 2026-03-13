# HRMS Lite

A lightweight Human Resource Management System built with React, Node.js, and MongoDB Atlas. Allows an admin to manage employee records and track daily attendance — with a dashboard summary, status badges, and date filtering.

---

## Project Overview

HRMS Lite is a full-stack web application designed for small teams to manage their workforce efficiently. An admin can add and remove employees, mark daily attendance (Present / Absent), and view a real-time dashboard with today's attendance rate, a leaderboard of top attendees, and recent activity.

The project was built as an 8-hour execution plan broken into focused modules — backend APIs, frontend components, and deployment — prioritising clean code, proper HTTP semantics, and production-ready UI polish over feature bloat.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Routing | react-router-dom v6 |
| HTTP Client | Axios |
| Notifications | react-hot-toast |
| Icons | lucide-react |
| Backend | Node.js, Express |
| Validation | express-validator |
| Database | MongoDB Atlas (Mongoose ODM) |
| Fonts | DM Sans, JetBrains Mono (Google Fonts) |
| Deployment | Vercel (frontend), Render (backend) |

---

## Folder Structure

```
hrms-lite/
├── backend/
│   ├── src/
│   │   ├── models/          # Mongoose schemas — Employee, Attendance
│   │   ├── controllers/     # Business logic — employee, attendance, dashboard
│   │   ├── routes/          # Express routers — /api/employees, /api/attendance, /api/dashboard
│   │   ├── middleware/      # Validation rules, global error handler
│   │   ├── index.js         # App entry — MongoDB connect, CORS, route mounting
│   │   └── seed.js          # Demo data script
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable UI — Sidebar, StatCard, EmployeeList, Modals, Tables
    │   ├── pages/           # Route pages — Dashboard, Employees, Attendance
    │   ├── lib/
    │   │   └── api.js       # Axios instance with base URL + error interceptor
    │   ├── App.jsx          # Layout shell + BrowserRouter + Routes
    │   ├── main.jsx         # React DOM entry
    │   └── index.css        # Tailwind directives + shared component classes
    ├── .env.example
    └── package.json
```

---

## Running the Project Locally

### Prerequisites

- Node.js v18 or higher
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account

---

### Step 1 — MongoDB Atlas Setup

1. Create a free cluster on MongoDB Atlas (M0 tier)
2. Under **Database Access** → add a user with a username and password
3. Under **Network Access** → add `0.0.0.0/0` to allow all IPs
4. Click **Connect → Drivers** and copy your connection string:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/hrms_lite?retryWrites=true&w=majority
```

---

### Step 2 — Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Open `.env` and fill in your values:

```env
MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/hrms_lite?retryWrites=true&w=majority
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

```bash
# Optional — seed demo data (5 employees + 7 days attendance)
npm run seed

# Start the backend server
npm run dev
```

You should see:
```
✅ Connected to MongoDB Atlas
🚀 HRMS Lite backend running on http://localhost:3001
```

Verify at: `http://localhost:3001/health`

---

### Step 3 — Frontend Setup

Open a second terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Open `.env`:

```env
VITE_API_URL=http://localhost:3001
```

```bash
# Start the frontend dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

### API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Server + DB health check |
| `POST` | `/api/employees` | Add new employee |
| `GET` | `/api/employees` | Fetch all employees |
| `DELETE` | `/api/employees/:id` | Delete employee + cascade attendance |
| `POST` | `/api/attendance` | Mark attendance |
| `GET` | `/api/attendance` | Get all attendance (supports `?date=YYYY-MM-DD`) |
| `GET` | `/api/attendance/:employeeId` | Get attendance for one employee |
| `GET` | `/api/dashboard` | Summary stats + leaderboard |

---

## Assumptions & Limitations

**Authentication** — There is no login system. The app assumes a single trusted admin user. Adding JWT-based auth would be the natural next step for a production deployment.

**Attendance is one record per employee per day** — The system enforces a unique index on `(employee, date)`. You cannot mark the same employee twice on the same date. To correct a mistake, the record would need to be deleted directly from the database (no edit UI is provided).

**Date stored as a string** — Attendance dates are stored as `YYYY-MM-DD` strings rather than full UTC timestamps. This avoids timezone shift issues when filtering by date across regions, but means date arithmetic requires string parsing.

**Cascade delete is manual** — MongoDB does not support foreign key constraints natively. When an employee is deleted, the backend explicitly calls `Attendance.deleteMany({ employee: id })` before removing the employee. If the server crashes between these two operations, orphaned attendance records could remain.

**No pagination** — The employee list and attendance table fetch all records at once. For teams with hundreds of employees this would need server-side pagination added to the GET endpoints.

**Seed script clears existing data** — Running `npm run seed` will wipe your current employees and attendance before inserting demo data. Do not run it on a database with real records.

**CORS is locked to one origin** — The backend only accepts requests from the URL set in `CORS_ORIGIN`. If you run the frontend on a different port or deploy to a different domain, update this value and restart the backend.

---

## License

MIT

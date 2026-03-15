require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const employeeRoutes = require("./routes/employees");
const attendanceRoutes = require("./routes/attendance");
const dashboardRoutes = require("./routes/dashboard");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "http://localhost:5173",
  "https://hrms-lte.vercel.app/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (origin.includes("localhost")) return callback(null, true);

      if (origin.includes("vercel.app")) return callback(null, true);

      return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/dashboard", dashboardRoutes);

// One-time seed endpoint
app.post("/api/seed", async (req, res) => {
  const Employee = require("./models/Employee");
  const Attendance = require("./models/Attendance");

  const employees = [
    { employee_id: "EMP001", full_name: "Aisha Sharma", email: "aisha.sharma@hrms.com", department: "Engineering" },
    { employee_id: "EMP002", full_name: "Rohan Mehta", email: "rohan.mehta@hrms.com", department: "Engineering" },
    { employee_id: "EMP003", full_name: "Priya Kapoor", email: "priya.kapoor@hrms.com", department: "Design" },
    { employee_id: "EMP004", full_name: "Dev Patel", email: "dev.patel@hrms.com", department: "Product" },
    { employee_id: "EMP005", full_name: "Neha Gupta", email: "neha.gupta@hrms.com", department: "HR" },
  ];

  try {
    await Attendance.deleteMany({});
    await Employee.deleteMany({});
    const created = await Employee.insertMany(employees);

    const today = new Date();
    const attendanceRecords = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      for (const emp of created) {
        attendanceRecords.push({
          employee: emp._id,
          employee_id: emp.employee_id,
          date: dateStr,
          status: Math.random() < 0.8 ? "PRESENT" : "ABSENT",
        });
      }
    }
    await Attendance.insertMany(attendanceRecords);

    res.json({ success: true, employees: created.length, attendance: attendanceRecords.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
  });
});

app.use(errorHandler);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 HRMS Lite backend running on port ${PORT}`);
  });
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});

// Keep-alive: ping self every 14 minutes to prevent Render free tier sleep
const SELF_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
setInterval(() => {
  const http = SELF_URL.startsWith("https") ? require("https") : require("http");
  http.get(`${SELF_URL}/health`, () => {}).on("error", () => {});
}, 14 * 60 * 1000);

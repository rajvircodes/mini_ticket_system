const express = require("express");

const ticketRoutes = require("./routes/ticket.routes");

const app = express();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Ticket API is working",
  });
});

// Database test
const pool = require("./config/db");

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Database connected successfully!",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// Ticket routes
app.use("/api/tickets", ticketRoutes);

module.exports = app;

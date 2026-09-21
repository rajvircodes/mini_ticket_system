require("dotenv").config();
const express = require("express");
const pool = require("./config/db");
const app = express();
const ticketRoutes = require("./routes/ticket.routes");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/tickets", ticketRoutes);

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

const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
      console.log("Database is connected");
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();

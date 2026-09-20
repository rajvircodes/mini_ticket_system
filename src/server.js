require("dotenv").config();
const express = require("express");
const pool = require("./config/db");
const app = express();
const ticketRoutes = require("./routes/ticket.routes");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/tickets", ticketRoutes);

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

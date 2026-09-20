const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.json({
    message: "Ticket API is working",
  });
});

// Create ticket
router.post("/", async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const result = await pool.query(
      `INSERT INTO tickets (title, description, priority)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, description, priority || "medium"],
    );

    res.status(201).json({
      message: "Ticket created successfully",
      ticket: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error creating ticket:", error.message);

    res.status(500).json({
      message: "Failed to create ticket",
    });
  }
});

module.exports = router;

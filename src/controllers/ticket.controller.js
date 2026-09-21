const pool = require("../config/db");

// GET /api/tickets
const getTickets = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tickets");

    res.json(result.rows);
  } catch (error) {
    console.error("Failed to fetch tickets:", error.message);

    res.status(500).json({
      message: "Failed to fetch tickets",
    });
  }
};

// POST /api/tickets
const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    const result = await pool.query(
      "INSERT INTO tickets (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating ticket:", error.message);

    res.status(500).json({
      message: "Failed to create ticket",
    });
  }
};

module.exports = {
  getTickets,
  createTicket,
};
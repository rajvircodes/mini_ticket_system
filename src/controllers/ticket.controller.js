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
      [title, description],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating ticket:", error.message);

    res.status(500).json({
      message: "Failed to create ticket",
    });
  }
};

// GET /api/tickets:id

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM tickets WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Tickets not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Failed to fetch ticket:", error.message);

    res.status(500).json({
      message: "Failed to fetch ticket",
    });
  }
};

module.exports = {
  getTickets,
  createTicket,
  getById,
};

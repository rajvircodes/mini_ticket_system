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

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (title.length > 150) {
      return res.status(400).json({
        message: "Title cannot exceed 150 characters",
      });
    }

    const result = await pool.query(
      `INSERT INTO tickets (title, description)
       VALUES ($1, $2)
       RETURNING *`,
      [title.trim(), description || null],
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

// PUT /api/tickets/:id

// PUT /api/tickets/:id
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (title.length > 150) {
      return res.status(400).json({
        message: "Title cannot exceed 150 characters",
      });
    }

    const allowedStatuses = ["open", "closed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Status must be either open or closed",
      });
    }

    const result = await pool.query(
      `UPDATE tickets
       SET title = $1,
           description = $2,
           status = $3
       WHERE id = $4
       RETURNING *`,
      [title.trim(), description || null, status, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Failed to update ticket:", error.message);

    res.status(500).json({
      message: "Failed to update ticket",
    });
  }
};

// DELETE /api/tickets/:id

// DELETE /api/tickets/:id
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM tickets WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      message: "Ticket deleted successfully",
      ticket: result.rows[0],
    });
  } catch (error) {
    console.error("Failed to delete ticket:", error.message);

    res.status(500).json({
      message: "Failed to delete ticket",
    });
  }
};
module.exports = {
  getTickets,
  createTicket,
  getById,
  updateTicket,
  deleteTicket,
};

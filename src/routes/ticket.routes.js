const express = require("express");

const {
  getTickets,
  createTicket,
  getById,
} = require("../controllers/ticket.controller");

const router = express.Router();

// GET /api/tickets
router.get("/", getTickets);

// POST /api/tickets
router.post("/", createTicket);
// GET /api/tickets/:id
router.get("/:id", getById);

module.exports = router;

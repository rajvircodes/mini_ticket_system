const express = require("express");

const {
  getTickets,
  createTicket,
} = require("../controllers/ticket.controller");

const router = express.Router();

// GET /api/tickets
router.get("/", getTickets);

// POST /api/tickets
router.post("/", createTicket);

module.exports = router;

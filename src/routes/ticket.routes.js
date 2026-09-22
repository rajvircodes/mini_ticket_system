const express = require("express");

const {
  getTickets,
  createTicket,
  getById,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticket.controller");

const router = express.Router();

// GET /api/tickets
router.get("/", getTickets);

// POST /api/tickets
router.post("/", createTicket);
// GET /api/tickets/:id
router.get("/:id", getById);

router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Ticket API is working",
  });
});

module.exports = router;

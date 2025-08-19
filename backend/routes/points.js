const express = require("express");
const router = express.Router();
const {
  claimPoints,
  getPointHistory,
} = require("../controllers/pointController");

// Claim points for a user
router.post("/claim/:userId", claimPoints);

// Get point history for a user
router.get("/history/:userId", getPointHistory);

module.exports = router;

const express = require("express");
const router = express.Router();

const { createEmergency, getEmergency } = require("../controllers/emergency");

router.post("/", createEmergency);
router.get("/", getEmergency);

module.exports = router;

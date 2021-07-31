const express = require("express");
const router = express.Router();

const { createService, getService } = require("../controllers/service");

router.post("/", createService);
router.get("/", getService);

module.exports = router;

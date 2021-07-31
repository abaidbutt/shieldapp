const express = require("express");
const router = express.Router();

const { createEntity, getEntity } = require("../controllers/entity");

router.post("/", createEntity);
router.get("/", getEntity);

module.exports = router;

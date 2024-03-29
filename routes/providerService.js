const express = require("express");
const router = express.Router();

const {
  createProviderService,
  getProviderService,
} = require("../controllers/providerService");

router.post("/", createProviderService);
router.get("/", getProviderService);
module.exports = router;

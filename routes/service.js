const express = require("express");
const router = express.Router();
let authy = require("authy")("N8x9Z0bZ7eOgdiwVBJb2UYtpeSViDNth");
const { createService, getService } = require("../controllers/service");

router.post("/", createService);
router.get("/", getService);

// router.post("/", async (req, res) => {
//   try {
//     const { name, number } = req.body;
//     console.log(name, number);
//     await authy.register_user(name, number, function (err, response) {
//       console.log(response, err);
//     });
//     res.json({
//       status: true,
//       message: "hello from the last end",
//     });
//   } catch (err) {
//     res.json({ status: false, message: "servver not running" });
//   }
// });

module.exports = router;

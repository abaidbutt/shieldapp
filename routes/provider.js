const express = require("express");
const router = express.Router();
const {
  signupController,
  signinController,
  imageController,
  profileController,
  getProfile,
} = require("../controllers/provider");
const { memoryUpload } = require("../middleware/memoryUpload");

const cpUpload = memoryUpload.fields([
  { name: "vaccine_img1", maxCount: 1 },
  { name: "vaccine_img2", maxCount: 1 },
  { name: "a_adharImage", maxCount: 1 },
  { name: "camImage", maxCount: 1 },
]);
router.post("/signup", signupController);
router.post("/signin", signinController);
router.post("/image/:userId", cpUpload, imageController);
router.post("/profileController/:userId", profileController);
router.get("/getProfile/:userId", getProfile);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  signupController,
  imageController,
  signinController,
  historyController,
  providerSearch,
  profileController,
  getProfile,
  attendanceRecord,
} = require("../controllers/employee");
const { memoryUpload } = require("../middleware/memoryUpload");

const cpUpload = memoryUpload.fields([
  { name: "rent_agreement_img", maxCount: 1 },
  { name: "vaccine_img1", maxCount: 1 },
  { name: "vaccine_img2", maxCount: 1 },
  { name: "a_adharImage", maxCount: 1 },
  { name: "camImage", maxCount: 1 },
]);
router.post("/image/:userId", cpUpload, imageController);

router.post("/signup", signupController);
router.post("/signin", signinController);
router.post("/history/:userId", historyController);
router.get("/providerSearch", providerSearch);
router.post("/profileController/:userId", profileController);
router.get("/getProfile/:userId", getProfile);
router.get("/attendanceRecord/:userId", attendanceRecord);

module.exports = router;

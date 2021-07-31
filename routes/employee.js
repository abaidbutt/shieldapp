const express = require("express");
const router = express.Router();
const parser = require("../middleware/multer");
const uploadImage = require("../middleware/multer");
const { multerUploads } = require("../middleware/storage");
const cpUpload = uploadImage.fields([
  { name: "rent_agreement_img", maxCount: 1 },
  { name: "vaccine_img1", maxCount: 1 },
  { name: "vaccine_img2", maxCount: 1 },
  { name: "a_adharImage", maxCount: 1 },
]);

const {
  signupController,
  imageController,
} = require("../controllers/employee");

router.post("/signup", signupController);
router.post("/image", cpUpload, imageController);

module.exports = router;

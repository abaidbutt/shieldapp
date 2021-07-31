const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
  cloud_name: "abaidbutt",
  api_key: "311236173867714",
  api_secret: "WV5dKB4_5_Dv_jIoX9zLsMzwILM",
});
const stoarge = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "employee",
    format: async (req, file) => file?.originalname?.split(".")[1],
    public_id: (req, file) => file.filename,
  },
});
const parser = multer({ stoarge });
module.exports = parser;

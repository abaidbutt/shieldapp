const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

var uploadImage = multer({ storage, limits: { fieldSize: 2 * 1024 * 1024 } });

module.exports = uploadImage;

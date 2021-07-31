const express = require("express");
const router = express.Router();
const {
  signupValidator,
  signinValidator,
  validatorResult,
} = require("../middleware/validator");
const {
  signupController,
  signinController,
  fetchUsers,
  readUser,
  addUser,
  editUser,
  deleteUser,
} = require("../controllers/auth");
const upload = require('../middleware/multer')
const productController = require('../controllers/Product')
const { authenticateJWT } = require("../middleware/authenticator");

router.post("/signup", signupValidator, validatorResult, signupController);

router.post("/signin", signinValidator, validatorResult, signinController);

router.get("/alluser", authenticateJWT, fetchUsers);

router.get("/", authenticateJWT, readUser);

router.post("/addUser", authenticateJWT, addUser);

router.post("/addUser", authenticateJWT, addUser);

router.post("/editUser/:id", authenticateJWT, editUser);

router.delete("/deleteUser/:id", authenticateJWT, deleteUser);

router.post("/", upload.single("productImage"), productController.create);
router.put(
  "/:productId",
  upload.single("productImage"),
  productController.update
);

module.exports = router;

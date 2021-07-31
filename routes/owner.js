const express = require("express");
const router = express.Router();
const { signupController } = require("../controllers/owner");

router.post("/signup", signupController);

// const {
//   signupValidator,
//   signinValidator,
//   validatorResult,
// } = require("../middleware/validator");
// const {
//   signupController,
//   signinController,
//   fetchUsers,
//   readUser,
//   addUser,
//   editUser,
//   deleteUser,
// } = require("../controllers/auth");
// const { authenticateJWT } = require("../middleware/authenticator");
// router.post("/signup", signupValidator, validatorResult, signupController);

// router.post("/signin", signinValidator, validatorResult, signinController);

// router.get("/alluser", authenticateJWT, fetchUsers);

// router.get("/", authenticateJWT, readUser);

// router.post("/addUser", authenticateJWT, addUser);

// router.post("/addUser", authenticateJWT, addUser);

// router.post("/editUser/:id", authenticateJWT, editUser);

// router.delete("/deleteUser/:id", authenticateJWT, deleteUser);

module.exports = router;

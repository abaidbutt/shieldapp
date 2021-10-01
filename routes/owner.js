const express = require("express");
const router = express.Router();
const {
  signupController,
  signinController,
  employeeSearch,
  employeeAttendance,
  attendanceSearch,
  profileController,
  employeeRelease,
} = require("../controllers/owner");

router.post("/signup", signupController);
router.post("/signin", signinController);
router.get("/employeeSearch", employeeSearch);
router.post("/profileController/:userId", profileController);
router.post("/employeeAttendance", employeeAttendance);
router.get("/attendanceSearch", attendanceSearch);
router.post("/employeeRelease/:userId", employeeRelease);

module.exports = router;

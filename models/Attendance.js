const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    inTime: {
      type: String,
      required: true,
    },
    outTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;

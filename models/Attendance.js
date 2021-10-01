const { Schema, model } = require("mongoose");

const attendanceSchema = new Schema(
  {
    name: {
      type: Schema.ObjectId,
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
    day: {
      type: String,
    },
  },
  { timestamps: true }
);

const Attendance = model("Attendance", attendanceSchema);

module.exports = Attendance;

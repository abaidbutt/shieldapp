const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    serviceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    entityType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entity",
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      require: true,
    },
    mobileNumberalt: {
      type: Number,
      require: false,
    },
    password: {
      type: String,
      require: true,
    },

    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    temp_address: {
      type: String,
      required: false,
    },
    temp_country: {
      type: String,
      required: false,
    },
    temp_state: {
      type: String,
      required: false,
    },
    temp_city: {
      type: String,
      required: false,
    },
    a_adharNumber: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },
    rent_agreement_img: {
      type: String,
      required: false,
    },
    vaccine_img1: {
      type: String,
      required: false,
    },
    vaccine_img2: {
      type: String,
      required: false,
    },
    a_adharImage: {
      type: String,
      required: false,
    },
    camImage: {
      type: String,
      required: false,
    },
    qrCode: {
      type: String,
      required: false,
    },
    prev_organization: {
      type: String,
    },
    prev_join: {
      type: String,
    },
    prev_end: {
      type: String,
    },
    prev_reason: {
      type: String,
    },
    prev_remark: {
      type: String,
    },
    prev_rating: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

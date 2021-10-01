const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
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
    pinCode: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    qrCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;

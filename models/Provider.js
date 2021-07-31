const mongoose = require("mongoose");

const ProviderSchema = mongoose.Schema(
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
      ref: "ProviderService",
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
      // required: false,
    },
    temp_country: {
      type: String,
      // required: false,
    },
    temp_state: {
      type: String,
      // required: false,
    },
    temp_city: {
      type: String,
      // required: false,
    },
    a_adharNumber: {
      type: Number,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

const Provider = mongoose.model("Provider", ProviderSchema);

module.exports = Provider;

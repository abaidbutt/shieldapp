const { model, Schema } = require("mongoose");

const employeeSchema = Schema(
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
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    entityType: {
      type: Schema.Types.ObjectId,
      ref: "Entity",
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
    },
    mobileNumber: {
      type: String,
      require: true,
    },
    mobileNumberalt: {
      type: String,
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
    },
    temp_country: {
      type: String,
    },
    temp_state: {
      type: String,
    },
    temp_city: {
      type: String,
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
    status: {
      type: String,
    },
    previous: [
      {
        organization: {
          type: String,
        },
        serviceType: {
          type: Schema.ObjectId,
          ref: "Service",
        },
        joinDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
        reason: {
          type: String,
        },
        remark: {
          type: String,
        },
        rating: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Employee = model("Employee", employeeSchema);

module.exports = Employee;

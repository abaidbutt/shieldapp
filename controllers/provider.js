const Provider = require("../models/Provider");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
exports.signupController = async (req, res) => {
  const { body } = req;
  try {
    console.log(body);
    const user = await Provider.findOne({ mobileNumber: body.mobileNumber });
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "Mobile Number is already exist" });
    }
    const newUser = new Provider(body);

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    res.json({
      status: true,
      message: "Register Successfully.. Now go to SignIn",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Server Error while creating new user",
    });
  }
};

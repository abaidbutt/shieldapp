const Owner = require("../models/Owner");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
exports.signupController = async (req, res) => {
  //   const {
  //     firstName,
  //     lastName,
  //     email,
  //     mobileNumber,
  //     password,
  //     country,
  //     state,
  //     city,
  //     pinCode,
  //     address,
  //     gender,
  //   } = req.body;
  const { body } = req;
  try {
    console.log(body);
    const user = await Owner.findOne({ mobileNumber: body.mobileNumber });
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "Mobile Number is already exist" });
    }
    const newUser = new Owner(body);
    console.log(newUser.password);

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    res.json({
      status: true,
      message: "Register Successfully.. Now go to SignIn",
    });
  } catch (error) {
    console.log(error, 'this owner error confirm not');
    res.status(500).json({
      status: false,
      message: "Server Error while creating new user",
    });
  }
};
// VA61ea528de1faaec94d6317e55fe1191a

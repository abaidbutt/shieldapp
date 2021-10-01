const Provider = require("../models/Provider");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const streamifier = require("streamifier");
const { config, uploader } = require("cloudinary").v2;
config({
  cloud_name: "abaidbutt",
  api_key: "311236173867714",
  api_secret: "WV5dKB4_5_Dv_jIoX9zLsMzwILM",
});
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
exports.signinController = async (req, res) => {
  const { mobileNumber, password } = req.body;
  try {
    const user = await Provider.findOne({ mobileNumber });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid  Mobile Number",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid  Password",
      });
    }
    const payload = {
      user: {
        _id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: process.env.JWTEXPIRE },
      (err, token) => {
        if (err) console.log("Jwt error", err);
        const { _id, mobileNumber, firstName, lastName } = user;

        res.json({
          token,
          user: { _id, mobileNumber, firstName, lastName, role: "provider" },
        });
      }
    );
  } catch (error) {
    console.log("Server Error while checking this user", error);
    res.status(500).json({
      status: false,
      message: "Server Error while checking this user",
    });
  }
};
exports.imageController = async (req, res) => {
  try {
    const { userId } = req.params;
    let { vaccine_img1, vaccine_img2, a_adharImage, camImage } = req.files;
    vaccine_img1 = vaccine_img1[0];
    vaccine_img2 = vaccine_img2[0];
    a_adharImage = a_adharImage[0];
    camImage = camImage[0];
    const vac_img1 = await streamUpload(vaccine_img1);
    const vac_img2 = await streamUpload(vaccine_img2);
    const adhr_img = await streamUpload(a_adharImage);
    const cam_img = await streamUpload(camImage);

    const check = await Provider.findByIdAndUpdate(
      userId,
      {
        vaccine_img1: vac_img1?.url,
        vaccine_img2: vac_img2?.url,
        a_adharImage: adhr_img?.url,
        camImage: cam_img?.url,
      },
      {
        new: true,
      }
    );
    if (!check) {
      res.json({ status: false, message: "Not upload image appropiate" });
    }

    res.json({
      status: true,
      message: `user save the image, `,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Server Error while creating new user",
    });
  }
};
let streamUpload = async (path) => {
  console.log(path);
  return new Promise(async (resolve, reject) => {
    let stream = await uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(path.buffer).pipe(stream);
  });
};
exports.profileController = async (req, res) => {
  const { body } = req;
  const { userId } = req.params;
  console.log(userId, body);
  try {
    const user = await Provider.findByIdAndUpdate(userId, body);
    console.log(user);
    res.json({
      status: true,
      message: "profile Update successfully",
    });
  } catch (error) {
    console.log(error, "this owner error confirm not");
    res.status(500).json({
      status: false,
      message: "Server Error while creating new user",
    });
  }
};
exports.getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Provider.findOne({ _id: userId });
    console.log(user);
    res.json({
      status: true,
      message: "profile Update successfully",
      result: user,
    });
  } catch (error) {
    console.log(error, "this owner error confirm not");
    res.status(500).json({
      status: false,
      message: "Server Error while creating new user",
    });
  }
};

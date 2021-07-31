const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { config, uploader } = require("cloudinary").v2;
const { streamUpload } = require("../middleware/storage");
const streamifier = require("streamifier");
config({
  cloud_name: "abaidbutt",
  api_key: "311236173867714",
  api_secret: "WV5dKB4_5_Dv_jIoX9zLsMzwILM",
});

dotenv.config();
exports.signupController = async (req, res) => {
  const { body } = req;
  try {
    const user = await Employee.findOne({ mobileNumber: body.mobileNumber });
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "Mobile Number is already exist" });
    }
    const newUser = new Employee(body);

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    res.json({
      status: true,
      message: "Register Successfully.. Now go to SignIn",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server Error while creating new user",
    });
  }
};
exports.imageController = async (req, res) => {
  try {
    console.log(req.files, "files");
    let { rent_agreement_img, vaccine_img1, vaccine_img2, a_adharImage } =
      req.files;
    const { userId } = req.body;

    rent_agreement_img = rent_agreement_img[0]?.path;
    vaccine_img1 = vaccine_img1[0]?.path;
    vaccine_img2 = vaccine_img2[0]?.path;
    a_adharImage = a_adharImage[0]?.path;
    const images = {};
    uploader.upload(rent_agreement_img, function (error, result) {
      console.log(result.url);
      images.rent_agreement_img = result.url;
    });

    uploader.upload(vaccine_img1, function (error, result) {
      // console.log(result, error, "check from vaccine1");
      images.vaccine_img1 = result.url;
    });

    uploader.upload(vaccine_img2, function (error, result) {
      // console.log(result, error, "check from vaccine1");
      images.vaccine_img2 = result.url;
    });

    uploader.upload(a_adharImage, function (error, result) {
      // console.log(result, error, "check from vaccine1");
      images.a_adharImage = result.url;
    });

    console.log(images);
    // const check = await Employee.findOneAndUpdate(
    //   { _id: userId },
    //   { rent_agreement_img, vaccine_img1, vaccine_img2, a_adharImage },
    //   {
    //     returnOriginal: false,
    //   }
    // );
    const check = true;

    console.log(check, "this is user");
    // if (user) {
    //   return res.status(400).json({ status: false, message: "No User Exist " });
    // }
    // const newUser = new Employee(body);

    // const salt = await bcrypt.genSalt(10);
    // newUser.password = await bcrypt.hash(newUser.password, salt);

    // await newUser.save();

    res.json({
      status: true,
      message: `user save the image, ${check}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Server Error while creating new user",
    });
  }
};

const Emergency = require("../models/Emergency");

const dotenv = require("dotenv");
dotenv.config();
exports.createEmergency = async (req, res) => {
  const { body } = req;
  try {
    const newEnt = new Emergency(body);
    await newEnt.save();

    res.json({
      status: true,
      message: "Create Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server Error while creating new Emergency",
    });
  }
};
exports.getEmergency = async (req, res) => {
  try {
    let data = await Emergency.find({});
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

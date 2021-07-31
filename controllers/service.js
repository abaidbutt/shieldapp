const Service = require("../models/Service");

const dotenv = require("dotenv");
dotenv.config();
exports.createService = async (req, res) => {
  const { body } = req;
  try {
    console.log(body);
    const ent = await Service.findOne({ name: body.name });
    if (ent) {
      return res
        .status(400)
        .json({ status: false, message: "Service name is already exist" });
    }
    const newEnt = new Service(body);
    await newEnt.save();

    res.json({
      status: true,
      message: "Create Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server Error while creating new Service",
    });
  }
};
exports.getService = async (req, res) => {
  try {
    let data = await Service.find({});
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

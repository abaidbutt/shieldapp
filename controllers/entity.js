const Entity = require("../models/Entity");

const dotenv = require("dotenv");
dotenv.config();
exports.createEntity = async (req, res) => {
  const { body } = req;
  try {
    console.log(body);
    const ent = await Entity.findOne({ name: body.name });
    if (ent) {
      return res
        .status(400)
        .json({ status: false, message: "Entity name is already exist" });
    }
    const newEnt = new Entity(body);
    await newEnt.save();

    res.json({
      status: true,
      message: "Create Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server Error while creating new entity",
    });
  }
};
exports.getEntity = async (req, res) => {
  try {
    let data = await Entity.find({});
    res.json({ status: true, data: data });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

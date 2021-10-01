const Owner = require("../models/Owner");
const Employee = require("../models/Employee");
const Entity = require("../models/Entity");
const Attendance = require("../models/Attendance");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
exports.signupController = async (req, res) => {
  const { body } = req;
  try {
    console.log(body, "body");
    const user = await Owner.findOne({ mobileNumber: body.mobileNumber });
    console.log(user);
    if (user) {
      res.status(400).json({
        status: false,
        message: "Mobile Number is already exist",
      });
    }
    const newUser = new Owner(body);

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    console.log(newUser, "new user with codebase");
    res.json({
      status: true,
      message: "Register Successfully.. Now go to SignIn",
    });
  } catch (error) {
    console.log(error, "this owner error confirm not");
    res.status(500).json({
      status: false,
      message: "Server Error while creating new user",
    });
  }
};
exports.signinController = async (req, res) => {
  const { mobileNumber, password } = req.body;
  try {
    const user = await Owner.findOne({ mobileNumber });
    console.log(user, "user");
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
          user: { _id, mobileNumber, firstName, lastName, role: "owner" },
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

exports.employeeSearch = async (req, res) => {
  try {
    const { name, workCategory, status } = req.query;

    let searchQuery = {};
    let populateQuery = {
      path: "serviceType",
    };
    if (workCategory) {
      populateQuery.match = { name: { $regex: workCategory, $options: "i" } };
    }
    if (name) {
      searchQuery.$or = [
        { firstName: { $regex: name, $options: "i" } },
        { lastName: { $regex: name, $options: "i" } },
      ];
    }
    if (status) {
      searchQuery.status = status;
    }
    await Employee.find(searchQuery)
      .populate(populateQuery)
      .exec(function (err, results) {
        console.log(results, err);
        if (err) {
          res.json({ status: false, message: "No Data found" });
        } else {
          res.json({ status: true, result: results });
        }
      });
  } catch (error) {
    console.log("Error when fetching product", error);
    res.status(500).json({
      message: "Please try later",
    });
  }
};
exports.employeeRelease = async (req, res) => {
  try {
    const { userId } = req.params;
    await Employee.findByIdAndUpdate(userId, {
      status: "release",
    }).exec((err, doc) => {
      console.log(err, doc);
      if (err) {
        res.json({ status: false, message: "This user cannot be release" });
      } else {
        res.json({
          status: true,
          result: doc,
          message: "employee release",
        });
      }
    });
  } catch (error) {
    console.log("Error when fetching product", error);
    res.status(500).json({
      message: "Please try later",
    });
  }
};
exports.employeeAttendance = async (req, res) => {
  try {
    const { body } = req;
    const newAttend = await new Attendance(body);
    const attend = await newAttend.save();
    res.json({
      status: true,
      result: attend,
      message: "Attendance has been marked",
    });
  } catch (error) {
    console.log("Error when fetching product", error);
    res.status(500).json({
      message: "Please try later",
    });
  }
};
exports.attendanceSearch = async (req, res) => {
  try {
    const { day } = req.query;
    let searchQuery = {};
    if (day) {
      searchQuery.day = day;
    }
    await Attendance.find(searchQuery)
      .populate({
        path: "name",
      })
      .sort({ createdAt: -1 })
      .exec((err, results) => {
        console.log(results, err);
        if (err) {
          res.json({ status: false, message: "No Data found" });
        } else {
          res.json({ status: true, result: results });
        }
      });
  } catch (error) {
    console.log("Error when fetching product", error);
    res.status(500).json({
      message: "Please try later",
    });
  }
};
exports.profileController = async (req, res) => {
  const { body } = req;
  const { userId } = req.params;
  console.log(userId, body);
  try {
    const user = await Owner.findByIdAndUpdate(userId, body);
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
// const employee = await Employee.aggregate([
//   {
//     $match: {
//       $or: [
//         { firstName: { $regex: name, $options: "i" } },
//         { lastName: { $regex: name, $options: "i" } },
//       ],
//     },
//   },
//   {
//     $lookup: {
//       from: "Entity",
//       localField: "entityType",
//       foreignField: "_id",
//       as: "entities",
//     },
//   },
//   {
//     $unwind:'$entities'
//   },
//   {
//     $project: {

//       $match: {
//         name: { $regex: workCategory, $options: "i" },
//       },
//     },
//   },
// ])

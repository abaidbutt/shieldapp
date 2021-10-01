const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
let http = require("http");
const AWS = require("aws-sdk");

const Employee = require("./models/Employee");
const Owner = require("./models/Owner");
const Provider = require("./models/Provider");
const jimp = require("jimp");
const connectDB = require("./database/db");
const ownerRoutes = require("./routes/owner");
// const emergencyRoutes = require("./routes/emergency");
const entityRoutes = require("./routes/entity");
const serviceRoutes = require("./routes/service");
const providerServiceRoutes = require("./routes/providerService");
const employeeRoutes = require("./routes/employee");
const providerRoutes = require("./routes/provider");
const bcrypt = require("bcryptjs");
const twilio = require("twilio");
const accountSid = "AC38eb72820f21094ce79450c0d19df8c0"; // Your Account SID from www.twilio.com/console
const authToken = "88a807f3213314804e674f7fea4e19cb"; // Your Auth Token from www.twilio.com/console
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});
const BUCKET_NAME = "test-bucket";

const client = new twilio(accountSid, authToken);

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/owner", ownerRoutes);
// app.use("/api/emergency", emergencyRoutes);
app.use("/api/entity", entityRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/providerService", providerServiceRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/forgot", async (req, res) => {
  try {
    const { name, mobileNumber } = req.body;
    let user;
    console.log(mobileNumber, name);
    if (name === "Owner") {
      console.log("owner");
      user = await Owner.findOne({ mobileNumber });
    }
    if (name === "Employee") {
      console.log("employee");
      user = await Employee.findOne({ mobileNumber });
    }
    if (name === "Provider") {
      console.log("provider");
      user = await Provider.findOne({ mobileNumber });
    }
    if (user) {
      console.log(user);
      const sendSms = await client.verify
        .services("VA61ea528de1faaec94d6317e55fe1191a")
        .verifications.create({ to: mobileNumber, channel: "sms" })
        .then((verification) => verification.sid);
      console.log(sendSms);
      res.json({ status: true, message: "ok" });
    } else {
      console.log(user, "wrong user");
      res.json({ status: false, message: "You are wrong User" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: error });
  }
});
app.use("/api/verify", async (req, res) => {
  try {
    const { mobileNumber, code, name } = req.body;
    let user;
    console.log(mobileNumber, name);
    if (name === "Owner") {
      user = await Owner.findOne({ mobileNumber });
    }
    if (name === "Employee") {
      console.log("employee");
      user = await Employee.findOne({ mobileNumber });
    }
    if (name === "Provider") {
      console.log("provider");
      user = await Provider.findOne({ mobileNumber });
    }
    if (user) {
      console.log(user);
      const verified = await client.verify
        .services("VA61ea528de1faaec94d6317e55fe1191a")
        .verificationChecks.create({ to: mobileNumber, code })
        .then((verification_check) => verification_check.status);
      if (verified === "pending") {
        res.json({ status: false, message: "Please Enter Correct Code" });
      } else {
        res.json({ status: true, message: verified, result: user });
      }
    } else {
      res.json({ status: false, message: "You are wrong User" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err });
  }
});
app.use("/api/reset", async (req, res) => {
  try {
    let { name, password, mobileNumber } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    if (name === "Owner") {
      user = await Owner.findOneAndUpdate({ mobileNumber }, { password });
    }
    if (name === "Employee") {
      user = await Employee.findOneAndUpdate({ mobileNumber }, { password });
    }
    if (name === "Provider") {
      user = await Provider.findOneAndUpdate({ mobileNumber }, { password });
    }
    if (user) {
      console.log(user);
      res.json({
        status: true,
        message: "Your Password successfully updated",
      });
    } else {
      res.json({ status: false, message: "You are wrong User" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err });
  }
});
app.use("/api/image", (req, res) => {});
// const compareImages = async (file1, file2) => {
//   const exp=await
// };
app.use((error, req, res, next) => {
  console.log("This is the rejected field ->", error);
  res.json({ status: false, message: error });
});

// var httpServer = http.createServer(app);

app.listen(port, () => console.log(`listning on port ${port}`));

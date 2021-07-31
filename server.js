const express = require("express");
const app = express();
const connectDB = require("./database/db");
const ownerRoutes = require("./routes/owner");
const entityRoutes = require("./routes/entity");
const serviceRoutes = require("./routes/service");
const providerServiceRoutes = require("./routes/providerService");
const employeeRoutes = require("./routes/employee");
const providerRoutes = require("./routes/provider");
const port = process.env.PORT || 6000;
const cors = require("cors");
const twilio = require("twilio");
const bodyParser = require("body-parser");
const accountSid = "AC38eb72820f21094ce79450c0d19df8c0"; // Your Account SID from www.twilio.com/console
const authToken = "88a807f3213314804e674f7fea4e19cb"; // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/api/owner", ownerRoutes);
app.use("/api/entity", entityRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/providerService", providerServiceRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/number", async (req, res) => {
  try {
    const { to, from, msg } = req.body;
    const message = await client.messages.create({
      body: msg,
      to,
      from,
    });
    console.log(message.sid);
    res.json({ message: message.sid });
  } catch (err) {
    console.log(err);
    res.json({ message: "Server Error" });
  }
});
app.listen(port, () => console.log(`listning on port ${port}`));

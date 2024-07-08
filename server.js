const express = require("express");
const app = express();
const connectToDB = require("./config/database");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger.json");
dotenv.config();

const User = require("./models/user.model");

const bucketRoutes = require("./routes/buckets.routes");
const fileRoutes = require("./routes/files.routes");
const userRoutes = require("./routes/user.routes");

connectToDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Creating Admin
const createAdmin = async (username, password) => {
  const existingUser = await User.findOne({ username }).exec();

  if (existingUser) {
    console.info("Admin with the provided username already exists");
  } else {
    const admin = new User({
      username: username,
      password: await bcrypt.hash(password, 10),
      role: "admin",
    });
    try {
      await admin.save();
      console.log("Admin created");
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  }
};

// Routes
app.use("/api/buckets", bucketRoutes);
app.use("/api/bucket", fileRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, async () => {
  console.log("Server started on port 3000");
  await createAdmin("JKTECH", "password");
});

module.exports = app;

const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    return res.status(401).send({ message: "Invalid username or password" });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).send({ message: "Invalid username or password" });
  }
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  res.send({ token });
};

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username }).exec();

  if (existingUser) {
    console.info("User with the provided username already exists");
    return res.status(400).json({ message: "User already exists" });
  } else {
    const newUser = new User({
      username: username,
      password: await bcrypt.hash(password, 10),
      role: "user",
    });
    try {
      const result = await newUser.save();
      if (result) {
        res.status(201).json({
          username: result.username,
          token: jwt.sign(
            { userId: result._id, role: result.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
          ),
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
};

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).exec();
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

const authorize = (roles) => {
  return async (req, res, next) => {
    const hasRole = roles.some((role) => req.user.role === role);
    if (!hasRole) {
      return res.status(403).send({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};

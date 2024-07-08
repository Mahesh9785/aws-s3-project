const express = require("express");
const router = express();
const userOperations = require("../controller/userController");

router.post("/login", userOperations.loginUser);
router.post("/register", userOperations.registerUser);

module.exports = router;

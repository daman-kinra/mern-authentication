const express = require("express");
const route = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { requireLogin } = require("../middleware/auth.js");

route.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User Already Exist");
    }
    const hashed_pass = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: hashed_pass,
    });
    await user.save();
    return res.status(201).send("User Created");
  } catch (err) {
    console.log(err);
  }
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User does not exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Wrong PassWord");
    }
    const token = await jwt.sign({ _id: user._id }, "secret", {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (err) {
    console.log(err);
  }
});

route.get("/", requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});
module.exports = route;

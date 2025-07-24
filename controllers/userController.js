const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

const registerController = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    if (!email || !userName || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    // check existing
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status.send({
        success: false,
        message: "Email already in use",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      userName,
      email,
      password: hashedPass,
    });
    await newUser.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "register api error",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        succes: false,
        message: "Invalid email or password",
      });
    }
    // match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "Invalid credentials",
      });
    }
    // token
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
      user: { id: user._id, email: user.email, userName: user.userName },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "login api error",
      error,
    });
  }
};

module.exports = { loginController, registerController };

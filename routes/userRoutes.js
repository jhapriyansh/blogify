const express = require("express");
const {
  loginController,
  registerController,
  getUserName,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/getUser/:id", getUserName);

module.exports = router;

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { mainFeedController } = require("../controllers/homeController");
const router = express.Router();

router.post("/feed", authMiddleware, mainFeedController);

module.exports = router;

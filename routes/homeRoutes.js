const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { mainFeedController } = require("../controllers/homeController");
const router = express.Router();

// comment, like features will be added in this

router.post("/feed", authMiddleware, mainFeedController);

module.exports = router;

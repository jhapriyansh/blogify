const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getPostComments } = require("../controllers/commentController");
const router = express.Router();

router.get("/getComments/:postId", authMiddleware, getPostComments);

module.exports = router;

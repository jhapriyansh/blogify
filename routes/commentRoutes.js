const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getPostComments,
  getUserComments,
} = require("../controllers/commentController");
const router = express.Router();

router.get("/getComments/:postId", authMiddleware, getPostComments);
router.get("/getUserComments/:userId", authMiddleware, getUserComments);

module.exports = router;

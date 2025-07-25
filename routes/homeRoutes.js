const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  mainFeedController,
  likesController,
  dislikesController,
  postCommentController,
  deleteCommentController,
} = require("../controllers/homeController");
const router = express.Router();

router.post("/feed", authMiddleware, mainFeedController);
router.post("/likePost", authMiddleware, likesController);
router.post("/dislikePost", authMiddleware, dislikesController);
router.post("/postComment", authMiddleware, postCommentController);
router.delete("/deleteComment", authMiddleware, deleteCommentController);
module.exports = router;

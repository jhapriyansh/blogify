const express = require("express");
const {
  createBlogController,
  getUserBlogController,
  deleteBlogController,
} = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createBlogController);
router.get("/getUserBlogs/:id", authMiddleware, getUserBlogController);
router.delete("/delete/:id", authMiddleware, deleteBlogController);

module.exports = router;

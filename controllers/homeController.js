const blogModel = require("../models/blogModel");
const commentsModel = require("../models/commentsModel");

const mainFeedController = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(404).send({
        success: false,
        message: "no user parameter",
      });
    }
    const feed = await blogModel.find({ createdBy: { $ne: userId } });
    feed.reverse();
    return res.status(200).send({
      success: true,
      message: "Feed",
      feed,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "main feed api error",
      error,
    });
  }
};
const likesController = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
      return res.status(400).send({
        success: false,
        message: "Missing arguments",
      });
    }
    const blogPost = await blogModel.findById(postId);
    if (!blogPost) {
      return res.status(404).send({
        success: false,
        message: "Blog post not found",
      });
    }
    if (blogPost.likedBy.includes(userId)) {
      return res.status(400).send({
        success: false,
        message: "Post already liked by this user",
      });
    }
    blogPost.likedBy.push(userId);
    blogPost.likecount = blogPost.likedBy.length;
    await blogPost.save();
    res.status(200).send({
      success: true,
      message: "Post liked",
      likecount: blogPost.likecount,
      likedBy: blogPost.likedBy,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Like controller error",
      error,
    });
  }
};
const dislikesController = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
      return res.status(400).send({
        success: false,
        message: "Missing arguments",
      });
    }
    const blogPost = await blogModel.findById(postId);
    if (!blogPost) {
      return res.status(404).send({
        success: false,
        message: "Blog post not found",
      });
    }
    if (!blogPost.likedBy.includes(userId)) {
      return res.status(400).send({
        success: false,
        message: "User hasn't liked this post yet",
      });
    }
    blogPost.likedBy = blogPost.likedBy.filter(
      (id) => id.toString() !== userId
    );
    blogPost.likecount = blogPost.likedBy.length;
    await blogPost.save();
    res.status(201).send({
      success: true,
      message: "Post disliked (like removed)",
      likecount: blogPost.likecount,
      likedBy: blogPost.likedBy,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Dislikes API error",
      error,
    });
  }
};

const postCommentController = async (req, res) => {
  try {
    const { userId, postId, text } = req.body;
    if (!userId || !postId || !text) {
      return res.status(400).send({
        success: false,
        message: "No comment entered",
      });
    }
    const commentData = new commentsModel({
      post: postId,
      user: userId,
      text: text,
    });
    const result = await commentData.save();
    const post = await blogModel.findById(postId);
    console.log(post);
    post.comments.push(result._id);
    await post.save();
    return res.status(201).send({
      success: true,
      message: "Commented",
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "comments API error",
    });
  }
};



module.exports = {
  mainFeedController,
  likesController,
  dislikesController,
  postCommentController,
};

const blogModel = require("../models/blogModel");
const commentsModel = require("../models/commentsModel");

const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).send({
        success: false,
        message: "Missing arguments",
      });
    }
    const post = await blogModel.findById(postId);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }
    const commentDocs = await Promise.all(
      post.comments.map((id) =>
        commentsModel.findById(id).populate("user", "userName")
      )
    );
    const comments = commentDocs.map((comment) => ({
      user: comment?.user.userName,
      text: comment?.text,
    }));

    return res.status(200).send({
      success: true,
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    console.error("getPostComments error:", error);
    return res.status(500).send({
      success: false,
      message: "getComments API error",
      error,
    });
  }
};

const getUserComments = async (req, res) => {
  try {
    const { userId } = req.params;
    const userComments = await commentsModel.find({ user: userId });
    if (!userComments) {
      return res.status(404).send({
        success: false,
        message: "User has no comments",
      });
    }
    const commentPosts = [];
    for (let index = 0; index < userComments.length; index++) {
      const post = await blogModel.findById(userComments[index].post);
      if (post) {
        commentPosts.push({
          post,
          comment: userComments[index],
        });
      }
    }
    return res.status(200).send({
      success: true,
      message: "Here",
      commentPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "get comments api error",
      error,
    });
  }
};

module.exports = { getPostComments, getUserComments };

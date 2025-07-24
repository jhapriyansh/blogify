const blogModel = require("../models/blogModel");

const createBlogController = async (req, res) => {
  try {
    const { title, body, createdBy } = req.body;
    if (!title || !body || !createdBy) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const blogPost = new blogModel({ title, body, createdBy });
    const result = blogPost.save();
    return res.status(201).send({
      success: true,
      message: "Blog posted successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "new blog post api error",
      error,
    });
  }
};

const getUserBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await blogModel.find({ createdBy: id });
    if (!blogs) {
      return res.status(404).send({
        success: false,
        message: "No blogs for this user",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User's blogs",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "get user blog api error",
    });
  }
};

const deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await blogModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "No blog with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blog deleted successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "delete blog api error",
      error,
    });
  }
};

module.exports = {
  createBlogController,
  getUserBlogController,
  deleteBlogController,
};

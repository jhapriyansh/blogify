const blogModel = require("../models/blogModel");

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
    return res.status(200).send({
      success: true,
      message: "Feed",
      userId,
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
module.exports = { mainFeedController };

const mongoose = require("mongoose");
const commentsSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogs",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    text: {
      type: String,
      required: "true",
    },
  },
  { timestamps: true }
);

const commentsModel = mongoose.model("comments", commentsSchema);
module.exports = commentsModel;

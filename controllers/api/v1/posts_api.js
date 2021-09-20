const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user", "name id email")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name id email",
      },
    });
  return res.json(200, {
    message: "List of posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
      return res.status(200).json({
        message: "Post deleted successfully!",
      });
    } else {
      return res.json(401, {
        message: "You can not delete this post",
      });
    }
  } catch (err) {
    console.log("******Error", err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};

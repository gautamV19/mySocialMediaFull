const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (err) {
    if (err) {
      console.log("error in creating a post");
      return;
    }
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post && post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
    } else {
      return res.status(401).send("Unauthorize");
    }
    return res.redirect("back");
  } catch (err) {
    console.log("Error in finding post for deleting", err);
  }
};

const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      post = await post.populate("user", "name").execPopulate();

      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post created!",
      });
    }

    // req.flash("success", "Post Created");
  } catch (err) {
    if (err) {
      req.flash("error", err);
    }
  }
  return res.redirect("/");
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post && post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
      await Like.deleteMany({ onModel: "Post", likeable: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted!",
        });
      }

      req.flash("success", "Post Deleted");
    } else {
      req.flash("error", "Unauthorize: You can't delete this post");
      return res.status(401).send("Unauthorize");
    }
  } catch (err) {
    console.log("Error in finding post for deleting", err);
    req.flash("error", err);
  }
  return res.redirect("/");
};

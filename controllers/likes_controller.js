const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.togleLike = async function (req, res) {
  try {
    let likeable;
    let deleted = false;

    if ((req.query.type = "Post")) {
      //post
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      //comment
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    // if already liked
    let existingLike = Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    if (existingLike) {
      //delte it
      likeable.likes.pull(existingLike._id);
      likeable.save();

      existingLike.remove();
      deleted = true;
    } else {
      //create it

      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });

      likeable.likes.push(newLike);
      likeable.save();

      return res.json(200, {
        message: "liked",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Internal server error",
      data: {
        deleted: deleted,
      },
    });
  }
};

const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.togleLike = async function (req, res) {
  try {
    let likeable;
    let deleted = false;
    // console.log("******** togleLike", req.body);

    if (req.body.type == "Post") {
      //post
      likeable = await Post.findById(req.body.id).populate("likes");
      // console.log("likable found", likeable);
    } else if ((req.body.type = "Comment")) {
      //comment
      likeable = await Comment.findById(req.body.id).populate("likes");
      // console.log("likable found", likeable);
    }

    // if already liked
    let existingLike = await Like.findOne({
      likeable: req.body.id,
      onModel: req.body.type,
      user: req.user._id,
    });

    // console.log("***Existing like", existingLike);

    if (existingLike) {
      //delte it

      likeable.likes.pull(existingLike._id);
      likeable.save();

      existingLike.remove();
      deleted = true;

      return res.status(200).json({
        message: "liked",
        data: {
          length: likeable.likes.length,
          deleted: deleted,
        },
      });
    } else {
      //create it
      // console.log("Creating like", likeable);
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.body.id,
        onModel: req.body.type,
      });

      likeable.likes.push(newLike);
      likeable.save();

      return res.status(200).json({
        message: "liked",
        data: {
          length: likeable.likes.length,
          deleted: deleted,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

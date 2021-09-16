const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findOne({ _id: req.body.post_id });

    let comment = await Comment.create({
      content: req.body.content,
      user: req.user._id,
      post: req.body.post_id,
    });

    // console.log(comment);
    post.comments.push(comment);
    post.save();

    if (req.xhr) {
      // Similar for comments to fetch the user's id!
      comment = await comment.populate("user", "name").execPopulate();

      return res.status(200).json({
        data: {
          comment,
        },
        message: "Post created!",
      });
    }
    // console.log(post);
    req.flash("success", "Commented");
  } catch (err) {
    console.log("error in commenting on post", err);
    req.flash("error", err);
  }
  return res.redirect("/");
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    let postId = comment.post;

    let post = await Post.findByIdAndUpdate(postId);

    if (comment.user == req.user.id) {
      comment.remove();

      post.update({
        $pull: {
          comments: req.params.id,
        },
      });
      req.flash("success", "Comment Deleted");
    } else {
      req.flash("error", "Unauthorize: Unable to delete");
    }
  } catch (err) {
    if (err) {
      console.log("Error in removing comment from post", err);
      req.flash("error", err);
    }
  }
  return res.redirect("/");
};

//** Garbedge */
// console.log(
//   "comments",
//   "content :",
//   req.body.content,
//   "user id :",
//   req.user._id,
//   "post id :",
//   req.body.post_id
// );

// .id is to converting into string ideally it should be ._id

// return res.redirect("/");
//  if (err) {
//   console.log("Error in removing comment from post", err);
//   return;
// }

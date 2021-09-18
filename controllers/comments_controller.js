const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    console.log("inside comment controller", req.body);
    let post = await Post.findOne({ _id: req.body.post });

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      });

      console.log(comment);
      post.comments.push(comment);
      post.save();

      if (req.xhr) {
        console.log("inside req.xhr", req);
        comment = await comment.populate("user", "name").execPopulate();

        return res.status(200).json({
          data: {
            comment,
          },
          message: "Comment created!",
        });
      }
      req.flash("success", "Commented");
    }
  } catch (err) {
    console.log("error in commenting on post", err);
    req.flash("error", err);
  }
  return res.redirect("/");
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.user == req.user.id) {
      let postId = comment.post;

      let post = await Post.findByIdAndUpdate(postId, {
        $pull: {
          comments: req.params.id,
        },
      });

      comment.remove();

      if (req.xhr) {
        console.log("Its xhr for comment");
        return res.status(200).json({
          data: {
            id: req.params.id,
          },
          message: "Comment Deleted",
        });
      }

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

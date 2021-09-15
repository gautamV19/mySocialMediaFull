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
    // console.log(post);

    return res.redirect("back");
  } catch (err) {
    if (err) {
      console.log("error in commenting on post", err);
      return;
    }
  }
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
    } else {
      console.log("Unable to delete unauothorized");
    }

    return res.redirect("/");
  } catch (err) {
    if (err) {
      console.log("Error in removing comment from post", err);
      return;
    }
  }
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

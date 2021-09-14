const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  console.log(
    "comments",
    "content :",
    req.body.content,
    "user id :",
    req.user._id,
    "post id :",
    req.body.post_id
  );
  Post.findOne({ _id: req.body.post_id }, function (err, post) {
    if (err) {
      console.log("error in finding post for comment", err);
      return;
    }
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          user: req.user._id,
          post: req.body.post_id,
        },
        function (err, comment) {
          console.log("error in commenting on post", err, comment);
          post.comments.push(comment);
          post.save();

          return res.redirect("back");
        }
      );
    }
  });

  return res.redirect("back");
};

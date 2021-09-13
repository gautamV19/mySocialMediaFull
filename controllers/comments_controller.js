const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.findOne(req.body.post_id, function (err, post) {
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
          console.log("error in commenting on post", err);
          post.comments.push(comment);
          post.save();

          res.redirect("back");
        }
      );
    }
  });

  return res.redirect("back");
};

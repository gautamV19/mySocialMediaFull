const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  // console.log(
  //   "comments",
  //   "content :",
  //   req.body.content,
  //   "user id :",
  //   req.user._id,
  //   "post id :",
  //   req.body.post_id
  // );
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
          if (err) {
            console.log("error in commenting on post", err);
            return;
          }
          if (comment) {
            console.log(comment);
            post.comments.push(comment);
            post.save();
            console.log(post);
          }

          return res.end("/");
        }
      );
    }
  });

  return res.redirect("back");
};

module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (err) {
      console.log("Error in finding comment for deleting");
      return;
    }
    // .id is to converting into string ideally it should be ._id
    console.log("******** Comment to be deleted", comment.content);
    if (comment.user == req.user.id) {
      let postId = comment.post;

      comment.remove();

      Post.findByIdAndUpdate(postId, {
        $pull: {
          comments: req.params.id,
          function(err) {
            if (err) {
              console.log("Error in removing comment from post", err);
              return;
            }
            return res.redirect("/");
          },
        },
      });
      return res.redirect("/");
    } else {
      console.log("Unable to delete");
      return res.redirect("back");
    }
  });
};

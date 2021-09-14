const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err) {
      if (err) {
        console.log("error in creating a post");
        return;
      }

      return res.redirect("back");
    }
  );
};

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log("Error in finding post for deleting");
    }
    // .id is to converting into string ideally it should be ._id
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, function (err) {
        if (err) console.log("Error in deleting the post", err);

        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};

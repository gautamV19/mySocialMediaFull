const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = function (req, res) {
  //   console.log(req.cookies);
  //   res.cookie("user_id", 25);
  // Post.find({}, function (err, posts) {
  //   if (err) {
  //     console.log("Error in showing post");
  //     return;
  //   }
  //   console.log("your posts for home page", posts);
  //   return res.render("home", {
  //     title: "Home",
  //     posts: posts,
  //   });
  // });

  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      if (err) {
        console.log("Error in showing post");
        return;
      }
      User.find({}, function (err, users) {
        if (err) {
          console.log("Error in showing user");
          return;
        }
        // console.log("your posts for home page", posts);
        return res.render("home", {
          title: "Home",
          posts: posts,
          all_users: users,
        });
      });
    });
};

// module.exports.actionName = function(req, res){}

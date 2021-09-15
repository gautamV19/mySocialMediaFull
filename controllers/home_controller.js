const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});

    return res.render("home", {
      title: "Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error in home controller", err);
  }
};

// module.exports.actionName = function(req, res){}
// 1. using then
// 2. using promise
// 3. using async await

// .exec(function (err, posts) {
//   if (err) {
//     console.log("Error in showing post");
//     return;
//   }
//   User.find({}, function (err, users) {
//     if (err) {
//       console.log("Error in showing user");
//       return;
//     }
//            console.log("your posts for home page", posts);
//   });
// });

const User = require("../models/user");

module.exports.profile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);

    return res.render("user_profile", {
      title: "User Profile",
      user_profile: user,
    });
  } catch (err) {
    if (err) {
      console.log("error in finding user for user profile", err);
      return;
    }
  }
};

// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "social | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "social | Sign In",
  });
};

// get the sign up data
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      let userCreated = await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    if (err) {
      console.log("error in signing up a user", err);
      return;
    }
  }
};
// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash("success", "You have logged out");
  return res.redirect("/");
};

module.exports.updateProfile = async function (req, res) {
  // implement checking password also
  try {
    if (req.params.id == req.user.id) {
      let user = await User.findByIdAndUpdate(req.params.id, req.body);
      return res.redirect("back");
    } else {
      return res.status(401).send("Unauthorize");
    }
  } catch (err) {
    console.log("error in profile update", err);
    return;
  }
};

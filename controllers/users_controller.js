const User = require("../models/user");
const ResetPassword = require("../models/reset_passwords");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const passwordMailer = require("../mailers/reset_password_mailer");
const { render } = require("ejs");

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
      await User.create(req.body);
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
  console.log(User.uploadedAvatar);
  // implement checking password also
  if (req.params.id == req.user.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("*****Multer Error :", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }

        user.save();
      });
      req.flash("success", "Profile updated");

      return res.redirect("back");
    } catch (err) {
      console.log("error in profile update", err);
      return;
    }
  } else {
    req.flash("error", "Unauthorised");
    return res.status(401).send("Unauthorize");
  }
};

//forgot  password
module.exports.forgotPassword = function (req, res) {
  return res.render("forgotPassword", {
    title: "social | Forgot Password",
  });
};

// reset password
var code = null;
module.exports.resetPassword = async function (req, res) {
  const email = req.body.email;

  let user = await User.findOne({ email: email });

  code = crypto.randomBytes(3).toString("hex");

  passwordMailer.newPassword(user, code);

  await ResetPassword.create({ user: user, otp: code });

  return res.render("resetPassword", {
    title: "social | Reset Password",
  });
};

module.exports.resetPassword2 = async function (req, res) {
  let otp = req.body.otp;

  if (otp === code) {
    let resPsw = await ResetPassword.findOne({ otp: otp }).populate("user");

    console.log("*******Reset Password Successfull", resPsw);

    return res.render("resetPassword3", {
      title: "social | Reset Password",
      user: resPsw.user,
    });
  }

  req.otp("error", "not valid");
  return res.redirect("/users/sign-in");
};
module.exports.newPassword = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    req.flash("error", "Passwords not matched");
    return res.redirect("back");
  }

  console.log("****newPassword", req.body);
  let user = await User.findById(req.body.id);
  console.log("****newPassword", user);

  if (user) {
    user.password = req.body.password;
    user.save();
    req.flash("success", "Password updated");
    return res.redirect(`/users/profile/${req.body.id}`);
  }
  req.flash("error", "user not found");
  return res.redirect("/");
};

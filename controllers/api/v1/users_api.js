const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const { json } = require("express");

// sign in and create a session for the user
module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password !== req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
        data: {
          data: req.body,
          user: user,
          upass: user.password,
          rpass: req.body.password,
          match: user.password !== req.body.password,
        },
      });
    }

    return res.json({
      message: "Sign in successfully, here is your token",
      data: {
        token: jwt.sign(JSON.stringify(user), "codeial"),
        // TODO expiresIn
      },
    });
  } catch (err) {
    console.log("******Error", err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};

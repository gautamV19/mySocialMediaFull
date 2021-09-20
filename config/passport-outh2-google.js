const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "336265253902-laga3p7d1dp608790ro1v6e52n2ij8fl.apps.googleusercontent.com",
      clientSecret: "RsdU19gE7G66Cb4Xu2grbzK_",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("Error in finding user --> Passport-google", err);
          return;
        }
        // console.log(profile);

        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("Error in finding user --> Passport-google", err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;

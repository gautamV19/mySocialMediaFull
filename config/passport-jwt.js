const passport = require("passport");
const JWTStatergy = require("passport-jwt").Strategy;
const ExtractJQT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let options = {
  jwtFromRequest: ExtractJQT.fromAuthHeaderAsBearerToken,
  secretOrKey: "social",
};

passport.use(
  new JWTStatergy(options, function (jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function (err, user) {
      if (err) {
        console.log("Error in finding user from JWT", err);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;

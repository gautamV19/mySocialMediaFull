const passport = require("passport");

const LocalStratergy = require("passport-local").Strategy;

const User = require("../models/user");

// authentication using passport
passport.use(
  new LocalStratergy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log(
            "Error in finding user in authentication -- inside passport"
          );
          return done(err);
        }

        if (!user || user.password != password) {
          console.log("Invalide username/password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//serializing the user to decide which is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findOne({ id }, function (err, user) {
    if (err) {
      console.log("Error in finding user deserializeUser -- inside passport");
      return done(err);
    }
    return done(null, user);
  });
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // this will send user to local to see the views
    res.locals.user = req.user;
  }
  return next();
};

module.exports = passport;

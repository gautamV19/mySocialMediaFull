const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

router.get("/sign-out", usersController.destroySession);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "users/sign-in" }),
  usersController.createSession
);

router.post(
  "/update-profile/:id",
  passport.checkAuthentication,
  usersController.updateProfile
);

router.get("/forgot-password", usersController.forgotPassword);
router.post("/reset-password", usersController.resetPassword);
router.post("/reset-password-2", usersController.resetPassword2);

router.post("/new-password", usersController.newPassword);

module.exports = router;

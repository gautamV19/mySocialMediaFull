const express = require("express");
const passport = require("passport");

const router = express.Router();

const friendshipController = require("../controllers/friendship_controller");

router.get(
  "/create-friendship",
  passport.checkAuthentication,
  friendshipController.createFriendship
);

module.exports = router;

const express = require("express");
const passport = require("passport");

const router = express.Router();

const friendshipController = require("../controllers/friendship_controller");

router.get(
  "/create-friendship",
  passport.checkAuthentication,
  friendshipController.createFriendship
);

router.get(
  "/remove_friendship",
  passport.checkAuthentication,
  friendshipController.destroy
);

router.get(
  "/fetch_user_friends",
  passport.checkAuthentication,
  friendshipController.allFriends
);

module.exports = router;

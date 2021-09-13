const express = require("express");
const router = require("express").Router();
const passport = require("passport");

const commentsController = require("../controllers/comments_controller");

router.post("/create", passport.checkAuthentication, commentsController.create);

module.exports = router;

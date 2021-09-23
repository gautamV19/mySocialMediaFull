const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    // required: true,
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "onModel",
  },
  onModel: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    enum: ["Post", "Comment"],
  },
});

const Like = mongoose("Like", likeSchema);

module.exports = Like;

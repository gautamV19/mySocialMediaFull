const mongoose = require("mongoose");

const reset_passwordsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const resetPasswords = mongoose.model("ResetPasswords", reset_passwordsSchema);

module.exports = resetPasswords;

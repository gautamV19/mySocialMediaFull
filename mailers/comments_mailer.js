const nodemailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  console.log("inside new comment");

  nodemailer.transporater.sendMail(
    {
      from: "gv970238@gmail.com",
      to: comment.user.email,
      subject: "New comment from you",
      html:
        "<h1>You have commented as <strong>" +
        comment.content +
        "</strong> </h1>",
    },
    (err, info) => {
      if (err) {
        console.log("Error in mailing", err);
        return;
      }
      console.log("Message sent", info);
      return;
    }
  );
};

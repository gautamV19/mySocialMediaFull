const nodemailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  //   console.log("inside new comment");
  let htmlString = nodemailer.renderTemplate(
    { comment: comment },
    "/comments/newComments.ejs"
  );
  nodemailer.transporater.sendMail(
    {
      from: "gv970238@gmail.com",
      to: comment.user.email,
      subject: "New comment from you",
      html: htmlString,
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

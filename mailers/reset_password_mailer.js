const nodemailer = require("../config/nodemailer");

exports.newPassword = (user, code) => {
  console.log(user, code);
  let htmlString = nodemailer.renderTemplate(
    { code: code, name: user.name },
    "/passwords/newPassword.ejs"
  );
  console.log(htmlString);
  nodemailer.transporater.sendMail(
    {
      from: "gv970238@gmail.com",
      to: user.email,
      subject: "Reset Password Link",
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

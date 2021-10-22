const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transporater = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL , // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("Error in renderTemplate", err);
        return;
      }

      mailHTML = template;
    }
  );

  return mailHTML;
};

module.exports = { transporater, renderTemplate };

const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "something",
  db: "codeial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SOCIAL_GOOGLE_username, // generated ethereal user
      pass: process.env.SOCIAL_GOOGLE_password, // generated ethereal password
    },
  },
  google_client_id:
    "336265253902-laga3p7d1dp608790ro1v6e52n2ij8fl.apps.googleusercontent.com",
  google_client_secret: "RsdU19gE7G66Cb4Xu2grbzK_",
  google_callback_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secrete_key: "codeial",
  morgan: { mode: "dev", options: { stream: accessLogStream } },
};

const production = {
  name: "production",
  jwt_secrete_key: process.env.SOCIAL_jwt_secrete_key,
  //todo use process.env
  asset_path: process.env.SOCIAL_ASSET_PATH,
  session_cookie_key: process.env.SOCIAL_SESSION_COOKIE_KEY,
  db: eval(process.env.SOCIAL_DB),
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SOCIAL_GOOGLE_username, // generated ethereal user
      pass: process.env.SOCIAL_GOOGLE_password, // generated ethereal password
    },
  },
  google_client_id: process.env.SOCIAL_google_client_id,
  google_client_secret: process.env.SOCIAL_google_client_secret,
  google_callback_url: process.env.SOCIAL_google_callback_url,

  // asset_path: "./assets",
  // session_cookie_key: "something",
  // db: "codeial_production",
  // smtp: {
  //   service: "gmail",
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: "gv1909gv19@gmail.com", // generated ethereal user
  //     pass: "^VIvo1(23#_@slIOHadj;alsdkfj@#4", // generated ethereal password
  //   },
  // },
  // google_client_id:
  //   "336265253902-laga3p7d1dp608790ro1v6e52n2ij8fl.apps.googleusercontent.com",
  // google_client_secret: "RsdU19gE7G66Cb4Xu2grbzK_",
  // google_callback_url: "http://social.com/users/auth/google/callback",
  // jwt_secrete_key: "codeial",
  morgan: { mode: "combined", options: { stream: accessLogStream } },
};

// module.exports = process.env.SOCIAL_ENVIROMENT
//   ? eval(process.env.SOCIAL_ENVIROMENT)
//   : development;

// module.exports = development;
module.exports = production;

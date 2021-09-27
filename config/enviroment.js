const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "something",
  db: "social_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "gv1909gv19@gmail.com", // generated ethereal user
      pass: "vivoy21L", // generated ethereal password
    },
  },
  google_client_id:
    "336265253902-laga3p7d1dp608790ro1v6e52n2ij8fl.apps.googleusercontent.com",
  google_client_secret: "RsdU19gE7G66Cb4Xu2grbzK_",
  google_callback_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secrete_key: "social",
};

const production = {
  name: "production",
};

module.exports = development;

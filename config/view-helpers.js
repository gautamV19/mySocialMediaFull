const env = require("./enviroment");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  app.locals.assetPath = (filepath) => {
    if ((env.name = "development")) {
      return filepath;
    }

    return (
      "/" +
      json.parse(
        fs.readFileSync(
          path.join(__dirname, `../public/rev-manifest.json[${filepath}]`)
        )
      )
    );
  };
};

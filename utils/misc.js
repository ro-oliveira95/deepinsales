const fs = require("fs");
const { parse, stringify } = require("envfile");
// const { parseFileSync, stringifySync } = require("envfile");
const envfile = require("envfile");
const pathToenvFile = "./config/config.env";

const setEnv = async (dataToSave) => {
  // let parsedFile = envfile.parse(pathToenvFile);
  // parsedFile[key] = value;
  // fs.writeFileSync(pathToenvFile, envfile.stringify(parsedFile));
  await fs.readFile(pathToenvFile, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = parse(data);
    // result[key] = value;
    result = { ...result, ...dataToSave };
    fs.writeFile(pathToenvFile, stringify(result), function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
};

module.exports = { setEnv };

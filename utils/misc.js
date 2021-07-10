const fs = require("fs");
const { parse, stringify } = require("envfile");
// const { parseFileSync, stringifySync } = require("envfile");
const envfile = require("envfile");
const pathToenvFile = "./config/config.env";

const setEnv = async (dataToSave) => {
  // saving to .env file
  const envData = fs.readFileSync(pathToenvFile, "utf8");
  var result = await parse(envData);
  result = { ...result, ...dataToSave };
  result = stringify(result);
  fs.writeFileSync(pathToenvFile, result);
  // updating process.env variables
  process.env = { ...process.env, ...dataToSave };
  return;
};

module.exports = { setEnv };

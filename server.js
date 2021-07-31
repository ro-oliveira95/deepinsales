const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const { Sequelize } = require("sequelize");
const cron = require("node-cron");

const { refreshMLToken } = require("./utils/mlAPI");

// utils
const {
  recordAllProducts,
  updateCatalogueProducts,
} = require("./utils/dailyRoutines");

// load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// routes
const auth = require("./routes/auth");
const users = require("./routes/users");
const products = require("./routes/products");
const records = require("./routes/records");

// mount routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/records", records);

// refreashs token when server is up
(async () => await refreshMLToken())();
(async () => await recordAllProducts())();

// scheduling token refreashing
cron.schedule("0 */5 * * *", () => {
  let d = new Date();
  d = new Date(d.valueOf() - d.getTimezoneOffset() * 60000);
  console.log(`[${d.toGMTString()}] refreshing ML token...`);
  refreshMLToken();
});

// scheduling record making
cron.schedule("0 */1 * * *", async () => {
  let d = new Date();
  d = new Date(d.valueOf() - d.getTimezoneOffset() * 60000);
  console.log(`[${d.toGMTString()}] recording all products...`);
  // await updateCatalogueProducts(); // before recording products
  await recordAllProducts(); // each 24h
});

// serve static assets in product ion
if (process.env.NODE_ENV == "production") {
  // set static folder
  app.use(express.static("client/build"));
  // create generic route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

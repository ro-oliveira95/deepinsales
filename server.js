const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const pg = require("pg");

const app = express();

// body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// routes
const auth = require("./routes/auth");
const users = require("./routes/users");
const products = require("./routes/products");

// load env vars
dotenv.config({ path: "./config/config.env" });

// mount routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/products", products);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

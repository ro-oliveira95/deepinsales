const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const { Sequelize } = require("sequelize");

// load env vars
dotenv.config({ path: "./config/config.env" });

// const pg = require("pg");
const { User } = require("./db/models");

const app = express();

// body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// routes
const auth = require("./routes/auth");
const users = require("./routes/users");
const products = require("./routes/products");

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

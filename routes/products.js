const express = require("express");
const {
  createProduct,
  getProducts,
  queryProducts,
} = require("../controllers/products");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(auth, getProducts).post(auth, createProduct);
router.route("/query").post(auth, queryProducts);

module.exports = router;

const express = require("express");
const {
  createProduct,
  getProducts,
  queryProducts,
  deleteProduct,
  deleteCategoryFromProduct,
} = require("../controllers/products");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(auth, getProducts).post(auth, createProduct);
router.route("/query").post(auth, queryProducts);
router.route("/delete").post(auth, deleteProduct);
router.route("/category/delete").post(auth, deleteCategoryFromProduct);

module.exports = router;

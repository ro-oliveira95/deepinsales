const express = require("express");
const {
  createRecord,
  getRecordsFromProduct,
  getAllRecordsFromUser,
} = require("../controllers/records");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(auth, getAllRecordsFromUser).post(auth, createRecord);
router.route("/:id").get(auth, getRecordsFromProduct);

module.exports = router;

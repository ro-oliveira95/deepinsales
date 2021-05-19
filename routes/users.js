const express = require("express");
const { register } = require("../controllers/users");
// const { protect } = require("../middleware/auth");
const router = express.Router();

// router.get("/", getUsers);
// router.get("/me", protect, getUser);
router.post("/register", register);

module.exports = router;

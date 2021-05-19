const express = require("express");
const { login, getUserByToken } = require("../controllers/auth");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, getUserByToken);
// router.get("/me", protect, getUser);
// router.post("/register", register);
router.post("/", login);

module.exports = router;

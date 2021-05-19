const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getSignedJwtToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.matchPassword = async function (enteredPassword, hashedPassword) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

exports.sendTokenResponse = (userId, statusCode, res) => {
  // create token
  const token = getSignedJwtToken(userId);

  // options (including expiration in 30d)
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // setting the secure mode to the cookie (to work only with https) if it is in production
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).json({ token: `Bearer ${token}` });
};

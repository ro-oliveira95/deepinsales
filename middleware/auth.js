const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Protect routes
exports.auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    res
      .status(401)
      .json({ sucess: false, message: "Not authorized to acess this route" });
    return;
    // return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.id;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ sucess: false, message: "Not authorized to acess this route" });
    return;
    // return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

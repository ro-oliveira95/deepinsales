const bcrypt = require("bcryptjs");
const { sendTokenResponse } = require("../utils/authUtils");
const db = require("../config/db");

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      sucess: false,
      errors: [{ message: "Todos os campos são necessários" }],
    });
    return;
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  try {
    // insert new user to db
    await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3);",
      [name, email, password_hash]
    );
    // retrieve user to extract its id
    const query = await db.query("SELECT _id FROM users WHERE email = $1;", [
      email,
    ]);
    const user = query.rows[0];
    // send response with token
    sendTokenResponse(user._id, 200, res);
  } catch (err) {
    // default error message
    let message = "Falha no registro. Por favor, tente mais tarde";
    // duplicate error message
    if (err.code === "23505") {
      message = "Email já cadastrado. Por favor, insira um novo email";
    }
    return res.status(400).json({ errors: [{ message }] });
  }
};

// exports.getUsers = async (req, res, next) => {
//   try {
//     const results = await db.query("SELECT * FROM users");
//     res.status(200).json({ sucess: true, users: results.rows });
//   } catch (err) {
//     res.status(404).json({ sucess: false, users: [] });
//   }
// };

// exports.getUser = (req, res, next) => {
//   const user = req.user;
//   res.status(200).json({ sucess: true, user });
//   // const id = parseInt(req.params.id);

//   // db.query("SELECT * FROM users WHERE _id = $1", [id], (err, results) => {
//   //   if (err) {
//   //     res.status(404).json({ sucess: false, user: [] });
//   //     return;
//   //   }
//   //   res.status(200).json({ sucess: true, user: results.rows[0] });
//   // });
// };

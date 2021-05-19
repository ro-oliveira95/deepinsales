const { matchPassword, sendTokenResponse } = require("../utils/authUtils");
const db = require("../config/db");

exports.getUserByToken = async (req, res) => {
  try {
    // req.user = await User.findById(decoded.id);
    const query = await db.query(
      "SELECT _id, name, email FROM users WHERE _id = $1",
      [req.user_id]
    );
    const user = query.rows[0];
    res.json(user);
  } catch (err) {
    res.status(500).send({ errors: [{ msg: "Erro no servidor" }] });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // checking if fields were filled
  if (!email || !password) {
    res
      .status(400)
      .json({ errors: [{ message: "Todos os campos devem ser preenchidos" }] });
    return;
  }

  // quering from db
  const query = await db.query("SELECT * FROM users WHERE email = $1", [email]);

  // checking email matching
  if (query.rowCount == 0) {
    res.status(400).json({ errors: [{ message: "Credenciais inválidas" }] });
    return;
  }

  const user = query.rows[0];

  // checking password matching
  const isPasswordMatch = await matchPassword(password, user.password);
  if (!isPasswordMatch) {
    res.status(400).json({ errors: [{ message: "Credenciais inválidas" }] });
    return;
  }

  // sending response
  sendTokenResponse(user._id, 200, res);
};

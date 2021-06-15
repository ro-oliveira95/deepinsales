const { matchPassword, sendTokenResponse } = require("../utils/authUtils");
const { User } = require("../db/models");

exports.getUserByToken = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: { exclude: ["password"] },
      where: {
        id: req.user_id,
      },
    });
    res.json(user);
  } catch (err) {
    res.status(500).send({
      errors: [{ message: "Erro no servidor. Por favor, tente mais tarde" }],
    });
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

  try {
    // quering users from db
    const userList = await User.findAll({
      where: {
        email,
      },
    });

    // checking if user exists
    if (userList.length == 0) {
      return res
        .status(400)
        .json({ errors: [{ message: "Credenciais inválidas" }] });
    }
    const user = userList[0];
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: "Credenciais inválidas" }] });
    }

    // checking password matching
    const isPasswordMatch = await matchPassword(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ errors: [{ message: "Credenciais inválidas" }] });
    }

    // sending response
    sendTokenResponse(user.id, 200, res);
  } catch (err) {
    return res.status(500).json({
      errors: [{ message: "Erro no servidor. Por favor, tente mais tarde" }],
    });
  }
};

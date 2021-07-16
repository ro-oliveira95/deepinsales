const { Category } = require("../db/models");

exports.createCategory = async (req, res) => {
  const userId = req.user_id;
  let { name } = req.body;

  try {
    const category = await Category.create({
      name,
      rgb: [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
      ],
      user_id: userId,
    });
    return res.status(200).json({ sucess: true, category });
  } catch (err) {
    // console.log(err);
    return res
      .status(400)
      .json({ errors: [{ message: "Erro ao criar categoria" }] });
  }
};

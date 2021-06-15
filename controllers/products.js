const { Product } = require("../db/models");

exports.createProduct = async (req, res, next) => {
  const userId = req.user_id;
  let { name, url, categories } = req.body;

  if (!name) {
    name = "generic name";
  }

  const info = {
    created_at: new Date(
      Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
    ).toISOString(),
    user_id: userId,
    image_url:
      "https://http2.mlstatic.com/D_NQ_NP_831095-MLB45158647951_032021-V.webp",
    status: "active",
    rgb: [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ],
    category: categories,
    seller: "DIS digital",
    price: 192.9,
    isBuybox: false,
    catalogue_id: "",
    ml_id: "ML1234",
    curr_total_sells: 50,
    curr_total_visits: 100,
    conversion_rate: 0.5,
    is_buy_box: false,
  };

  try {
    let product = await Product.create({
      name,
      url,
      user_id: info._user_id,
      image_url: info.image_url,
      status: info.status,
      rgb: info.rgb,
      category: info.category,
      seller: info.seller,
      price: info.price,
      isBuybox: info.isBuybox,
      catalogue_id: info.catalogue_id,
      ml_id: info.ml_id,
      curr_total_sells: info.curr_total_sells,
      curr_total_visits: info.curr_total_visits,
      conversion_rate: info.conversion_rate,
      is_buy_box: info.is_buy_box,
      user_id: info.user_id,
    });
    return res.status(200).json({ sucess: true, product });
  } catch (err) {
    return res.status(400).json({ errors: [{ message: "Erro no servidor" }] });
  }
};

exports.getProducts = async (req, res, next) => {
  const user_id = req.user_id;
  try {
    const products = await Product.findAll({
      where: {
        user_id,
      },
    });
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.queryProducts = async (req, res) => {
  const userId = req.user_id;
  const { dateIni, dateEnd, productName } = req.body;
  try {
    // query to get all user's products
    const query = await db.query(
      "SELECT * FROM products WHERE _user_id = $1 AND UPPER(name) LIKE UPPER($2)",
      [userId, `%${productName}%`]
    );
    const products = query.rows;
    const total = query.rowCount;

    res.status(200).json({ products });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

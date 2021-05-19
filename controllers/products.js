const db = require("../config/db");

exports.getProducts = async (req, res, next) => {
  const userId = req.user_id;
  try {
    // query to get all user's products
    const query = await db.query("SELECT * FROM products WHERE _user_id = $1", [
      userId,
    ]);
    const products = query.rows;
    const total = query.rowCount;

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
    _user_id: userId,
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
  };

  // checking if url is already stored
  const query = await db.query(
    "SELECT * FROM products WHERE _user_id = $1 AND url = $2",
    [info._user_id, url]
  );

  if (query.rowCount !== 0) {
    return res
      .status(400)
      .json({ errors: [{ message: "Anúncio já adicionado" }] });
  }

  try {
    const product = await db.query(
      'INSERT INTO products (name, url, created_at, _user_id, image_url, status, rgb, category, seller, price, "isBuybox", catalogue_id, ml_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
      [
        name,
        url,
        info.created_at,
        info._user_id,
        info.image_url,
        info.status,
        info.rgb,
        info.category,
        info.seller,
        info.price,
        info.isBuybox,
        info.catalogue_id,
        info.ml_id,
      ]
    );
    return res.status(200).json({ sucess: true, product });
  } catch (err) {
    return res.status(400).json({ errors: [{ msg: "Erro no servidor" }] });
  }
};

/* exports.getSalesRecords = async (req, res) => {
  const {productId} = req.body;
  try {
    // query (algo parecido):
    // SELECT products.name AS produto, products.status, users.name AS usuario FROM users
    // INNER JOIN products ON users._id = products._user_id AND users._id = 1;
  } catch (err) {
    
  } 
} */

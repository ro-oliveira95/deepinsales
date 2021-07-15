const { Product } = require("../db/models");
const { getImageURL, readSellsOnMlPage } = require("../utils/scrapers");
const { gatherProductSellsAndCreateRecord } = require("../utils/dailyRoutines");
const {
  getVisits,
  getProductIdsFromML,
  getProductInfoFromML,
  getSellerNicknameFromML,
} = require("../utils/mlAPI");

exports.createProduct = async (req, res) => {
  const userId = req.user_id;
  let { name, url, categories } = req.body;
  const { mlID, catalogueID, isBuybox } = await getProductIdsFromML(url);
  // url not valid (from MercadoLivre)
  if (!mlID) {
    return res.status(400).json({ errors: [{ message: "URL inválido." }] });
  }
  const { title, seller_id, price, status, permalink, secure_thumbnail } =
    await getProductInfoFromML(mlID);
  const seller = await getSellerNicknameFromML(seller_id);

  // url associated with non-catalogue product page
  if (!isBuybox) {
    url = permalink;
  }

  const productName = name || title;

  const sells = await readSellsOnMlPage(url);
  let visits = await getVisits(mlID);
  visits = visits[mlID];

  try {
    const product = await Product.create({
      name: productName,
      url,
      user_id: userId,
      image_url: secure_thumbnail,
      status,
      rgb: [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
      ],
      category: categories,
      seller,
      price,
      catalogue_id: catalogueID,
      ml_id: mlID,
      curr_total_sells: sells,
      curr_total_visits: visits,
      conversion_rate: sells / visits,
      is_buy_box: isBuybox,
      user_id: userId,
    });
    await gatherProductSellsAndCreateRecord(product);

    return res.status(200).json({ sucess: true, product });
  } catch (err) {
    // console.log(err);
    return res.status(400).json({ errors: [{ message: "Erro no servidor" }] });
  }
};

exports.getProducts = async (req, res) => {
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

exports.deleteProduct = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.findOne({ where: { id: productId } });
    await product.destroy();
    res.status(200).json({ sucess: true });
  } catch (err) {
    res
      .status(500)
      .json({
        errors: [{ message: "Erro ao excluir produto, tente mais tarde" }],
      });
  }
  return;
};

const { getImageURL, readSellsOnMlPage } = require("./scrapers");
const { getVisits, checkForUpdatesOnCatalogueProduct } = require("./mlAPI");
const { Product, SaleRecord } = require("../db/models");

const axios = require("axios");

const createRecord = async (recordInfo) => {
  try {
    await SaleRecord.create(recordInfo);
  } catch (err) {
    console.log("erro ao criar record");
    console.log(err.message);
  }
};

const gatherProductSellsAndCreateRecord = async (product) => {
  const sells = await readSellsOnMlPage(product.url);
  let visits = await getVisits(product.ml_id);
  // case in which MercadoLivre doesn't respond as expected
  if (!visits) {
    console.log(`Not updated sells nor visits from product ${product.name}`);
    return;
  }
  visits = visits[product.ml_id];
  const recordInfo = {
    total_sells: sells,
    total_visits: visits,
    daily_sells: sells - product.curr_total_sells,
    daily_visits: visits - product.curr_total_visits,
    product_id: product.id,
  };
  await createRecord(recordInfo);
  await Product.update(
    {
      curr_total_sells: sells,
      curr_total_visits: visits,
    },
    { where: { id: product.id } }
  );
};

const recordAllProducts = async () => {
  try {
    const products = await Product.findAll();
    products.forEach((product) => gatherProductSellsAndCreateRecord(product));
  } catch (err) {
    console.log("erro ao criar records para todos os produtos");
    console.log(err);
  }
};

const updateCatalogueProducts = async () => {
  const products = await Product.findAll({
    where: {
      is_buy_box: true,
    },
  });
  products.forEach((product) => {
    const updatedInfo = checkForUpdatesOnCatalogueProduct(product);
    updatedInfo.isUpdated &&
      Product.update(
        {
          ml_id: updatedInfo.ml_id,
          seller: updatedInfo.seller,
          price: updatedInfo.price,
          status: updatedInfo.status,
        },
        { where: { id: product.id } }
      );
  });
};

module.exports = {
  recordAllProducts,
  gatherProductSellsAndCreateRecord,
  updateCatalogueProducts,
};

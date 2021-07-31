const { getImageURL, readSellsOnMlPage } = require("./scrapers");
const {
  getVisits,
  checkForUpdatesOnCatalogueProduct,
  checkCatalogueInfo,
  getProductInfoFromML,
} = require("./mlAPI");
const { Product, SaleRecord } = require("../db/models");

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
    console.log(`Create reacord from ${product.name} failed`);
    return;
  }
  // calculating basic metrics
  visits = visits[product.ml_id];
  const totalSells = sells - product.base_sells;
  const totalVisits = visits - product.base_visits;
  const recordInfo = {
    total_sells: totalSells,
    total_visits: totalVisits,
    daily_sells: totalSells - product.curr_total_sells,
    daily_visits: totalVisits - product.curr_total_visits,
    product_id: product.id,
  };
  // creating a record from current data and updating product
  await createRecord(recordInfo);
  await updateProduct(product, recordInfo);
};

const updateProduct = async (product, recordInfo) => {
  let updatedProductInfo = {};
  // calculating mean sells per hour
  const timeRef = Date.parse(product.createdAt);
  const timeNow = Date.now();
  const elapsedHours = (timeNow - timeRef) / 1000 / 3600;
  const meanSells = recordInfo.totalSells / elapsedHours;
  // checking product status
  const { status } = await getProductInfoFromML(product.ml_id);
  // setting default data structure
  updatedProductInfo = {
    curr_total_sells: recordInfo.totalSells,
    curr_total_visits: recordInfo.totalVisits,
    conversion_rate:
      recordInfo.totalVisits !== 0
        ? recordInfo.totalSells / recordInfo.totalVisits
        : 0,
    mean_sells: meanSells,
    status,
  };
  // checking if catalogue product info is out of date
  if (product.is_buy_box) {
    const catProductInfo = await checkCatalogueInfo(product);
    updatedProductInfo = { ...updatedProductInfo, ...catProductInfo };
  }
  // updating product
  await Product.update(updatedProductInfo, { where: { id: product.id } });
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

  const promises = products.map(async (product) => {
    const updatedInfo = await checkForUpdatesOnCatalogueProduct(product);
    updatedInfo.isUpdated &&
      (await Product.update(
        {
          ml_id: updatedInfo.ml_id,
          seller: updatedInfo.seller,
          price: updatedInfo.price,
          status: updatedInfo.status,
        },
        { where: { id: product.id } }
      ));
    return;
  });

  await Promise.all(promises);
};

module.exports = {
  recordAllProducts,
  gatherProductSellsAndCreateRecord,
  updateCatalogueProducts,
};

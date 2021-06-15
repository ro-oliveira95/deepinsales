const { SaleRecord, User, Product } = require("../db/models");
const uuid = require("uuid/v4");

exports.createRecord = async () => {
  try {
    const products = await Product.findAll();
    products.forEach((product) =>
      SaleRecord.create({
        total_sells: Math.floor(Math.random() * 100),
        total_visits: 10,
        daily_sells: 1,
        daily_visits: 2,
        product_id: product.id,
      })
    );
  } catch (err) {
    console.log(err);
  }
};

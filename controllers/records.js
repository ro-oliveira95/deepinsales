const { SaleRecord, User, Product } = require("../db/models");
const uuid = require("uuid/v4");

exports.createRecord = async (req, res, next) => {
  try {
    let record = await SaleRecord.create({
      total_sells: 120,
      total_visits: 10,
      daily_sells: 1,
      daily_visits: 2,
      product_id: "fff68279-484a-42b1-a001-45ba77a21644",
    });
    return res.status(200).json({ record });
  } catch (err) {
    return res.status(400).json({ errors: [{ message: "Erro no servidor" }] });
  }
};

exports.getRecordsFromProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    const records = await product.getRecords();
    res.status(200).json({ records });
  } catch (err) {
    console.log(err);
    // MELHORAR COMPORTAMENTO DE RESPOSTA AO ERRO
    res.status(500).send("Server Error");
  }
};

exports.getAllRecordsFromUser = async (req, res, next) => {
  const userId = req.user_id;
  try {
    const products = await Product.findAll({
      where: {
        user_id: userId,
      },
      include: User,
    });
    const records = [];
    for (let product of products) {
      const record = await product.getRecords();
      const productId = product.id;
      records.push({
        productName: product.name,
        productId,
        record,
        color: product.rgb,
      });
      // records[productId] = record;
    }
    res.status(200).json({ records });
  } catch (err) {
    console.log(err);
    // MELHORAR COMPORTAMENTO DE RESPOSTA AO ERRO
    res.status(500).send("Server Error");
  }
};

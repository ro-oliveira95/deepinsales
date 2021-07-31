const axios = require("axios");
const { setEnv } = require("./misc");

const getVisits = async (mlId) => {
  const url = `https://api.mercadolibre.com/visits/items?ids=${mlId}`;
  let visits;

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.ML_TOKEN}`,
    },
  };

  await axios
    .get(url, config)
    .then((res) => {
      // console.log(res);
      visits = res.data;
    })
    .catch((err) => {
      console.log(
        `Error in fetching visits from ML. Message: ${err.response.data.message}`
      );
    });
  return visits;
};

const getProductIdsFromML = async (productUrl) => {
  url = new URL(productUrl);
  details = url.pathname.substring(1);
  splitedDetails = details.split("-");
  let mlID;

  // Primeiro caso: id do produto explícito -> produto comum
  if (splitedDetails[0] === "MLB") {
    mlID = splitedDetails[0] + splitedDetails[1];
    isBuybox = false;
    catalogueID = "";
  } else {
    // Segundo caso: id implícito -> produto catalogado ('buybox')
    index = details.indexOf("/p/");
    catalogueID = details.substring(index + 3);
    mlID = await getMLIdFromCatalogue(catalogueID);
    isBuybox = true;
  }

  return { mlID, catalogueID, isBuybox };
};

const getMLIdFromCatalogue = async (catalogueId) => {
  const url = `https://api.mercadolibre.com/products/${catalogueId}`;
  let adID;

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.ML_TOKEN}`,
    },
  };

  try {
    const res = await axios.get(url, config);
    adID = res.data.buy_box_winner.item_id;
  } catch (err) {
    console.log(err.message);
  }
  return adID;
};

const refreshMLToken = async () => {
  let token = process.env.ML_TOKEN;
  let refreshToken = process.env.ML_REFRESH_TOKEN;
  const url = `https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=${process.env.ML_APP_ID}&client_secret=${process.env.ML_CLIENT_SECRET}&refresh_token=${process.env.ML_REFRESH_TOKEN}`;
  try {
    const res = await axios.post(url);
    token = res.data.access_token;
    refreshToken = res.data.refresh_token;
    const dataToSave = {
      ML_TOKEN: token,
      ML_REFRESH_TOKEN: refreshToken,
    };
    await setEnv(dataToSave);
  } catch (err) {
    console.error(err);
    console.log(
      `Erro ao atualizar token no ML. Mensagem: '${err.response.data.message}'; token não atualizado.`
    );
  }
};

const getProductInfoFromML = async (mlID) => {
  const url = `https://api.mercadolibre.com/items?ids=${mlID}`;

  let productInfo;

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.ML_TOKEN}`,
    },
  };

  try {
    const res = await axios.get(url, config);

    productInfo = res.data[0].body;
  } catch (err) {
    console.log(`Erro na obtenção de dados do produto com id ${mlID}`);
  }
  return productInfo;
};

const getSellerNicknameFromML = async (sellerID) => {
  const url = `https://api.mercadolibre.com/users/${sellerID}`;
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.ML_TOKEN}`,
    },
  };
  let sellerNickname;
  try {
    const res = await axios.get(url, config);
    sellerNickname = res.data.nickname;
  } catch (err) {
    console.log(
      `Erro na obtenção do nome do vendedor para vendedor com id ${sellerID}`
    );
  }
  return sellerNickname;
};

const getCatalogueProductInfoFromML = async (productID) => {
  const url = `https://api.mercadolibre.com/products/${productID}`;
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.ML_TOKEN}`,
    },
  };

  let catalogueProductInfo;
  try {
    const res = await axios.get(url, config);
    catalogueProductInfo = res.data;
  } catch (err) {
    console.log(
      `Erro ao obter dados de produto de catalogo com id ${productID}`
    );
  }

  return catalogueProductInfo;
};

const checkCatalogueInfo = async (product) => {
  const prodInfo = await getCatalogueProductInfoFromML(product.catalogue_id);

  let updatedProdInfo = { status: prodInfo.status };

  // checking if current ad isn't buybox winner
  if (prodInfo.buy_box_winner.item_id !== product.ml_id) {
    const { item_id, seller_id, price } = prodInfo.buy_box_winner;
    seller = await getSellerNicknameFromML(seller_id);

    updatedProdInfo = {
      ...updatedProdInfo,
      ml_id: item_id,
      seller,
      price,
    };
  }

  return updatedProdInfo;
};

const checkForUpdatesOnCatalogueProduct = async (product) => {
  const productInfo = await getCatalogueProductInfoFromML(product.catalogue_id);

  let updatedProductInfo = { isUpdated: false };

  // if current ad isn't buybox winner
  if (productInfo.buy_box_winner.item_id !== product.ml_id) {
    const { status } = productInfo;
    const { item_id, seller_id, price } = productInfo.buy_box_winner;

    seller = await getSellerNicknameFromML(seller_id);
    updatedProductInfo = {
      isUpdated: true,
      ml_id: item_id,
      seller,
      price,
      status,
    };
  }

  return updatedProductInfo;
};

module.exports = {
  getVisits,
  getProductIdsFromML,
  refreshMLToken,
  getProductInfoFromML,
  getSellerNicknameFromML,
  checkForUpdatesOnCatalogueProduct,
  checkCatalogueInfo,
};

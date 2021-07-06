const axios = require("axios");
const { JSDOM } = require("jsdom");

exports.readSellsOnMlPage = async (url) => {
  let val = 0;
  await axios
    .get(url)
    .then((res) => {
      let html_data = res.data;
      const { document } = new JSDOM(html_data).window;
      const sellsTextbox = document.querySelector(".ui-pdp-subtitle").innerHTML;

      re_match = sellsTextbox.match(/(\d+)/);
      val = re_match ? Number(re_match[1]) : 0;
    })
    .catch((err) => {
      let ts_now = new Date(
        Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
      ).toISOString();
      ts_now =
        ts_now.substr(0, 10) + " " + ts_now.substr(11, ts_now.length - 16);
      console.log(`[${ts_now}] Error in extracting sells from URL ${url}`);
    });
  return val;
};

exports.getImageURL = async (url) => {
  let imageUrl = "none";

  await axios
    .get(url)
    .then((res) => {
      let html_data = res.data;
      const { document } = new JSDOM(html_data).window;
      const figComponent = document.querySelector(
        ".ui-pdp-gallery__figure__image"
      );
      imageUrl = figComponent.src;
    })
    .catch((err) => {
      console.log(`Error in extracting image from URL ${url}`);
    });
  return imageUrl;
};

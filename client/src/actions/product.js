import axios from "axios";
import {
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  QUERY_PRODUCTS,
  ADD_PRODUCT,
  ERROR_ADD_PRODUCT,
} from "./types";
import { setAlert } from "./alert";

export const loadProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products");
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data.products,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: { msg: "error" },
    });
  }
};

export const addProduct = ({ name, url, categories }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, url, categories });
  try {
    const res = await axios.post("/api/products", body, config);
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data.product,
    });
    dispatch(loadProducts());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
    dispatch({
      type: ERROR_ADD_PRODUCT,
    });
  }
};

// export const queryProducts = ({ dateIni, dateEnd, productName }) => async (
//   dispatch
// ) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({ dateIni, dateEnd, productName });

//   try {
//     const res = await axios.post("/api/products/query", body, config);
//     console.log(res.data);
//     dispatch({
//       type: GET_PRODUCTS,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: PRODUCTS_ERROR,
//       // payload: { msg: err.response.statusText, status: err.response.status },
//       payload: { msg: "error" },
//     });
//   }
// };

export const queryProducts = (products, productName) => async (dispatch) => {
  const query = products.filter((product) =>
    product.name.toUpperCase().includes(productName.toUpperCase())
  );
  dispatch({
    type: QUERY_PRODUCTS,
    payload: query,
  });
};

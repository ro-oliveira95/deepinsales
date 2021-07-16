import axios from "axios";
import {
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  QUERY_PRODUCTS,
  ADD_PRODUCT,
  ERROR_ADD_PRODUCT,
  LOADING_PRODUCT,
  DELETE_PRODUCT,
  DELETE_CATEGORY_FROM_PRODUCT,
} from "./types";
import { setAlert } from "./alert";
import { loadRecords } from "./record";

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

export const deleteCategoryFromProduct =
  (productId, categoryName) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ productId, categoryName });
    try {
      const res = await axios.post(
        "/api/products/category/delete",
        body,
        config
      );
      dispatch({
        type: DELETE_CATEGORY_FROM_PRODUCT,
      });
      dispatch(loadProducts());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
      }
    }
  };

export const addProduct =
  ({ name, url, categories }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, url, categories });
    try {
      dispatch({
        type: LOADING_PRODUCT,
      });
      const res = await axios.post("/api/products", body, config);
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data.product,
      });
      dispatch(loadProducts());
      dispatch(loadRecords());
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

export const queryProducts = (products, productName) => async (dispatch) => {
  const query = products.filter(
    (product) =>
      product.name.toUpperCase().includes(productName.toUpperCase()) ||
      product.category
        .map((cat) => cat.name)
        .reduce((acc, curr) => acc.concat(curr), "")
        .toUpperCase()
        .includes(productName.toUpperCase())
  );
  dispatch({
    type: QUERY_PRODUCTS,
    payload: query,
  });
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({
    type: LOADING_PRODUCT,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ productId });
  try {
    const res = await axios.post("/api/products/delete", body, config);

    dispatch({
      type: DELETE_PRODUCT,
    });
    dispatch(loadProducts());
    dispatch(loadRecords());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

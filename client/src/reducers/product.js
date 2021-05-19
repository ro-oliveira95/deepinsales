import {
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  QUERY_PRODUCTS,
  ADD_PRODUCT,
  ERROR_ADD_PRODUCT,
} from "../actions/types";

const initialState = {
  products: [],
  productsInView: [],
  loading: true,
  error: {},
};

function productReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case QUERY_PRODUCTS:
      return {
        ...state,
        productsInView: payload,
        loading: false,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        productsInView: payload,
        loading: false,
      };
    case ADD_PRODUCT:
    case ERROR_ADD_PRODUCT:
      return {
        ...state,
        loading: false,
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        products: [],
        productsInView: [],
      };
    default:
      return state;
  }
}

export default productReducer;

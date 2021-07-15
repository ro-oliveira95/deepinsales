import {
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  QUERY_PRODUCTS,
  ADD_PRODUCT,
  ERROR_ADD_PRODUCT,
  LOADING_PRODUCT,
  DELETE_PRODUCT,
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
    case DELETE_PRODUCT:
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
    case LOADING_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

export default productReducer;

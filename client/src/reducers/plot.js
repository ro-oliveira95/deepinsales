import { GET_PLOT_ITEMS } from "../actions/types";

const initialState = {
  plotItems: [],
};

function plotReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PLOT_ITEMS:
      return {
        ...state,
        plotItems: payload,
      };
    default:
      return state;
  }
}

export default plotReducer;

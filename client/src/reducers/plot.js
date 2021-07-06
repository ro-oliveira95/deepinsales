import { TOGGLE_PLOT_ITEM } from "../actions/types";

const initialState = {
  plotItems: [],
};

function plotReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_PLOT_ITEM:
      return {
        ...state,
        plotItems: payload,
      };
    default:
      return state;
  }
}

export default plotReducer;

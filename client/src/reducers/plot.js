import { TOGGLE_PLOT_ITEM, TOGGLE_PLOT_VISUALIZATION } from "../actions/types";

const initialState = {
  plotItems: [],
  visualization: "acumulated",
};

function plotReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_PLOT_ITEM:
      return {
        ...state,
        plotItems: payload,
      };
    case TOGGLE_PLOT_VISUALIZATION:
      return {
        ...state,
        visualization: payload,
      };
    default:
      return state;
  }
}

export default plotReducer;

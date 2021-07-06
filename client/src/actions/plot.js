import { TOGGLE_PLOT_ITEM } from "./types";

export const togglePlotItem =
  (plotItems, item, isPloted) => async (dispatch) => {
    const newPlotItems = isPloted
      ? [...plotItems, item]
      : plotItems.filter((plotItem) => plotItem !== item);
    dispatch({
      type: TOGGLE_PLOT_ITEM,
      payload: newPlotItems,
    });
  };

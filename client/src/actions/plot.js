import { loadRecords } from "./record";
import { TOGGLE_PLOT_ITEM, TOGGLE_PLOT_VISUALIZATION } from "./types";

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

export const togglePlotVisualization = (isDaily) => async (dispatch) => {
  let payload;
  if (isDaily) {
    payload = "daily";
  } else {
    payload = "acumulated";
  }
  dispatch({
    type: TOGGLE_PLOT_VISUALIZATION,
    payload,
  });
};

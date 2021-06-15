import { GET_PLOT_ITEMS } from "./types";

export const addPlotItem = (plotItems, item) => async (dispatch) => {
  // console.log(plotItems);
  let newPlotItems = plotItems;
  // newPlotItems.push(item);
  dispatch({
    type: GET_PLOT_ITEMS,
    payload: newPlotItems,
  });
};

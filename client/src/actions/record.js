import axios from "axios";
import { GET_RECORDS, RECORDS_ERROR } from "./types";

export const loadRecords = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/records");
    console.log("aqui");
    dispatch({
      type: GET_RECORDS,
      payload: res.data.records,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: RECORDS_ERROR,
      payload: { msg: "error" },
    });
  }
};

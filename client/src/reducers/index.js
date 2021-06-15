import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import product from "./product";
import records from "./records";
import plot from "./plot";

export default combineReducers({ alert, auth, product, records, plot });

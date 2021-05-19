import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

const initalState = {};

// FONTE DO ERRO vvv
// const middleware = [thunkMiddleware];

const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;

import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middlware = [thunk];
const initialState = {};

export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlware))
);

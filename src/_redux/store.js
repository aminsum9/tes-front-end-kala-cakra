import { createStore, combineReducers, applyMiddleware } from "redux";

import { login } from "../_reducers/login";
import { countries } from "../_reducers/country";
import { province } from "../_reducers/province";
import { cities } from "../_reducers/city";

import { promise, logger } from "./middleware";

//GET All reducers avaiable
const rootReducers = combineReducers({
  cities,
  province,
  countries,
  login
});

//SetUp Store Redux
const store = createStore(rootReducers, applyMiddleware(promise, logger));

export default store;

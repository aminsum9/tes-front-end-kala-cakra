import { GET_ALL_CITY } from "../config/constants";

const initialState = {
  cities: [],
  isLoading: false,
  error: false
};

export const cities = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_CITY}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_ALL_CITY}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        cities: action.payload.data,
        isLoading: false
      };
    case `${GET_ALL_CITY}_REJECTED`:
      return {};
    default:
      return state;
  }
};

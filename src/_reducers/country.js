import { GET_ALL_COUNTRY } from "../config/constants";

const initialState = {
  countries: [],
  isLoading: false,
  error: false
};

export const countries = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_COUNTRY}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_ALL_COUNTRY}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        countries: action.payload.data,
        isLoading: false
      };
    case `${GET_ALL_COUNTRY}_REJECTED`:
      return {};
    default:
      return state;
  }
};

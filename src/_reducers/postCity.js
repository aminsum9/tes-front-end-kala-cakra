import { POST_CITY } from "../config/constants";

const initialState = {
  cities: [],
  isLoading: false,
  error: false
};

export const cities = (state = initialState, action) => {
  switch (action.type) {
    case `${POST_CITY}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${POST_CITY}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        cities: action.payload.data,
        isLoading: false
      };
    case `${POST_CITY}_REJECTED`:
      return {};
    default:
      return state;
  }
};

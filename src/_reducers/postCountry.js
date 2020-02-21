import { POST_COUNTRY } from "../config/constants";

const initialState = {
  country: [],
  isLoading: false,
  error: false
};

export const countries = (state = initialState, action) => {
  switch (action.type) {
    case `${POST_COUNTRY}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${POST_COUNTRY}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        country: action.payload.data,
        isLoading: false
      };
    case `${POST_COUNTRY}_REJECTED`:
      return {};
    default:
      return state;
  }
};

import { POST_PROVINCE } from "../config/constants";

const initialState = {
  province: [],
  isLoading: false,
  error: false
};

export const addProvince = (state = initialState, action) => {
  switch (action.type) {
    case `${POST_PROVINCE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${POST_PROVINCE}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        province: action.payload.data,
        isLoading: false
      };
    case `${POST_PROVINCE}_REJECTED`:
      return {};
    default:
      return state;
  }
};

import { GET_ALL_PROVINCE } from "../config/constants";

const initialState = {
  province: [],
  isLoading: false,
  error: false
};

export const province = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_PROVINCE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_ALL_PROVINCE}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        province: action.payload.data,
        isLoading: false
      };
    case `${GET_ALL_PROVINCE}_REJECTED`:
      return {};
    default:
      return state;
  }
};

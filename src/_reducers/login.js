import { POST_LOGIN } from "../config/constants";

const initialState = {
  token: "",
  isLoading: false,
  error: false
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    case `${POST_LOGIN}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${POST_LOGIN}_FULFILLED`:
      console.log(action.payload);
      return {
        ...state,
        token: action.payload.data,
        isLoading: false
      };
    case `${POST_LOGIN}_REJECTED`:
      return {};
    default:
      return state;
  }
};

import { POST_LOGIN } from "../config/constants";
import axios from "axios";
//Setup Action Redux INC
export const postLogin = data => {
  console.log(data);
  return {
    type: POST_LOGIN,
    payload: axios({
      method: "POST",
      url: "http://backend-dev.cakra-tech.co.id/api/login",
      data: data
    })
  };
};

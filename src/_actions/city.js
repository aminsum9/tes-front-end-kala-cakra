import { GET_ALL_CITY, POST_CITY } from "../config/constants";
import axios from "axios";

//get All Province
export const getCities = () => {
  const token = localStorage.getItem("token");
  return {
    type: GET_ALL_CITY,
    payload: axios({
      method: "GET",
      url: "http://backend-dev.cakra-tech.co.id/api/city",
      headers: {
        Authorization: "Bearer " + token
      }
    })
  };
};

//add City
export const postCity = data => {
  const token = localStorage.getItem("token");
  return {
    type: POST_CITY,
    payload: axios({
      method: "POST",
      url: "http://backend-dev.cakra-tech.co.id/api/city",
      data: data,
      headers: {
        Authorization: "Bearer " + token
      }
    })
  };
};

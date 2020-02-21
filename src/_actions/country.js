import { GET_ALL_COUNTRY, POST_COUNTRY } from "../config/constants";
import axios from "axios";

//get All Countries
export const getCountries = () => {
  const token = localStorage.getItem("token");
  return {
    type: GET_ALL_COUNTRY,
    payload: axios({
      method: "GET",
      url: "http://backend-dev.cakra-tech.co.id/api/country",
      headers: {
        Authorization: "Bearer " + token
      }
    })
  };
};

//post Country
export const postCountry = data => {
  const token = localStorage.getItem("token");
  return {
    type: POST_COUNTRY,
    payload: axios({
      method: "POST",
      url: "http://backend-dev.cakra-tech.co.id/api/country",
      data: data,
      headers: {
        Authorization: "Bearer " + token
      }
    })
  };
};

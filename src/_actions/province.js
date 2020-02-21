import { GET_ALL_PROVINCE, POST_PROVINCE } from "../config/constants";
import axios from "axios";

//get All Province
export const getProvince = () => {
  const token = localStorage.getItem("token");
  return {
    type: GET_ALL_PROVINCE,
    payload: axios({
      method: "GET",
      url: "http://backend-dev.cakra-tech.co.id/api/province",
      headers: {
        Authorization: "Bearer " + token
      }
    })
  };
};

//post Province
export const postProvince = data => {
  const token = localStorage.getItem("token");
  return {
    type: POST_PROVINCE,
    payload: axios({
      method: "POST",
      url: "http://backend-dev.cakra-tech.co.id/api/province",
      data: data,
      headers: {
        Authorization: "Bearer " + token
      }
    })
  };
};

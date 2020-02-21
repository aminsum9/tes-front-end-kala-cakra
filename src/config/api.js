import axios from "axios";
import React from "react";

export const register = data => {
  return axios
    .post(`http://backend-dev.cakra-tech.co.id/api/register`, data)
    .then(response => {
      const token = response.data.token;
      localStorage.setItem("token", token);
      return response.data;
    });
};

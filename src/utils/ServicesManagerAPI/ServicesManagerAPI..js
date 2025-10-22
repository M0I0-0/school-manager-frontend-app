import axios from "axios";

const API = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  baseURL: process.env.REACT_APP_SERVICES_MANAGER_API,
});

export default API;
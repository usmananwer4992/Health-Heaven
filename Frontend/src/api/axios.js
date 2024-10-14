import axios from "axios";
require("dotenv").config();

const REACT_APP_BASE_URL = "https://nextgen.dev.healthhavenrx.com/api";

export default axios.create({
  baseURL: REACT_APP_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

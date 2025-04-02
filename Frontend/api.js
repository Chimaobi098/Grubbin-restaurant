import axios from "axios";

const baseURL =
  import.meta.env.VITE_NODE_ENV == "production"
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default API;

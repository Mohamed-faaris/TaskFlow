export const API_URL = import.meta.env.VITE_API_URL || "";
console.log("API URL:", API_URL);

// Configure axios defaults
import axios from "axios";
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

import axios from "axios";

const API_URL = 'https://hospital-m9e5.onrender.com';
const API = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: { "Content-Type": "application/json" },
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);

export default API;

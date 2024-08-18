import axios from "axios";

const API = axios.create({ baseURL: "https://ecommerce-backend-n793.onrender.com/api/auth" });

export const login = (formData) => API.post("/login", formData);
export const signup = (formData) => API.post("/signup", formData);

import axios from "axios";

const API = axios.create({ baseURL: "https://ecommerce-backend-n793.onrender.com/api/auth" });

//login
export const login = (formData) => API.post("/login", formData);

//signup
export const signup = (formData) => API.post("/signup", formData);

// Fetch user profile
export const fetchUserProfile = () => 
    API.get("/profile", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

// Update user profile
export const updateUserProfile = (profileData) =>
    API.put("/profile", profileData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
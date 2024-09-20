import axios from "axios";

//baseURL: "http://localhost:5000/api/auth",
const API = axios.create({
  baseURL: "https://ecommerce-backend-n793.onrender.com/api/auth",
});

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


  //password update
export const updatePassword = (passwordData) =>
  API.put("/profile/update-password", passwordData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

//email update
export const updateEmail = (emailData) =>
  API.put("/profile/update-email", emailData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateAddress = (addressData) =>
  API.put("/address", addressData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

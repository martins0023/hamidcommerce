import axios from "axios";

//const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
//baseURL: "http://localhost:5000/api/auth",
//https://ecommerce-backend-n793.onrender.com/api/auth,
const API = axios.create({
  // baseURL: "https://ecommerce-backend-n793.onrender.com/api/auth",
  baseURL: "http://localhost:5000/api/auth",
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

// Upload Image to Cloudinary
export const uploadImageToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hamidcommerce"); // Replace with your preset
    formData.append("cloud_name", "ds1tswazd"); // Replace with your cloud name

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/ds1tswazd/image/upload",
      formData
    );

    return response.data.secure_url; // Returns the image URL
  } catch (error) {
    console.error("Cloudinary Upload Error: ", error.message);
    throw error;
  }
};

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

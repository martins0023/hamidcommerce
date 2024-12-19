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

// Logout
export const logout = async () => {
  try {
    // Make a request to the server to clear the session
    await API.post("/logout", null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Clear local storage (or other client-side storage)
    localStorage.removeItem("token");
    return { success: true, message: "Logout successful" };
  } catch (error) {
    console.error("Logout Error:", error.message);
    throw error;
  }
};

// Store card details
export const storeCard = async (cardData) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve JWT from local storage
    const response = await API.post("/store-card", cardData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Store Card Error:", error);
    throw error;
  }
};

export const fetchCards = async (userId) => {
  try {
    const response = await axios.get(`/get-cards/${userId}`);
    if (response.data.success) {
      return response.data.cards;
    } else {
      console.error("Error fetching cards:", response.data.error);
      return [];
    }
  } catch (error) {
    console.error("Fetch Cards Error:", error);
    return [];
  }
};

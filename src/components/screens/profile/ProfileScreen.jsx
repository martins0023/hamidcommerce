import React, { useState, useEffect } from "react";
import { add, check, person } from "../../../assets";
import MyButton from "../../reusable/MyButton";
import Modal from "react-modal";
import { fetchUserProfile, updateUserProfile, uploadImageToCloudinary } from "../../../api/auth";

const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [convertmodalIsOpen, setConvertModalIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(person); // Default profile image
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [imageFile, setImageFile] = useState(null); // File to upload
  const [phonenumber, setPhonenumber] = useState("");

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, redirecting to login");
          return;
        }
        const { data } = await fetchUserProfile();

        // Format birthday to "yyyy-MM-dd"
        let formattedBirthday = " ";
        if (data.birthday) {
          try {
            formattedBirthday = new Date(data.birthday)
              .toISOString()
              .slice(0, 10);
          } catch (err) {
            console.error("Error formatting birthday:", err);
          }
        }
        setUsername(data.Username || " ");
        setEmail(data.Email || " ");
        setGender(data.gender || " ");
        setBirthday(formattedBirthday || " ");
        setPhonenumber(data.phonenumber || " ");
        setProfileImage(data.profileImage || person);
      } catch (error) {
        console.error("Failed to fetch user data", error.response || error);
      }
    };
    getUserProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Save file for upload
      setProfileImage(URL.createObjectURL(file)); // Preview image
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return profileImage; // Skip upload if no new file selected

    try {
      const imageUrl = await uploadImageToCloudinary(imageFile); // Upload to Cloudinary
      return imageUrl; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Failed to upload image to Cloudinary", error);
      alert("Image upload failed. Please try again.");
      return profileImage; // Fallback to current image
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadedImageUrl = await uploadImage();
      const { data } = await updateUserProfile({
        Username,
        Email,
        gender,
        birthday,
        phonenumber,
        profileImage: uploadedImageUrl,
      });
      console.log("Profile update payload:", {
        Username,
        Email,
        gender,
        birthday,
        phonenumber,
        profileImage: uploadedImageUrl,
      });
      
      console.log("Profile updated successfully:", data);
      alert("Profile updated successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("An error occurred while updating the profile");
      // setLoading(false);
    }
  };

  return (
    <div className="pb-20">
      <form onSubmit={handleUpdateProfile}>
        <div className="bg-[#E9F1FD]">
          <div className="relative flex items-center flex-col justify-center pt-5 pb-5">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-[86px] h-[86px] rounded-full"
                onError={() => setProfileImage(person)}
              />
              <label
                htmlFor="fileInput"
                className="absolute bottom-0 right-0 w-[24px] h-[24px] bg-white rounded-full border border-[#E9F1FD] cursor-pointer flex items-center justify-center"
              >
                <img src={add} className="w-[16px] h-[16px]" alt="Add Icon" />
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                id="fileInput"
                className="hidden"
                accept="image/*"
              />
            </div>
            <p className="text-[#00000079] text-[14px] font-medium mt-3">
              Upload a profile
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] justify-between p-3">
          <div className="mt-[35px] flex flex-col gap-[20px] m-2">
            <label className="flex flex-col">
              <span className="text-black font-medium">Username</span>
              <input
                type="text"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="bg-[#EFF2F8] py-4 px-6 placeholder:text-secondary text-black border-0 
                rounded-md outline-none font-medium border-1 text-[12px] h-[59px] lg:w-full w-full"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-black font-medium">Email</span>
              <input
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="bg-[#EFF2F8] py-4 px-6 placeholder:text-secondary text-black border-0 
                rounded-md outline-none font-medium border-1 text-[12px] h-[59px] lg:w-full w-full"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-black font-medium">Birthday</span>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="bg-[#EFF2F8] py-4 px-6 placeholder:text-secondary text-black border-0 
                rounded-md outline-none font-medium border-1 text-[12px] h-[59px] lg:w-full w-full"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-black font-medium mb-2">Gender</span>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="form-radio h-[20px] w-[20px] mr-2"
                />
                <span className="text-black font-medium mr-4">Male</span>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="form-radio h-[20px] w-[20px] mr-2"
                />
                <span className="text-black font-medium">Female</span>
              </div>
            </label>
            <label className="flex flex-col">
              <span className="text-black font-medium">Mobile Number</span>
              <input
                type="tel"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                placeholder="+123 4567 974"
                className="bg-[#EFF2F8] py-4 px-6 placeholder:text-secondary text-black border-0 
                rounded-md outline-none font-medium border-1 text-[12px] h-[59px] lg:w-full w-full"
              />
            </label>
            <MyButton isFormValid={isFormValid} loading={loading} buttonText="Save Changes" type="submit" />
          </div>
        </div>
      </form>
      <Modal
        isOpen={convertmodalIsOpen}
        onRequestClose={() => setConvertModalIsOpen(false)}
        contentLabel="SUCCESS"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-7">
          <img src={check} alt="Success" className="w-full" />
          <p className="font-semibold text-[20px] text-[#000000] text-center">
            Success
          </p>
          <p className="text-center text-[14px] text-[#000000]">
            Profile Updated!
          </p>
          <button
            onClick={() => setConvertModalIsOpen(false)}
            className="mt-6 bg-[#1673CA] py-3 px-20 text-[#FFFF] rounded-full w-full"
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileScreen;

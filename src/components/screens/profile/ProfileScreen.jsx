import React, { useState, useEffect } from "react";
import { add, check, person } from "../../../assets";
import MyButton from "../../reusable/MyButton";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { fetchUserProfile, updateUserProfile } from "../../../api/auth";

const ProfileScreen = () => {
  const [convertmodalIsOpen, setConvertModalIsOpen] = useState(false);

  const convertopenModal = () => {
    setConvertModalIsOpen(true);
  };

  const convertcloseModal = () => {
    setConvertModalIsOpen(false);
  };
  const [profileImage, setProfileImage] = useState(person); // Default profile image
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");

  // Fetch existing user data
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data } = await fetchUserProfile();
        setUsername(data.Username || " ");
        setEmail(data.Email || " ");
        setGender(data.gender || " ");
        setBirthday(data.birthday || " ");
        if (data.profileImage) setProfileImage(data.profileImage || person);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    getUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await updateUserProfile({
        Username,
        Email,
        gender,
        birthday,
        profileImage,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  // Handle image upload and preview
  {
    /*const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };*/
  }
  return (
    <div className="pb-20">
      <div>
        <form onSubmit={handleUpdateProfile}>
          <div className="bg-[#E9F1FD]">
            <div className="relative flex items-center flex-col justify-center pt-5 pb-5">
              <div className="relative">
                <img
                  src={profileImage}
                  className="w-[86px] h-[86px] rounded-full"
                  onError={() => setProfileImage(person)}
                />
                <img
                  src={add}
                  className="w-[24px] h-[24px] absolute bottom-0 right-0 bg-white rounded-full border border-[#E9F1FD]"
                />
                <label
                  htmlFor="fileInput"
                  className="absolute bottom-0 right-0 w-[24px] h-[24px] bg-white rounded-full border border-[#E9F1FD] cursor-pointer flex items-center justify-center"
                >
                  <img src={add} className="w-[16px] h-[16px]" alt="Add Icon" />
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setProfileImage(URL.createObjectURL(e.target.files[0]))
                  }
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
                <span className="text-black font-medium ">Username</span>
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
                <span className="text-black font-medium ">Email</span>
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
                <span className="text-black font-medium ">Birthday</span>
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
                    className="form-radio text-primary border-primary rounded-full h-[20px] w-[20px] mr-2"
                  />
                  <span className="text-black font-medium mr-4">Male</span>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-radio text-primary border-primary rounded-full h-[20px] w-[20px] mr-2"
                  />
                  <span className="text-black font-medium">Female</span>
                </div>
              </label>

              <MyButton
                buttonText="Save Changes"
                type="button"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center ">
        <Modal
          isOpen={convertmodalIsOpen}
          onRequestClose={convertcloseModal}
          contentLabel="SUCCESS"
          className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-10"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-7 flex flex-col items-center m-3">
            <div className="p-3 flex justify-center items-center">
              <img
                src={check}
                alt="success"
                className="w-full h-auto items-center"
              />
            </div>
            <div className="mb-4">
              <p className="font-semibold text-[20px] text-[#000000] text-center">
                Success
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="font-normal text-center text-[14px] text-[#000000]">
                Profile Updated!
              </p>
            </div>
            <div className="flex flex-col w-full gap-[1px]">
              <button
                onClick={convertcloseModal}
                className="mt-6 bg-[#1673CA] font-montserrat py-3 px-20 text-[#FFFF] border-[1.5px] hover:bg-[#1673ca3b] rounded-full uppercase w-full h-[53px]"
              >
                OK
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProfileScreen;

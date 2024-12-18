import React, { useState, useEffect } from "react";
import MyButton from "../../reusable/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../../../styles";
import { back_icon, person } from "../../../assets";
import { fetchUserProfile, updateUserProfile } from "../../../api/auth";

const ChangeEmail = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0, x: "-100vw" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 50, staggerChildren: 0.3 },
    },
    exit: {
      x: "100vw",
      opacity: 0,
      transition: { ease: "easeInOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  const [profileImage, setProfileImage] = useState(person); // Default profile image
  const [Email, setEmail] = useState("");

  // Fetch existing user data
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, redirecting to login");
          // Redirect to login if no token is found
          return;
        }
        const { data } = await fetchUserProfile();
        setEmail(data.Email || " ");
        console.log("Fetched User Data:", data);
        if (data.profileImage) setProfileImage(data.profileImage || person);
      } catch (error) {
        console.error("Failed to fetch user data", error.response || error);
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, redirecting to login");
          // Handle unauthorized access (e.g., redirect to login)
        }
      }
    };
  
    getUserProfile();
  }, []);
  return (
    <section className="bg-[#FBFCFF]">
      <motion.div
        className="dashboard-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <nav
          className={`${styles.paddingX} w-full h-[80px] flex items-center justify-between py-1 top-0 z-20 bg-white`}
        >
          <div className="flex items-center w-full px-3">
            <Link
              to=""
              onClick={() => {
                navigate(-1);
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={back_icon}
                alt="back"
                className="cursor-pointer w-[26px] h-[20px]"
              />
            </Link>

            {/* This div takes up the remaining space and centers the text */}
            <div className="flex-grow flex justify-center">
              <p className="text-gray-400 text-[14px] text-center">
                Change Email
              </p>
            </div>
          </div>
        </nav>

        <div className="pb-2">
          <div className="bg-[#E9F1FD]">
            <div className="flex p-8 flex-col pt-5 pb-5">
              <div className="flex flex-col">
                <p className="text-black font-medium text-[14px]">
                  Use this form to change your <br />
                  email address.
                </p>
                <p className="text-[#00000070] text-[14px] font-normal">
                  You will need to confirm your new address in an email we send
                  you.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          <p className="text-black text-[14px] font-normal">
            Current Email Address
          </p>
          <p className="text-[#1673CA] text-[14px] font-normal">
            {Email}
          </p>
        </div>

        <div className="flex flex-col gap-[20px] justify justify-between p-3">
          <form className=" flex flex-col gap-[20px] m-2">
            <label className="flex flex-col">
              <span className="text-black font-medium ">New Email Address</span>
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-[#EFF2F8] py-4 px-6 placeholder:text-secondary text-black border-0 
                      rounded-md outline-none font-medium border-1 text-[12px] h-[59px] lg:w-full w-full"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-black font-medium ">
                Confirm New email address
              </span>
              <input
                type="email"
                placeholder="Confirm new email address"
                className="bg-[#EFF2F8] py-4 px-6 placeholder:text-secondary text-black border-0 
                      rounded-md outline-none font-medium border-1 text-[12px] h-[59px] lg:w-full w-full"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-black font-medium ">
                Enter your Password
              </span>
              <input
                type="password"
                placeholder="Password"
                className="bg-[#EFF2F8] py-4 px-6 placeholder:text-secondary text-black border-0 
                      rounded-md outline-none font-medium border-1 text-[12px] h-[59px] lg:w-full w-full"
              />
            </label>

            <MyButton buttonText="Save Changes" />
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export default ChangeEmail
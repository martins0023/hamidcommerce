import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import axios from "axios";
import { styles } from "../../styles";
import {
  logo,
  menu,
  user,
  notification,
  person,
  search,
  logo1,
  logotext,
  logo_blue,
} from "../../assets";
import SearchBar from "../screens/SearchBar";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [profileImage, setProfileImage] = useState(person); // Default profile image

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (data.profileImage) {
          setProfileImage(data.profileImage);
        }
      } catch (error) {
        console.error("Failed to fetch profile image", error);
      }
    };

    fetchUserProfile();
  }, []);
  return (
    <nav
      className={`${styles.paddingX} w-full h-[190px] rounded-br-[41px] rounded-bl-[41px] flex flex-col justify-center justify-items-center py-1 top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between pr-3 pl-3">
        <Link
          to="/"
          className="flex items-center "
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <Link to="/settings">
            <img src={menu} alt="apps" className="cursor-pointer" />
          </Link>
        </Link>

        <div className="flex items-center justify-center justify-items-center h-20">
          <div className="">
            <Typewriter
              options={{
                strings: ["Quick", "Buy"],
                autoStart: true,
                loop: true,
              }}
            />
            <style jsx>{`
              div {
                font-size: 18px; /* Set font size to 14px */
              }
            `}</style>
          </div>
        </div>

        <ul className="flex list-none sm:flex flex-row items-center gap-2">
          <Link to="/profile">
            <img
              src={profileImage}
              alt="profile"
              className="w-[38px] h-[38px] object-contain border-solid rounded-[70px] border-gray-700"
            />
          </Link>
          <Link to="/notifications">
            <img
              src={notification}
              alt="notification"
              className="cursor-pointer w-[37px] h-[37px]"
            />
          </Link>
        </ul>
      </div>

      <SearchBar />
    </nav>
  );
};

export default Navbar;

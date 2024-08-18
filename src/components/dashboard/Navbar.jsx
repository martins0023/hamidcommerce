import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../../styles";
import { logo, menu, user, notification, person, search } from "../../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
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
          <Link to="">
            <img src={menu} alt="apps" className="cursor-pointer" />
          </Link>
        </Link>

        <div className="flex items-center justify-center justify-items-center">
          <img src={logo} alt="logo" className="w-[90px] h-[71px]" />
        </div>

        <ul className="flex list-none sm:flex flex-row items-center gap-2">
          <img
            src={person}
            alt="person"
            className="w-[38px] h-[38px] object-contain border-solid rounded-[70px] border-gray-700"
          />
          <Link to="/notifications">
            <img
              src={notification}
              alt="notification"
              className="cursor-pointer w-[37px] h-[37px]"
            />
          </Link>
        </ul>
      </div>

      <div className="flex flex-row gap-4 items-center relative mt-2 mr-3 ml-3">
        <input
          type="text"
          name="keyword"
          placeholder="Search for Products, Brands..."
          className="bg-white py-4 w-full pl-5 border text-[12px] placeholder:text-black border-none text-black rounded-full outline-none h-[41px] font-normal"
        />
        <img
          src={search}
          alt="Search"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-[17.49] h-[17.49]"
        />
      </div>
    </nav>
  );
};

export default Navbar;

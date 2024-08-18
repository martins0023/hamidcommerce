import React from "react";
import { arrow_back_ios, dropdown, naira } from "../../assets";
import { Link, useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center shadow-card mt-4">
      <Link
        to="/"
        className="flex m-1"
        onClick={() => {
          navigate(-1);
          window.scrollTo(0, 0);
        }}
      >
        <img
          src={arrow_back_ios}
          alt="back"
          className="w-[22px] h-[22px] object-contain"
        />
        <p className="text-black justify-center ml-5 font-semibold text-[14px]">
          Buy Cable
        </p>
      </Link>
    </div>
  );
};

export default Back;

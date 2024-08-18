import React from "react";
import { styles } from "../../styles";
import {
  electronics,
  games,
  man,
  woman,
  furniture,
  toys,
  laptops,
  phones,
} from "../../assets";
import { Link } from "react-router-dom";

const Explore = () => {
  return (
    <section className={`${styles.sectionPadding}`}>
      <div className="flex flex-row justify-between">
        <p className="text-[16px] text-black font-semibold">Explore</p>
        <p className="text-opacity-41 text-[12px] text-[#0000008f] cursor-pointer">
          see all
        </p>
      </div>
      <div>
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex flex-row gap-3">
            <Link to="/men" className="bg-white rounded-xl h-[80px] shadow-sm w-full flex flex-col justify-center items-center justify-items-center gap-2">
              <img src={man} className="w-[20px] h-[20px]" />
              <p className="text-black text-[10px] font-normal">Man</p>
            </Link>

            <Link to="/women" className="bg-white rounded-xl h-[80px] shadow-sm w-full flex flex-col justify-center items-center justify-items-center gap-2">
              <img src={woman} className="w-[20px] h-[20px]" />
              <p className="text-black text-[10px] font-normal">Woman</p>
            </Link>
            <Link to="" className="bg-white rounded-xl h-[80px] shadow-sm w-full flex flex-col justify-center items-center justify-items-center gap-2">
              <img src={electronics} className="w-[20px] h-[20px]" />
              <p className="text-black text-[10px] font-normal">Electronics</p>
            </Link>
            <div className="bg-white rounded-xl h-[80px] shadow-sm w-full flex flex-col justify-center items-center justify-items-center gap-2">
              <img src={games} className="w-[20px] h-[20px]" />
              <p className="text-black text-[10px] font-normal">Games</p>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="bg-white rounded-xl h-[80px] shadow-sm w-full flex flex-col justify-center items-center justify-items-center gap-2">
              <img src={furniture} className="w-[20px] h-[20px]" />
              <p className="text-black text-[10px] font-normal">Furniture</p>
            </div>

            <div className="bg-white rounded-xl h-[80px] shadow-sm w-full flex flex-col justify-center items-center justify-items-center gap-2">
              <img src={toys} className="w-[20px] h-[20px]" />
              <p className="text-black text-[10px] font-normal">Toys</p>
            </div>
            <div className="bg-white rounded-xl h-[80px] shadow-sm w-full flex flex-col justify-center items-center justify-items-center gap-2">
              <img src={laptops} className="w-[20px] h-[20px]" />
              <p className="text-black text-[10px] font-normal">Laptops</p>
            </div>
            <div className="bg-white rounded-xl h-[80px] shadow-sm w-full flex flex-col justify-center items-center justify-items-center gap-2">
              <img src={phones} className="w-[20px] h-[20px]" />
              <p className="text-black text-[10px] font-normal">Phones</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;

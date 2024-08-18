import React, { useState, useEffect } from 'react';
import { styles } from "../../styles";
import {
  dany,
  disney,
  puma,
  hp,
  cents_logo,
  claires,
  levis,
  shopee,
} from "../../assets";

const TopStores = () => {
  // Dummy data for the frontend
  const stores = [
    { id: 1, name: "Dany", logo: dany },
    { id: 2, name: "Disney", logo: disney },
    { id: 3, name: "Puma", logo: puma },
    { id: 4, name: "HP", logo: hp },
    { id: 5, name: "99 Only", logo: cents_logo },
    { id: 6, name: "Claire's", logo: claires },
    { id: 7, name: "Levi's", logo: levis },
    { id: 8, name: "Shopee", logo: shopee },
  ];

  return (
    <section className={`${styles.sectionPadding}`}>
      <div className="flex flex-row justify-between">
        <p className="text-[16px] text-black font-semibold">Top Stores</p>
        <p className="text-opacity-41 text-[12px] text-[#0000008f] cursor-pointer">
          see all
        </p>
      </div>
      <div className=" mt-1">
        {/* Mapping through the dummy data */}
        <div className="grid grid-cols-4 gap-3">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-xl h-[80px] shadow-sm w-full flex flex-col justify-center items-center gap-2"
            >
              <img src={store.logo} alt={store.name} className="w-[28px] h-[28px]" />
              <p className="text-black text-[10px] font-normal">{store.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopStores
import React, { useState, useEffect } from 'react';
import { burberry, cartier, chanel, dany, fendi, hermes, hm, hoodies, jacket, jeans, leggings, lv, shorts, skirts, suit, sweater, zara } from '../../../assets';
import { styles } from '../../../styles';

const TopStores = () => {
  // Dummy data for the frontend
  const stores = [
    { id: 1, name: "Hermes", logo: hermes },
    { id: 2, name: "H & M", logo: hm },
    { id: 3, name: "Zara", logo: zara },
    { id: 4, name: "Louis V", logo: lv },
    { id: 5, name: "Chanel", logo: chanel },
    { id: 6, name: "Cartier", logo: cartier },
    { id: 7, name: "Burberry", logo: burberry },
    { id: 8, name: "Fendi", logo: fendi },
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
              <img src={store.logo} alt={store.name} className="w-[45px] h-[45px]" />
              <p className="text-black text-[10px] font-normal">{store.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopStores
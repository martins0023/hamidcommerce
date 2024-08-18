import React from 'react'
import { styles } from '../../../styles';
import { hoodies, jackets, jeans, pants, polo, shirts, sunglass, top } from '../../../assets';

const Categories = () => {
  const stores = [
    { id: 1, name: "Jeans", logo: jeans },
    { id: 2, name: "Shirt", logo: shirts },
    { id: 3, name: "Jacket", logo: jackets },
    { id: 4, name: "Pants", logo: pants },
    { id: 5, name: "Polo", logo: polo },
    { id: 6, name: "Hoodies", logo: hoodies },
    { id: 7, name: "Accessories", logo: sunglass },
    { id: 8, name: "Shorts", logo: top },
  ];
  return (
    <section className={`${styles.sectionPadding}`}>
      <div className="flex flex-row justify-between">
        <p className="text-[16px] text-black font-semibold">Categories</p>
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
  )
}

export default Categories
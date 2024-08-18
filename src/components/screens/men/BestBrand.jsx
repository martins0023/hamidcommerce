import React, { useState } from "react";
import { bluedress, designerbag, favorite, favorited, femalejean, goldenwatch, handbag, lv_bag, redheels, rosewatch, star_empty, starred, sweater, womenwatch, wristfash } from "../../../assets";
import { styles } from "../../../styles";

const ProductCard = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(product.isFavorited);
  const [rating, setRating] = useState(product.rating);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Call the backend API to save the favorite state
    // Example: await api.saveFavorite(product.id, !isFavorited);
  };

  const handleRating = (newRating) => {
    setRating(newRating);
    // Call the backend API to save the rating
    // Example: await api.saveRating(product.id, newRating);
  };
  return (
    <div className="bg-white rounded-xl h-auto shadow-sm w-[150px] flex flex-col gap-0 p-3 relative">
      <button onClick={toggleFavorite} className="absolute top-2 right-2">
        <img
          src={isFavorited ? favorited : favorite}
          alt="Favorite Icon"
          className="w-5 h-5"
        />
      </button>
      <img
        src={product.image}
        className="w-[131px] h-[130px]"
        alt={product.name}
      />
      <p className="text-[#212C62] text-[11px] font-medium text-left">
        {product.name}
      </p>
      <p className="text-[#00000086] font-normal text-[10px] text-left">
        {product.storeName}
      </p>
      <p className="text-black text-[14px] h-[21px] font-medium text-left">
        {product.price}
      </p>
      <div className="flex items-center text-left">
        {[1, 2, 3, 4, 5].map((index) => (
          <img
            key={index}
            src={index <= rating ? starred : star_empty}
            alt="Star"
            className="w-3 h-3 cursor-pointer"
            onClick={() => handleRating(index)}
          />
        ))}
        <p className="text-[#00000086] font-normal text-[10px] ml-1">
          <span className="font-semibold">{rating.toFixed(1)}</span>(
          {product.reviewsCount})
        </p>
      </div>
    </div>
  );
};

// Example usage:
const products = [
  {
    id: 1,
    name: "Awesome Dress",
    storeName: "Bliss Fashion",
    price: "NGN 15,000",
    image: handbag,
    rating: 3.0,
    reviewsCount: 34000,
    isFavorited: false,
  },
  {
    id: 2,
    name: "Designer Bag",
    storeName: "Bliss Fashion",
    price: "NGN 10,000",
    image: goldenwatch,
    rating: 3.0,
    reviewsCount: 34000,
    isFavorited: false,
  },

  {
    id: 3,
    name: "Red Heels",
    storeName: "Mega Electronics",
    price: "NGN 220,000",
    image: redheels,
    rating: 4.0,
    reviewsCount: 24000,
    isFavorited: false,
  },

  {
    id: 4,
    name: "Louis Vuitton Bag",
    storeName: "Bliss Fashion",
    price: "NGN 20,000",
    image: rosewatch,
    rating: 4.0,
    reviewsCount: 34000,
    isFavorited: true,
  },

  {
    id: 5,
    name: "Women Watch",
    storeName: "Bliss Fashion",
    price: "NGN 20,000",
    image: womenwatch,
    rating: 4.0,
    reviewsCount: 34000,
    isFavorited: true,
  },

  {
    id: 6,
    name: "Fashion Watch",
    storeName: "Bliss Fashion",
    price: "NGN 20,000",
    image: wristfash,
    rating: 4.0,
    reviewsCount: 34000,
    isFavorited: false,
  },

  {
    id: 7,
    name: "Fashion Watch",
    storeName: "Bliss Fashion",
    price: "NGN 20,000",
    image: sweater,
    rating: 4.0,
    reviewsCount: 34000,
    isFavorited: false,
  },
  // Add more products here
];

const BestBrand = () => {
  const firstRowProducts = products.slice(0, 4);
  const secondRowProducts = products.slice(4, 8);

  return (
    <section className={`${styles.sectionPadding}`}>
      <div className="flex flex-row justify-between">
        <p className="text-[16px] text-black font-semibold">Best Brand Product</p>
        <p className="text-opacity-41 text-[12px] text-[#0000008f] cursor-pointer">
          see all
        </p>
      </div>

      <div className="mt-3">
        {/* First Row */}
        <div className="overflow-x-auto">
          <div className="flex flex-row gap-3 w-max">
            {firstRowProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Second Row */}
        <div className="overflow-x-auto mt-4">
          <div className="flex flex-row gap-3 w-max">
            {secondRowProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BestBrand
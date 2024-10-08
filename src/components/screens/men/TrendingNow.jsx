import React, { useState } from "react";
import { favorite, favorited, gown, jacket, lounge_chair, sneakers, star_empty, starred, women_shoes } from "../../../assets";
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
    name: "Furniture Product",
    storeName: "Bliss Furniture",
    price: "NGN 300,000",
    image: jacket,
    rating: 3.0,
    reviewsCount: 34000,
    isFavorited: false,
  },
  {
    id: 2,
    name: "Women Shoe",
    storeName: "Bliss Fashion",
    price: "NGN 70,000",
    image: women_shoes,
    rating: 3.0,
    reviewsCount: 14000,
    isFavorited: false,
  },

  {
    id: 3,
    name: "Teddy Bear",
    storeName: "Fashion Store",
    price: "NGN 20,000",
    image: sneakers,
    rating: 2.0,
    reviewsCount: 2000,
    isFavorited: false,
  },

  {
    id: 4,
    name: "Gown",
    storeName: "Bliss Fashion",
    price: "NGN 20,000",
    image: gown,
    rating: 4.0,
    reviewsCount: 34000,
    isFavorited: true,
  },
  // Add more products here
];

const TrendingNow = () => {
  return (
    <section className={`${styles.sectionPadding}`}>
      <div className="flex flex-row justify-between">
        <p className="text-[16px] text-black font-semibold">Trending Now</p>
        <p className="text-opacity-41 text-[12px] text-[#0000008f] cursor-pointer">
          see all
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex flex-row gap-3 w-max mt-1">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingNow
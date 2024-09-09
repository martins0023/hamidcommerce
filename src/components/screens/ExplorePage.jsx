import React, { useState } from 'react'
import { motion } from "framer-motion";
import BottomNavbar from '../dashboard/BottomNavbar'
import { styles } from '../../styles'
import { electronics,
  games,
  man,
  woman,
  furniture,
  toys,
  laptops,
  phones,
  favorite,
  starred,
  star_empty,
  favorited,
  denim_top,
  black_watch,
  mp,
  denim_bag, } from '../../assets';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(product.isFavorited);
  const [rating, setRating] = useState(product.rating);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleRating = (newRating) => {
    setRating(newRating);
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
    name: "Denim Jacket",
    storeName: "Bliss Fashion",
    price: "NGN 50,000",
    image: denim_top,
    rating: 4.0,
    reviewsCount: 34000,
    isFavorited: false,
  },
  {
    id: 2,
    name: "Watch",
    storeName: "Bliss Store",
    price: "NGN 12,000",
    image: black_watch,
    rating: 3.0,
    reviewsCount: 14000,
    isFavorited: false,
  },
  {
    id: 3,
    name: "Music Player",
    storeName: "Demi Store",
    price: "NGN 40,000",
    image: mp,
    rating: 2.0,
    reviewsCount: 2000,
    isFavorited: false,
  },
  {
    id: 4,
    name: "Denim Bag",
    storeName: "denim store",
    price: "NGN 24,000",
    image: denim_bag,
    rating: 3.0,
    reviewsCount: 14000,
    isFavorited: true,
  },
  {
    id: 5,
    name: "Denim Bag",
    storeName: "denim store",
    price: "NGN 24,000",
    image: denim_bag,
    rating: 3.0,
    reviewsCount: 14000,
    isFavorited: true,
  },
  {
    id: 6,
    name: "Watch",
    storeName: "Bliss Store",
    price: "NGN 12,000",
    image: black_watch,
    rating: 3.0,
    reviewsCount: 14000,
    isFavorited: false,
  },
  {
    id: 7,
    name: "Watch",
    storeName: "Bliss Store",
    price: "NGN 12,000",
    image: black_watch,
    rating: 3.0,
    reviewsCount: 14000,
    isFavorited: false,
  },
  {
    id: 8,
    name: "Denim Jacket",
    storeName: "Bliss Fashion",
    price: "NGN 50,000",
    image: denim_top,
    rating: 4.0,
    reviewsCount: 34000,
    isFavorited: false,
  },
  {
    id: 9,
    name: "Music Player",
    storeName: "Demi Store",
    price: "NGN 40,000",
    image: mp,
    rating: 2.0,
    reviewsCount: 2000,
    isFavorited: false,
  },
  {
    id: 10,
    name: "Denim Jacket",
    storeName: "Bliss Fashion",
    price: "NGN 50,000",
    image: denim_top,
    rating: 4.0,
    reviewsCount: 34000,
    isFavorited: false,
  },
  // Add more products here
];

const ExplorePage = () => {
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
  // Split the products into two rows
  const firstRowProducts = products.slice(0, 4);
  const secondRowProducts = products.slice(4, 8);
  return (
    <section className={` p-5 bg-[#FBFCFF] h-screen `}>
      <motion.div className="pb-3" variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit">
      <div className="flex flex-row justify-between mt-1">
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

        <div className="mt-5 pb-[90px]">
        <p className="text-[16px] text-black font-semibold">Discover</p>
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
      </div>
      </motion.div>
      <BottomNavbar />
    </section>
  )
}

export default ExplorePage
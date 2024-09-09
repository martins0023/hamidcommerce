import React, { useState, useEffect, } from "react";
import { styles } from "../../styles";
import {
  shirt,
  iphone,
  longsleeve,
  favorite,
  starred,
  star_empty,
  favorited,
  black_watch,
  gown,
} from "../../assets";
import { client, urlFor } from "../../../lib/client";
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const imageUrl = product.productImage?.[0]
    ? urlFor(product.productImage[0])
    : 'black_watch';
  const [isFavorited, setIsFavorited] = useState(product.isFavorited);
  const [rating, setRating] = useState(product.rating);

  const navigate = useNavigate();

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

  const handleClick = () => {
    if (product.slug && product.slug.current) {
      navigate(`/products/${product.slug.current}`);
    } else {
      console.error("Product slug is undefined");
    }
  };
  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl h-auto shadow-sm w-[150px] flex flex-col gap-0 p-3 relative cursor-pointer"
    >
      <button onClick={toggleFavorite} className="absolute top-2 right-2">
        <img
          src={isFavorited ? favorited : favorite}
          alt="Favorite Icon"
          className="w-5 h-5"
        />
      </button>
      <img
        src={imageUrl}
        className="w-[131px] h-[130px]"
        alt={product.productName}
      />
      <p className="text-[#212C62] text-[11px] font-medium text-left">
        {product.productName}
      </p>
      <p className="text-[#00000086] font-normal text-[10px] text-left">
        {product.productBrand}
      </p>
      <p className="text-black text-[14px] h-[21px] font-medium text-left">
        NGN {product.productPrice}
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
          <span className="font-semibold">{rating}</span>({product.reviewsCount})
        </p>
      </div>
    </div>
  );
};

// Example usage:
{/*const products = [
  {
    id: 1,
    name: "Naskha Aillean Men’s",
    storeName: "Bliss Fashion",
    price: "NGN 15,000",
    image: shirt,
    rating: 3.0,
    reviewsCount: 34000,
    isFavorited: false,
  },
  {
    id: 2,
    name: "Black Watch",
    storeName: "Bliss Fashion",
    price: "NGN 10,000",
    image: black_watch,
    rating: 3.0,
    reviewsCount: 34000,
    isFavorited: false,
  },

  {
    id: 3,
    name: "Apple Iphone 11 Max",
    storeName: "Mega Electronics",
    price: "NGN 220,000",
    image: iphone,
    rating: 4.0,
    reviewsCount: 24000,
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
];*/}

const MostPopular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const query = `*[_type == "section" && category == "most popular"] {
      _id,
      productName,
      productBrand,
      productPrice,
      productImage,
      rating,
      reviewsCount,
      slug
    }`;

    client.fetch(query).then((data) => {
      console.log("Fetched Products:", data);
      setProducts(data);
    }).catch(console.error);
  }, []);
  return (
    <section className={`${styles.sectionPadding}`}>
      <div className="flex flex-row justify-between">
        <p className="text-[16px] text-black font-semibold">Most Popular</p>
        <p className="text-opacity-41 text-[12px] text-[#0000008f] cursor-pointer">
          see all
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex flex-row gap-3 w-max mt-1">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostPopular;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client, urlFor } from "../../../lib/client";
import { bluedress, favorite, favorited, jeans, star_empty, starred, sweater, topskirt } from "../../assets";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "../../utils/cartcontext";

const Details = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [isFavorited, setIsFavorited] = useState();
  const [rating, setRating] = useState();
  const { dispatch } = useContext(CartContext);

  const navigate = useNavigate();
  
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product._id,
        name: product.productName,
        price: product.productPrice,
        image: product.productImage[0],
      },
    });
    navigate("/cart");
  };

  useEffect(() => {
    const query = `*[_type == "section" && slug.current == $slug][0]{
      _id,
      productName,
      productBrand,
      productPrice,
      productImage,
      productDetails,
      rating,
      reviewsCount,
    }`;

    client.fetch(query, { slug }).then((data) => {
      setProduct(data);
      setIsFavorited(data.isFavorited);
      setRating(data.rating);
    }).catch(console.error);
  }, [slug]);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  if (!product) {
    return <div className="text-black text-center items-center">Loading...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="pb-10">
            <p className="text-black text-[14px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h4 className="font-semibold mt-4 text-black text-[14px]">Size & Fit</h4>
            <p className="text-black text-[14px]">Lorem ipsum velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <h4 className="font-semibold mt-4 text-black text-[14px]">Material & Care</h4>
            <p className="text-black text-[14px]">Lorem ipsum velit esse cillum la pariatur.</p>
          </div>
        );
      case "specification":
        return (
          <div className="pb-20">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="font-semibold text-black text-[14px]">Sleeve Length:</p>
                <p className="text-black text-[12px]">Long Sleeves</p>
              </div>
              <div>
                <p className="font-semibold text-black text-[14px]">Neck:</p>
                <p className="text-black text-[12px]">Boat</p>
              </div>
              <div>
                <p className="font-semibold text-black text-[14px]">Type:</p>
                <p className="text-black text-[12px]">T-Shirt Style</p>
              </div>
              <div>
                <p className="font-semibold text-black text-[14px]">Print or Pattern Type:</p>
                <p className="text-black text-[12px]">Plane</p>
              </div>
              <div>
                <p className="font-semibold text-black text-[14px]">Closure:</p>
                <p className="text-black text-[12px]">No Button</p>
              </div>
              <div>
                <p className="font-semibold text-black text-[14px]">Length:</p>
                <p className="text-black text-[12px]">Regular</p>
              </div>
              <div>
                <p className="font-semibold text-black text-[14px]">Fabric Type:</p>
                <p className="text-black text-[12px]">Cotton</p>
              </div>
              <div>
                <p className="font-semibold text-black text-[14px]">Occasion:</p>
                <p className="text-black text-[12px]">Casual</p>
              </div>
            </div>
          </div>
        );
      case "details":
        return (
          <div>
            <p className="text-black text-[14px]">Additional product details go here. You can add more content or specifications as needed.</p>
          </div>
        );
      default:
        return null;
    }
  };

    // Slider settings
  const settings = {
    dots: true,
    infinite: product.productImage.length > 1, // Set infinite scroll only if there are multiple images
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  // Example product images array
  const productImages = [
    topskirt,
  ];

  const similarProducts = [
    {
      name: "Ladies Fashion",
      brand: "Brand Name",
      price: "NGN455,000",
      image: bluedress,
      rating: 3.0,
      isFavorited: true,
      reviewsCount: 34000,
    },
    {
      name: "Ladies Fashion",
      brand: "Brand Name",
      price: "NGN455,000",
      image: bluedress,
      rating: 3.0,
      isFavorited: false,
      reviewsCount: 34000,
    },
  ];

  return (
    <div className="pb-20">
      <p className="text-black text-[14px] font-semibold text-center mb-2">
      {product.productName}
      </p>
      <Slider {...settings}>
      {product.productImage.map((image, index) => (
          <div >
            <img
              src={urlFor(image)}
              className="w-full h-full"
              alt={`Product ${index }`}
            />
          </div>
        ))}
      </Slider>

      <div className="m-4 mt-8">
        <div className="flex flex-row justify-between">
          <p className="text-[18px] text-black font-semibold text-left">
          {product.productName}
          </p>
          <p className="text-[18px] text-[#FE8946] font-semibold text-right">
            NGN {product.productPrice}
          </p>
        </div>

        <div className="flex items-center">
          <img src={starred} alt="Star" className="w-4 h-4 cursor-pointer" />
          <img src={starred} alt="Star" className="w-4 h-4 cursor-pointer" />
          <img src={starred} alt="Star" className="w-4 h-4 cursor-pointer" />
          <img src={starred} alt="Star" className="w-4 h-4 cursor-pointer" />
          <img src={starred} alt="Star" className="w-4 h-4 cursor-pointer" />
          <p className="text-[#00000086] font-normal text-[11px] ml-1">
            <span className="font-semibold">5.0</span>(36k)
          </p>
        </div>
      </div>

      <div className="m-4">
        <div className="flex justify-between border-b border-gray-200">
          <button
            onClick={() => setActiveTab("description")}
            className={`text-sm font-semibold py-2 px-4 ${
              activeTab === "description"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-500"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("specification")}
            className={`text-sm font-semibold py-2 px-4 ${
              activeTab === "specification"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-500"
            }`}
          >
            Specification
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`text-sm font-semibold py-2 px-4 ${
              activeTab === "details"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-500"
            }`}
          >
            Details
          </button>
        </div>

        <div className="mt-4">
          {activeTab === "description" && (
            <div className="pb-10">
              {product.productDetails && (
                product.productDetails.map((block, index) => (
                  <p key={index} className="text-black text-[14px]">
                    {block.children.map((child) => child.text).join(" ")}
                  </p>
                ))
              )}
            </div>
          )}
          {/* Implement other tabs as needed */}
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-black text-[16px] font-semibold">
            Similar Products
          </h3>
          <button className="text-[#FE8946] text-[14px]">View all</button>
        </div>

        <div className="flex space-x-4 overflow-x-scroll">
          {similarProducts.map((product, index) => (
            <div key={index} className="w-40 flex-shrink-0">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[131px] h-[130px] rounded-lg"
                />
                <button
                  onClick={toggleFavorite}
                  className="absolute top-2 right-2"
                >
                  <img
                    src={isFavorited ? favorited : favorite}
                    alt="Favorite Icon"
                    className="w-5 h-5"
                  />
                </button>
              </div>
              <div className="mt-2">
                <p className="text-[#212C62] text-[11px] font-medium text-left">
                  {product.name}
                </p>
                <p className="text-[#00000086] font-normal text-[10px] text-left">
                  {product.brand}
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
                    <span className="font-semibold">24k</span>(
                    {product.reviewsCount})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add to Cart and Buy Now Buttons */}
      <div className="m-4 flex justify-between">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-white text-[#FE8946] border border-[#FE8946] font-semibold py-2 px-4 rounded-md mr-2">
          ADD TO CART
        </button>
        <button className="flex-1 bg-[#FE8946] text-white font-semibold py-2 px-4 rounded-md ml-2">
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default Details;

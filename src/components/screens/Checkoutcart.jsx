import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import {
  back_icon,
  callcart,
  locationcart,
  circle_check,
  circle_check_outline,
} from "../../assets";
import { CartContext } from "../../utils/cartcontext";
import { urlFor } from "../../../lib/client";
import BottomNavbar from "../dashboard/BottomNavbar";
import { fetchUserProfile } from "../../api/auth";

const Checkoutcart = () => {
  // Delivery option state: 'home' or 'pickup'
  const [deliveryOption, setDeliveryOption] = useState(null);
  const [Email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  // Function to handle delivery option change
  const toggleDelivery = (option) => {
    setDeliveryOption(option);
  };

  const handlePayment = () => {
    navigate("/orderprocessing");
  };

  // Calculate total product price
  const totalProductPrice = cartItems.reduce((total, item) => {
    return total + item.price;
  }, 0);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, redirecting to login");
          // Redirect to login if no token is found
          return;
        }
        const { data } = await fetchUserProfile();
        setEmail(data.Email || " ");
        setPhonenumber(data.phonenumber || " ");
        console.log("Fetched User Data:", data);
        if (data.profileImage) setProfileImage(data.profileImage || person);
      } catch (error) {
        console.error("Failed to fetch user data", error.response || error);
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, redirecting to login");
          // Handle unauthorized access (e.g., redirect to login)
        }
      }
    };
  
    getUserProfile();
  }, []);

  useEffect(() => {
    const getUserAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, redirecting to login");
          navigate("/login");
          return;
        }
        const { data } = await fetchUserProfile(); // Assuming fetchUserProfile fetches all profile data including address
        setCurrentAddress(data.address || ""); // Adjust field name based on backend
      } catch (error) {
        console.error("Failed to fetch user address", error.response || error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };
    getUserAddress();
  }, [navigate]);

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

  return (
    <section className="bg-[#FBFCFF]">
      <motion.div
        className="dashboard-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <nav
          className={`${styles.paddingX} w-full h-[80px] flex items-center justify-between py-1 top-0 z-20`}
        >
          <div className="flex items-center w-full px-3">
            <Link
              to=""
              onClick={() => {
                navigate(-1);
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={back_icon}
                alt="back"
                className="cursor-pointer w-[26px] h-[20px]"
              />
            </Link>

            <div className="flex-grow flex justify-center">
              <p className="text-gray-400 text-[18px] font-semibold text-center">
                Checkout
              </p>
            </div>
          </div>
        </nav>

        <div className="pb-28">
          <div className="px-5 ">
            {/* List of Cart Items with Images */}
            <p className="text-black text-[14px] font-semibold">
              Items in your cart
            </p>

            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center mt-4 gap-4">
                <img
                  src={urlFor(item.image)}
                  alt={item.name}
                  className="w-[80px] h-[90px] object-cover rounded-md"
                />
                <div>
                  <p className="text-black font-semibold text-[14px]">
                    {item.name}
                  </p>
                  <p className="text-[#F7931A] font-medium text-[14px]">
                    NGN {item.price}
                  </p>
                </div>
              </div>
            ))}

            <div className="gap-4">
              {/* Billing Address Section */}
              <div className="bg-white rounded-md w-full shadow-sm mt-5 pb-3">
                <div className="p-3">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2 items-center">
                      <img src={locationcart} className="w-[22px] h-[22px]" />
                      <p className="text-black font-semibold">
                        Billing & Delivery Address
                      </p>
                    </div>
                    <Link
                      to="/address"
                      className="text-[#00000070] text-[12px] underline"
                    >
                      Edit
                    </Link>
                  </div>

                  <p className="text-[12px] text-[#00000070] w-[199px] ml-7 mt-2">
                    {currentAddress}
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-white rounded-md w-full shadow-sm mt-5 pb-3">
                <div className="p-3">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2 items-center">
                      <img src={callcart} className="w-[22px] h-[22px]" />
                      <p className="text-black font-semibold">Contact</p>
                    </div>
                    <Link
                      to="/profile"
                      className="text-[#00000070] text-[12px] underline"
                    >
                      Edit
                    </Link>
                  </div>

                  <p className="text-[12px] text-[#00000070] w-[199px] ml-7 mt-2">
                    Phone: <span>{phonenumber}</span>
                  </p>
                  <p className="text-[12px] text-[#00000070] w-[199px] ml-7">
                    Email: <span>{Email}</span>
                  </p>
                </div>
              </div>

              {/* Delivery Option */}
              <p className="text-black font-semibold mt-4 text-[14px]">
                Delivery Option:
              </p>
              <div className="flex flex-row gap-4">
                {/* Home Delivery Option */}
                <div
                  className={`bg-white rounded-md w-full shadow-sm p-3 cursor-pointer ${
                    deliveryOption === "home" ? "border border-primary" : ""
                  }`}
                  onClick={() => toggleDelivery("home")}
                >
                  <div className="flex flex-row items-center gap-2">
                    <img
                      src={
                        deliveryOption === "home"
                          ? circle_check
                          : circle_check_outline
                      }
                      alt="Check Icon"
                      className="w-[20px] h-[20px]"
                    />
                    <p className="text-black font-semibold text-[12px]">
                      Home Delivery
                    </p>
                  </div>
                  <p className="text-primary mt-1 text-[12px] font-medium">
                    NGN 500.00
                  </p>
                  <p className="text-[#00000080] mt-1 text-[12px] font-medium">
                    Est Arrival: 24 Jan
                  </p>
                </div>

                {/* Pick from Point Option */}
                <div
                  className={`bg-white rounded-md w-full shadow-sm p-3 cursor-pointer ${
                    deliveryOption === "pickup" ? "border border-primary" : ""
                  }`}
                  onClick={() => toggleDelivery("pickup")}
                >
                  <div className="flex flex-row items-center gap-2">
                    <img
                      src={
                        deliveryOption === "pickup"
                          ? circle_check
                          : circle_check_outline
                      }
                      alt="Check Icon"
                      className="w-[20px] h-[20px]"
                    />
                    <p className="text-black font-semibold text-[12px]">
                      Pick from Point
                    </p>
                  </div>
                  <p className="text-primary mt-1 text-[12px] font-medium">
                    Free Delivery
                  </p>
                  <p className="text-[#00000080] mt-1 text-[12px] font-medium">
                    Est Arrival: 24 Jan
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-md w-full shadow-sm mt-5 pb-3">
                <div className="flex flex-col p-3">
                  <div className="flex flex-row justify-between">
                    <p className="text-[#00000073] text-[12px] font-medium">
                      Products Price
                    </p>
                    <p className="text-[#00000073] text-[12px] font-medium">
                      # {totalProductPrice}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-[#00000073] text-[12px] font-medium">
                      Shipping Fees
                    </p>
                    <p className="text-[#00000073] text-[12px] font-medium">
                      #0,00
                    </p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-[#00000073] text-[12px] font-medium">
                      Tax
                    </p>
                    <p className="text-[#00000073] text-[12px] font-medium">
                      #0,00
                    </p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-[#00000073] text-[12px] font-medium">
                      Discount
                    </p>
                    <p className="text-[#00000073] text-[12px] font-medium">
                      #0.00
                    </p>
                  </div>
                </div>

                <div className="border-t-[0.5px] border-[#00000050] px-3">
                  <div className="flex flex-row justify-between mt-2">
                    <p className="text-black font-semibold">Total Amount</p>
                    <p className="text-black font-semibold">NGN {totalProductPrice}</p>
                  </div>
                </div>
              </div>
              <button
                className="bg-primary w-full h-[50px] rounded-lg shadow-sm mt-5 text-white font-semibold"
                onClick={handlePayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <BottomNavbar />
    </section>
  );
};

export default Checkoutcart;

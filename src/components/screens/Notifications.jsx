import React from "react";
import { motion } from "framer-motion";
import { account, back_icon, delivery, order, promos } from "../../assets";
import { styles } from "../../styles";
import { Link, useNavigate } from "react-router-dom";
import BottomNavbar from "../dashboard/BottomNavbar";

const Notifications = () => {
  const navigate = useNavigate();
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
  return (
    <section className="bg-gray-100 min-h-screen">
      <motion.div
        className="max-w-lg mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Navigation Bar */}
        <nav className="w-full h-[70px] flex items-center justify-between py-1 top-0 z-20 px-4">
          <div className="flex items-center w-full">
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
              <p className="text-gray-500 text-[16px] font-medium">
                Notifications
              </p>
            </div>
          </div>
        </nav>

        {/* Icon Layout */}
        <div className="flex items-center justify-between px-6 py-2">
          <div className="flex flex-col items-center">
            <img src={promos} className="w-[51px] h-[51px]" alt="Promo" />
            <p className="text-[14px] text-gray-500">Promos</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={order} className="w-[51px] h-[51px]" alt="Order" />
            <p className="text-[14px] text-gray-500">Order</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={delivery} className="w-[51px] h-[51px]" alt="Delivery" />
            <p className="text-[14px] text-gray-500">Delivery</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={account} className="w-[51px] h-[51px]" alt="Account" />
            <p className="text-[14px] text-gray-500">Account</p>
          </div>
        </div>

        {/* Notification List */}
        <div className="mt-4 space-y-4 pb-40">
          <div className="bg-white rounded-lg p-3 flex items-start w-full">
            <img
              src={delivery}
              className="w-[45px] h-[45px] mr-4"
              alt="Delivery"
            />
            <div>
              <p className="text-gray-800 text-[16px] font-semibold">
                Order Arrived
              </p>
              <p className="text-gray-400 text-[12px] mb-2">12:35 PM</p>
              <p className="text-gray-600 text-[14px] w-[277px]">
                Order <span className="text-primary">#567896 </span> has been
                completed & arrived at the destination address.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 flex items-start">
            <img src={order} className="w-[45px] h-[45px] mr-4" alt="Order" />
            <div>
              <p className="text-gray-800 text-[16px] font-semibold">
                Order Success
              </p>
              <p className="text-gray-400 text-[12px] mb-2">Yesterday</p>
              <p className="text-gray-600 text-[14px] w-[277px]">
                Order <span className="text-primary">#567896 </span> has been
                success. Please wait for the product to be sent.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 flex items-start">
            <img src={promos} className="w-[45px] h-[45px] mr-4" alt="Promo" />
            <div>
              <p className="text-gray-800 text-[16px] font-semibold">
                40% Discount on Beko
              </p>
              <p className="text-gray-400 text-[12px] mb-2">24 July, 2024</p>
              <p className="text-gray-600 text-[14px] w-[277px]">
                All of the Beko products available with 40% exclusive discount.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 flex items-start">
            <img
              src={account}
              className="w-[45px] h-[45px] mr-4"
              alt="Account"
            />
            <div>
              <p className="text-gray-800 text-[16px] font-semibold">
                Address Updated
              </p>
              <p className="text-gray-400 text-[12px] mb-2">24 July, 2024</p>
              <p className="text-gray-600 text-[14px] w-[277px]">
                Your payment and shipping address has been updated successfully.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <BottomNavbar />
    </section>
  );
};

export default Notifications;

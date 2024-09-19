import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { back_icon, cart, cartnone } from "../../assets";
import { CartContext } from "../../utils/cartcontext";
import { urlFor } from "../../../lib/client";
import BottomNavbar from "../dashboard/BottomNavbar";
import Checkoutcart from "./Checkoutcart";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

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

  const handleCheckout = () => {
    navigate("/checkoutcart")
  }

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
          className={`${styles.paddingX} w-full h-[80px] flex items-center justify-between py-1 top-0 z-20 `}
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
                Cart
              </p>
            </div>
          </div>
        </nav>

        <div className="pb-28">
          <div className="px-5 mt-5">
            <div className="flex flex-row gap-3 ml-3">
            <img src={cartnone} className="w-[20px] h-[23px]" />
              <p className="text-black text-[14px] font-semibold">
                {cartItems.length} items in your cart
              </p>
            </div>

            {cartItems.map((item, index) => (
              <div key={index}>
                <div className="flex flex-row mt-5 gap-[40px]">
                  <div className="bg-white shadow-md h-[99px] w-[100px] rounded-md">
                    <img src={urlFor(item.image)} className="w-[80px] h-[90px]" />
                  </div>

                  <div className="flex flex-col justify-items-center justify-center">
                    <p className="font-semibold text-black text-[14px]">
                      {item.name}
                    </p>
                    <p className="font-medium text-[#F7931A] text-[14px]">
                      NGN {item.price}
                    </p>
                  </div>
                </div>

                <hr className="h-10 text-black w-full mt-8" />
              </div>
            ))}

            <button
              onClick={handleCheckout}
              type="submit"
              className={`bg-[#212c62a9] py-3 mt-2 hover:bg-[#212C62] outline-none xl text-[18px] px-2 sm:w-[406px] text-white font-normal shadow-md rounded-lg w-full h-[57px] flex items-center justify-center`}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </motion.div>
      <BottomNavbar />
    </section>
  );
};

export default Cart;

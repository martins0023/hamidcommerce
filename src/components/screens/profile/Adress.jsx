import React from "react";
import MyButton from "../../reusable/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { styles } from "../../../styles";
import { Location, back_icon, del, edit, plus } from "../../../assets";

const Adress = () => {
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
    <section className="bg-[#FBFCFF]">
      <motion.div
        className="dashboard-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <nav
          className={`${styles.paddingX} w-full h-[80px] flex items-center justify-between py-1 top-0 z-20 bg-white`}
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

            {/* This div takes up the remaining space and centers the text */}
            <div className="flex-grow flex justify-center">
              <p className="text-gray-400 text-[14px] text-center">
                Address Book
              </p>
            </div>
          </div>
        </nav>

        <div className="">
          <div className="bg-[#E9F1FD]">
            <div className="flex p-8 flex-col pt-5 pb-5">
              <div className="flex flex-col">
                <p className="text-black font-medium text-[14px]">
                  Addresses on file
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[10px] justify justify-between ">
          <div className="bg-[#ffffff]">
            <div className="p-3 flex flex-row gap-2 justify-between">

              <div className="flex flex-row gap-3">
                <img
                  src={Location}
                  alt="location"
                  className="w-[24px] h-[24px]"
                />
                <div className="flex flex-col">
                  <p className="text-black font-semibold text-[14px]">
                    Femi David
                  </p>
                  <p className="text-black font-normal text-[14px]">
                    no.3 Femi David, <br />
                    Ikeja, Lagos State
                  </p>
                </div>
              </div>

              <div className="flex flex-row gap-3 mr-4">
                <div className="flex flex-row gap-2 items-end">
                  <img src={edit} className="w-[15px] h-[15px]" alt="edit" />
                  <p className="text-[#1673CA] text-[12px] font-normal">Edit</p>
                </div>

                <div className="flex flex-row gap-1 items-end">
                  <img src={del} className="w-[15px] h-[15px]" alt="delete" />
                  <p className="text-[#1673CA] text-[12px] font-normal">
                    Delete
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#ffffff]">
            <div className="flex flex-row p-3 gap-4">
              <img src={plus} className="w-[24px] h-[24px]" alt="add" />
              <p className="text-[#1673CA] text-[12px] font-normal mt-1">
                Add new address
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Adress;

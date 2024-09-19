import React, { useState } from "react";
import MyButton from "../../reusable/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { updateAddress } from "../../../api/auth";
import { styles } from "../../../styles";
import { Location, back_icon, del, edit, plus } from "../../../assets";

const Adress = () => {
  const navigate = useNavigate();
  const [convertmodalIsOpen, setConvertModalIsOpen] = useState(false);

  const convertopenModal = () => {
    setConvertModalIsOpen(true);
  };

  const convertcloseModal = () => {
    setConvertModalIsOpen(false);
  };

  const [newAddress, setNewAddress] = useState("");

  const handleUpdateAddress = async () => {
    try {
      await updateAddress({ newAddress });
      alert("Address updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Failed to update address", error);
      alert("Failed to update address");
    }
  };
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
            <div onClick={convertopenModal} className="flex flex-row p-3 gap-4">
              <img src={plus} className="w-[24px] h-[24px]" alt="add" />
              <p className="text-[#1673CA] text-[12px] font-normal mt-1">
                Add new address
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="flex items-center justify-center ">
        <Modal
          isOpen={convertmodalIsOpen}
          onRequestClose={convertcloseModal}
          contentLabel="SUCCESS"
          className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-10"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-7 flex flex-col items-center m-3">
            <div className="mb-4">
              <p className="font-semibold text-[20px] text-[#000000] text-center">
                Add Address
              </p>
            </div>
            <textarea
              type="text"
              value={newAddress}
              className="bg-white border-1 border-[#1673CA] rounded-lg h-40 text-black w-full"
              onChange={(e) => setNewAddress(e.target.value)}
            />
            <div className="flex flex-col w-full gap-[1px]">
              <button
                onClick={handleUpdateAddress}
                className="mt-6 bg-[#1673CA] font-montserrat py-3 px-30 text-[#FFFF] border-[1.5px] hover:bg-[#1673ca3b] rounded-full uppercase w-full h-[53px]"
              >
                Update Address
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default Adress;

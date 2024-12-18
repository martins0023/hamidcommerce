import React, { useState, useEffect } from "react";
import { add, check, person } from "../../../assets";
import MyButton from "../../reusable/MyButton";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile, updateAddress } from "../../../api/auth";
import { styles } from "../../../styles";
import { Location, back_icon, del, edit, plus } from "../../../assets";

const Adress = () => {
  const navigate = useNavigate();
  const [convertmodalIsOpen, setConvertModalIsOpen] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");

  const convertopenModal = () => {
    setConvertModalIsOpen(true);
  };

  const convertcloseModal = () => {
    setConvertModalIsOpen(false);
  };

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

  const handleUpdateAddress = async () => {
    try {
      if (!newAddress.trim()) {
        alert("Address cannot be empty");
        return;
      }
      await updateAddress({ newAddress });
      alert("Address updated successfully!");
      setCurrentAddress(newAddress);
      setNewAddress("");
      setConvertModalIsOpen(false);
      navigate("/profile"); // Or refresh the page as needed
    } catch (error) {
      console.error("Failed to update address", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to update address");
    }
  };

  const handleDeleteAddress = async () => {
    try {
      await updateAddress({ newAddress: "" }); // Assuming empty string removes the address
      alert("Address deleted successfully!");
      setCurrentAddress("");
      navigate("/profile"); // Or refresh the page as needed
    } catch (error) {
      console.error("Failed to delete address", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to delete address");
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

        <div className="flex flex-col gap-[10px] justify-between">
          {currentAddress ? (
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
                      Your Address
                    </p>
                    <p className="text-black font-normal text-[14px]">
                      {currentAddress}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row gap-3 mr-4">
                  <div
                    onClick={() => {
                      setNewAddress(currentAddress);
                      convertopenModal();
                    }}
                    className="flex flex-row gap-2 items-end cursor-pointer"
                  >
                    <img src={edit} className="w-[15px] h-[15px]" alt="edit" />
                    <p className="text-[#1673CA] text-[12px] font-normal">Edit</p>
                  </div>

                  <div
                    onClick={handleDeleteAddress}
                    className="flex flex-row gap-1 items-end cursor-pointer"
                  >
                    <img src={del} className="w-[15px] h-[15px]" alt="delete" />
                    <p className="text-[#1673CA] text-[12px] font-normal">
                      Delete
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#ffffff]">
              <div onClick={convertopenModal} className="flex flex-row p-3 gap-4 cursor-pointer">
                <img src={plus} className="w-[24px] h-[24px]" alt="add" />
                <p className="text-[#1673CA] text-[12px] font-normal mt-1">
                  Add new address
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      <div className="flex items-center justify-center ">
        <Modal
          isOpen={convertmodalIsOpen}
          onRequestClose={convertcloseModal}
          contentLabel="Add Address"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-7 flex flex-col items-center m-3">
            <div className="mb-4">
              <p className="font-semibold text-[20px] text-[#000000] text-center">
                {currentAddress ? "Edit Address" : "Add Address"}
              </p>
            </div>
            <textarea
              type="text"
              value={newAddress}
              className="bg-white border-1 border-[#1673CA] rounded-lg h-40 text-black w-full p-2"
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter your address here..."
            />
            <div className="flex flex-col w-full gap-[1px]">
              <button
                onClick={handleUpdateAddress}
                className="mt-6 bg-[#1673CA] font-montserrat py-3 px-20 text-[#FFFF] border-[1.5px] hover:bg-[#1673ca3b] rounded-full uppercase w-full h-[53px]"
              >
                {currentAddress ? "Save Changes" : "Save Address"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default Adress;

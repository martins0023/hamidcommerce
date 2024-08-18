import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { arrow_back_ios, cancel, home, report } from "../../assets";

const Review = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    // Handle form submission
    navigate("/transactiondetails");
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

  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //modal warning
  const [convertmodalIsOpen, setConvertModalIsOpen] = useState(false);

  const convertopenModal = () => {
    setConvertModalIsOpen(true);
  };

  const convertcloseModal = () => {
    setConvertModalIsOpen(false);
  };

  //set state for time
  const [currentTime, setCurrentTime] = useState("");

  //set state for date
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(formattedTime);
    };

    // Update time immediately when component mounts
    updateTime();

    // Update time every second
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formattedDate = `${String(now.getMonth() + 1).padStart(
        2,
        "0"
      )}/${String(now.getDate()).padStart(2, "0")}/${now.getFullYear()}`;
      setCurrentDate(formattedDate);
    };

    // Set date immediately when component mounts
    updateDate();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [pin, setPin] = useState(["", "", "", ""]);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (isNaN(value)) return; // Ensure the input is numeric

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Focus the next input field
    if (value !== "" && index < pin.length - 1) {
      document.getElementById(`pin-input-${index + 1}`).focus();
    }
  };

  const handleClear = () => {
    setPin(["", "", "", ""]);
    document.getElementById("pin-input-0").focus();
  };

  const isPinComplete = pin.every((digit) => digit !== "");

  const handlePayButtonClick = () => {
    if (isPinComplete) {
      handleNavigation();
    } else {
      console.log("Please enter the complete PIN.");
      convertopenModal();
    }
  };

  return (
    <section className={`${styles.paddingX} p-1`}>
      <motion.div
        className="dashboard-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="w-full flex  justify-between items-center max-w-7xl mx-auto p-3">
          <Link
            to="/"
            className="flex"
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
          >
            <img
              src={arrow_back_ios}
              alt="back"
              className="w-[24px] h-[24px] object-contain"
            />
          </Link>

          <p className="flex justify justify-end ml-[100px] flex-end text-black text-[12px] font-semibold cursor-pointer ">
            <span className="">Review</span>
          </p>
          <ul className="flex list-none ml-[109px] sm:flex flex-row">
            <Link
              to="/dashboard"
              className="flex  "
              onClick={() => {
                setActive("");
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={home}
                alt="home"
                className="cursor-pointer w-[24px] h-[24px]"
              />
            </Link>
          </ul>
        </div>

        <div className="mt-[20px] bg-white rounded-3xl p-7 m-3 gap-[24px]">
          <div className="flex flex-auto justify justify-between mt-[16px] ">
            <p className="justify justify-start flex flex-start font-normal text-[164x] text-[#6A6A6A]">
              Biller
            </p>
            <p className="justify justify-end flex flex-end font-semibold text-[14px] text-[#000000]">
              MTN
            </p>
          </div>
          <hr className=" w-full height-[1px]  backgroundColor: '#E2E2E2' mt-[16px] " />
          <div className="flex flex-auto justify justify-between mt-[14px] ">
            <p className="justify justify-start flex flex-start font-normal text-[14px] text-[#6A6A6A]">
              Product
            </p>
            <p className="justify justify-end flex flex-end font-semibold text-[14px] text-[#000000]">
              MTNNG
            </p>
          </div>
          <hr className=" w-full height-[1px]  backgroundColor: '#E2E2E2' mt-[16px] mb-[16px]" />
          <div className="flex flex-auto justify justify-between ">
            <p className="justify justify-start flex flex-start font-normal text-[14px] text-[#6A6A6A]">
              Amount
            </p>
            <p className="justify justify-end flex flex-end font-semibold text-[14px] text-[#000000]">
              200.00
            </p>
          </div>
          <hr className=" w-full height-[1px]  backgroundColor: '#E2E2E2' mt-[16px] mb-[16px] " />
          <div className="flex flex-auto justify justify-between ">
            <p className="justify justify-start flex flex-start font-normal text-[14px] text-[#6A6A6A]">
              Time
            </p>
            <p className="justify justify-end flex flex-end font-semibold text-[14px] text-[#000000]">
              {currentTime}
            </p>
          </div>
          <hr className=" w-full height-[1px]  backgroundColor: '#E2E2E2' mt-[16px] mb-[16px] " />
          <div className="flex flex-auto justify justify-between mb-[16px]">
            <p className="justify justify-start flex flex-start font-normal text-[14px] text-[#6A6A6A]">
              Date
            </p>
            <p className="justify justify-end flex flex-end font-semibold text-[14px] text-[#000000]">
              {currentDate}
            </p>
          </div>
        </div>

        <div className="flex flex-auto items-center justify-center mt-[40px] m-2">
          <button
            type="submit"
            className={`bg-original py-3 px-20 outline-none uppercase xl text-[12px] sm:w-[406px] text-white font-bold shadow-md rounded-full w-full h-[45px] `}
            onClick={openModal}
          >
            {loading ? "transferring..." : "Continue"}
          </button>
        </div>
      </motion.div>

      <div className="mt-[170px] py-3 px-20 outline-none uppercase xl sm:w-[406px] text-white font-bold  w-full h-[60px]"></div>
      
      {/*Enter pin modal*/}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Enter PIN Code"
        className="modal mt-14"
        overlayClassName="overlay"
        style={{
          overlay: {
            zIndex: 1000,
          },
        }}
      >
        <div className="flex flex-col justify-center p-4">
          <div className="flex justify-between w-full mb-4">
            <button
              onClick={closeModal}
              className="text-black text-xl font-bold"
            >
              ✕
            </button>
            <p className="flex justify-start font-semibold text-[16px] text-[#000000]">
              Enter your PIN code
            </p>
          </div>
          <p className="flex justify-start flex-start items-start font-semibold text-[16px] text-[#6A6A6A] ml-1">
            Enter Pin
          </p>
          <div className="mt-4 flex justify-center gap-[12px]">
            {pin.map((digit, index) => (
              <input
                key={index}
                id={`pin-input-${index}`}
                type="password"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
                inputMode="numeric" // Ensures numeric keypad on mobile devices
                className="w-[56px] h-[56px] text-center border border-gray-400 rounded-lg m-1 font-black text-lg text-[#000000]"
              />
            ))}
          </div>
          <button
            onClick={handleClear}
            className="mt-6 bg-[#EEEEEE] text-black text-lg py-3 px-12 rounded-full"
          >
            Clear
          </button>
          <button
            onClick={handlePayButtonClick}
            className="mt-6 bg-[#ffff] text-[#8E1011] border-[1.5px] border-[#8E1011] py-3 px-12 rounded-full"
          >
            Pay
          </button>
        </div>
      </Modal>

      {/*MOdal warning invalid*/}
      <div className="flex items-center justify-center ">
        <Modal
          isOpen={convertmodalIsOpen}
          onRequestClose={convertcloseModal}
          contentLabel="WARNING"
          className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-10"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          style={{
            overlay: {
              zIndex: 1100,
            },
          }}
        >
          <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-7 flex flex-col items-center m-3">
            <div className="p-3 flex justify-center items-center">
              <img
                src={report}
                alt="warning"
                className="w-full h-auto items-center"
              />
            </div>
            <div className="mb-4">
              <p className="font-semibold text-[20px] text-[#000000] text-center">
                Invalid
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="font-normal text-center text-[14px] text-[#000000]">
                Please enter your pin to proceed
              </p>
            </div>
            <div className="flex flex-col w-full gap-[1px]">
              <button
                onClick={convertcloseModal}
                className="mt-6 bg-[#8E1011] font-montserrat py-3 px-20 text-[#FFFF] border-[1.5px] border-[#8E1011] rounded-full uppercase w-full h-[53px]"
              >
                OK
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default Review;

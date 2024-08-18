import { useState, useRef } from "react";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import {
  dropmail,
  email_icon,
  logo,
  logo1,
  logo_blue,
  password_icon,
  visible,
  visible_off,
} from "../assets";
import MyButton from "./reusable/MyButton";

const GetCode = () => {
  const [form, setForm] = useState({
    Email: "",
  });
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State for alert visibility
  const formRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setShowAlert(true); // Show alert if form is incomplete
    } else {
      // Handle form submission
      navigate("/login");
    }
  };

  const isFormValid = () => {
    return Object.values(form).every((value) => value.trim() !== "");
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

  const handlePayButtonClick = () => {
    if (isPinComplete) {
      handleNavigation();
    } else {
      console.log("Please enter the complete PIN.");
    }
  };

  const isPinComplete = pin.every((digit) => digit !== "");

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
    <section className="bg-original w-screen h-full flex justify-center items-center">
      <div className="h-full flex justify-center items-center justify-items-center">
        {showAlert && (
          <div className="fixed top-0 left-0 right-0 bg-red-500 text-white py-2 text-center">
            Please fill out all fields correctly.
          </div>
        )}
        <motion.div
          variants={containerVariants}
          animate="visible"
          initial="hidden"
          exit="exit"
          className="flex-[0.75] mt-6"
        >
          <div className="flex flex-col justify-center items-center gap-5">
            <p className="text-[24px] font-medium text-[#ffffff]">
            Enter 4-digits code
            </p>
            <img src={dropmail} className="w-[212.07px] h-[261.2px]" />
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-6"
          >
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

            <div className="">
            <p
              className="flex justify-center items-center font-normal text-[14px] mt-4 text-white "
            >
              Enter your e-mail for verification process. We will send you a
              4-digits verification code in your email.
            </p>
            </div>

            <div className="flex flex-auto items-center justify-center mb-10">
              <MyButton buttonText="Recover Password" onClick={handleSubmit} />
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default GetCode
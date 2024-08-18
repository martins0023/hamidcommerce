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

const ForgetPassword = () => {

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
      navigate("/getcode");
    }
  };

  const isFormValid = () => {
    return Object.values(form).every((value) => value.trim() !== "");
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
              Forget Password
            </p>
            <img src={dropmail} className="w-[212.07px] h-[261.2px]" />
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-6"
          >
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4"></span>
              <div className="flex items-center relative">
                <img
                  src={email_icon}
                  className="absolute left-4"
                  alt="email icon"
                />
                <input
                  type="email"
                  name="Email"
                  value={form.Email}
                  onChange={handleChange}
                  placeholder="cashhamid66@gmail.com"
                  className="bg-[#EDEEFA] py-4 pl-12 pr-6 w-full h-[64px]
                placeholder:text-[#000000] border-none
                text-[#212C6299] rounded-full outline-none
                  font-normal text-[14px]"
                />
              </div>
            </label>

            <div className="">
            <p
              className="flex justify-center items-center font-normal text-[14px] mt-4 text-white "
            >
              Enter your e-mail for verification process. We will send you a
              4-digits verification code in your email.
            </p>
            </div>

            <div className="flex flex-auto items-center justify-center mb-10 ">
              <MyButton buttonText="Get Code" onClick={handleSubmit} />
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ForgetPassword;

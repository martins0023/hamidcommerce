import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
//import { call, email, icon, lock, visible, visible_off } from "../assets";
import { useNavigate } from "react-router-dom";
import {
  email_icon,
  logo,
  logo1,
  logo_blue,
  password_icon,
  visible,
  visible_off,
} from "../assets";
import MyButton from "./reusable/MyButton";

const RegisteredUser = () => {
  const [passwordVisibility, setPasswordVisibility] = useState("empty");

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevState) =>
      prevState === "visible" ? "hidden" : "visible"
    );
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    handleChange(e);
    if (value.length > 0 && passwordVisibility === "empty") {
      setPasswordVisibility("hidden");
    }
  };

  const [form, setForm] = useState({
    password: "",
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
      navigate("/dashboard");
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
    <section className="bg-white h-screen flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center justify-items-center">
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
          className="flex-[0.85] mt-32"
        >
          <div className="flex flex-col justify-center items-center">
            <p className="text-[14px] font-medium text-[#212C62]">Welcome Back,</p>
            <p className="text-[48px] font-medium text-[#212C62]" >HamidCash</p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-20 flex flex-col gap-6"
          >

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4"></span>
              <div className="flex items-center relative">
                <img src={password_icon} className="absolute left-4 cursor-pointer" />
                <input
                  type={passwordVisibility === "visible" ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="bg-[#EDEEFA] py-4 pl-12 pr-6 w-full h-[55px]
                placeholder:text-secondary border-none
                text-[#212C6299] rounded-full outline-none
                  font-normal text-[14px]"
                />
                <div className=" flex justify-end ">
                <img
                  src={passwordVisibility === "visible" ? visible : visible_off}
                  className="absolute mr-4 cursor-pointer bottom-4"
                  alt="passwordVisibility"
                  onClick={togglePasswordVisibility}
                />
                </div>
              </div>
            </label>

            <a
              className={`${styles.sectionSubText2} flex justify-center items-center font-medium text-[14px] mt-4 text-original`}
              href="/forgetpassword"
            >
              Forgot your password?
            </a>

            <div className="flex flex-auto items-center justify-center">
              <MyButton buttonText="Log In" />
            </div>
          </form>
          <div className="flex justify-center items-center mt-20">
            <img src={logo_blue} className="w-[148px] h-[115px]" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default RegisteredUser
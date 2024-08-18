import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
//import emailjs from "@emailjs/browser";

//import { styles } from "../styles";
//import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { logo1 } from "../assets";

const Welcome = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/getstarted');
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [navigate]);

  return (
    <section className="bg-[#1B2A64] h-screen w-screen flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] rounded-2xl overflow-hidden max-w-sm"
        >
          <img
            src={logo1}
            alt="Welcome Logo"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Welcome;

import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import Switch from "react-switch";
import { arrow_back_ios, dropdown, naira } from "../../assets";
import { NetworkContext } from "./NetworkContext";
import { Link, useNavigate } from "react-router-dom";

const Exampins = () => {
  const { selectedExam } = useContext(NetworkContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    exam: selectedExam || "",
    quantity: "",
    pay: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const [isFieldEnabled, setIsFieldEnabled] = useState({
    quantity: false,
    pay: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (selectedExam) {
      setFormData((prevData) => ({
        ...prevData,
        network: selectedExam,
      }));
    }
  }, [selectedExam]);

  useEffect(() => {
    setIsFieldEnabled({
      quantity: !!formData.exam,
      pay: !!formData.exam && !!formData.quantity,
    });

    const allFieldsFilled = formData.exam && formData.quantity && formData.pay;

    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    navigate("/review");
  };
  const [loading, setLoading] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
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
    <section className={`${styles.paddingX} `}>
      <motion.div
        className="dashboard-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto mb-4">
          <Link
            to="/"
            className="flex m-1"
            onClick={() => {
              navigate(-1);
              window.scrollTo(0, 0);
            }}
          >
            <img
              src={arrow_back_ios}
              alt="back"
              className="w-[18px] h-[18px] object-contain"
            />
            <p className="text-black justify-center ml-5 font-semibold text-[14px]">
              Exam Pin
            </p>
          </Link>
        </div>
        <div className="w-full justify-between items-center max-w-7xl mx-auto ">
          <div className="flex flex-wrap lg:flex-nowrap ">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-[79px] rounded-xl w-full lg:w-[1254px] p-[20px] m-2 bg-hero-pattern bg-no-repeat bg-cover bg-center">
              <div className="flex justify-between items-center ">
                <div className="row-span-30 gap-4">
                  <p className="text-[#FFFFFF] text-[12px] font-semibold">
                    Balance
                  </p>
                  <div className="flex flex-row">
                    <img src={naira} className="w-[14px] h-[12.3px] mt-1.5" />
                    <p className="font-bold font-montserrat text-[16px] h-10 ml-1">
                      1,000.65
                    </p>
                    <img
                      src={dropdown}
                      className="w-[13.33px] h-[6.67px] ml-[9.33px] mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 justify justify-between p-3">
            <form
              className="mt-[5px] flex flex-col gap-[1px]"
              onSubmit={handleSubmit}
            >
              <label className="flex flex-col">
                <span className="text-white font-medium mb-4"></span>
                <select
                  name="exam"
                  placeholder="Exam Type"
                  value={formData.exam}
                  onChange={handleInputChange}
                  className={`bg-white py-4 px-6 placeholder:text-secondary text-black ${
                    formData.exam ? "rounded-lg" : "border-0"
                  } rounded-xl outline-none border-[#000000] border-1 lg:w-full w-full h-[52px] text-[12px] font-medium`}
                >
                  <option value="" disabled>
                    Exam Type
                  </option>
                  <option value="waec">WAEC</option>
                  <option value="neco">NECO</option>
                </select>
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-4"></span>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  disabled={!isFieldEnabled.quantity}
                  className={`bg-[#ffff] py-4 px-6 placeholder:text-secondary text-black ${
                    isFieldEnabled.quantity ? "rounded-lg" : "border-0"
                  } rounded-xl outline-none border-[#000000] font-medium border-1 h-[52px] text-[12px] lg:w-full w-full`}
                />
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-4"></span>
                <input
                  type="number"
                  name="pay"
                  placeholder="Amount to Pay"
                  value={formData.pay}
                  onChange={handleInputChange}
                  disabled={!isFieldEnabled.pay}
                  className={`bg-[#ffff] py-4 px-6 placeholder:text-secondary text-black ${
                    isFieldEnabled.pay ? "rounded-lg" : "border-0"
                  } rounded-xl outline-none border-[#000000] font-medium border-1 h-[52px] text-[12px] lg:w-full w-full`}
                />
              </label>

              <div className="flex gap-[11px] mt-2">
                <Switch
                  onChange={handleToggle}
                  checked={isEnabled}
                  offColor="#ccc"
                  onColor="#8E1011"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  className="react-switch"
                />
                <label className="font-normal text-black text-[12px] mt-1 mr-4">
                  Disable Number Validator
                </label>
              </div>

              <div className="flex flex-auto items-center justify-center mt-[40px] mb-12">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`bg-original py-3 px-20 outline-none uppercase xl text-[12px] sm:w-[406px] text-white font-bold shadow-md rounded-full w-full h-[45px] ${
                    isFormValid ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {loading ? "transferring..." : "Buy Pin"}
                </button>
              </div>

              <div className="mb-10 " />
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Exampins;

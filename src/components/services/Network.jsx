import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

//app
import { styles } from "../../styles";
import Switch from "react-switch";
import { arrow_back_ios, dropdown, naira } from "../../assets";
import Navbar from "../dashboard/Navbar";
import { NetworkContext } from "./NetworkContext";
//import { NetworkContext } from "./NetworkContext";

const Network = () => {
  const { selectedNetwork } = useContext(NetworkContext);

  //navigation handling
  const navigate = useNavigate();

  //handle form
  const [formData, setFormData] = useState({
    network: selectedNetwork || "",
    type: "",
    phoneNumber: "",
    amount: "",
    pay: "",
    discount: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const [isFieldEnabled, setIsFieldEnabled] = useState({
    type: false,
    phoneNumber: false,
    amount: false,
    pay: false,
    discount: false,
  });

  useEffect(() => {
    if (selectedNetwork) {
      setFormData((prevData) => ({
        ...prevData,
        network: selectedNetwork,
      }));
    }
  }, [selectedNetwork]);

  useEffect(() => {
    setIsFieldEnabled({
      type: !!formData.network,
      phoneNumber: !!formData.network && !!formData.type,
      amount: !!formData.network && !!formData.type && !!formData.phoneNumber,
      pay:
        !!formData.network &&
        !!formData.type &&
        !!formData.phoneNumber &&
        !!formData.amount,
      discount:
        !!formData.network &&
        !!formData.type &&
        !!formData.phoneNumber &&
        !!formData.amount &&
        !!formData.pay,
    });

    const allFieldsFilled =
      formData.network &&
      formData.type &&
      formData.phoneNumber &&
      formData.amount &&
      formData.pay &&
      formData.discount;

    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
              Buy Airtime
            </p>
          </Link>
        </div>
        
        <div>
          
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
                  name="network"
                  placeholder="Select Network"
                  value={formData.network}
                  onChange={handleInputChange}
                  className={`bg-white py-4 px-6 placeholder:text-secondary text-black ${
                    formData.network ? "rounded-lg" : "border-0"
                  } text-[12px] rounded-xl outline-none border-[#000000] border-1 lg:w-full w-full h-[52px] font-medium`}
                >
                  <option value="" disabled>
                    Select Network
                  </option>
                  <option value="mtn">MTN</option>
                  <option value="glo">GLO</option>
                  <option value="airtel">AIRTEL</option>
                  <option value="9mobile">9MOBILE</option>
                </select>
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-4"></span>
                <select
                  name="type"
                  placeholder="Select Type"
                  value={formData.type}
                  onChange={handleInputChange}
                  disabled={!isFieldEnabled.type}
                  className={`bg-white py-4 px-6 placeholder:text-secondary text-black ${
                    isFieldEnabled.type ? "rounded-lg" : "border-0"
                  } text-[12px] rounded-xl outline-none border-[#000000] border-1 lg:w-full w-full h-[52px] font-medium`}
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="vtu">VTU</option>
                </select>
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-4"></span>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isFieldEnabled.phoneNumber}
                  className={`bg-[#ffff] text-[12px] py-4 px-6 placeholder:text-secondary text-black ${
                    isFieldEnabled.phoneNumber ? "rounded-lg" : "border-0"
                  } rounded-xl outline-none border-[#000000] font-medium border-1 lg:w-full w-full h-[52px]`}
                />
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-4"></span>
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  disabled={!isFieldEnabled.amount}
                  className={`bg-[#ffff] py-4 px-6 placeholder:text-secondary text-black ${
                    isFieldEnabled.amount ? "rounded-lg" : "border-0"
                  } text-[12px] rounded-xl outline-none border-[#000000] font-medium border-1 lg:w-full w-full h-[52px]`}
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
                  } text-[12px] rounded-xl outline-none border-[#000000] font-medium border-1 lg:w-full w-full h-[52px]`}
                />
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-4"></span>
                <input
                  type="number"
                  name="discount"
                  placeholder="Discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  className={`bg-[#ffff] py-4 px-6 placeholder:text-secondary text-black ${
                    isFieldEnabled.discount ? "rounded-lg" : "border-0"
                  } text-[12px] rounded-xl outline-none border-[#000000] font-medium border-1 lg:w-full w-full h-[52px]`}
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

              <div className="flex flex-auto items-center justify-center mt-[40px]">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`bg-original py-3 px-20 outline-none uppercase text-[12px] xl sm:w-[406px] text-white font-bold shadow-md rounded-full w-full h-[45px] ${
                    isFormValid ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {loading ? "transferring..." : "Buy Airtime"}
                </button>
              </div>

              <div className=" " />
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Network;

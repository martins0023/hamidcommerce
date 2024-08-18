import React, { useState, useEffect } from "react";
import Navbar from "../dashboard/Navbar";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import {
  arrow_back_ios,
  cashflow,
  convert,
  dropdown,
  info,
  naira,
  mtn, // Add the appropriate network images
  glo,
  airtel,
  etisalat,
} from "../../assets";
import { Link, useNavigate } from "react-router-dom";

const ConvertCash = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    network: "",
    senderNumber: "",
    amount: "",
    pay: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const [isFieldEnabled, setIsFieldEnabled] = useState({
    senderNumber: false,
    amount: false,
    pay: false,
  });

  const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsAdditionalInfoVisible(true);
  };

  useEffect(() => {
    setIsFieldEnabled({
      senderNumber: !!formData.network,
      amount: !!formData.network && !!formData.senderNumber,
      pay: !!formData.network && !!formData.senderNumber && !!formData.amount,
    });

    const allFieldsFilled =
      formData.network &&
      formData.senderNumber &&
      formData.amount &&
      formData.pay;

    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic
    navigate("/review")
  };

  const [loading, setLoading] = useState(false);

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

  const getNetworkImage = (network) => {
    switch (network) {
      case "mtn":
        return mtn;
      case "glo":
        return glo;
      case "airtel":
        return airtel;
      case "9mobile":
        return etisalat;
      default:
        return null;
    }
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
              Airtime To Cash
            </p>
          </Link>
        </div>
        <div className="w-full justify-between items-center max-w-7xl mx-auto ">
          <div className="flex flex-wrap lg:flex-nowrap ">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-[79px] rounded-xl w-full lg:w-full p-[20px] m-2 bg-hero-pattern bg-no-repeat bg-cover bg-center">
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

          <div className="flex flex-row justify-center gap-[8px] items-center border border-black h-[70px] rounded-xl m-2">
            <img src={cashflow} className="h-[38px] w-[38px]" />
            <p className="uppercase font-bold text-black text-[14px]">
              CONVERT AIRTIME TO CASH
            </p>
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
                  } rounded-xl outline-none border-[#000000] border-1 lg:w-full w-full h-[52px] text-[12px] font-medium`}
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
                <input
                  type="tel"
                  name="senderNumber"
                  placeholder="Sender Number"
                  value={formData.senderNumber}
                  onChange={handleInputChange}
                  disabled={!isFieldEnabled.senderNumber}
                  className={`bg-[#ffff] py-4 px-6 placeholder:text-secondary text-black ${
                    isFieldEnabled.senderNumber ? "rounded-lg" : "border-0"
                  } rounded-xl outline-none border-[#000000] font-medium border-1 h-[52px] text-[12px] lg:w-full w-full`}
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
                  } rounded-xl outline-none border-[#000000] font-medium border-1 h-[52px] text-[12px] lg:w-full w-full`}
                />
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-4"></span>
                <input
                  type="number"
                  name="pay"
                  placeholder="Amount to be Credited"
                  value={formData.pay}
                  onChange={handleInputChange}
                  disabled={!isFieldEnabled.pay}
                  className={`bg-[#ffff] py-4 px-6 placeholder:text-secondary text-black ${
                    isFieldEnabled.pay ? "rounded-lg" : "border-0"
                  } rounded-xl outline-none border-[#000000] font-medium border-1 h-[52px] text-[12px] lg:w-full w-full`}
                />
              </label>

              {isAdditionalInfoVisible && (
                <div className="bg-white p-5 rounded-xl mt-4 items-center">
                  <div className="">
                    <div className="bg-[#f5f5f5] w-full h-full items-center justify-center flex flex-col gap-[8px]">
                      <img
                        src={getNetworkImage(formData.network)}
                        alt="Network"
                        className="w-[72px] h-[72px] mr-3 rounded-full mt-[8px]"
                      />
                      <p className="text-black font-semibold mb-[8px]">
                        <span className="uppercase">{formData.network}</span>{" "}
                        {` `} Network
                      </p>
                    </div>
                    <div className="flex flex-col gap-[16px] mt-[16px]">
                      <p className="font-medium text-[12px] text-[#919191]">
                        Phone Number:{" "}
                        <span className="text-black font-semibold">
                          {" "}
                          {formData.senderNumber}
                        </span>
                      </p>
                      <p className="font-medium text-[12px] text-[#919191]">
                        Set New Pin:{" "}
                        <span className="text-black font-semibold">
                          {" "}
                          *600*000*Newpin*Newpin#
                        </span>
                      </p>
                      <p className="font-medium text-[12px] text-[#919191]">
                        Transfer Code:{" "}
                        <span className="text-black font-semibold">
                          {" "}
                          *600*000*Number*Amount*Pin#
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-[8px] mt-[16px] ml-1">
                <div className="flex flex-row gap-[4px] items-center">
                  <img src={info} className="w-[12px] h-[12px]" />
                  <p className="text-[12px] font-normal text-[#8E1011]">
                    Please contact admin first before sending airtime.
                  </p>
                </div>
                <div className="flex flex-row gap-[4px] items-center">
                  <img src={info} className="w-[12px] h-[12px]" />
                  <p className="text-[12px] font-normal text-[#8E1011]">
                    Click on submit only when have transferred the Airtime.
                  </p>
                </div>
                <div className="flex flex-row gap-[4px] items-center">
                  <img src={info} className="w-[12px] h-[12px]" />
                  <p className="text-[12px] font-normal text-[#8E1011]">
                    When verified, your wallet would be credited. If you prefer
                    a bank transfer, please communicate with the admin.
                  </p>
                </div>
              </div>

              <div className="flex flex-auto items-center justify-center mt-[40px]">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`bg-original py-3 px-20 outline-none uppercase text-[12px] sm:w-[406px] text-white font-bold shadow-md rounded-full w-full h-[45px] ${
                    isFormValid ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {loading ? "transferring..." : "Submit"}
                </button>
              </div>

              <div className="mb-5" />
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ConvertCash;

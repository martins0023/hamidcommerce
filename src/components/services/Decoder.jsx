import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import Switch from "react-switch";
import { arrow_back_ios, dropdown, info, naira } from "../../assets";
import MyButton from "../reusable/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { NetworkContext } from "./NetworkContext";

const Decoder = () => {
  const { selectedCable } = useContext(NetworkContext);

  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");

  const [formData, setFormData] = useState({
    cable: selectedCable || "",
    plan: "",
    amount: "",
    subscription: "",
    phoneNumber: "",
    iuc: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const [isFieldEnabled, setIsFieldEnabled] = useState({
    plan: false,
    amount: false,
    subscription: false,
    phoneNumber: false,
    iuc: false,
  });

  const [clickCount, setClickCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsFieldEnabled({
      plan: !!formData.cable,
      amount: !!formData.cable && !!formData.plan,
      subscription: !!formData.cable && !!formData.plan && !!formData.amount,
      phoneNumber:
        !!formData.cable &&
        !!formData.plan &&
        !!formData.amount &&
        !!formData.subscription,
      iuc:
        !!formData.cable &&
        !!formData.plan &&
        !!formData.amount &&
        !!formData.subscription &&
        !!formData.phoneNumber,
    });

    const allFieldsFilled =
      formData.cable &&
      formData.plan &&
      formData.amount &&
      formData.subscription &&
      formData.phoneNumber &&
      formData.iuc;

    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    navigate("/review");
  };

  const handleClick = () => {
    setLoading(true);
    setClickCount((prevCount) => prevCount + 1);

    if (clickCount === 0) {
      // Simulate an API call
      setTimeout(() => {
        const randomNames = [
          "John Doe",
          "Jane Smith",
          "Alice Johnson",
          "Bob Brown",
        ];
        const randomName =
          randomNames[Math.floor(Math.random() * randomNames.length)];
        setCustomerName(randomName);
        setLoading(false);
      }, 2000);
    } else if (clickCount === 1) {
      navigate("/review");
    }
  };

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
              Buy Cable
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
                  name="cable"
                  placeholder="Select Cable"
                  value={formData.cable}
                  onChange={handleInputChange}
                  className={`bg-white py-4 px-6 placeholder:text-secondary text-black ${
                    formData.cable ? "rounded-lg" : "border-0"
                  } rounded-xl outline-none border-[#000000] border-1 lg:w-full w-full h-[52px] text-[12px] font-medium`}
                >
                  <option value="" disabled>
                    Select Cable
                  </option>
                  <option value="dstv">DSTV</option>
                  <option value="gotv">GOTV</option>
                  <option value="startimes">STARTIMES</option>
                </select>
              </label>

              <label className="flex flex-col">
                <span className="text-white font-medium mb-4"></span>
                <select
                  name="plan"
                  placeholder="Select Plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  disabled={!isFieldEnabled.plan}
                  className={`bg-white py-4 px-6 placeholder:text-secondary text-black ${
                    isFieldEnabled.plan ? "rounded-lg" : "border-0"
                  } rounded-xl outline-none border-[#000000] border-1 lg:w-full w-full h-[52px] text-[12px] font-medium`}
                >
                  <option value="" disabled>
                    Select Plan
                  </option>
                  <option value="yanga">Yanga</option>
                </select>
              </label>

              <label className="flex flex-col mt-[18px]">
                <span className="text-[#666666] py-1 px-1 text-[10px] absolute top-1/6 transform -translate-y-1/5 ml-5 font-normal mb-4">
                  Amount to Pay
                </span>
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount to Pay"
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
                <select
                  name="subscription"
                  placeholder="Subscription Type"
                  value={formData.subscription}
                  onChange={handleInputChange}
                  disabled={!isFieldEnabled.subscription}
                  className={`bg-white py-4 px-6 placeholder:text-secondary text-black ${
                    isFieldEnabled.subscription ? "rounded-lg" : "border-0"
                  } rounded-xl outline-none border-[#000000] border-1 lg:w-full w-full h-[52px] text-[12px] font-medium`}
                >
                  <option value="" disabled>
                    Subscription Type
                  </option>
                  <option value="renew">Renew</option>
                </select>
              </label>

              <label className="flex flex-col mt-[18px]">
                <span className="text-[#666666] py-1 px-1 text-[10px] absolute top-1/6 transform -translate-y-1/5 ml-5 font-normal mb-4">
                  Customer Phone Number
                </span>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Customer Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isFieldEnabled.phoneNumber}
                  className={`bg-[#ffff] py-4 px-6 placeholder:text-secondary text-black ${
                    isFieldEnabled.phoneNumber ? "rounded-lg" : "border-0"
                  } rounded-xl outline-none border-[#000000] font-medium border-1 h-[52px] text-[12px] lg:w-full w-full`}
                />
              </label>

              <label className="flex flex-col mt-[18px]">
                <span className="text-[#666666] py-1 px-1 text-[10px] absolute top-1/6 transform -translate-y-1/5 ml-5 font-normal mb-4">
                  IUC Phone Number
                </span>
                <input
                  type="number"
                  name="iuc"
                  placeholder="IUC Phone Number"
                  value={formData.iuc}
                  onChange={handleInputChange}
                  disabled={!isFieldEnabled.iuc}
                  className={`bg-[#ffff] py-4 px-6 placeholder:text-secondary text-black ${
                    isFieldEnabled.iuc ? "rounded-lg" : "border-0"
                  } rounded-xl outline-none border-[#000000] font-medium border-1 h-[52px] text-[12px] lg:w-full w-full`}
                />
              </label>

              {customerName && (
                <label className="flex flex-col mt-[18px]">
                  <span className="text-[#666666] py-1 px-1 text-[10px] absolute top-1/6 transform -translate-y-1/5 ml-5 font-normal mb-4">
                    Customer Name
                  </span>
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Customer Name"
                    value={customerName}
                    disabled
                    className="bg-[#ffff] py-4 px-6 text-black rounded-xl outline-none border-[#000000] font-medium border-1 h-[52px] text-[12px] lg:w-full w-full"
                  />
                </label>
              )}

              <div className="flex flex-col gap-[8px] my-5">
                {customerName && (
                  <div className="flex flex-row gap-[6px]  items-center">
                    <img src={info} className="w-[12px] h-[12px]" />
                    <p className="text-[12px] font-normal text-[#8E1011]">
                      Please confirm that the above details are correct before
                      you click on purchase
                    </p>
                  </div>
                )}

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
              </div>

              <div className="flex flex-col justify-center gap-[10px]">
                <MyButton
                  isFormValid={isFormValid}
                  loading={loading}
                  onClick={handleClick}
                  className=""
                  buttonText="Purchase Plan"
                />
                {customerName && (
                  <button
                    onClick={() => {
                      navigate(-1);
                      window.scrollTo(0, 0);
                    }}
                    className=" bg-[#ffff] font-montserrat xl sm:w-[406px] py-3 px-20 text-[#8E1011] text-[14px] border-[1.5px] border-[#8E1011] rounded-full uppercase w-full h-[53px] flex items-center justify-center"
                  >
                    GO BACK
                  </button>
                )}
              </div>

              <div className=" " />
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Decoder;

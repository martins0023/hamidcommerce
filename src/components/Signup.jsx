import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { email_icon, logo1, logo_blue, password_icon, user, visible, visible_off, check } from "../assets";
import MyButton from "./reusable/MyButton";
import { signup } from "../api/auth";

const Signup = () => {
  const [convertmodalIsOpen, setConvertModalIsOpen] = useState(false);

  const convertopenModal = () => {
    setConvertModalIsOpen(true);
  };

  const convertcloseModal = () => {
    setConvertModalIsOpen(false);
  };

  const [passwordVisibility, setPasswordVisibility] = useState("hidden");
  const [confirmpasswordVisibility, setConfirmPasswordVisibility] = useState("hidden");
  const [form, setForm] = useState({
    Username: "",
    Email: "",
    password: "",
    ConfirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // To handle specific error messages
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevState) => (prevState === "visible" ? "hidden" : "visible"));
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility((prevState) => (prevState === "visible" ? "hidden" : "visible"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const isFormValid = () => {
    const { Username, Email, password, ConfirmPassword } = form;
    if (!Username || !Email || !password || password !== ConfirmPassword) {
      setErrorMessage("Please fill out all fields correctly and ensure passwords match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    setLoading(true);

    try {
      const { data } = await signup(form);
      console.log(data);
      setShowSuccess(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/login");
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred during signup. Please try again.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white h-full flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center justify-items-center pb-10">
      {showSuccess && (
          <div className="fixed top-0 left-0 right-0 bg-green-500 text-white py-2 text-center">
            {`Sign Up Successful. Welcome ${username}!`}
          </div>
        )}
        <motion.div
          className="flex-[0.85]"
        >
          <div className="flex justify-center items-center mt-4">
            <img src={logo1} className="w-[90px] h-[98px]" />
          </div>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-6">
            {/* Username Field */}
            <label className="flex flex-col">
              <div className="flex items-center relative">
                <img src={user} className="absolute left-4" alt="user icon" />
                <input
                  type="text"
                  name="Username"
                  value={form.Username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="bg-[#EDEEFA] py-4 pl-12 pr-6 w-full h-[55px]
                placeholder:text-secondary border-none
                text-[#212C6299] rounded-full outline-none
                  font-normal text-[14px]"
                />
              </div>
            </label>

            {/* Email Field */}
            <label className="flex flex-col">
              <div className="flex items-center relative">
                <img src={email_icon} className="absolute left-4" alt="email icon" />
                <input
                  type="email"
                  name="Email"
                  value={form.Email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="bg-[#EDEEFA] py-4 pl-12 pr-6 w-full h-[55px]
                placeholder:text-secondary border-none
                text-[#212C6299] rounded-full outline-none
                  font-normal text-[14px]"
                />
              </div>
            </label>

            {/* Password Field */}
            <label className="flex flex-col">
              <div className="flex items-center relative">
                <img src={password_icon} className="absolute left-4 cursor-pointer" alt="password icon" />
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
                <div className="flex justify-end">
                  <img
                    src={passwordVisibility === "visible" ? visible : visible_off}
                    className="absolute mr-4 cursor-pointer bottom-4"
                    alt="passwordVisibility"
                    onClick={togglePasswordVisibility}
                  />
                </div>
              </div>
            </label>

            {/* Confirm Password Field */}
            <label className="flex flex-col">
              <div className="flex items-center relative">
                <img src={password_icon} className="absolute left-4 cursor-pointer" alt="confirm password icon" />
                <input
                  type={confirmpasswordVisibility === "visible" ? "text" : "password"}
                  name="ConfirmPassword"
                  value={form.ConfirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="bg-[#EDEEFA] py-4 pl-12 pr-6 w-full h-[55px]
                placeholder:text-secondary border-none
                text-[#212C6299] rounded-full outline-none
                  font-normal text-[14px]"
                />
                <div className="flex justify-end">
                  <img
                    src={confirmpasswordVisibility === "visible" ? visible : visible_off}
                    className="absolute mr-4 cursor-pointer bottom-4"
                    alt="passwordVisibility"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                </div>
              </div>
            </label>

            {/* Terms and Conditions */}
            <div className="flex flex-row justify-center items-center">
              <input
                type="checkbox"
                className="mr-2 border-[#212C62] bg-[#FFEEEE] rounded-full h-[20px] w-[20px] border-2"
                required
              />
              <a className={`font-medium text-[10px] text-original`} href="/forgetpassword">
                This means you agree to all our Terms and Conditions
              </a>
            </div>

            {/* Sign Up Button */}
            <div className="flex flex-auto items-center justify-center">
              <MyButton buttonText="Sign Up"  />
            </div>
          </form>
          
          {/* Display error messages */}
          {showAlert && (
            <div className="fixed bottom-0 left-0 right-0 bg-[#FD3D00] text-white py-2 text-center">
              {errorMessage}
            </div>
          )}

          <div className="mt-7 mb-3">
            <p className="text-[#353945] font-normal text-[12px] text-center">
              Already have an account?{" "}
              <span className="text-[#FE8946] font-semibold text-[14px]">
                {" "}
                <a href="/login"> Log In</a>
              </span>
            </p>
          </div>
        </motion.div>
        <div className="flex items-center justify-center ">
          <Modal
            isOpen={convertmodalIsOpen}
            onRequestClose={convertcloseModal}
            contentLabel="SUCCESS"
            className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-10"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-7 flex flex-col items-center m-3">
              <div className="p-3 flex justify-center items-center">
                <img
                  src={check}
                  alt="success"
                  className="w-full h-auto items-center"
                />
              </div>
              <div className="mb-4">
                <p className="font-semibold text-[20px] text-[#000000] text-center">
                  Success
                </p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="font-normal text-center text-[14px] text-[#000000]">
                  Successfully Signed Up
                </p>
              </div>
              <div className="flex flex-col w-full gap-[1px]">
                <button
                  onClick={convertcloseModal}
                  className="mt-6 bg-[#1673CA] font-montserrat py-3 px-20 text-[#FFFF] border-[1.5px] hover:bg-[#1673ca3b] rounded-full uppercase w-full h-[53px]"
                >
                  OK
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </section>
  );
};

export default Signup;

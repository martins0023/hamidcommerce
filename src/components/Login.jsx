import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { email_icon, logo_blue, password_icon, visible, visible_off } from "../assets";
import MyButton from "./reusable/MyButton";
import { login } from "../api/auth";

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState("hidden");
  const [form, setForm] = useState({ Email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;
  const lockoutTime = 600000; // 10 minutes
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevState) => (prevState === "visible" ? "hidden" : "visible"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const isFormValid = () => {
    return Object.values(form).every((value) => value.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (attempts >= maxAttempts) {
      setShowAlert(true);
      return;
    }

    if (!isFormValid()) {
      setShowAlert(true);
      return;
    }

    setLoading(true);

    try {
      const { data } = await login(form);
      console.log(data);
      setShowSuccess(true);
      navigate("/dashboard");
      setAttempts(0); // Reset attempts on successful login
    } catch (error) {
      setAttempts((prev) => prev + 1); // Increment attempts on failed login
      if (attempts + 1 >= maxAttempts) {
        setTimeout(() => setAttempts(0), lockoutTime); // Reset attempts after lockout period
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
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
            Please fill out all fields correctly or try again later.
          </div>
        )}
        {showSuccess && (
          <div className="fixed top-0 left-0 right-0 bg-green-500 text-white py-2 text-center">
            Login Successful. Welcome back!
          </div>
        )}
        <motion.div
          variants={containerVariants}
          animate="visible"
          initial="hidden"
          exit="exit"
          className="flex-[0.85]"
        >
          <div className="flex justify-center items-center">
            <img src={logo_blue} className="w-[148px] h-[115px]" />
          </div>

          <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-6">
            <label className="flex flex-col">
              <div className="flex items-center relative">
                <img src={email_icon} className="absolute left-4" alt="email icon" />
                <input
                  type="email"
                  name="Email"
                  value={form.Email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="bg-[#EDEEFA] py-4 pl-12 pr-6 w-full h-[55px] placeholder:text-secondary border-none text-[#212C6299] rounded-full outline-none font-normal text-[14px]"
                />
              </div>
            </label>

            <label className="flex flex-col">
              <div className="flex items-center relative">
                <img src={password_icon} className="absolute left-4 cursor-pointer" />
                <input
                  type={passwordVisibility === "visible" ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="bg-[#EDEEFA] py-4 pl-12 pr-6 w-full h-[55px] placeholder:text-secondary border-none text-[#212C6299] rounded-full outline-none font-normal text-[14px]"
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

            <a className="flex justify-center items-center font-medium text-[14px] mt-4 text-original" href="/forgetpassword">
              Forgot your password?
            </a>

            <div className="flex flex-auto items-center justify-center">
              <MyButton buttonText="Log In" loading={loading} />
            </div>
          </form>
          <div className="mt-7">
            <p className="text-[#353945] font-normal text-[12px] text-center">
              I don’t have an account?{" "}
              <span className="text-[#FE8946] font-semibold text-[14px]">
                {" "}
                <a href="/signup">Sign Up here</a>
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;

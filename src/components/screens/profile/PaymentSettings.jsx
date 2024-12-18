import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { back_icon } from "../../../assets";

const PaymentSettings = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleNextStep = () => {
    if (step === 1) setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/store-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardDetails),
      });
      const data = await response.json();

      if (data.success) {
        // Redirect to 3D Secure Gateway
        window.location.href = data.redirectUrl;
      } else {
        alert("Card validation failed. Try again!");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-3">
      <Link
        to=""
        onClick={() => {
          navigate(-1);
          window.scrollTo(0, 0);
        }}
      >
        <img
          src={back_icon}
          alt="back"
          className="cursor-pointer w-[26px] h-[20px] mt-3"
        />
      </Link>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          {/* Step Indicator */}
          <div className="flex justify-between mb-4">
            <div
              className={`w-1/2 h-1 ${
                step >= 1 ? "bg-primary" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`w-1/2 h-1 ${
                step >= 2 ? "bg-primary" : "bg-gray-200"
              }`}
            ></div>
          </div>

          {step === 1 ? (
            <>
              <h2 className="text-xl font-bold text-center mb-6 text-black">
                Add Your Card
              </h2>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                className="w-full border text-black p-3 rounded mb-3"
                onChange={handleChange}
              />
              <input
                type="text"
                name="cardholderName"
                placeholder="Cardholder Name"
                className="w-full border p-3 rounded mb-3 text-black"
                onChange={handleChange}
              />
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="expiryMonth"
                  placeholder="MM"
                  maxLength="2"
                  className="w-1/2 border p-3 rounded text-black"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="expiryYear"
                  placeholder="YY"
                  maxLength="2"
                  className="w-1/2 border p-3 rounded text-black"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="cvv"
                  placeholder="CVV"
                  maxLength="3"
                  className="w-1/2 border p-3 rounded text-black"
                  onChange={handleChange}
                />
              </div>
              <button
                className="w-full bg-primary text-white py-3 rounded mt-4"
                onClick={handleNextStep}
              >
                Next
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-center mb-6 text-black">
                Confirm Your Card
              </h2>
              <div className="bg-gray-100 rounded p-4 mb-4">
                <p className="font-semibold text-black">Card Number:</p>
                <p className="text-black">
                  {cardDetails.cardNumber.replace(
                    /\d{12}(\d{4})/,
                    "**** **** **** $1"
                  )}
                </p>
              </div>
              <button
                className={`w-full py-3 rounded text-white ${
                  loading ? "bg-gray-400" : "bg-primary"
                }`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;
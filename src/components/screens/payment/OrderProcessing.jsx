import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import { styles } from "../../../styles";
import {
  back_icon,
  callcart,
  locationcart,
  circle_check,
  circle_check_outline,
  paga,
  crypto,
  visa,
  mastercard,
  stripe,
  paystack,
} from "../../../assets";
import { CartContext } from "../../../utils/cartcontext";
import { urlFor } from "../../../../lib/client";
import BottomNavbar from "../../dashboard/BottomNavbar";

// Sample exchange rate (1 USD = 780 NGN for example)
const EXCHANGE_RATES = {
  NGN: 1, // Base currency
  USD: 0.00128, // 1 NGN to USD
  EUR: 0.00118, // 1 NGN to EUR
};

// Function to convert NGN to other currencies
const convertToCurrency = (amountInNGN, currency) => {
  const rate = EXCHANGE_RATES[currency] || 1;
  return (amountInNGN * rate).toFixed(2);
};
// Make sure to use your actual Stripe publishable key
const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);
//console.log("Stripe Publishable Key:", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY); // For React

const OrderProcessing = () => {
  // Delivery option state: 'home' or 'pickup'
  const [deliveryOption, setDeliveryOption] = useState(null);
  const navigate = useNavigate();

  //PAYPAL INTEGRATION
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);
  const { cartItems } = useContext(CartContext);
  // Check if the cartItems array has items before accessing the first element
  console.log(cartItems);

  // Calculate total product price
  const totalProductPrice = cartItems.reduce((total, item) => {
    return total + item.price;
  }, 0);

   // Total price in NGN
  const totalProductPriceNGN = cartItems.reduce((total, item) => {
    return total + item.price;
  }, 0);

  // Convert the total price to the selected currency
  const totalProductPriceInSelectedCurrency = convertToCurrency(totalProductPriceNGN, currency);

  const onCurrencyChange = ({ target: { value } }) => {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  };

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalProductPriceInSelectedCurrency, // Use converted price here
            currency_code: currency === "NGN" ? "USD" : currency, // Fallback to USD if NGN is selected
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
    });
  };

  const handleCheckout = async () => {
    const stripe = await loadStripe(
      "pk_test_51HIjnmK18qLqQSoUOzmnoiNfm2CSsrgsH3uq3OuDNIHkVcZbHghDcCGsngMYtmFqnMVIfVRDVt7A7oO9j9jvm8Pb00hw5qtH51"
    );

    // Ensure cartItems is not empty or undefined
    if (!cartItems || cartItems.length === 0) {
      console.error("Cart is empty or undefined");
      return;
    }

    // Ensure each cart item has a valid quantity, price, and name
    const validCartItems = cartItems.filter(
      (item) => item.quantity > 0 && item.price > 0 && item.name
    );

    if (validCartItems.length === 0) {
      console.error;
      return;
    }

    const body = {
      products: validCartItems, // Send valid cart items to the backend
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/create-checkout-session`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error: ${errorMessage}`);
      }

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Checkout error: ", error.message);
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
    <section className="bg-[#FBFCFF]">
      <motion.div
        className="dashboard-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <nav
          className={`${styles.paddingX} w-full h-[80px] flex items-center justify-between py-1 top-0 z-20`}
        >
          <div className="flex items-center w-full px-3">
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
                className="cursor-pointer w-[26px] h-[20px]"
              />
            </Link>

            <div className="flex-grow flex justify-center">
              <p className="text-gray-400 text-[18px] font-semibold text-center">
                Checkout
              </p>
            </div>
          </div>
        </nav>

        <div className="pb-20">
          <div className="px-5">
            {/* List of Cart Items with Images */}
            <p className="text-black text-[14px] font-semibold">
              Items you're buying
            </p>

            <div className="flex flex-row gap-2">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center flex-row mt-4 gap-2"
                >
                  <div className="bg-[#E9F1FD] rounded-lg w-[80px] h-[80px] flex items-center justify-center">
                    <img
                      src={urlFor(item.image)}
                      alt={item.name}
                      className="w-[50px] h-[50px] object-cover rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-[14px] text-black font-semibold">Total Cost</p>

              <div>
                <div className="bg-white rounded-lg w-full shadow-sm mt-2 pb-1">
                  <div className="flex flex-col p-3">
                    <div className="flex flex-row justify-between">
                      <p className="text-[#00000073] text-[12px] font-medium">
                        Products Price
                      </p>
                      <p className="text-[#00000073] text-[12px] font-medium">
                        # {totalProductPrice}
                      </p>
                    </div>

                    <div className="flex flex-row justify-between">
                      <p className="text-[#00000073] text-[12px] font-medium">
                        Shipping Fees
                      </p>
                      <p className="text-[#00000073] text-[12px] font-medium">
                        #0,00
                      </p>
                    </div>

                    <div className="flex flex-row justify-between mt-2">
                      <p className="text-black font-semibold text-[12px]">
                        Total Amount
                      </p>
                      <p className="text-black font-semibold text-[12px]">
                        NGN {totalProductPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[14px] text-black font-semibold">
                  Payment Method
                </p>
                <div className="flex mt-2 gap-2">
                  {/*<div className="bg-[#E9F1FD] rounded-lg w-[70px] h-[60px] flex items-center justify-center p-1">
                    <img
                      src={paystack}
                      className="w-[50px] h-[30px]"
                      alt="paystack"
                    />
                  </div>
                  <div className="bg-[#E9F1FD] rounded-lg w-[70px] h-[60px] flex items-center justify-center p-1">
                    <img
                      src={crypto}
                      className="w-[40px] h-[40px]"
                      alt="crypto"
                    />
                  </div>
                  <div className="bg-[#E9F1FD] rounded-lg w-[70px] h-[60px] flex items-center justify-center p-1">
                    <img src={visa} className="w-[40px] h-[18px]" alt="visa" />
                  </div>
                  <div className="bg-[#E9F1FD] rounded-lg w-[70px] h-[60px] flex items-center justify-center p-1">
                    <img
                      src={mastercard}
                      className="w-[40px] h-[30px]"
                      alt="mastercard"
                    />
              </div>
              <div
                    onClick={handleCheckout}
                    className="bg-[#E9F1FD] rounded-lg cursor-pointer w-[70px] h-[60px] flex items-center justify-center p-1"
                  >
                    <img
                      src={stripe}
                      className="w-[40px] h-[40px]"
                      alt="STRIPE"
                    />
                  </div>
              */}

                  <div className="w-full ">
                    {isPending ? (
                      <p>LOADING...</p>
                    ) : (
                      <>
                        <select className="w-full mb-2 rounded-xl text-black font-montserrat font-semibold" id="currency" value={currency} onChange={onCurrencyChange}>
                          <option value="USD">💵 USD</option>
                          <option value="EUR">💶 Euro</option>
                          <option value="NGN">🇳🇬 NGN</option>
                        </select>
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          createOrder={(data, actions) =>
                            onCreateOrder(data, actions)
                          }
                          onApprove={(data, actions) =>
                            onApproveOrder(data, actions)
                          }
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default OrderProcessing;

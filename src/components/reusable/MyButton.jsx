import React from "react";

const MyButton = ({ isFormValid, loading, onClick, buttonText }) => {
  return (
    <div className="flex flex-auto items-center justify-center mt-[30px]">
      <button
        type="submit"
        onClick={onClick}
        disabled={!isFormValid || loading} // Disable the button when invalid or loading
        className={`bg-primary py-3 outline-none text-[18px] hover:bg-[#00000063] px-2 sm:w-[406px] text-white font-normal shadow-md rounded-full w-full h-[57px] flex items-center justify-center ${
          isFormValid && !loading ? "" : "cursor-not-allowed"
        }`}
      >
        {loading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          buttonText
        )}
      </button>
    </div>
  );
};

export default MyButton;

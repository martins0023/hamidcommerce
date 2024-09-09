import React from 'react';

const MyButton = ({ isFormValid, loading, onClick, buttonText }) => {
  return (
    <div className="flex flex-auto items-center justify-center mt-[30px]">
      <button
        type="submit"
        
        onClick={onClick}
        className={`bg-primary py-3 outline-none xl text-[18px] hover:bg-[#00000063] px-2 sm:w-[406px] text-white font-normal shadow-md rounded-full w-full h-[57px] flex items-center justify-center ${
          isFormValid &&  !loading ? "" : " cursor-not-allowed"
        }`}
      >
        {loading ? 'loading...' : buttonText}
      </button>
    </div>
  );
};

export default MyButton;

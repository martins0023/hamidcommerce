import React, { useState } from "react";
import Modal from "react-modal";
import { airtel, etisalat, glo, mtn } from "../../../assets";

const Data = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
  
    const [selectedNetwork, setSelectedNetwork] = useState(null);
  
    const networks = [
      { id: "mtn", img: mtn, name: "MTN" },
      { id: "airtel", img: airtel, name: "Airtel" },
      { id: "glo", img: glo, name: "Glo" },
      { id: "etisalat", img: etisalat, name: "9mobile" },
    ];
  return (
    <div className="flex items-center justify-center ">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Select network"
        className="fixed inset-0 flex items-center justify-center mt-[180px] bg-black bg-opacity-10"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-7">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={closeModal}
              className="text-black text-xl font-bold"
            >
              ✕
            </button>
            <p className="font-semibold text-[16px] text-[#000000]">
              Social Network
            </p>
          </div>
          <div className="grid grid-cols-2 gap-[46px] p-3 mt-9">
            {networks.map((network) => (
              <div
                key={network.id}
                className="relative cursor-pointer"
                onClick={() => setSelectedNetwork(network.id)}
              >
                <img
                  src={network.img}
                  alt={network.name}
                  className="w-full h-auto"
                />
                {selectedNetwork === network.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="mt-6 bg-[#D3A5A5] text-white py-3 px-12 rounded-full w-full">
            Continue
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Data
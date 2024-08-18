import React, { createContext, useState } from "react";

export const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const setSelectedNetNetwork = setSelectedNetwork; // Alias for clarity

  //airtime state
  const setSelectedAirtimeNetwork = setSelectedNetwork;

  //exeam state
  const [selectedExam, setSelectedExam] = useState(null);
  const setSelectedExamNetwork = setSelectedExam;

  //cable state
  const [selectedCable, setSelectedCable] = useState(null);
  const setSelectedCableNetwork = setSelectedCable;

  //data pin state
  const [selectedDataScreenNetwork, setSelectedDataScreenNetwork] = useState(null);
  const setSelectedDatapinNetwork = setSelectedDataScreenNetwork;

  //select distribution
  const [selectedElectricity, setSelectedElectricity] = useState(null);
  const setSelectedDistribution = setSelectedElectricity;

  return (
    <NetworkContext.Provider
      value={{
        selectedNetwork,
        selectedExam,
        selectedCable,
        selectedDataScreenNetwork,
        selectedElectricity,
        setSelectedNetwork,
        setSelectedNetNetwork,
        setSelectedAirtimeNetwork,

        //exam
        setSelectedExam,
        setSelectedExamNetwork,

        //cable
        setSelectedCable,
        setSelectedCableNetwork,

        //data pin
        setSelectedDataScreenNetwork,
        setSelectedDatapinNetwork,

        //electricity
        setSelectedElectricity,
        setSelectedDistribution
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

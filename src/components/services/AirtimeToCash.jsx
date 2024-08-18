import React from "react";
import Navbar from "../dashboard/Navbar";
import ConvertCash from "./ConvertCash";
import ServiceNavbar from "./ServiceNavbar";

const AirtimeToCash = () => {
  return (
    <section>
      <ServiceNavbar />
      <ConvertCash />
    </section>
  );
};

export default AirtimeToCash;

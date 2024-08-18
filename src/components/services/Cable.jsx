import React from "react";
import Navbar from "../dashboard/Navbar";
import Decoder from "./Decoder";
import ServiceNavbar from "./ServiceNavbar";

const Cable = () => {
  return (
    <section>
      <ServiceNavbar />
      <Decoder />
    </section>
  );
};

export default Cable;

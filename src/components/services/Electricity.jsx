import React from 'react';
import Navbar from '../dashboard/Navbar';
import Distribution from './Distribution';
import ServiceNavbar from './ServiceNavbar';

const Electricity = () => {
  return (
    <section>
        <ServiceNavbar />
        <Distribution />
    </section>
  )
}

export default Electricity
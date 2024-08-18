import React from 'react'
import { apps, notification, person, icon } from '../../assets';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { styles } from '../../styles';

const ServiceNavbar = () => {
  const [active, setActive] = useState("");
  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-1  top-0 z-20 bg-colorbg pr-3`}
    >
      
    </nav>
  )
}

export default ServiceNavbar
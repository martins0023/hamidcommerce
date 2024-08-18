import React from 'react'
import Navbar from '../dashboard/Navbar'
import Bundles from './Bundles'
import ServiceNavbar from './ServiceNavbar'

const Data = () => {
  return (
    <section>
      <ServiceNavbar />
      <Bundles />
    </section>
  )
}

export default Data
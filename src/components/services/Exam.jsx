import React from 'react'
import Navbar from '../dashboard/Navbar'
import Exampins from './Exampins'
import ServiceNavbar from './ServiceNavbar'

const Exam = () => {
  return (
    <section>
        <ServiceNavbar />
        <Exampins />
    </section>
  )
}

export default Exam
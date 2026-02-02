import React from 'react'
import Navbars from '../layout/Navbars'
import Footer from '../layout/Footer'

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbars/>
      <main className="flex-1 flex items-start ">
        <h1 className="text-4xl font-bold">
          About
          </h1>
      </main>
      <Footer/>
    </div>
  )
}

export default About

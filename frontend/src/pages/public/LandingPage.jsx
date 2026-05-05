import React from 'react'
import Nav from '../../components/landingpage/Nav'
import Intro from '../../components/landingpage/Intro'
import ImgCards from '../../components/landingpage/ImgCards'
import Features from '../../components/landingpage/Features'
import HowItWorks from '../../components/landingpage/HowItWorks'
import SignupButtons from '../../components/landingpage/SignupButtons'
import ContactUs from '../../components/landingpage/ContactUs'
import Roles from '../../components/landingpage/Roles'
import Footer from '../../components/landingpage/Footer'


const LandingPage = () => {

    const cards = [
        {
        img: "https://i.pinimg.com/1200x/55/18/87/551887f865fe94c481ea9c43daf5e47e.jpg",
        color: 'indigo',
        tag: "Empower"
        },
        {
        img: "https://i.pinimg.com/736x/38/a3/7f/38a37f254fc1f265dcc7b5263ffb5c0f.jpg",
        color: 'purple',
        tag: "Inclusivity"
        },
        {
        img: "https://i.pinimg.com/736x/55/1d/4b/551d4b83d493b800c4ebf02aca7db774.jpg",
        color: 'green',
        tag: "Build"
        },
        {
        img: "https://i.pinimg.com/736x/9c/46/4c/9c464c53fe1bc3a0fa9ed97ea09dc3ce.jpg",
        color: 'blue',
        tag: "Opportunities"
        }
    ]

  return (
    <div>
      <Nav />
      <div id="home" className='grid grid-cols-1 lg:grid-cols-2 scroll-mt-28'>
        <Intro />
        <ImgCards cards={cards} />
      </div>
      <div id="features" className="scroll-mt-28">
        <Features />
      </div>
      
      <HowItWorks />

      <Roles />

      <div id="signup" className="scroll-mt-28">
        <SignupButtons />
      </div>
      <div id="contact" className="scroll-mt-28">
        <ContactUs />
      </div>
      
      <Footer />
    </div>
  )
}

export default LandingPage

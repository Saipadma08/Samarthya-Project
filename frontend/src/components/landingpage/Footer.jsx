import React from "react"
import { HashLink } from "react-router-hash-link"

import SamarthyaText from "../../assets/Samarthya-text.png"


const Footer = () => {
  return (
    <div className="w-full bg-gray-900 text-gray-300 px-6 py-12">

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">


        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            SAMARTHYA
          </h2>

          <p className="text-sm mt-3">
            A secure and inclusive platform connecting
            transgender individuals with employment
            and local service opportunities.
          </p>

        </div>


        {/* Links */}
        <div>

          <h3 className="text-white font-semibold mb-3">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">

            <li className="hover:text-white cursor-pointer">
              <HashLink smooth to="/#home">Home</HashLink>
            </li>

            <li className="hover:text-white cursor-pointer">
              <HashLink smooth to="/#features">Features</HashLink> 
            </li>

            <li className="hover:text-white cursor-pointer">
              <HashLink smooth to="/#contact">Contact</HashLink>
            </li>

            <li className="hover:text-white cursor-pointer">
              <HashLink smooth to="/#home">Login</HashLink>
            </li>

          </ul>

        </div>


        {/* Roles */}
        <div>

          <h3 className="text-white font-semibold mb-3">
            Roles
          </h3>

          <ul className="space-y-2 text-sm">

            <li>Employee</li>
            <li>Employer</li>
            <li>Admin</li>

          </ul>

        </div>


        {/* Contact */}
        <div>

          <h3 className="text-white font-semibold mb-3">
            Contact
          </h3>

          <p className="text-sm">
            📧 support@samarthya.com
          </p>


          <p className="text-sm mt-2">
            📍 Bhubaneswar, India
          </p>

        </div>


      </div>


      {/* Bottom line */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm">

        © 2026 SAMARTHYA — Inclusive Employment Platform

      </div>

    </div>
  )
}

export default Footer
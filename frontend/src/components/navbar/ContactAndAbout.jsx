import React from 'react'
import { Link } from 'react-router-dom'

const ContactAndAbout = () => {
  return (
      <div className="flex items-center gap-2 lg:gap-6">
      
        <Link
        to="/about"
        className="text-sm font-medium hover:text-cyan-600"
        >
            About Us
        </Link>

        <Link
        to="/contact"
        className="text-sm font-medium hover:text-cyan-600"
        >
            Contact Us
        </Link>

    </div>
  )
}

export default ContactAndAbout

import React from 'react'

const ContactInfo = ({user, profile}) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 mt-5"> 
        <p className="text-lg lg:text-xl font-semibold mb-3"> Contact Info </p> 
        <p>Email: {user?.email}</p> 
        <p>Phone: {profile?.phone}</p> 
        <p>Location: {profile?.location}</p> 
    </div> 
  )
}

export default ContactInfo

import React from 'react'

const ContactInfo = ({user,profile}) => {
  return (
    <div>
        <div className="bg-white rounded-xl shadow p-5 mt-5">
      
            <p className="text-xl font-semibold mb-3">
            Contact Info
            </p>

            <p>E-mail: {user?.email}</p>
            <p>Phone no: {profile?.phone}</p>
            <p>Location: {profile?.location || "Not specified"}</p>

        </div>
    </div>
  )
}

export default ContactInfo

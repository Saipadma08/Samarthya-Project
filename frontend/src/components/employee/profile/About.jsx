import React from 'react'

const AboutInfo = ({profile}) => {
  return (
    <div>
      <div className="bg-white rounded-xl shadow p-5 mt-5">
        <p className="text-xl font-semibold mb-2">About</p>

        <p className="text-gray-700">
          {profile?.about || "No description added yet"}
        </p>
      </div>
    </div>
  )
}

export default AboutInfo

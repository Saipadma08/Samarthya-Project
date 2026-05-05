import React from 'react'

const ProfileCard = ({ profileImage, name, jobType }) => {
  return (
    <div className="w-36 h-44 lg:w-60 lg:h-72 rounded-xl shadow-md bg-white relative overflow-hidden">

        {/* image */}
        <div className="absolute top-0 left-0 w-full h-full">
        <img
            className="h-full w-full object-cover"
            src={profileImage || defaultAvatar}
            alt="Profile"
        />
        </div>


        {/* text */}
        <div className="relative flex flex-col justify-end h-full p-4">

        <p className="text-white text-md lg:text-2xl font-semibold">
            {name || "Your Name"}
        </p>

        <p className="text-gray-800 text-sm">
            Employee
        </p>

        <p className="text-gray-800 text-sm">
            {jobType}
        </p>

        </div>

    </div>
  )
}

export default ProfileCard

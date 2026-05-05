import React from 'react'

const ProfileCard = () => {
  return (
    <div className="w-36 h-44 lg:w-60 lg:h-72 rounded-xl shadow-md bg-white relative overflow-hidden">

        {/* image */}
        <div className="absolute top-0 left-0 w-full h-full">
        <img
            className="h-full w-full object-cover"
            src="https://i.pinimg.com/1200x/23/c3/6b/23c36b997f4facf89386e9674692b445.jpg"
            alt=""
        />
        </div>


        {/* text */}
        <div className="relative flex flex-col justify-end h-full p-4">

        <p className="text-white text-md lg:text-2xl font-semibold">
            Sumit Rao
        </p>

        <p className="text-gray-200 text-sm">
            Employer
        </p>

        <p className="text-gray-300 text-sm">
            Household Services
        </p>

        </div>

    </div>
  )
}

export default ProfileCard

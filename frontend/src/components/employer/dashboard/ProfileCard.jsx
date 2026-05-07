import React from 'react'
import AvatarImage from '../../images/AvatarImage'

const ProfileCard = ({user, profile }) => {
  return (
    <div className="w-36 h-44 lg:w-60 lg:h-72 rounded-xl shadow-md bg-white relative overflow-hidden">

        {/* image */}
        <div className="absolute top-0 left-0 w-full h-full">
            <AvatarImage profileImage={user?.profileImage} />
        </div>


        {/* text */}
        <div className="relative flex flex-col justify-end h-full p-4">

        <p className="text-white text-md lg:text-2xl font-semibold">
            {user?.name || "Your Name"}
        </p>

        <p className="text-white text-sm">
            Employer
        </p>

        <p className="text-white text-sm">
            {profile?.employerType}
        </p>

        </div>

    </div>
  )
}

export default ProfileCard

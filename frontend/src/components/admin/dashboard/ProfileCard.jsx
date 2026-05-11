import React from 'react'
import AvatarImage from '../../images/AvatarImage'

const ProfileCard = ({admin}) => {
  return (
    <div className="w-36 h-44 lg:w-60 lg:h-72 rounded-xl shadow-md bg-white relative overflow-hidden">

        {/* image */}
        <div className="absolute top-0 left-0 w-full h-full">
          <AvatarImage profileImage={admin?.profileImage} />
        </div>

        <div
            className="
            absolute
            inset-0
            bg-linear-to-t
            from-black/80
            via-black/20
            to-transparent
            "
        />


        {/* text */}
        <div className="relative flex flex-col justify-end h-full p-4">

          <p className="text-white text-md lg:text-2xl font-semibold drop-shadow-lg">
              {admin?.name}
          </p>

          <p className="text-gray-200 text-sm drop-shadow-lg">
              {admin?.email}
          </p>

        </div>

    </div>
  )
}

export default ProfileCard

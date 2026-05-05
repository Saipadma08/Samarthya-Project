import React from 'react'
import Avatar from '../../assets/Avatar.jpeg'

const ProfileMenu = () => {
  return (
    <div>
      <img
          src={Avatar}
          className="
          w-10 h-10
          rounded-full
          object-cover
          border border-white/40
          shadow
          cursor-pointer
          "
        />
    </div>
  )
}

export default ProfileMenu

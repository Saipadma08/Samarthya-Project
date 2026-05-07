import React from 'react'
import { DEFAULT_AVATAR_IMAGE } from '../../constants/defaultImages'

const AvatarImage = ({profileImage}) => {
  return (
    <div className="w-full h-full">
      <img
            className="w-full h-full object-cover brightness-90"
            src={profileImage || DEFAULT_AVATAR_IMAGE}
            alt="Avatar"
          />
    </div>
  )
}

export default AvatarImage

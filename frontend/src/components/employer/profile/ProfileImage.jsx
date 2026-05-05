import React from 'react'

const ProfileImage = () => {
  return (
    <div className="w-40 h-60  lg:w-64 lg:h-85 rounded-2xl shadow-md overflow-hidden">
        <img
        className="w-full h-full object-cover"
        src="https://i.pinimg.com/1200x/23/c3/6b/23c36b997f4facf89386e9674692b445.jpg"
        alt="Profile Image"
        />
    </div>
  )
}

export default ProfileImage

import React from 'react';

const ProfileImage = ({ profileImage }) => {
  const defaultAvatar =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="w-40 h-60 lg:w-64 lg:h-85 rounded-2xl shadow-md overflow-hidden">
        <img
          src={profileImage || defaultAvatar}
          alt="Profile"
          className="w-full h-full object-cover"
        />
    </div>
  );
};

export default ProfileImage;
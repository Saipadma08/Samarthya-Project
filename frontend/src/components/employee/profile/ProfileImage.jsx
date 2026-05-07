import React from 'react';
import AvatarImage from '../../images/AvatarImage';

const ProfileImage = ({ profileImage }) => {
  return (
    <div className="w-40 h-60 lg:w-64 lg:h-85 rounded-2xl shadow-md overflow-hidden">
        <AvatarImage profileImage={profileImage}/>
    </div>
  );
};

export default ProfileImage;
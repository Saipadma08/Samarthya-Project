import React from "react";
import AvatarImage from "../../images/AvatarImage";

const ProfileCard = ({ admin }) => {
  return (
    <div className="w-36 h-44 lg:w-60 lg:h-72 rounded-2xl shadow-lg bg-white relative overflow-hidden group">

      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full">

        {/* Image */}
        <div className="absolute top-0 left-0 w-full h-full">
          <AvatarImage profileImage={admin?.profileImage} />
        </div>

        {/* Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/80
            via-black/20
            to-transparent
          "
        />
      </div>

      {/* Text Section */}
      <div className="relative flex flex-col justify-end h-full p-4 z-10">

        <p className="text-white text-md lg:text-2xl font-bold drop-shadow-lg">
          {admin?.name || "Admin User"}
        </p>

        <p className="text-gray-200 text-xs lg:text-sm drop-shadow-lg">
          {admin?.email}
        </p>

      </div>
    </div>
  );
};

export default ProfileCard;
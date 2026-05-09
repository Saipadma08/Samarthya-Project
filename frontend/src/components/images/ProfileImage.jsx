import { DEFAULT_PROFILE_IMAGE } from "../../constants/defaultImages";

const ProfileImage = ({ profileImage }) => {
  return (
    <img
      className="w-10 h-10 rounded-full object-cover border-0 border-white/40 shadow shadow-gray-300 cursor-pointer"
      src={profileImage || DEFAULT_PROFILE_IMAGE}
      alt="Profile"
    />
  );
};

export default ProfileImage;
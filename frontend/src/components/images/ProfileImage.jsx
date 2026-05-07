import { DEFAULT_PROFILE_IMAGE } from "../../constants/defaultImages";

const ProfileImage = ({ profileImage }) => {
  return (
    <img
      className="w-full h-full object-cover"
      src={profileImage || DEFAULT_PROFILE_IMAGE}
      alt="Profile"
    />
  );
};

export default ProfileImage;
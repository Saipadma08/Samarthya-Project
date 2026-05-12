import { DEFAULT_COVER_IMAGE } from "../../constants/defaultImages";

const CoverImage = ({ coverImage }) => {
  return (
    <div className="w-full h-full">
        <img
            className="w-full h-full object-cover brightness-95"
            src={coverImage || DEFAULT_COVER_IMAGE}
            alt="Cover"
        />
    </div>
  );
};

export default CoverImage;
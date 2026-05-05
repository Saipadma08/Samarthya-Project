import React from 'react';

const CoverImage = ({ coverImage }) => {
  const defaultCover =
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7";

  return (
    <div className="absolute top-0 left-0 w-full h-24 lg:h-40">
      <img
        src={coverImage || defaultCover}
        alt="Cover"
        className="w-full h-full object-cover"
      />

      {/* optional dark overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
};

export default CoverImage;
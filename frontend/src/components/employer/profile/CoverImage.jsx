import React from 'react'
import DefaultCoverImage from '../../images/CoverImage';

const CoverImage = ({coverImage}) => {
  return (
    <div className="absolute top-0 left-0 w-full h-24 lg:h-40">
        <DefaultCoverImage coverImage={coverImage}/>
    </div>
  )
}

export default CoverImage

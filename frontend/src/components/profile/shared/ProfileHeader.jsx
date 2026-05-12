import React from 'react'
import { Link } from "react-router-dom";
import { FiEdit, FiStar, FiCheckCircle } from "react-icons/fi";
import { div } from "framer-motion/client";

import CoverImage from '../shared/CoverImage';
import ProfileImage from '../shared/ProfileImage';
import VerificationBadge from '../shared/VerificationBadge'
import TrustCard from '../shared/TrustCard'
import ProfileActions from '../shared/ProfileActions'


const ProfileHeader = ({currentUser, user, profile, children}) => {
  return (
    <div className="w-full min-h-100 rounded-xl shadow-md bg-white relative overflow-hidden">

        {/* Cover Image */}
        <div>
          <CoverImage coverImage={profile?.coverImage} />
        </div>

        {/* content */}
        <div className="relative grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-14 p-6 pt-8">

          {/* profile image */}
          <div className="flex justify-center lg:justify-start">
            <ProfileImage profileImage={user?.profileImage} />
          </div>

          {/* employee info */}
          <div>
            {children}
          </div>

          {/* trust card */}
          <div className="flex items-end">
            <TrustCard/>
          </div>

          {/* action buttons */}
          <div className="flex items-end justify-end lg:justify-center text-sm lg:text-md">
            <ProfileActions currentUser={currentUser} viewedUser={user} connectionStatus="none"/>
          </div>

        </div>

    </div>
  )
}

export default ProfileHeader

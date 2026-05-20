import React from 'react'
import { Link } from "react-router-dom";

import CoverImage from '../shared/CoverImage';
import ProfileImage from '../shared/ProfileImage';
import VerificationBadge from '../shared/VerificationBadge'
import TrustCard from '../shared/TrustCard'
import ProfileActions from '../shared/ProfileActions'
import ConnectionsCount from './ConnectionsCount';


const ProfileHeader = ({ currentUser, user, profile, isPublicView, children, setShowVerification }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="w-full min-h-100 rounded-xl shadow-md bg-white relative overflow-visible">

      {/* Cover Image */}
      <div>
        <CoverImage coverImage={profile?.coverImage} />
      </div>

      {/* content */}
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 p-6 pt-8">

        {/* profile image */}
        <div className="flex justify-center md:justify-start">
          <ProfileImage profileImage={user?.profileImage} />
        </div>

        {/* employee info */}
        <div className="flex flex-col lg:mt-auto">
          {children}
          <div>
            <VerificationBadge user={user} onApply={() => setShowVerification?.(true)} />
          </div>
        </div>

        {/* trust card */}
        <div className="flex mt-auto">
          <TrustCard />
        </div>

        {/* action buttons */}
        <div className="flex items-end justify-end lg:justify-e d text-sm lg:text-md relative">
          <ProfileActions currentUser={currentUser} viewedUser={user} isPublicView={isPublicView} />
        </div>

        <div className='mt-auto'>
          <ConnectionsCount userId={user?._id} />
        </div>

        <div></div>
        <div></div>

        <div className='ms-auto mt-auto'>
          <Link
            to={`/${loggedInUser.role}/posts/${user?._id}`}
            className="bg-cyan-600 text-white px-5 py-2 rounded-lg"
          >
            Posts
          </Link>
        </div>

      </div>

    </div>
  )
}

export default ProfileHeader

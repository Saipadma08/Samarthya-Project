import React from 'react'

import ProfileHeader from '../../components/profile/shared/ProfileHeader'

import EmployeeInfo from '../../components/profile/employee/EmployeeInfo'
import EmployerInfo from '../../components/profile/employer/EmployerInfo'


import About from '../../components/profile/shared/About'
import ContactInfo from '../../components/profile/shared/ContactInfo'

import Skills from '../../components/profile/employee/Skills'

import JobsCategoryPosted from '../../components/profile/employer/JobsCategoryPosted'
import ReviewSection from '../../components/profile/shared/ReviewSection'

import Certifications from '../../components/profile/employee/Certifications'
import ProfessionalLinks from '../../components/profile/employee/ProfessionalLinks'
import TrustCard from '../../components/profile/shared/TrustCard'

const ProfilePage = ({currentUser, user, profile, isPublicView }) => {
   if (!user?._id) {

    return null;
  }

  return (
    <div>

      <ProfileHeader currentUser={currentUser} user={user} profile={profile} isPublicView={isPublicView}>

          {
            user?.role === "employee"
            ? <EmployeeInfo user={user} profile={profile} />
            : <EmployerInfo user={user} profile={profile} />
          }


      </ProfileHeader>

      <div>
        <About profile={profile} />
      </div>

      <div>
        <ContactInfo user={user} profile={profile} />
      </div>

      {
          user?.role === "employee"
          ? (
            <>
                <div>
                  <Skills profile={profile} />
                </div>

                <div>
                  <Certifications profile={profile} />
                </div>

                <div>
                  <ProfessionalLinks profile={profile} />
                </div>

            </>
          )
          : (
            <>
                <div>
                  <JobsCategoryPosted profile={profile} />
                </div>

                
            </>
          )
      }

      <div>
        <ReviewSection
          userId={user?._id}
        />
      </div>
       <div>
        <TrustCard
          userId={user?._id}
        />
       </div>
      

    </div>
  )
}

export default ProfilePage

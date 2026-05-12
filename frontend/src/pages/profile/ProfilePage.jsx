import React from 'react'

import ProfileHeader from '../../components/profile/shared/ProfileHeader'

import EmployeeInfo from '../../components/profile/employee/EmployeeInfo'
import EmployerInfo from '../../components/profile/employer/EmployerInfo'

import About from '../../components/profile/shared/About'
import ContactInfo from '../../components/profile/shared/ContactInfo'

import Skills from '../../components/profile/employee/Skills'
import WorkHistory from '../../components/profile/employee/WorkHistory'

import JobsCategoryPosted from '../../components/profile/employer/JobsCategoryPosted'
import HiringHistory from '../../components/profile/employer/HiringHistory'
import ReviewSection from '../../components/profile/shared/ReviewSection'
import TrustScoreDetails from '../../components/profile/shared/TrustScoreDetails'


const ProfilePage = ({currentUser, user, profile }) => {
  return (
    <div>

      <ProfileHeader currentUser={currentUser} user={user} profile={profile}>

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
                  <WorkHistory />
                </div>
            </>
          )
          : (
            <>
                <div>
                  <JobsCategoryPosted profile={profile} />
                </div>

                <div>
                  <HiringHistory />
                </div>
            </>
          )
      }

      <div>
        <ReviewSection />
      </div>

      <div>
        <TrustScoreDetails />
      </div>

    </div>
  )
}

export default ProfilePage

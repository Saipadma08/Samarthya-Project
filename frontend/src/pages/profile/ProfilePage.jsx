import React, { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";

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

import Certifications from '../../components/profile/employee/Certifications'
import ProfessionalLinks from '../../components/profile/employee/ProfessionalLinks'


const ProfilePage = ({ currentUser, user, profile, isPublicView }) => {

  const [showVerification, setShowVerification] = useState(false);

  const applyVerification =
    async () => {

      try {

        await axios.post(

          "http://localhost:3000/api/verification/apply",

          {},

          {

            headers: {

              Authorization:
                `Bearer ${localStorage.getItem(
                  "token"
                )
                }`

            }

          }

        );

        toast.success(
          "Verification request sent"
        );

        setShowVerification(false);

        window.location.reload();

      }

      catch (err) {

        toast.error(

          err.response?.data?.message ||

          "Something went wrong"

        );

      }

    }

  return (
    <div>

      <ProfileHeader
        currentUser={currentUser}
        user={user}
        profile={profile}
        isPublicView={isPublicView}
        setShowVerification={setShowVerification}
      >

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


      {

        showVerification &&

        <div className="
fixed
inset-0
bg-black/40
z-50
flex
justify-center
items-center
">

          <div className="
bg-white
p-6
rounded-xl
w-87.5
">

            <h2 className="
font-bold
text-lg
mb-4
">

              Apply for verification?

            </h2>

            <p className="mb-6">

              Admin will review
              your profile.

            </p>

            <div className="
flex
justify-end
gap-3
">

              <button

                onClick={() =>
                  setShowVerification(false)
                }

                className="
border
px-4
py-2
rounded
"

              >

                Cancel

              </button>


              <button

                onClick={applyVerification}

                className="
bg-cyan-600
text-white
px-4
py-2
rounded
"

              >

                Apply

              </button>

            </div>

          </div>

        </div>

      }

    </div>
  )
}

export default ProfilePage

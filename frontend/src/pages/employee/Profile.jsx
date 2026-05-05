import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiStar, FiCheckCircle } from "react-icons/fi";
import { div } from "framer-motion/client";

import CoverImage from "../../components/employee/profile/CoverImage";
import ProfileImage from "../../components/employee/profile/ProfileImage";
import EmployeeInfo from "../../components/employee/profile/EmployeeInfo";
import TrustCard from "../../components/employee/profile/TrustCard";
import EditProfileButton from "../../components/employee/profile/EditProfileButton";
import TrustScoreDetails from "../../components/employee/profile/TrustScoreDetails";
import ReviewSection from "../../components/employee/profile/ReviewSection";
import ContactInfo from "../../components/employee/profile/ContactInfo";
import Skills from "../../components/employee/profile/Skills";
import WorkHistory from "../../components/employee/profile/WorkHistory";
import About from "../../components/employee/profile/About";

import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api/employee/profile-data", {
      withCredentials: true
    })
    .then((res) => {
      setUser(res.data.user);
      setProfile(res.data.profile);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
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
            <EmployeeInfo user={user} profile={profile} />
          </div>

          {/* trust card */}
          <div className="flex items-end">
            <TrustCard/>
          </div>

          {/* edit button */}
          <div className="flex items-end justify-end lg:justify-center text-sm lg:text-md">
            <EditProfileButton/>
          </div>

        </div>

      </div>


      {/* About / bio */}
      <div>
        <About profile={profile} />
      </div>

      {/* Contact info */}
      <div>
        <ContactInfo/>
      </div>


      {/* Skills */}
      <div>
        <Skills/>
      </div>

      {/* Work history */}
      <div>
        <WorkHistory/>
      </div>


      {/* Review section */}
      <div>
        <ReviewSection/>
      </div>

      {/* Trust-score details section */}
      <div>
        <TrustScoreDetails/>
      </div>

    </div>
    
  );
};

export default Profile;
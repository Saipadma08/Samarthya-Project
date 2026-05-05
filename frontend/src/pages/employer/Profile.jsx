import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiStar, FiCheckCircle } from "react-icons/fi";

import CoverImage from "../../components/employer/profile/CoverImage";
import ProfileImage from "../../components/employer/profile/ProfileImage";
import EmployerInfo from "../../components/employer/profile/EmployerInfo";
import TrustCard from "../../components/employer/profile/TrustCard";
import EditProfileButton from "../../components/employer/profile/EditProfileButton";
import About from "../../components/employer/profile/About";
import ContactInfo from "../../components/employer/profile/ContactInfo";
import JobsCategoryPosted from "../../components/employer/profile/JobsCategoryPosted";
import HiringHistory from "../../components/employer/profile/HiringHistory";
import ReviewSection from "../../components/employer/profile/ReviewSection";
import TrustScoreDetails from "../../components/employer/profile/TrustScoreDetails";

const Profile = () => {
  return (
    <div className="w-full overflow-x-hidden">

      {/* ================= MAIN CARD ================= */}

      <div className="w-full min-h-100 rounded-xl shadow-md bg-white relative overflow-hidden">

        {/* Cover Image */}
        <div>
          <CoverImage/>
        </div>

        {/* content */}
        <div className="relative grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-14 p-6 pt-8">

          {/* profile Image */}
          <div className="flex justify-center lg:justify-start">
            <ProfileImage/>
          </div>

          {/* employer info */}
          <div>
            <EmployerInfo/>
          </div>

          {/* trust card */}
          <div className="flex items-end">
            <TrustCard/>
          </div>

          {/* edit profile button */}
          <div className="flex items-end justify-end lg:justify-center text-sm lg:text-md">
            <EditProfileButton/>
          </div>
        </div>
      </div>

      {/* about */}

      <div>
        <About/>
      </div>

      {/* Contact Info */} 
      <div>
        <ContactInfo/>
      </div>

      {/* Jobs Category Posted */}
      <div>
        <JobsCategoryPosted/>
      </div>

      {/* Hiring History */} 
      <div>
        <HiringHistory/>
      </div>
            
      
      {/* Review section */} 
      <div>
        <ReviewSection/>
      </div>
      
      {/* TRUST-SCORE DETAILS */} 
      <div>
        <TrustScoreDetails/>
      </div>
    </div>
  );
};

export default Profile;
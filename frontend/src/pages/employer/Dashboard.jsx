import React from "react";
import DashboardIntro from "../../components/employer/dashboard/DashboardIntro";
import CompleteProfile from "../../components/shared/CompleteProfile";
import Stats from "../../components/employer/dashboard/Stats";
import ProfileCard from "../../components/employer/dashboard/ProfileCard";
import QuickActions from "../../components/employer/dashboard/QuickActions";
import RecentJobs from "../../components/employer/dashboard/RecentJobs";
import RecentApplicants from "../../components/employer/dashboard/RecentApplicants";

import {calculateEmployerProfileCompletion} from "../../utils/employerProfileCompletion";

import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api/employer/profile-data", {
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

  const completion = calculateEmployerProfileCompletion(user, profile);

  return (
    <div className="w-full">

      {/*TOP SECTION*/}

      <div className="flex justify-between items-start w-full">

        {/* LEFT SIDE */}
        <div className="flex-1 pr-8">

          {/* Welcome */}
          <div>
            <DashboardIntro user={user}/>
          </div>

          {/* Complete profile */}
          <div>
            <CompleteProfile
              completion={completion}
              editLink="/employer/edit-profile"
              message="Add company details, categories and hiring information."
            />
          </div>
          

          {/* Stats */}
          <div className="hidden sm:block">
            <Stats/>
          </div>

        </div>



        {/* RIGHT SIDE PROFILE CARD */}
        <div>
          <ProfileCard user={user} profile={profile}/>
        </div>
        

      </div>

      {/* mobile view Stats */}
      <div className="block sm:hidden">
        <Stats/>
      </div>


      {/*QUICK ACTIONS */}

      <div>
        <QuickActions/>
      </div>



      {/* ================= RECENT JOBS ================= */}

      <div>
        <RecentJobs/>
      </div>



      {/* ================= RECENT APPLICANTS ================= */}
      <div>
        <RecentApplicants/>
      </div>


    </div>
  );
};

export default Dashboard
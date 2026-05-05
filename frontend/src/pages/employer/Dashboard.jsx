import React from "react";
import DashboardIntro from "../../components/employer/dashboard/DashboardIntro";
import CompleteProfile from "../../components/employer/dashboard/CompleteProfile";
import Stats from "../../components/employer/dashboard/Stats";
import ProfileCard from "../../components/employer/dashboard/ProfileCard";
import QuickActions from "../../components/employer/dashboard/QuickActions";
import RecentJobs from "../../components/employer/dashboard/RecentJobs";
import RecentApplicants from "../../components/employer/dashboard/RecentApplicants";

const Dashboard = () => {
  return (
    <div className="w-full">

      {/*TOP SECTION*/}

      <div className="flex justify-between items-start w-full">

        {/* LEFT SIDE */}
        <div className="flex-1 pr-8">

          {/* Welcome */}
          <div>
            <DashboardIntro/>
          </div>

          {/* Complete profile */}
          <div>
            <CompleteProfile/>
          </div>
          

          {/* Stats */}
          <div className="hidden sm:block">
            <Stats/>
          </div>

        </div>



        {/* RIGHT SIDE PROFILE CARD */}
        <div>
          <ProfileCard/>
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
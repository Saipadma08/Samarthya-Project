import DashboardIntro from "../../components/employee/dashboard/DashboardIntro";
import CompleteProfile from "../../components/employee/dashboard/CompleteProfile";
import ProfileCard from "../../components/employee/dashboard/ProfileCard";
import StatsCard from "../../components/employee/dashboard/StatsCard";

import ActivityChart from "../../components/employee/dashboard/ActivityChart";
import EarningsCard from "../../components/employee/dashboard/EarningsCard";
import SkillsCard from "../../components/employee/dashboard/SkillsCard";
import SuggestedJobs from "../../components/employee/dashboard/SuggestedJobs";
import RecentActivity from "../../components/employee/dashboard/RecentActivity";
import TrustScoreCard from "../../components/employee/dashboard/TrustScoreCard";

import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {

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

      <div className="space-y-8">

        {/* Top Section */}

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
              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-4
                gap-5
                mt-10
              ">

                <StatsCard
                  title="Jobs Applied"
                  value="5"
                />

                <StatsCard
                  title="Active Jobs"
                  value="2"
                />

                <StatsCard
                  title="Completed Jobs"
                  value="8"
                />

                <StatsCard
                  title="Trust Score"
                  value="4.0 ⭐"
                />

              </div>
            </div>

          </div>



          {/* RIGHT SIDE PROFILE CARD */}
          <div>
            <ProfileCard profileImage={user?.profileImage} name={user?.name} jobType={profile?.jobType}/>
          </div>
          

        </div>

        {/* mobile view Stats */}
        <div className="block sm:hidden">
        <div className="
          grid
          grid-cols-2 lg:grid-cols-4 gap-5
          mt-10
        ">

          <StatsCard
            title="Jobs Applied"
            value="5"
          />

          <StatsCard
            title="Active Jobs"
            value="2"
          />

          <StatsCard
            title="Completed Jobs"
            value="8"
          />

          <StatsCard
            title="Trust Score"
            value="4.0 ⭐"
          />

        </div>
        </div>


        {/* Main Dashboard */}

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        ">
            <SuggestedJobs />

          <RecentActivity />

          <EarningsCard />

          <TrustScoreCard />

          <SkillsCard />

           <div className="lg:col-span-2">
            <ActivityChart />
          </div>

        </div>

      </div>

  );

};

export default Dashboard
import DashboardIntro from "../../components/employee/dashboard/DashboardIntro";
import CompleteProfile from "../../components/shared/CompleteProfile"
import ProfileCard from "../../components/employee/dashboard/ProfileCard";
import StatsCard from "../../components/employee/dashboard/StatsCard";

import ActivityChart from "../../components/employee/dashboard/ActivityChart";

import SkillsCard from "../../components/employee/dashboard/SkillsCard";
import SuggestedJobs from "../../components/employee/dashboard/SuggestedJobs";
import RecentActivity from "../../components/employee/dashboard/RecentActivity";


import { useEffect, useState } from "react";
import axios from "axios";

import { calculateProfileCompletion } from '../../utils/employeeProfileCompletion';

const Dashboard = () => {

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [dashboardData, setDashboardData] = useState({});
  const [trustScore,setTrustScore,] = useState(0);
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

  useEffect(() => {
    axios.get("http://localhost:3000/api/employee/dashboard", {
      withCredentials: true
    })
    .then((res) => {
      setDashboardData(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, []);

  useEffect(() => {

  if (user?._id) {

    fetchTrustScore();
  }

}, [user]);

const fetchTrustScore =
  async () => {

    try {

      const response =
        await axios.get(

          `http://localhost:3000/api/reviews/trust-score/${user._id}`
        );

      setTrustScore(
        response.data.trustScore || 0
      );

    } catch (error) {

      console.log(error);
    }
  };


  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const completion =
  calculateProfileCompletion(
    user,
    profile
  );

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

            {/* Complete profile desktop view */}
            <div className="hidden sm:block">
              <CompleteProfile 
                completion={completion}
                editLink="/employee/edit-profile"
                message="Add skills, certifications, links and work details."
              />
            </div>

          </div>



          {/* RIGHT SIDE PROFILE CARD */}
          <div>
            <ProfileCard profileImage={user?.profileImage} name={user?.name} jobType={profile?.jobType}/>
          </div>
          

        </div>

        {/* Complete profile desktop view */}
        <div className="block sm:hidden">
          <CompleteProfile completion={completion}/>
        </div>

        {/* mobile view Stats */}
        <div>
        <div className="
          grid
          grid-cols-2 lg:grid-cols-4 gap-10
          mt-10
        ">

         <StatsCard
  title="Jobs Applied"
  value={
    dashboardData.jobsApplied || 0
  }
/>

<StatsCard
  title="Active Jobs"
  value={
    dashboardData.activeJobs || 0
  }
/>

<StatsCard
  title="Completed Jobs"
  value={
    dashboardData.completedJobs || 0
  }
/>

        <StatsCard
  title="Trust Score"
  value={`${trustScore} ⭐`}
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

        

         

          <SkillsCard
            skills={dashboardData.skills}
          />

           <div className="lg:col-span-2">
           <ActivityChart
              data={
                dashboardData.weeklyData
              }
            />
                      </div>

        </div>

      </div>

  );

};

export default Dashboard
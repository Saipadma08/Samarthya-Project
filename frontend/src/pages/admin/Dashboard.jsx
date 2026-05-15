import React from "react";

import DashboardIntro from "../../components/admin/dashboard/DashboardIntro"
import ProfileCard from "../../components/admin/dashboard/ProfileCard";
import StatCard from "../../components/admin/dashboard/StatCard";
import QuickActions from "../../components/admin/dashboard/QuickActions";
import RecentUsers from "../../components/admin/dashboard/RecentUsers";
import UserGrowthChart from "../../components/admin/dashboard/UserGrowthChart";

import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {

  const [admin, setAdmin] = useState(null);

  useEffect(() => {

    axios.get(
      "http://localhost:3000/api/auth/me",
      {
        withCredentials: true
      }
    )

      .then((res) => {

        setAdmin(res.data.user);

      })

      .catch((err) => {

        console.log(err);

      });

  }, []);
  return (
    <div className="w-full">

      {/* ================= TOP SECTION ================= */}
      <div className="flex justify-between items-start w-full">

        {/* LEFT SIDE */}
        <div className="flex-1 pr-8">

          {/* Welcome */}
          <div>
            <DashboardIntro admin={admin} />
          </div>


          {/* Stats */}
          <div className="hidden sm:block">
            <StatCard />
          </div>

        </div>



        {/* RIGHT SIDE PROFILE CARD */}
        <div>
          <ProfileCard admin={admin} />
        </div>


      </div>

      {/* mobile view Stats */}
      <div className="block sm:hidden">
        <StatCard />
      </div>



      {/* ================= QUICK ACTIONS ================= */}
      <div>
        <QuickActions />
      </div>



      {/* ================= RECENT USERS ================= */}
      <div>
        <RecentUsers />
      </div>



      {/* ================= USER GROWTH CHART ================= */}

      <div>
        <UserGrowthChart />
      </div>

    </div>
  );
};

export default Dashboard;

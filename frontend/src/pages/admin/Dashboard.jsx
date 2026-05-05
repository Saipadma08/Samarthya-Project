import React from "react";
import { FiStar, FiUsers, FiBriefcase, FiFileText } from "react-icons/fi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {

  const monthlyData = [
  { name: "Jan", users: 20 },
  { name: "Feb", users: 35 },
  { name: "Mar", users: 50 },
  { name: "Apr", users: 45 },
  { name: "May", users: 60 },
  { name: "Jun", users: 75 },
  { name: "Jul", users: 90 },
  { name: "Aug", users: 85 },
  { name: "Sep", users: 100 },
  { name: "Oct", users: 120 },
  { name: "Nov", users: 140 },
  { name: "Dec", users: 160 },
];

  return (
    <div className="w-full">

      {/* ================= TOP SECTION ================= */}
      <div className="flex justify-between items-start w-full">

        {/* LEFT */}
        <div className="flex-1 pr-8">

          <p className="text-4xl text-cyan-700 font-semibold">
            Welcome, Sakshi
          </p>

          <p className="text-gray-600 mt-2">
            Manage users, jobs and platform activity.
          </p>


          {/* STATS */}
          <div className="grid grid-cols-4 gap-5 max-w-3xl mt-25">

            <StatCard title="Total Users" value="120" />
            <StatCard title="Employees" value="75" />
            <StatCard title="Employers" value="30" />
            <StatCard title="Jobs" value="52" />

          </div>

        </div>


        {/* PROFILE CARD */}
        <div className="w-60 h-72 rounded-xl shadow-md bg-white relative overflow-hidden">

          <div className="absolute top-0 left-0 w-full h-full">
            <img
              className="h-full w-full object-cover"
              src="https://i.pinimg.com/736x/1c/88/70/1c887069fec338e0ff5285bd5cbe7511.jpg"
              alt=""
            />
          </div>

          <div className="relative flex flex-col justify-end h-full p-4">
            <p className="text-white text-2xl font-semibold">
              Sakshi Kumari
            </p>
            <p className="text-gray-200">
              Administrator
            </p>
          </div>

        </div>

      </div>



      {/* ================= QUICK ACTIONS ================= */}
      <div className="grid grid-cols-3 gap-5 mt-6">

        <ActionCard
          title="Manage Users"
          desc="View and control all users"
          color="bg-cyan-600"
          icon={<FiUsers />}
        />

        <ActionCard
          title="Manage Jobs"
          desc="Monitor all job postings"
          color="bg-emerald-800"
          icon={<FiBriefcase />}
        />

        <ActionCard
          title="Reports"
          desc="View complaints & reports"
          color="bg-gray-800"
          icon={<FiFileText />}
        />

      </div>



      {/* ================= RECENT USERS ================= */}
      <div className="bg-white shadow rounded-xl p-6 mt-6">

        <div className="flex justify-between mb-4">
          <p className="text-xl font-semibold">Recent Users</p>
          <button className="text-cyan-600 text-sm">View all</button>
        </div>

        <div className="flex flex-col divide-y">

          <UserRow name="Rahul Das" role="Employee" status="Active" />
          <UserRow name="Anita Sharma" role="Employer" status="Active" />
          <UserRow name="Kiran Patel" role="Employee" status="Inactive" />

        </div>

      </div>



      {/* ================= USER GROWTH CHART ================= */}

<div className="bg-white shadow rounded-xl p-6 mt-6">

  <div className="flex justify-between items-center mb-4">
    <p className="text-xl font-semibold">
      User Growth (Monthly)
    </p>
    <p className="text-sm text-gray-500">
      Last 12 months
    </p>
  </div>
  
  <div>
    <ResponsiveContainer width="70%" height={200}>
      <LineChart data={monthlyData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#0891b2"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>

  

</div>

    </div>
  );
};

export default Dashboard;



/* ================= COMPONENTS ================= */

const StatCard = ({ title, value }) => (
  <div className="bg-gray-800 rounded-xl p-5 shadow-md">
    <p className="text-white text-sm">{title}</p>
    <p className="text-3xl text-white font-bold mt-1">{value}</p>
  </div>
);


const ActionCard = ({ title, desc, color, icon }) => (
  <div className={`${color} text-white rounded-xl p-6 shadow-md hover:scale-[1.02] transition`}>
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <p className="text-lg font-semibold">{title}</p>
    </div>
    <p className="text-sm opacity-80">{desc}</p>
  </div>
);


const UserRow = ({ name, role, status }) => (
  <div className="flex justify-between items-center py-3">

    <div>
      <p className="font-medium">{name}</p>
      <p className="text-sm text-gray-500">{role}</p>
    </div>

    <span
      className={`px-3 py-1 rounded text-sm ${
        status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-600"
      }`}
    >
      {status}
    </span>

  </div>
);


const JobRow = ({ title, status }) => (
  <div className="flex justify-between items-center py-3">

    <p className="font-medium">{title}</p>

    <span
      className={`px-3 py-1 rounded text-sm ${
        status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {status}
    </span>

  </div>
);
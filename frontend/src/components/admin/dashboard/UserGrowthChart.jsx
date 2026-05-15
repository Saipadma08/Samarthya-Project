import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UserGrowthChart = () => {

      const [monthlyData, setMonthlyData] = useState([]);
      const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const res = await axios.get(
        "http://localhost:3000/api/admin/analytics",
        {
          withCredentials: true
        }
      );

      setMonthlyData(res.data.monthlyUsers);
      setCurrentYear(res.data.currentYear);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="bg-white shadow rounded-xl p-6 mt-6">

      <div className="flex justify-between items-center mb-4">

        <p className="text-xl font-semibold">
          User Growth (Monthly)
        </p>

      <p className="text-sm text-gray-500">
            {currentYear} User Registrations
      </p>

      </div>

      <div>

        <ResponsiveContainer width="100%" height={300}>

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

  );

};

export default UserGrowthChart;
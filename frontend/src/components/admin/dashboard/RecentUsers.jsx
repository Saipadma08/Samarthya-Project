import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecentUsers = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetchRecentUsers();

  }, []);

  const fetchRecentUsers = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3000/api/admin/dashboard",
        {
          withCredentials: true,
        }
      );

      setUsers(response.data.recentUsers);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="bg-white shadow rounded-2xl p-6 mt-6 border border-slate-100">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">

        <p className="text-2xl font-bold text-slate-800">

          Recent Users

        </p>

        <button
          onClick={() => navigate("/admin/users")}
          className="text-cyan-600 text-sm font-medium hover:underline"
        >
         View all
       </button>

      </div>

      {/* Users List */}
      <div className="flex flex-col divide-y">

        {users.map((user) => (

          <div
            key={user._id}
            className="flex justify-between items-center py-4"
          >

            {/* Left */}
            <div className="flex items-center gap-4">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name || "user"}
                  className="w-15 h-15 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div
                  className=" w-15 h-15 rounded-full border-4 border-white flex items-center justify-center
              text-slate-800 text-3xl font-bold bg-blue-400"
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-semibold text-slate-800">{user.name}</p>
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                  <span className="capitalize">{user.role}</span>
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">

                Active

              </span>

              <button
                onClick={() => navigate("/admin/users")}
                className="text-cyan-600 text-sm font-medium hover:underline"
              >

                View

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentUsers;
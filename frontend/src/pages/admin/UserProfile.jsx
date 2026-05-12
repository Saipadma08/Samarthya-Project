import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchUser();

  }, []);

  const fetchUser = async () => {

    try {

      const response = await axios.get(
        `http://localhost:3000/api/admin/users/${id}`,
        {
          withCredentials: true,
        }
      );

      setUser(response.data.user);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading profile...
      </div>

    );

  }

  if (!user) {

    return (

      <div className="min-h-screen flex items-center justify-center text-red-500">
        User not found
      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#f5f7fb] p-4 sm:p-6">

      {/* TOP BAR */}

      <div className="flex items-center gap-3 mb-6">

        <button
          onClick={() => navigate(-1)}
          className="bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-slate-800">
          User Profile
        </h1>

      </div>

      {/* COVER IMAGE */}

      {
        user.coverImage && (

          <div className="w-full h-[220px] rounded-3xl overflow-hidden mb-6 shadow-sm">

            <img
              src={user.coverImage}
              alt="cover"
              className="w-full h-full object-cover"
            />

          </div>

        )
      }

      {/* PROFILE CARD */}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-8 text-white">

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">

            {/* PROFILE IMAGE */}

            {
              user.profileImage ? (

                <img
                  src={user.profileImage}
                  alt="user"
                  className="w-28 h-28 rounded-full border-4 border-white object-cover"
                />

              ) : (

                <div
                  className="
                  w-28 h-28 rounded-full
                  bg-white/20
                  border-4 border-white
                  flex items-center justify-center
                  text-5xl font-bold
                "
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>

              )
            }

            {/* USER INFO */}

            <div>

              <h2 className="text-3xl font-bold">
                {user.name}
              </h2>

              <p className="text-cyan-100 mt-2 break-all">
                {user.email}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">

                <span className="bg-white/20 px-4 py-1 rounded-full text-sm capitalize">
                  {user.role}
                </span>

                <span
                  className={`px-4 py-1 rounded-full text-sm

                  ${
                    user.isVerified
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }
                `}
                >
                  {
                    user.isVerified
                      ? "Verified"
                      : "Not Verified"
                  }
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* DETAILS */}

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* COMMON DETAILS */}

          <div className="bg-slate-50 rounded-2xl p-5">

            <p className="text-sm text-slate-500">
              Full Name
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-1">
              {user.name}
            </h3>

          </div>

          <div className="bg-slate-50 rounded-2xl p-5">

            <p className="text-sm text-slate-500">
              Email
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-1 break-all">
              {user.email}
            </h3>

          </div>

          <div className="bg-slate-50 rounded-2xl p-5">

            <p className="text-sm text-slate-500">
              Joined
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-1">

              {
                new Date(user.createdAt)
                  .toLocaleDateString()
              }

            </h3>

          </div>

          <div className="bg-slate-50 rounded-2xl p-5">

            <p className="text-sm text-slate-500">
              Verification Status
            </p>

            <h3
              className={`text-lg font-semibold mt-1

              ${
                user.isVerified
                  ? "text-green-600"
                  : "text-orange-500"
              }
            `}
            >

              {
                user.isVerified
                  ? "Verified"
                  : "Pending"
              }

            </h3>

          </div>

          {/* ================= EMPLOYEE ================= */}

          {
            user.role === "employee" && (

              <>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Profession
                  </p>

                  <h3 className="text-lg font-semibold text-slate-800 mt-1">
                    {user.jobType || "Not Added"}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Location
                  </p>

                  <h3 className="text-lg font-semibold text-slate-800 mt-1">
                    {user.location || "Not Added"}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5 md:col-span-2">

                  <p className="text-sm text-slate-500">
                    About
                  </p>

                  <p className="text-slate-700 mt-2 leading-7">
                    {user.about || "No about information added."}
                  </p>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Phone Number
                  </p>

                  <h3 className="text-lg font-semibold text-slate-800 mt-1">
                    {user.phone || "Not Added"}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Open To Work
                  </p>

                  <h3
                    className={`text-lg font-semibold mt-1

                    ${
                      user.openToWork
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  `}
                  >

                    {
                      user.openToWork
                        ? "Yes"
                        : "No"
                    }

                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5 md:col-span-2">

                  <p className="text-sm text-slate-500 mb-3">
                    Skills
                  </p>

                  <div className="flex flex-wrap gap-3">

                    {
                      user.skills?.length > 0 ? (

                        user.skills.map((skill, index) => (

                          <span
                            key={index}
                            className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm"
                          >
                            {skill}
                          </span>

                        ))

                      ) : (

                        <p className="text-slate-500">
                          No skills added
                        </p>

                      )
                    }

                  </div>

                </div>

              </>

            )
          }

          {/* ================= EMPLOYER ================= */}

          {
            user.role === "employer" && (

              <>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Employer Type
                  </p>

                  <h3 className="text-lg font-semibold text-slate-800 mt-1">
                    {user.employerType || "Not Added"}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Company Name
                  </p>

                  <h3 className="text-lg font-semibold text-slate-800 mt-1">
                    {user.companyName || "Not Added"}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5 md:col-span-2">

                  <p className="text-sm text-slate-500">
                    About Employer
                  </p>

                  <p className="text-slate-700 mt-2 leading-7">
                    {user.about || "No about information added."}
                  </p>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Location
                  </p>

                  <h3 className="text-lg font-semibold text-slate-800 mt-1">
                    {user.location || "Not Added"}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Phone Number
                  </p>

                  <h3 className="text-lg font-semibold text-slate-800 mt-1">
                    {user.phone || "Not Added"}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Workers Hired
                  </p>

                  <h3 className="text-2xl font-bold text-slate-800 mt-1">
                    {user.workersHired || 0}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Jobs Posted
                  </p>

                  <h3 className="text-2xl font-bold text-slate-800 mt-1">
                    {user.jobsPosted || 0}
                  </h3>

                </div>

              </>

            )
          }

          {/* ================= ADMIN ================= */}

          {
            user.role === "admin" && (

              <div className="bg-slate-50 rounded-2xl p-5 md:col-span-2">

                <p className="text-sm text-slate-500">
                  Admin Access
                </p>

                <p className="text-slate-700 mt-2 leading-7">
                  This account has administrative access to manage platform users,
                  jobs, reports and analytics.
                </p>

              </div>

            )
          }

        </div>

      </div>

    </div>

  );

};

export default UserProfile;
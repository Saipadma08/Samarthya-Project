import React, { useEffect, useState } from "react";
import { useNavigate,useSearchParams} from "react-router-dom";

import axios from "axios";

const Users = () => {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const roleFilter = searchParams.get("role");

  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [editUser, setEditUser] = useState(null);

  const [usersData, setUsersData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3000/api/admin/users",
        {
          withCredentials: true,
        }
      );

      setUsersData(response.data.users);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // REMOVE USER

  const handleRemove = async (id) => {

    try {

      await axios.delete(
        `http://localhost:3000/api/admin/users/${id}`,
        {
          withCredentials: true,
        }
      );

      fetchUsers();

    } catch (error) {

      console.log(error);

    }

  };

  // FILTER USERS

  const filteredUsers = usersData.filter((user) => {

    const matchesRole =
      roleFilter
        ? user.role.toLowerCase() === roleFilter.toLowerCase()
        : true;

    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||

      user.email.toLowerCase().includes(search.toLowerCase());

    return matchesRole && matchesSearch;

  });

  return (

    <div className="min-h-screen bg-[#f5f7fb] p-3 sm:p-5 lg:p-6 overflow-x-hidden">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>

          <h1
            className="
            text-3xl lg:text-4xl
            font-extrabold
            bg-gradient-to-r
            from-cyan-600
            via-blue-600
            to-violet-600
            bg-clip-text
            text-transparent
            tracking-tight
          "
          >
            Users Management
          </h1>

          <p className="text-slate-500 mt-3 text-sm sm:text-base">
            Manage employees, employers and administrators across the platform !
          </p>

        </div>

        {/* SEARCH */}

        <div className="w-full lg:w-[350px]">

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            w-full
            px-4 py-3
            rounded-2xl
            border border-slate-300
            outline-none
            focus:ring-2 focus:ring-cyan-500
            bg-white
          "
          />

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* TOTAL USERS */}

        <div
          onClick={() => navigate("/admin/users")}
          className={`
          relative overflow-hidden
          rounded-3xl p-6 shadow-xl
          cursor-pointer
          hover:scale-105
          transition duration-300
          bg-gradient-to-br from-cyan-600 to-cyan-800

          ${
            !roleFilter
              ? "ring-4 ring-cyan-300"
              : ""
          }
        `}
        >

          <div className="absolute -right-5 -top-5 w-20 h-20 bg-white/10 rounded-full"></div>

          <p className="text-cyan-100 text-sm font-medium">
            Total Users
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {usersData.length}
          </h2>

          <p className="text-cyan-100 text-sm mt-2">
            Platform members
          </p>

        </div>

        {/* EMPLOYEES */}

        <div
          onClick={() => navigate("/admin/users?role=employee")}
          className={`
          relative overflow-hidden
          rounded-3xl p-6 shadow-xl
          cursor-pointer
          hover:scale-105
          transition duration-300
          bg-gradient-to-br from-emerald-500 to-emerald-700

          ${
            roleFilter === "employee"
              ? "ring-4 ring-emerald-300"
              : ""
          }
        `}
        >

          <div className="absolute -right-5 -top-5 w-20 h-20 bg-white/10 rounded-full"></div>

          <p className="text-emerald-100 text-sm font-medium">
            Employees
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">

            {
              usersData.filter(
                (user) => user.role === "employee"
              ).length
            }

          </h2>

          <p className="text-emerald-100 text-sm mt-2">
            Active workers
          </p>

        </div>

        {/* EMPLOYERS */}

        <div
          onClick={() => navigate("/admin/users?role=employer")}
          className={`
          relative overflow-hidden
          rounded-3xl p-6 shadow-xl
          cursor-pointer
          hover:scale-105
          transition duration-300
          bg-gradient-to-br from-blue-500 to-blue-700

          ${
            roleFilter === "employer"
              ? "ring-4 ring-blue-300"
              : ""
          }
        `}
        >

          <div className="absolute -right-5 -top-5 w-20 h-20 bg-white/10 rounded-full"></div>

          <p className="text-blue-100 text-sm font-medium">
            Employers
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">

            {
              usersData.filter(
                (user) => user.role === "employer"
              ).length
            }

          </h2>

          <p className="text-blue-100 text-sm mt-2">
            Hiring partners
          </p>

        </div>

        {/* ADMINS */}

        <div
          onClick={() => navigate("/admin/users?role=admin")}
          className={`
          relative overflow-hidden
          rounded-3xl p-6 shadow-xl
          cursor-pointer
          hover:scale-105
          transition duration-300
          bg-gradient-to-br from-violet-600 to-violet-800

          ${
            roleFilter === "admin"
              ? "ring-4 ring-violet-300"
              : ""
          }
        `}
        >

          <div className="absolute -right-5 -top-5 w-20 h-20 bg-white/10 rounded-full"></div>

          <p className="text-violet-100 text-sm font-medium">
            Admins
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">

            {
              usersData.filter(
                (user) => user.role === "admin"
              ).length
            }

          </h2>

          <p className="text-violet-100 text-sm mt-2">
            Platform controllers
          </p>

        </div>

      </div>

      {/* TABLE SECTION */}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

        {/* TABLE HEADER */}

        <div className="px-4 sm:px-6 py-5 border-b border-slate-200">

          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 capitalize">

            {
              roleFilter
                ? `${roleFilter}s`
                : "All Users"
            }

          </h2>

        </div>

        {/* LOADING */}

        {
          loading ? (

            <div className="p-10 text-center text-slate-500">
              Loading users...
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="min-w-[900px] w-full">

                <thead className="bg-slate-100 text-slate-600 text-sm">

                  <tr>

                    <th className="text-left px-6 py-4">
                      User
                    </th>

                    <th className="text-left px-6 py-4">
                      Role
                    </th>

                    <th className="text-left px-6 py-4">
                      Email
                    </th>

                    <th className="text-left px-6 py-4">
                      Joined
                    </th>

                    <th className="text-left px-6 py-4">
                      Status
                    </th>

                    <th className="text-center px-6 py-4">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredUsers.map((user) => (

                    <tr
                      key={user._id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >

                      {/* USER */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4 min-w-[220px]">

                        {
                  user.profileImage ? (

                  <img
                   src={user.profileImage}
                  alt="user"
                  className="w-12 h-12 rounded-full object-cover"
                 />

            ) : (

             <div className=" w-12 h-12 rounded-full
      bg-gradient-to-r from-cyan-500 to-blue-600
      flex items-center justify-center
      text-white font-bold text-lg
    "
    >
      {user.name?.charAt(0).toUpperCase()}
    </div>

  )
}

                          <div>

                            <h3 className="font-semibold text-slate-800">
                              {user.name}
                            </h3>

                            <p className="text-sm text-slate-500 break-all">
                              {user.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* ROLE */}

                      <td className="px-6 py-5">

                        <span
                          className={`px-4 py-1 rounded-full text-sm font-medium

                          ${
                            user.role === "employee"
                              ? "bg-emerald-100 text-emerald-700"

                              : user.role === "employer"
                              ? "bg-cyan-100 text-cyan-700"

                              : "bg-violet-100 text-violet-700"
                          }
                        `}
                        >

                          {user.role}

                        </span>

                      </td>

                      {/* EMAIL */}

                      <td className="px-6 py-5 text-slate-600 break-all">
                        {user.email}
                      </td>

                      {/* JOINED */}

                      <td className="px-6 py-5 text-slate-600 whitespace-nowrap">

                        {
                          new Date(user.createdAt)
                            .toLocaleDateString()
                        }

                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-5">

                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">

                          Active

                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-5">

                        <div className="flex flex-wrap justify-center gap-3 min-w-[220px]">

                          <button
                            onClick={() => setSelectedUser(user)}
                            className="text-cyan-600 hover:underline"
                          >
                            View
                          </button>

                          <button
                            onClick={() => setEditUser(user)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>

                          <button className="text-orange-500 hover:underline">
                            Block
                          </button>

                          <button
                            onClick={() => {

                              const confirmDelete = window.confirm(
                                "Are you sure you want to remove this user?"
                              );

                              if (confirmDelete) {
                                handleRemove(user._id);
                              }

                            }}
                            className="text-red-500 hover:underline"
                          >
                            Remove
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )
        }

      </div>


      {
  selectedUser && (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-6 text-white relative">

          <button
            onClick={() => setSelectedUser(null)}
            className="absolute top-4 right-4 text-white text-xl"
          >
            ✕
          </button>

          <div className="flex flex-col items-center">

         {
  selectedUser.profileImage ? (

    <img
      src={selectedUser.profileImage}
      alt="user"
      className="w-24 h-24 rounded-full border-4 border-white object-cover"
    />

  ) : (

    <div
      className="
      w-24 h-24 rounded-full
      border-4 border-white
      bg-white/20
      flex items-center justify-center
      text-white text-4xl font-bold
    "
    >
      {selectedUser.name?.charAt(0).toUpperCase()}
    </div>

  )
}

            <h2 className="mt-4 text-2xl font-bold">
              {selectedUser.name}
            </h2>

            <p className="text-cyan-100 break-all text-center">
              {selectedUser.email}
            </p>

          </div>

        </div>

        <div className="p-6 space-y-4">

          <div className="flex justify-between border-b pb-3">

            <span className="text-slate-500 font-medium">
              Role
            </span>

            <span className="font-semibold capitalize">
              {selectedUser.role}
            </span>

          </div>

          <div className="flex justify-between border-b pb-3">

            <span className="text-slate-500 font-medium">
              Status
            </span>

            <span
              className={`font-semibold
              ${
                selectedUser.isBlocked
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {
                selectedUser.isBlocked
                  ? "Blocked"
                  : "Active"
              }
            </span>

          </div>

          <div className="flex justify-between border-b pb-3">

            <span className="text-slate-500 font-medium">
              Verified
            </span>

            <span className="font-semibold">

              {
                selectedUser.isVerified
                  ? "Yes"
                  : "No"
              }

            </span>

          </div>

          <div className="flex justify-between border-b pb-3">

            <span className="text-slate-500 font-medium">
              Joined
            </span>

            <span className="font-semibold">

              {
                new Date(
                  selectedUser.createdAt
                ).toLocaleDateString()
              }

            </span>

          </div>

        </div>

        <div className="p-5 bg-slate-50 flex justify-end">
         
         <button
                 onClick={() => navigate(`/admin/users/${selectedUser._id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white mr-3 px-5 py-2 rounded-xl">
             User Details
          </button>
 
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white mr-3 px-5 py-2 rounded-xl">
              View Profile
          </button>
          

        </div>

      </div>

    </div>

  )
}


{
  editUser && (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-blue-600 to-violet-700 p-6 text-white relative">

          <button
            onClick={() => setEditUser(null)}
            className="absolute top-4 right-4 text-2xl"
          >
            ✕
          </button>

          <div className="flex items-center gap-4">

          {
  editUser.profileImage ? (

    <img
      src={editUser.profileImage}
      alt="user"
      className="w-20 h-20 rounded-full border-4 border-white object-cover"
    />

  ) : (

    <div
      className="
      w-20 h-20 rounded-full
      border-4 border-white
      bg-white/20
      flex items-center justify-center
      text-white text-3xl font-bold
    "
    >
      {editUser.name?.charAt(0).toUpperCase()}
    </div>

  )
}
            <div>

              <h2 className="text-2xl font-bold">
                {editUser.name}
              </h2>

              <p className="text-blue-100">
                {editUser.email}
              </p>

            </div>

          </div>

        </div>

        <div className="p-6 space-y-5">

          <div>

            <label className="text-sm font-medium text-slate-600">
              User Role
            </label>

            <select
              defaultValue={editUser.role}
              className="w-full mt-2 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="employee">
                Employee
              </option>

              <option value="employer">
                Employer
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

          </div>

          <div className="flex items-center justify-between bg-slate-100 rounded-2xl px-5 py-4">

            <div>

              <h3 className="font-semibold text-slate-800">
                Account Verification
              </h3>

              <p className="text-sm text-slate-500">
                Approve this account officially
              </p>

            </div>

            <button
              className={`px-5 py-2 rounded-xl text-white font-medium

              ${
                editUser.isVerified
                  ? "bg-green-600"
                  : "bg-orange-500"
              }
            `}
            >

              {
                editUser.isVerified
                  ? "Verified"
                  : "Verify"
              }

            </button>

          </div>

          <div className="flex items-center justify-between bg-slate-100 rounded-2xl px-5 py-4">

            <div>

              <h3 className="font-semibold text-slate-800">
                Account Status
              </h3>

              <p className="text-sm text-slate-500">
                Block suspicious accounts
              </p>

            </div>

            <button
              className={`px-5 py-2 rounded-xl text-white font-medium

              ${
                editUser.isBlocked
                  ? "bg-red-600"
                  : "bg-emerald-600"
              }
            `}
            >

              {
                editUser.isBlocked
                  ? "Blocked"
                  : "Active"
              }

            </button>

          </div>

          <div>

            <label className="text-sm font-medium text-slate-600">
              Admin Remarks
            </label>

            <textarea
              rows="4"
              placeholder="Write remarks or verification notes..."
              className="w-full mt-2 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

          </div>

        </div>

        <div className="bg-slate-50 px-6 py-5 flex justify-end gap-3">

          <button
            onClick={() => setEditUser(null)}
            className="px-5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>

  )
}

    </div>

  );

};

export default Users;
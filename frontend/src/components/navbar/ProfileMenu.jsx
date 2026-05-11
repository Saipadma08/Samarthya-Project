import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProfileImage from "../images/ProfileImage";

const ProfileMenu = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [openMenu, setOpenMenu] = useState(false);

  const menuRef = useRef();

  useEffect(() => {

    axios.get("http://localhost:3000/api/auth/me", {
      withCredentials: true
    })

      .then((res) => {
        setUser(res.data.user);
      })

      .catch((err) => {
        console.log(err);
      });

  }, []);

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenMenu(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  const handleLogout = async () => {
    try {

      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("user");

      toast.success("Logged out successfully");

      navigate("/login");

    } catch (err) {

      toast.error("Logout failed");

    }
  };

  return (

    <div className="relative" ref={menuRef}>

      {/* Avatar */}
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className="cursor-pointer"
      >

        <ProfileImage profileImage={user?.profileImage} />

      </div>

      {/* Dropdown */}
      {
        openMenu && (

          <div
            className="absolute right-0 mt-1 w-66 bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden z-50 "
          >

            {/* Top user info */}
            <div className="p-4 border-b">

              <div className="flex items-center gap-3">

                <ProfileImage profileImage={user?.profileImage} />

                <div>

                  <p className="font-semibold text-sm">
                    {user?.name}
                  </p>

                  <p className="text-xs text-gray-500 break-all">
                    {user?.email}
                  </p>

                </div>

              </div>

            </div>

            {/* Menu Items */}
            <div className="flex flex-col text-sm">

              {/* EMPLOYEE */}
              {
                user?.role === "employee" && (
                  <>

                    <Link
                      to="/employee/profile"
                      className="px-4 py-3 hover:bg-gray-100"
                    >
                      View Profile
                    </Link>

                    <Link
                      to="/employee/edit-profile"
                      className="px-4 py-3 hover:bg-gray-100"
                    >
                      Edit Profile
                    </Link>

                  </>
                )
              }

              {/* EMPLOYER */}
              {
                user?.role === "employer" && (
                  <>

                    <Link
                      to="/employer/profile"
                      className="px-4 py-3 hover:bg-gray-100"
                    >
                      View Profile
                    </Link>

                    <Link
                      to="/employer/edit-profile"
                      className="px-4 py-3 hover:bg-gray-100"
                    >
                      Edit Profile
                    </Link>

                  </>
                )
              }

              {/* ADMIN */}
              {
                user?.role === "admin" && (
                  <>

                    <Link
                      to="/admin/edit-data"
                      className="px-4 py-3 hover:bg-gray-100"
                    >
                      Edit Data
                    </Link>

                  </>
                )
              }

              {/* COMMON */}
              <Link
                to={`/${user?.role}/settings`}
                className="px-4 py-3 hover:bg-gray-100"
              >
                Settings
              </Link>

            </div>

            {/* Logout */}
            <div className="border-t">

              <button
                onClick={handleLogout}
                className="
                w-full
                text-left
                px-4
                py-3
                text-red-500
                hover:bg-red-50
                "
              >
                Logout
              </button>

            </div>

          </div>

        )
      }

    </div>

  );
};

export default ProfileMenu;
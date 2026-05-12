import React from "react";
import { Link } from "react-router-dom";

import { FiEdit } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";

const ProfileActions = ({
  currentUser,
  viewedUser,
  connectionStatus,
  isPublicView = false
}) => {

  // own profile
  const isOwnProfile =
    currentUser?._id === viewedUser?._id;

  // EDIT PROFILE
  if (isOwnProfile) {

    return (

      <div>

        {
          currentUser?.role === "employee"
          ? (
              <Link
                to="/employee/edit-profile"
                className="flex items-center justify-center gap-2 bg-cyan-600 text-white rounded-md px-3 h-8 lg:px-6 lg:h-10"
              >
                Edit Profile
                <FiEdit />
              </Link>
            )
          : (
              <Link
                to="/employer/edit-profile"
                className="flex items-center justify-center gap-2 bg-cyan-600 text-white rounded-md px-3 h-8 lg:px-6 lg:h-10"
              >
                Edit Profile
                <FiEdit />
              </Link>
            )
        }

      </div>

    );
  }

  // PUBLIC VIEW
  if (isPublicView) {
    return null;
  }

  // CONNECT
  if (connectionStatus === "none") {

    return (

      <button
        className="flex items-center justify-center gap-2 bg-cyan-600 text-white rounded-md px-3 h-8 lg:px-6 lg:h-10"
      >
        Connect
        <FiUserPlus />
      </button>

    );
  }

  // PENDING
  if (connectionStatus === "pending") {

    return (

      <button
        className="bg-gray-400 text-white rounded-md px-3 h-8 lg:px-6 lg:h-10"
      >
        Pending
      </button>

    );
  }

  // CONNECTED
  if (connectionStatus === "connected") {

    return (

      <button
        className="flex items-center justify-center gap-2 bg-cyan-600 text-white rounded-md px-3 h-8 lg:px-6 lg:h-10"
      >
        Message
        <FiMessageCircle />
      </button>

    );
  }

};

export default ProfileActions;
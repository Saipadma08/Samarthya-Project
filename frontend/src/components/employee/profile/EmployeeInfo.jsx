import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const EmployeeInfo = ({ user, profile }) => {
  return (
    <div>
      <div className="flex flex-col h-72 lg:h-85 justify-end gap-1">

        {/* Name */}
        <p className="text-lg lg:text-3xl font-bold">
          {user?.name || "Your Name"}
        </p>

        {/* Job Type */}
        <p className="text-sm lg:text-lg font-semibold text-gray-700">
          {profile?.jobType || "Job Type"}
        </p>

        {/* Category */}
        <p className="text-gray-600 text-sm lg:text-md">
          Category: {profile?.category || "Not specified"}
        </p>

        {/* Location */}
        <p className="text-gray-600 text-sm lg:text-md">
          Location: {profile?.location || "Not specified"}
        </p>

        {/* Open to Work */}
        {profile?.openToWork && (
          <p className="text-green-600 font-semibold">
            Open to work
          </p>
        )}

        {/* Verified */}
        <div className="flex items-center gap-2 mt-2 text-cyan-700 text-sm lg:text-md">
          <FiCheckCircle />
          {user?.isVerified ? "Verified" : "Not Verified"}
        </div>

      </div>
    </div>
  );
};

export default EmployeeInfo;
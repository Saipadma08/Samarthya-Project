import React from 'react'

const EmployeeInfo = ({user, profile}) => {
  return (
    <div>
      <div className="flex flex-col h-72 lg:h-85 justify-end gap-1">

        {/* Name */}
        <p className="text-lg lg:text-xl font-bold">
          {user?.name || "Your Name"}
        </p>

        {/* Job Type */}
        <p className="text-sm lg:text-md font-semibold text-gray-700">
          Jog type: {profile?.jobType || "Not specified"}
        </p>

        {/* Category */}
        <p className="text-gray-600 text-sm lg:text-md">
          Gender: {profile?.gender || "Not specified"}
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

      </div>
    </div>
  )
}

export default EmployeeInfo

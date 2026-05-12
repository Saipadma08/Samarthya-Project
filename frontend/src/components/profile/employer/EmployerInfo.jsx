import React from 'react'

const EmployerInfo = ({user, profile}) => {
  return (
    <div className="flex flex-col h-60 lg:h-85 justify-end gap-1">
            <p className="text-lg lg:text-xl font-bold">
                {user?.name || "Your Name"}
            </p>

            <p className="text-sm lg:text-md font-semibold text-gray-700">
                Employer • {profile?.employerType || "Type specified"}
            </p>

            <p className="text-gray-600 text-sm lg:text-md">
                Location: {profile?.location || "Not specified"}
            </p>

            <p className="text-gray-600 text-sm lg:text-md">
                Jobs Posted: {profile?.jobsPosted}
            </p>

            <p className="text-gray-600 text-sm lg:text-md">
                Workers Hired: {profile?.workersHired}
            </p>
            
        </div>
  )
}

export default EmployerInfo

import React from 'react'
import { FiCheckCircle } from 'react-icons/fi'

const EmployerInfo = ({user, profile}) => {
  return (
    <div className="flex flex-col h-60 lg:h-85 justify-end">
        <p className="text-lg lg:text-3xl font-bold">
            {user?.name || "Your Name"}
        </p>

        <p className="text-sm lg:text-lg font-semibold text-gray-700">
            Employer • {profile?.employerType}
        </p>

        <p className="text-gray-600 text-sm lg:text-md">
            Location: {profile?.location}
        </p>

        <p className="text-gray-600 text-sm lg:text-md">
            Jobs Posted: {profile?.jobsPosted}
        </p>

        <p className="text-gray-600 text-sm lg:text-md">
            Workers Hired: {profile?.workersHired}
        </p>

        <div className="flex items-center gap-2 mt-2 text-cyan-700 text-sm lg:text-md">
            <FiCheckCircle />
            {user.isVerified}
        </div>
    </div>
  )
}

export default EmployerInfo

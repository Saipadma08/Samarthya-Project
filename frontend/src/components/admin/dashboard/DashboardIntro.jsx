import React from 'react'

const DashboardHeader = ({admin}) => {
  return (
    <div>
        <p className="text-2xl text-cyan-700 font-semibold">
            Welcome, {admin?.name}
        </p>

        <p className="text-gray-600 mt-2">
            Manage users, jobs and platform activity.
        </p>
    </div>
  )
}

export default DashboardHeader

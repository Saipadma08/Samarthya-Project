import React from 'react'
import { FiCheckCircle, FiClock, FiXCircle, FiAlertCircle } from 'react-icons/fi';

const EmployerInfo = ({ user, profile }) => {
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
                {
                    user?.verificationStatus === "approved" ? (

                        <div className="flex items-center gap-2 text-green-600 font-medium">
                            <FiCheckCircle />
                            <span>Verified Employer</span>
                        </div>

                    )

                    : user?.verificationStatus === "pending" ? (

                        <div className="flex items-center gap-2 text-yellow-500 font-medium">
                            <FiClock />
                            <span>Verification Pending</span>
                        </div>

                    )

                    : user?.verificationStatus === "rejected" ? (

                        <div className="flex items-center gap-2 text-red-500 font-medium">
                            <FiXCircle />
                            <span>Verification Rejected</span>
                        </div>

                    )

                    : (

                        <div className="flex items-center gap-2 text-gray-500 font-medium">
                            <FiAlertCircle />
                            <span>Not Verified</span>
                        </div>

                    )
                }
            </div>
        </div>
    )
}

export default EmployerInfo

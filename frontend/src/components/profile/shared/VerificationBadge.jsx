import React from 'react'
import { FiCheckCircle, FiClock, FiXCircle, FiAlertCircle } from 'react-icons/fi';


const VerificationBadge = (user) => {
  return (
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
  )
}

export default VerificationBadge

import React from 'react'
import { FiStar } from 'react-icons/fi'

const TrustCard = () => {
  return (
    <div className="w-full shadow-sm shadow-gray-300 rounded-lg p-2 lg:p-5">
        <p className="font-semibold text-gray-700 mb-2 text-sm">
        Trust Score
        </p>

        <div className="flex mb-2">
        <FiStar className="text-amber-400" />
        <FiStar className="text-amber-400" />
        <FiStar className="text-amber-400" />
        <FiStar className="text-amber-400" />
        <FiStar className="text-gray-400" />
        </div>

        <p className="text-xs lg:text-sm text-gray-600">
        Based on feedback & verification
        </p>
    </div>
  )
}

export default TrustCard

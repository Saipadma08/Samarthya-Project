import React from 'react'
import { FiCheckCircle } from 'react-icons/fi'

const EmployerInfo = () => {
  return (
    <div className="flex flex-col h-60 lg:h-85 justify-end">
        <p className="text-lg lg:text-3xl font-bold">
            Sumit Rao
        </p>

        <p className="text-sm lg:text-lg font-semibold text-gray-700">
            Employer • Household Services
        </p>

        <p className="text-gray-600 text-sm lg:text-md">
            Location: Bhubaneswar, India
        </p>

        <p className="text-gray-600 text-sm lg:text-md">
            Jobs Posted: 12
        </p>

        <p className="text-gray-600 text-sm lg:text-md">
            Workers Hired: 8
        </p>

        <div className="flex items-center gap-2 mt-2 text-cyan-700 text-sm lg:text-md">
            <FiCheckCircle />
            Verified
        </div>
    </div>
  )
}

export default EmployerInfo

import React from 'react'

const Stats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-4 lg:mt-10 max-w-3xl">

    <div className="bg-gray-800 shadow-md rounded-xl p-5">
        <p className="text-white text-sm">
        Jobs Posted
        </p>
        <p className="text-3xl text-white font-bold mt-1">
        12
        </p>
    </div>

    <div className="bg-gray-800 shadow-md rounded-xl p-5">
        <p className="text-white text-sm">
        Applications
        </p>
        <p className="text-3xl text-white font-bold mt-1">
        25
        </p>
    </div>

    <div className="bg-gray-800 shadow-md rounded-xl p-5">
        <p className="text-white text-sm">
        Workers Hired
        </p>
        <p className="text-3xl text-white font-bold mt-1">
        8
        </p>
    </div>

    <div className="bg-gray-800 shadow-md rounded-xl p-5">
        <p className="text-white text-sm">
        Active Jobs
        </p>
        <p className="text-3xl text-white font-bold mt-1">
        3
        </p>
    </div>

    </div>
  )
}

export default Stats

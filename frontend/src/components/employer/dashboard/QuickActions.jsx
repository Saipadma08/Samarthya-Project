import React from 'react'

const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">

        {/* Post Job */}
        <div className="bg-cyan-600 text-white rounded-xl p-6 shadow-md hover:scale-[1.02] transition">

          <p className="text-lg font-semibold">
            Post New Job
          </p>

          <p className="text-sm text-cyan-100 mt-1">
            Create a new job and hire workers
          </p>

        </div>


        {/* Applicants */}
        <div className="bg-emerald-900 rounded-xl p-6 shadow-md hover:scale-[1.02] transition">

          <p className="text-lg text-white font-semibold">
            View Applicants
          </p>

          <p className="text-sm text-white mt-1">
            Check who applied for your jobs
          </p>

        </div>


        {/* Messages */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-md hover:scale-[1.02] transition">

          <p className="text-lg text-white font-semibold">
            Messages
          </p>

          <p className="text-sm text-white mt-1">
            Chat with workers and applicants
          </p>

        </div>

      </div>
  )
}

export default QuickActions

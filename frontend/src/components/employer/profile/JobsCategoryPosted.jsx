import React from 'react'

const JobsCategoryPosted = ({profile}) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 mt-5">
        <p className="text-lg lg:text-xl font-semibold mb-3">
            Job Categories Posted
        </p>

        <div className="flex flex-wrap gap-2">

          {profile?.jobCategories?.length > 0 ? (

            profile.jobCategories.map((jobCategory, index) => (

              <span
                key={index}
                className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded"
              >
                {jobCategory}
              </span>

            ))

          ) : (

            <p className="text-gray-500">
              No catagory added
            </p>

          )}

        </div>
    </div>
  )
}

export default JobsCategoryPosted

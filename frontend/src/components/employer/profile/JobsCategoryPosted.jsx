import React from 'react'

const JobsCategoryPosted = () => {
  return (
    <div className="bg-white rounded-xl shadow p-5 mt-5">
        <p className="text-lg lg:text-xl font-semibold mb-3">
            Job Categories Posted
        </p>

        <div className="flex flex-wrap gap-2">
            {["Cleaning", "Cooking", "Photographer", "Tailor"].map((item) => (
            <span
                key={item}
                className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded"
            >
                {item}
            </span>
            ))}
        </div>
    </div>
  )
}

export default JobsCategoryPosted

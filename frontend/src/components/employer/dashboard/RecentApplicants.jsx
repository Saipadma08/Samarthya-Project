import React from 'react'

const RecentApplicants = () => {
  return (
    <div className="bg-white shadow rounded-xl p-6 mt-6">

    {/* header */}
    <div className="flex justify-between items-center mb-4">

        <p className="text-xl font-semibold">
        Recent Applicants
        </p>

        <button className="text-cyan-600 text-sm font-medium">
        View all
        </button>

    </div>


    {/* list */}
    <div className="flex flex-col divide-y">

        {/* applicant */}
        <div className="flex justify-between items-center py-3">

        <div className="flex items-center gap-3">

            <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://i.pinimg.com/736x/90/f8/c2/90f8c2c17b3787e85a9ed22fa8602308.jpg"
            alt=""
            />

            <p className="font-medium">
            Roshni Sharma
            </p>

        </div>

        <div className="flex items-center gap-4">

            <span className="text-yellow-500 font-medium">
            ⭐ 4.2
            </span>

            <button className="text-cyan-600 text-sm font-medium">
            View
            </button>

        </div>

        </div>


        {/* applicant */}
        <div className="flex justify-between items-center py-3">

        <div className="flex items-center gap-3">

            <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://i.pinimg.com/736x/db/c5/82/dbc582cb4a5ef9df9fc7e82e283947b2.jpg"
            alt=""
            />

            <p className="font-medium">
            Aman Das
            </p>

        </div>

        <div className="flex items-center gap-4">

            <span className="text-yellow-500 font-medium">
            ⭐ 4.5
            </span>

            <button className="text-cyan-600 text-sm font-medium">
            View
            </button>

        </div>

        </div>


        {/* applicant */}
        <div className="flex justify-between items-center py-3">

        <div className="flex items-center gap-3">

            <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://i.pinimg.com/736x/4a/f8/3b/4af83bafa8965278b997a2f2c72a1e39.jpg"
            alt=""
            />

            <p className="font-medium">
            Kiran
            </p>

        </div>

        <div className="flex items-center gap-4">

            <span className="text-yellow-500 font-medium">
            ⭐ 4.0
            </span>

            <button className="text-cyan-600 text-sm font-medium">
            View
            </button>

        </div>

        </div>

    </div>

    </div>
  )
}

export default RecentApplicants

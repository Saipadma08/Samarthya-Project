import React from "react";
import { FiMapPin } from "react-icons/fi";

const FindJobs = () => {

  const jobs = [
    {
      id: 1,
      title: "Bridal Make-up",
      price: "₹5000",
      category: "Medium",
      status: "Open",
    },
    {
      id: 2,
      title: "Hair styling",
      price: "₹2000",
      category: "Medium",
      status: "Open",
    },
    {
      id: 3,
      title: "Nail Art",
      price: "₹1200",
      category: "Medium",
      status: "Assigned",
    },
  ];

  return (
    <div>

      {/* TITLE */}
      <p className="text-2xl font-semibold mb-6">
        Find Jobs
      </p>


      {/* JOB GRID */}
      <div className="grid grid-cols-2 gap-5">

        {jobs.map((job) => (

          <div
            key={job.id}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >

            {/* TOP */}
            <div className="flex justify-between items-start">

              <h2 className="font-semibold text-lg">
                {job.title}
              </h2>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  job.status === "Open"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {job.status === "Assigned" ? "Closed" : job.status}
              </span>

            </div>


            {/* MIDDLE */}
            <div className="mt-4 space-y-2 text-sm text-gray-600">

              <div className="flex items-center gap-3">

                <span className="font-semibold text-gray-800">
                  {job.price}
                </span>

                <span
                  className={`px-2 py-0.5 rounded text-xs ${
                    job.category === "Low"
                      ? "bg-green-100 text-green-700"
                      : job.category === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.category}
                </span>

              </div>

              <div className="flex items-center gap-1">
                <FiMapPin />
                Bhubaneswar
              </div>

            </div>


            {/* BOTTOM */}
            <div className="mt-5">

              {job.status === "Assigned" ? (

                <button className="w-full bg-gray-200 text-gray-600 py-2 rounded-lg cursor-not-allowed">
                  Closed
                </button>

              ) : job.category === "Low" ? (

                <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg">
                  Accept Now
                </button>

              ) : (

                <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg">
                  Apply
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default FindJobs;
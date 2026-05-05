import React from "react";

const MyJobs = () => {

  const jobs = [
    {
      title: "Cleaning Job",
      status: "Active",
      category: "Low",
      applicants: 2,
      payment: "₹500",
      location: "Bhubaneswar",
      type: "One-time",
      date: "2 days ago",
    },
    {
      title: "Tailoring Job",
      status: "Completed",
      category: "Medium",
      applicants: 5,
      payment: "₹800",
      location: "Cuttack",
      type: "Contract",
      date: "5 days ago",
    },
  ];

  const getCategoryColor = (category) => {
    if (category === "Low") return "bg-green-500";
    if (category === "Medium") return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div>

      {/* TITLE */}
      <p className="text-2xl font-semibold mb-6">
        My Posted Jobs
      </p>


      {/* JOB LIST */}
      <div className="grid md:grid-cols-2 gap-6">

        {jobs.map((job, index) => (

          <div
            key={index}
            className="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden"
          >

            {/* LEFT ACCENT BAR */}
            <div
              className={`absolute left-0 top-0 h-full w-1 ${getCategoryColor(
                job.category
              )}`}
            />


            <div className="p-5 flex flex-col justify-between h-full">

              {/* TOP */}
              <div className="flex justify-between items-start">

                <h2 className="text-lg font-semibold">
                  {job.title}
                </h2>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    job.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {job.status}
                </span>

              </div>


              {/* DETAILS */}
              <div className="mt-4 text-sm text-gray-600 space-y-2">

                <div className="flex flex-wrap gap-2 text-xs">

                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {job.payment}
                  </span>

                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {job.category}
                  </span>

                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {job.type}
                  </span>

                </div>

                <p>📍 {job.location}</p>

                <p className="font-medium text-gray-700">
                  👥 {job.applicants} Applicants
                </p>

                <p className="text-xs text-gray-400">
                  Posted {job.date}
                </p>

              </div>


              {/* ACTIONS */}
              <div className="mt-5 flex gap-3">

                <button className="flex-1 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-500 transition">
                  View
                </button>

                {job.status === "Active" && (
                  <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:opacity-90 transition">
                    Close
                  </button>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default MyJobs;
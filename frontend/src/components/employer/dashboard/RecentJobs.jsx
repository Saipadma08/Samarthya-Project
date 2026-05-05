import React from "react";

const RecentJobs = () => {
  const jobs = [
    {
      title: "Photographer Needed",
      category: "Event Work",
      time: "2 days ago",
      status: "Open",
    },
    {
      title: "Cook Required",
      category: "Home Help",
      time: "Today",
      status: "Closed",
    },
    {
      title: "Cleaner Needed",
      category: "House Help",
      time: "Yesterday",
      status: "Open",
    },
  ];

  return (
    <div className="bg-white shadow rounded-xl p-6 mt-6">
      {/* Title */}
      <div className="flex justify-between items-center mb-5">
        <p className="text-2xl font-bold">
          Recent Jobs
        </p>

        <button className="text-cyan-600 text-sm font-medium hover:underline">
          View all
        </button>
      </div>

      {/* Job List */}
      <div className="flex flex-col divide-y">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-4"
          >
            {/* Left Side */}
            <div className="flex flex-col">
              <p className="font-semibold text-lg">
                {job.title}
              </p>

              <div className="flex gap-4 text-sm text-gray-500 mt-1">
                <span>{job.category}</span>
                <span>{job.time}</span>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded text-sm font-medium ${
                  job.status === "Open"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {job.status}
              </span>

              <button className="text-cyan-600 text-sm font-medium hover:underline">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentJobs;
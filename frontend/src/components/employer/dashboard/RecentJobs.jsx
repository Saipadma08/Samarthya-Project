import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecentJobs = () => {

  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchRecentJobs = async () => {

      try {

        const response = await axios.get(
          "http://localhost:3000/api/employer/dashboard",
          {
            withCredentials: true,
          }
        );

        setJobs(response.data.recentJobs);

      } catch (error) {

        console.log(error);
      }
    };

    fetchRecentJobs();

  }, []);

  return (

    <div className="bg-white shadow rounded-xl p-6 mt-6">

      {/* Title */}
      <div className="flex justify-between items-center mb-5">

        <p className="text-2xl font-bold">
          Recent Jobs
        </p>

        <button
          onClick={() =>
            navigate("/employer/myjobs")
          }
          className="
            text-cyan-600
            text-sm
            font-medium
            hover:underline
          "
        >
          View all
        </button>

      </div>

      {/* Job List */}
      <div className="flex flex-col divide-y">

        {
          jobs.map((job) => (

            <div
              key={job._id}
              className="
                flex
                justify-between
                items-center
                py-4
              "
            >

              {/* Left Side */}
              <div className="flex flex-col">

                <p className="font-semibold text-lg">
                  {job.title}
                </p>

                <div className="
                  flex
                  gap-4
                  text-sm
                  text-gray-500
                  mt-1
                ">

                  <span>
                    {job.category}
                  </span>

                  <span>
                    {
                      new Date(
                        job.createdAt
                      ).toLocaleDateString()
                    }
                  </span>

                </div>

              </div>

              {/* Right Side */}
              <div className="
                flex
                items-center
                gap-4
              ">

                <span
                  className={`
                    px-3
                    py-1
                    rounded
                    text-sm
                    font-medium
                    ${
                      job.status === "Closed"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-green-100 text-green-700"
                    }
                  `}
                >
                  {
                    job.status || "Open"
                  }
                </span>

                <button
                  onClick={() =>
                    navigate("/employer/applicants")
                  }
                  className="
                    text-cyan-600
                    text-sm
                    font-medium
                    hover:underline
                  "
                >
                  View Applicants
                </button>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default RecentJobs;
import React,
{
  useEffect,
  useState,
} from "react";

import axios from "axios";

const Stats = () => {

  const [stats, setStats] =
    useState({

      totalJobsPosted: 0,
      totalApplications: 0,
      workersHired: 0,
      activeJobs: 0,
    });

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const response =
            await axios.get(
              "http://localhost:3000/api/employer/dashboard",
              {
                withCredentials: true,
              }
            );

          setStats({

            totalJobsPosted:
              response.data
                .totalJobsPosted,

            totalApplications:
              response.data
                .totalApplications,

            workersHired:
              response.data
                .workersHired,

            activeJobs:
              response.data
                .activeJobs,
          });

        } catch (error) {

          console.log(error);
        }
      };

    fetchStats();

  }, []);

  return (

    <div className="
      grid
      grid-cols-2
      lg:grid-cols-4
      gap-5
      mt-4
      lg:mt-10
      max-w-3xl
    ">

      {/* JOBS POSTED */}
      <div className="
        bg-gray-800
        shadow-md
        rounded-xl
        p-5
      ">

        <p className="
          text-white
          text-sm
        ">
          Jobs Posted
        </p>

        <p className="
          text-3xl
          text-white
          font-bold
          mt-1
        ">
          {stats.totalJobsPosted}
        </p>

      </div>

      {/* APPLICATIONS */}
      <div className="
        bg-gray-800
        shadow-md
        rounded-xl
        p-5
      ">

        <p className="
          text-white
          text-sm
        ">
          Applications
        </p>

        <p className="
          text-3xl
          text-white
          font-bold
          mt-1
        ">
          {stats.totalApplications}
        </p>

      </div>

      {/* WORKERS HIRED */}
      <div className="
        bg-gray-800
        shadow-md
        rounded-xl
        p-5
      ">

        <p className="
          text-white
          text-sm
        ">
          Workers Hired
        </p>

        <p className="
          text-3xl
          text-white
          font-bold
          mt-1
        ">
          {stats.workersHired}
        </p>

      </div>

      {/* ACTIVE JOBS */}
      <div className="
        bg-gray-800
        shadow-md
        rounded-xl
        p-5
      ">

        <p className="
          text-white
          text-sm
        ">
          Active Jobs
        </p>

        <p className="
          text-3xl
          text-white
          font-bold
          mt-1
        ">
          {stats.activeJobs}
        </p>

      </div>

    </div>
  );
};

export default Stats;
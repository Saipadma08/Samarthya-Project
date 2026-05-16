import axios from "axios";
import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate }
from "react-router-dom";

const SuggestedJobs = () => {

  const navigate =
  useNavigate();

  const [
    jobs,
    setJobs,
  ] = useState([]);

  useEffect(() => {

    fetchSuggestedJobs();

  }, []);

  const fetchSuggestedJobs =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await axios.get(

            "http://localhost:3000/api/employee/dashboard",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setJobs(
  response.data.suggestedJobs || []
);

      } catch (error) {

        console.log(
          error.response?.data ||
          error.message
        );
      }
    };

  return (

    <div className="
      bg-white
      rounded-2xl
      border
      border-slate-200
      p-6
      shadow-sm
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-5
      ">

        Suggested Jobs

      </h2>

      <div className="space-y-4">

        {
          jobs.length === 0

          ? (

            <p className="text-gray-500">

              No suggested jobs found

            </p>
          )

          : (

            jobs.map((job) => (

              <div
                key={job._id}
                className="
                  bg-gradient-to-r
                  from-cyan-50
                  to-purple-100
                  rounded-xl
                  p-4
                  flex
                  justify-between
                  items-center
                "
              >

                <div>

                  <h3 className="
                    font-semibold
                    text-lg
                  ">

                    {job.title}

                  </h3>

                  <p className="
                    text-cyan-700
                    text-sm
                  ">

                    ₹{job.payment}

                  </p>

                </div>

                <button

                onClick={() =>

                  navigate(
                    `/employee/job/${job._id}`
                  )
                }

                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  transition
                "
              >

                View Details

              </button>

              </div>
            ))
          )
        }

      </div>

    </div>
  );
};

export default SuggestedJobs;
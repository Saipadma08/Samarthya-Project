import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

const RecentApplicants = () => {

  const [applicants, setApplicants] =
    useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchApplicants =
      async () => {

        try {

          const response =
            await axios.get(
              "http://localhost:3000/api/employer/dashboard",
              {
                withCredentials: true,
              }
            );

          setApplicants(
            response.data
              .recentApplicants
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchApplicants();

  }, []);

  return (

    <div className="
      bg-white
      shadow
      rounded-xl
      p-6
      mt-6
    ">

      {/* header */}
      <div className="
        flex
        justify-between
        items-center
        mb-4
      ">

        <p className="
          text-xl
          font-semibold
        ">
          Recent Applicants
        </p>

        <button
          onClick={() =>
            navigate(
              "/employer/applicants"
            )
          }
          className="
            text-cyan-600
            text-sm
            font-medium
          "
        >
          View all
        </button>

      </div>

      {/* list */}
      <div className="
        flex
        flex-col
        divide-y
      ">

        {
          applicants.map(
            (application) => {

              const applicant =
                application.employeeId;

              return (

                <div
                  key={application._id}
                  className="
                    flex
                    justify-between
                    items-center
                    py-3
                  "
                >

                  {/* LEFT */}
                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <img
                      className="
                        w-10
                        h-10
                        rounded-full
                        object-cover
                      "

                     src={
                            applicant?.profileImage ||
                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                         }

                      alt=""
                    />

                    <p className="
                      font-medium
                    ">
                      {
                        applicant?.name ||
                        "Applicant"
                      }
                    </p>

                  </div>

                  {/* RIGHT */}
                  <div className="
                    flex
                    items-center
                    gap-4
                  ">

                    <span className="
                      text-sm
                      text-gray-500
                    ">
                      {
                        new Date(
                          application.createdAt
                        ).toLocaleDateString()
                      }
                    </span>

                    <button
                      onClick={() =>
                        navigate(
                        `/employer/applicants?application=${application._id}`
                        )
                      }

                      className="
                        text-cyan-600
                        text-sm
                        font-medium
                      "
                    >
                      View
                    </button>

                  </div>

                </div>
              );
            }
          )
        }

      </div>

    </div>
  );
};

export default RecentApplicants;
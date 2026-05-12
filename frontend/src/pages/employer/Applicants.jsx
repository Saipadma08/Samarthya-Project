import axios from "axios";

import React, {
  useEffect,
  useState,
} from "react";

const Applicants = () => {

  const [
    applications,

    setApplications,
  ] = useState([]);

  const fetchApplicants =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          console.log(
            "No token found"
          );

          return;
        }

        const response =
          await axios.get(

            "http://localhost:3000/api/applications/employer",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setApplications(
          response.data
            .applications
        );

      } catch (error) {

        console.log(error);
      }
    };

  const updateStatus =
    async (
      applicationId,
      status
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          alert(
            "Please login again"
          );

          return;
        }

        const response =
          await axios.patch(

            `http://localhost:3000/api/applications/status/${applicationId}`,

            {
              status,
            },

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        alert(
          response.data
            .message ||
          `Application ${status}`
        );

        fetchApplicants();

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data
            ?.message ||

          "Failed to update status"
        );
      }
    };

  useEffect(() => {

    fetchApplicants();

  }, []);

  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">

        Applicants

      </h1>

      {

        applications.length === 0 ? (

          <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">

            No applications yet

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {applications.map(
              (item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow p-5"
                >

                  <h2 className="text-2xl font-bold">

                    {
                      item.employeeName
                    }

                  </h2>

                  <p>
                    {
                      item.employeeEmail
                    }
                  </p>

                  <p className="mt-2">

                    <span className="font-semibold">

                      Category:

                    </span>

                    {" "}

                    {
                      item
                        .employeeProfile
                        ?.category ||
                      "N/A"
                    }

                  </p>

                  <p>

                    <span className="font-semibold">

                      Skills:

                    </span>

                    {" "}

                    {
                      item
                        .employeeProfile
                        ?.skills ||
                      "N/A"
                    }

                  </p>

                  <hr className="my-4" />

                  <h3 className="font-bold text-lg mb-2">

                    Applied Job

                  </h3>

                  <p>

                    <span className="font-semibold">

                      Title:

                    </span>

                    {" "}

                    {
                      item.job?.title
                    }

                  </p>

                  <p>

                    <span className="font-semibold">

                      Payment:

                    </span>

                    {" "}

                    ₹

                    {
                      item.job
                        ?.payment
                    }

                  </p>

                  <p>

                    <span className="font-semibold">

                      Location:

                    </span>

                    {" "}

                    {
                      item.job
                        ?.location
                    }

                  </p>

                  <p className="mt-3">

                    <span className="font-semibold">

                      Status:

                    </span>

                    <span
                      className={`ml-2 font-bold ${
                        item.status ===
                        "Accepted"
                          ? "text-green-600"
                          : item.status ===
                            "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >

                      {item.status}

                    </span>

                  </p>

                  {

                    item.status ===
                    "Pending" && (

                      <div className="flex gap-3 mt-5">

                        <button
                          onClick={() =>
                            updateStatus(

                              item._id,

                              "Accepted"
                            )
                          }

                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        >

                          Accept

                        </button>

                        <button
                          onClick={() =>
                            updateStatus(

                              item._id,

                              "Rejected"
                            )
                          }

                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >

                          Reject

                        </button>

                      </div>
                    )
                  }

                </div>
              )
            )}

          </div>
        )
      }

    </div>
  );
};

export default Applicants;
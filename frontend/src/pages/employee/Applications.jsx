import axios from "axios";

import React, {
  useEffect,
  useState,
} from "react";

const Applications = () => {

  const [
    applications,

    setApplications,
  ] = useState([]);

  const fetchApplications =
    async () => {

      try {

        const token =
  localStorage.getItem("token");

        if (!token) {

          console.log(
            "No token found"
          );

          return;
        }

        const response =
          await axios.get(

            "http://localhost:3000/api/applications/employee",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        console.log(
          response.data
        );

        setApplications(
          response.data
            .applications || []
        );

      } catch (error) {

        console.log(
          error.response?.data ||
          error.message
        );
      }
    };

  useEffect(() => {

    fetchApplications();

  }, []);

  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">

        My Applications

      </h1>

      {
        applications.length === 0
        ? (

          <p className="text-gray-500">

            No applications found

          </p>
        )
        : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {applications.map(
              (item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow p-5"
                >

                  <h2 className="text-2xl font-bold">

                    {
                      item.job?.title
                    }

                  </h2>

                  <p className="text-gray-600">

                    {
                      item.companyName
                    }

                  </p>

                  <p className="mt-2">

                    <span className="font-semibold">

                      Location:

                    </span>

                    {" "}

                    {
                      item.job
                        ?.location
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

                  <p className="mt-2">

                    <span className="font-semibold">

                      Status:

                    </span>

                    <span className="font-bold ml-2">

                      {item.status}

                    </span>

                  </p>

                </div>
              )
            )}

          </div>
        )
      }

    </div>
  );
};

export default Applications;
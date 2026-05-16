import axios from "axios";

import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate
} from "react-router-dom";

const Applications = () => {

 const navigate =
    useNavigate();

  const [
    applications,
    setApplications,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedApplication,
    setSelectedApplication,
  ] = useState(null);

  const fetchApplications =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        if (!token) return;

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

        setApplications(
          response.data
            .applications || []
        );

      } catch (error) {

        console.log(
          error.response?.data ||
          error.message
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchApplications();

  }, []);

  const filteredApplications =
    applications.filter((item) =>

      item.job?.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  if (loading) {

    return (

      <div className="
        min-h-screen
        flex
        justify-center
        items-center
        text-lg
        font-semibold
      ">

        Loading...

      </div>
    );
  }

  return (

    <div className="
      p-4 md:p-6
      bg-slate-50
      min-h-screen
    ">

      {/* HEADER */}

      <div className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
        mb-6
      ">

        <h1 className="
          text-3xl
          font-bold
          text-slate-900
        ">

          My Applications

        </h1>

        <input
          type="text"
          placeholder="Search applied jobs..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            md:w-80
            border
            border-slate-300
            rounded-xl
            px-4
            py-3
            outline-none
            bg-white
            text-sm
            focus:ring-2
            focus:ring-cyan-500
          "
        />

      </div>

      {/* APPLICATIONS */}

      {
        filteredApplications
          .length === 0

          ? (

            <div className="
              bg-white
              rounded-2xl
              p-10
              text-center
              shadow-sm
            ">

              <p className="text-gray-500">

                No applications found

              </p>

            </div>

          )

          : (

            <div className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-5
            ">

              {
                filteredApplications.map(
                  (item) => (

                    <div
                      key={item._id}
                      className="
                        bg-white
                        rounded-2xl
                        border
                        border-slate-200
                        shadow-sm
                        p-5
                      "
                    >

                      <div className="
                        flex
                        justify-between
                        items-start
                      ">

                        <div>

                          <h2 className="
                            text-2xl
                            font-bold
                            text-slate-900
                          ">

                            {
                              item.job?.title
                            }

                          </h2>

                          <p className="
                            text-gray-500
                            text-sm
                            mt-1
                          ">

                            {
                              item.companyName ||
                              "Independent Employer"
                            }

                          </p>

                        </div>

                        <span className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold

                          ${
                            item.status ===
                            "Accepted"

                            ? "bg-green-100 text-green-700"

                            : item.status ===
                              "Rejected"

                            ? "bg-red-100 text-red-700"

                            : "bg-yellow-100 text-yellow-700"
                          }
                        `}>

                          {item.status}

                        </span>

                      </div>

                      <div className="
                        mt-4
                        text-sm
                        text-slate-700
                        space-y-1
                      ">

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

                      </div>

                      <button
                      onClick={() =>
                        navigate(
                          `/employee/job/${item.job?._id}`
                        )
                      }
                      className="
                        mt-5
                        bg-cyan-600
                        hover:bg-cyan-700
                        text-white
                        px-5
                        py-2.5
                        rounded-xl
                        text-sm
                        font-medium
                        transition
                      "
                    >

                      View Details

                    </button>

                    </div>
                  )
                )
              }

            </div>
          )
      }

       </div>
  );
};

              

export default Applications;
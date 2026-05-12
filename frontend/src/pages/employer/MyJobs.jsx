import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

const MyJobs = () => {

  const [jobs, setJobs] =
    useState([]);

  const [
    applications,
    setApplications,
  ] = useState([]);

  const [
    selectedJob,
    setSelectedJob,
  ] = useState(null);

  const fetchJobs =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(

            "http://localhost:3000/api/postedjobs/employer",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setJobs(
          response.data.jobs || []
        );

        const applicationsResponse =
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
          applicationsResponse.data
            .applications || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchJobs();

  }, []);

  const toggleJobStatus =
    async (
      jobId,
      currentStatus
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.patch(

            `http://localhost:3000/api/postedjobs/status/${jobId}`,

            {
              status:
                currentStatus ===
                "Active"
                  ? "Closed"
                  : "Active",
            },

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId
              ? {
                  ...job,
                  status:
                    response.data
                      .job.status,
                }
              : job
          )
        );

      } catch (error) {

        console.log(error);
      }
    };

  const closeApplication =
    async (jobId) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.patch(

          `http://localhost:3000/api/postedjobs/status/${jobId}`,

          {
            status: "Closed",
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId
              ? {
                  ...job,
                  status: "Closed",
                }
              : job
          )
        );

        alert(
          "Application Closed ✅"
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

        fetchJobs();

        alert(
          `Application ${status}`
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="max-w-7xl mx-auto p-6">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">

            My Posted Jobs

          </h1>

          <p className="text-gray-500 mt-1">

            Manage your posted jobs

          </p>

        </div>

        <div className="bg-cyan-600 text-white px-5 py-3 rounded-xl shadow-lg">

          Total Jobs: {jobs.length}

        </div>

      </div>

      <div className="grid gap-6">

        {jobs.map((job) => {

          const jobApplications =
            applications.filter(
              (application) =>
                application.job?._id ===
                job._id
            );

          return (

            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
            >

              <div className="p-6">

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3 mb-3">

                      <h2 className="text-2xl font-bold text-gray-800">

                        {job.title}

                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.status ===
                          "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        {job.status}

                      </span>

                    </div>

                    <p className="text-gray-600 mb-4">

                      {job.description}

                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

                      <div className="bg-gray-50 p-3 rounded-xl">

                        <p className="text-gray-500">

                          Payment

                        </p>

                        <p className="font-semibold text-gray-800">

                          ₹{job.payment}

                        </p>

                      </div>

                      <div className="bg-gray-50 p-3 rounded-xl">

                        <p className="text-gray-500">

                          Location

                        </p>

                        <p className="font-semibold text-gray-800">

                          {job.location}

                        </p>

                      </div>

                      <div className="bg-gray-50 p-3 rounded-xl">

                        <p className="text-gray-500">

                          Job Type

                        </p>

                        <p className="font-semibold text-gray-800">

                          {job.jobType}

                        </p>

                      </div>

                      <div className="bg-gray-50 p-3 rounded-xl">

                        <p className="text-gray-500">

                          Workers Needed

                        </p>

                        <p className="font-semibold text-gray-800">

                          {job.workersNeeded}

                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="flex flex-col items-center gap-3 min-w-[200px]">

                    <div className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-xl font-semibold">

                      {jobApplications.length} Applicants

                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl w-full justify-between">

                      <span className="font-medium text-gray-700">

                        Status

                      </span>

                      <button
                        onClick={() =>
                          toggleJobStatus(
                            job._id,
                            job.status
                          )
                        }
                        className={`w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 ${
                          job.status ===
                          "Active"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      >

                        <div
                          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-all duration-300 ${
                            job.status ===
                            "Active"
                              ? "translate-x-7"
                              : "translate-x-0"
                          }`}
                        />

                      </button>

                    </div>

                    <button
                      onClick={() =>
                        setSelectedJob({
                          ...job,
                          applications:
                            jobApplications,
                        })
                      }
                      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-medium transition"
                    >

                      View Applications

                    </button>

                    <button
                      onClick={() =>
                        closeApplication(
                          job._id
                        )
                      }
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
                    >

                      Close Application

                    </button>

                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {selectedJob && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

            <div className="p-6 border-b flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">

                  {selectedJob.title}

                </h2>

                <p className="text-gray-500 mt-1">

                  Applications & Job Details

                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedJob(null)
                }
                className="text-2xl text-gray-500 hover:text-red-500"
              >

                ×

              </button>

            </div>

            <div className="p-6 space-y-6">

              <div className="bg-gray-50 rounded-2xl p-5">

                <h3 className="text-lg font-semibold mb-4 text-gray-800">

                  Job Details

                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">

                  <div>

                    <p className="text-gray-500">

                      Category

                    </p>

                    <p className="font-semibold">

                      {
                        selectedJob.category
                      }

                    </p>

                  </div>

                  <div>

                    <p className="text-gray-500">

                      Payment

                    </p>

                    <p className="font-semibold">

                      ₹
                      {
                        selectedJob.payment
                      }

                    </p>

                  </div>

                  <div>

                    <p className="text-gray-500">

                      Location

                    </p>

                    <p className="font-semibold">

                      {
                        selectedJob.location
                      }

                    </p>

                  </div>

                </div>

              </div>

              <div>

                <div className="flex items-center justify-between mb-4">

                  <h3 className="text-lg font-semibold text-gray-800">

                    Applied Employees

                  </h3>

                  <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm">

                    {
                      selectedJob
                        .applications
                        ?.length || 0
                    }

                    {" "}
                    Applicants

                  </span>

                </div>

                <div className="space-y-4">

                  {selectedJob
                    .applications &&
                  selectedJob
                    .applications
                    .length > 0 ? (

                    selectedJob.applications.map(
                      (
                        application
                      ) => (

                        <div
                          key={
                            application._id
                          }
                          className="border rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                        >

                          <div>

                            <h4 className="text-lg font-semibold text-gray-800">

                              {
                                application.employeeName
                              }

                            </h4>

                            <p className="text-gray-500 mt-1">

                              {
                                application.employeeEmail
                              }

                            </p>

                            <p className="text-gray-500 mt-1">

                              Skills:

                              {" "}

                              {
                                application
                                  .employeeProfile
                                  ?.skills
                              }

                            </p>

                            <p className="text-gray-500 mt-1">

                              Status:

                              <span className="font-semibold ml-1">

                                {
                                  application.status
                                }

                              </span>

                            </p>

                          </div>

                          <div className="flex gap-3">

                            <button
                              onClick={() =>
                                updateStatus(
                                  application._id,
                                  "Accepted"
                                )
                              }
                              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-medium transition"
                            >

                              Accept

                            </button>

                            <button
                              onClick={() =>
                                updateStatus(
                                  application._id,
                                  "Rejected"
                                )
                              }
                              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium transition"
                            >

                              Reject

                            </button>

                          </div>

                        </div>
                      )
                    )

                  ) : (

                    <p className="text-gray-500">

                      No applicants yet

                    </p>

                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default MyJobs;
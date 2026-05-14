import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  Briefcase,
  MapPin,
  IndianRupee,
  Users,
  Eye,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const MyJobs = () => {

  const navigate =
    useNavigate();

  const [jobs, setJobs] =
    useState([]);

  const [applications,
    setApplications] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const jobsResponse =
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
          jobsResponse.data
            .jobs || []
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
          applicationsResponse
            .data
            .applications || []
        );

      } catch (error) {

        toast.error(
          "Failed to load jobs"
        );

      } finally {

        setLoading(false);
      }
    };

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

        toast.success(
          `Job marked as ${
            response.data.job
              .status
          }`
        );

      } catch (error) {

        toast.error(
          "Failed to update job status"
        );
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

        toast.success(
          "Application Closed"
        );

      } catch (error) {

        toast.error(
          "Failed to close application"
        );
      }
    };

  if (loading) {

    return (

      <div className="p-6">

        Loading...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#f5f7fb] p-4 md:p-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>

            <h1 className="text-3xl font-bold text-slate-900">

              My Posted Jobs

            </h1>

            <p className="text-gray-500 mt-1">

              Manage and track all your job postings

            </p>

          </div>

          <div className="bg-cyan-600 text-white px-5 py-3 rounded-2xl shadow-sm font-semibold">

            Total Jobs:
            {" "}
            {jobs.length}

          </div>

        </div>

        <div className="grid gap-5">

          {jobs.map((job) => {

            const jobApplications =
              applications.filter(
                (
                  application
                ) =>

                  application.job
                    ?._id ===
                  job._id
              );

            return (

              <div
                key={job._id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
              >

                <div className="p-6">

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3 mb-3">

                        <h2 className="text-2xl font-bold text-slate-900">

                          {job.title}

                        </h2>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            job.status ===
                            "Active"

                              ? "bg-green-100 text-green-700"

                              : "bg-red-100 text-red-700"
                          }`}
                        >

                          {job.status}

                        </span>

                      </div>

                      <p className="text-gray-600 leading-relaxed mb-5">

                        {
                          job.description
                        }

                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                        <div className="bg-slate-50 rounded-2xl p-4">

                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">

                            <IndianRupee size={16} />

                            Payment

                          </div>

                          <p className="font-bold text-slate-900">

                            ₹
                            {
                              job.payment
                            }

                          </p>

                        </div>

                        <div className="bg-slate-50 rounded-2xl p-4">

                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">

                            <MapPin size={16} />

                            Location

                          </div>

                          <p className="font-bold text-slate-900">

                            {
                              job.location
                            }

                          </p>

                        </div>

                        <div className="bg-slate-50 rounded-2xl p-4">

                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">

                            <Briefcase size={16} />

                            Type

                          </div>

                          <p className="font-bold text-slate-900">

                            {
                              job.jobType
                            }

                          </p>

                        </div>

                        <div className="bg-slate-50 rounded-2xl p-4">

                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">

                            <Users size={16} />

                            Workers

                          </div>

                          <p className="font-bold text-slate-900">

                            {
                              job.workersNeeded
                            }

                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="w-full lg:w-[260px] flex flex-col gap-4">

                      <div className="bg-cyan-50 text-cyan-700 rounded-2xl px-4 py-4 text-center">

                        <p className="text-sm">

                          Applicants

                        </p>

                        <p className="text-3xl font-bold">

                          {
                            jobApplications.length
                          }

                        </p>

                      </div>

                      <div className="bg-slate-50 rounded-2xl px-4 py-4 flex items-center justify-between">

                        <span className="font-medium text-slate-700">

                          Status

                        </span>

                        <button
                          onClick={() =>
                            toggleJobStatus(
                              job._id,
                              job.status
                            )
                          }
                          className={`w-14 h-7 rounded-full p-1 transition-all ${
                            job.status ===
                            "Active"

                              ? "bg-green-500"

                              : "bg-gray-400"
                          }`}
                        >

                          <div
                            className={`bg-white w-5 h-5 rounded-full transition-all ${
                              job.status ===
                              "Active"

                                ? "translate-x-7"

                                : ""
                            }`}
                          />

                        </button>

                      </div>

                      <button
                        onClick={() =>
                          navigate(
                            "/employer/view-applicants"
                          )
                        }
                        className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl py-3 font-semibold flex items-center justify-center gap-2 transition"
                      >

                        <Eye size={18} />

                        View Applicants

                      </button>

                      <button
                        onClick={() =>
                          closeApplication(
                            job._id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white rounded-2xl py-3 font-semibold transition"
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

      </div>

    </div>
  );
};

export default MyJobs;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Jobs = () => {

  const [jobsData, setJobsData] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedJob, setSelectedJob] = useState(null);

  // ================= FETCH JOBS =================

  async function fetchJobs() {

    try {

      const res = await axios.get(
        "http://localhost:3000/api/admin/jobs",
        {
          withCredentials: true,
        }
      );

      setJobsData(res.data.jobs);

    } catch (error) {

      console.log(error);

      toast.error("Failed to fetch jobs");

    }

  }

  useEffect(() => {

    fetchJobs();

  }, []);

  // ================= VIEW JOB =================

  async function handleView(id) {

    try {

      const response = await axios.get(
        `http://localhost:3000/api/admin/jobs/${id}`,
        {
          withCredentials: true,
        }
      );

      setSelectedJob(response.data.job);

    } catch (error) {

      console.log(error);

      toast.error("Failed to fetch job details");

    }

  }

  // ================= DELETE JOB =================

  async function handleDelete(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to remove this job?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:3000/api/admin/jobs/${id}`,
        {
          withCredentials: true,
        }
      );

      toast.success("Job removed successfully");

      fetchJobs();

    } catch (error) {

      console.log(error);

      toast.error("Failed to remove job");

    }

  }

  // ================= SEARCH FILTER =================

  const filteredJobs = jobsData.filter((job) => {

    return (

      job.title
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      job.location
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      job.category
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  });

  return (

    <div className="p-4 lg:p-6 bg-[#f5f7fb] min-h-screen w-full overflow-x-hidden">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div>

          <h1
            className="
            text-3xl lg:text-4xl
            font-extrabold leading-normal
            bg-gradient-to-r
            from-cyan-600
            via-blue-600
            to-violet-600
            bg-clip-text
            text-transparent
            tracking-tight
          "
          >
            Jobs Management
          </h1>

          <p className="text-slate-500 mt-3 text-base lg:text-lg">
            Monitor and manage all platform jobs !
          </p>

        </div>

        {/* SEARCH */}

        <div className="w-full md:w-[320px]">

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
          />

        </div>

      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <div className="bg-white rounded-2xl p-4 shadow-sm">

          <p className="text-slate-500 text-sm">
            Total Jobs
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {jobsData.length}
          </h2>

        </div>

        <div className="bg-green-50 rounded-2xl p-4 shadow-sm">

          <p className="text-green-700 text-sm">
            Active
          </p>

          <h2 className="text-2xl font-bold text-green-700 mt-2">

            {
              jobsData.filter(
                (job) => job.status === "Active"
              ).length
            }

          </h2>

        </div>

        <div className="bg-red-50 rounded-2xl p-4 shadow-sm">

          <p className="text-red-700 text-sm">
            Urgent
          </p>

          <h2 className="text-2xl font-bold text-red-700 mt-2">

            {
              jobsData.filter(
                (job) =>
                  job.urgency === "Urgent" ||
                  job.urgency === "Immediate"
              ).length
            }

          </h2>

        </div>

        <div className="bg-cyan-50 rounded-2xl p-4 shadow-sm">

          <p className="text-cyan-700 text-sm">
            Pending
          </p>

          <h2 className="text-2xl font-bold text-cyan-700 mt-2">

            {
              jobsData.filter(
                (job) => job.action === "Pending"
              ).length
            }

          </h2>

        </div>

      </div>

      {/* ================= TABLE ================= */}

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200">

        {/* TABLE HEADER */}

        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

          <div>

            <h2 className="text-xl font-semibold text-slate-800">
              All Jobs
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Showing {filteredJobs.length} jobs
            </p>

          </div>

        </div>

        {/* TABLE */}

        <div className="w-full overflow-x-auto">

          <table className="min-w-[1100px] w-full text-left">

            <thead className="bg-slate-100 text-slate-600 text-sm uppercase">

              <tr>

                <th className="px-6 py-4">
                  Job
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Location
                </th>

                <th className="px-6 py-4">
                  Job Type
                </th>

                <th className="px-6 py-4">
                  Payment
                </th>

                <th className="px-6 py-4">
                  Workers
                </th>

                <th className="px-6 py-4">
                  Urgency
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredJobs.map((job) => (

                <tr
                  key={job._id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >

                  {/* JOB */}

                  <td className="px-6 py-5">

                    <div>

                      <h3 className="font-semibold text-slate-800">
                        {job.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                        {job.description}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        ID : {job._id.slice(-6)}
                      </p>

                    </div>

                  </td>

                  {/* CATEGORY */}

                  <td className="px-6 py-5">

                    <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm">

                      {job.category}

                    </span>

                  </td>

                  {/* LOCATION */}

                  <td className="px-6 py-5 text-slate-600">
                    {job.location}
                  </td>

                  {/* JOB TYPE */}

                  <td className="px-6 py-5 text-slate-600">
                    {job.jobType}
                  </td>

                  {/* PAYMENT */}

                  <td className="px-6 py-5 text-slate-600">
                    ₹ {job.payment}
                  </td>

                  {/* WORKERS */}

                  <td className="px-6 py-5 text-slate-600">
                    {job.workersNeeded}
                  </td>

                  {/* URGENCY */}

                  <td className="px-6 py-5">

                    <span
                      className={`px-3 py-1 rounded-full text-sm

                      ${
                        job.urgency === "Urgent" ||
                        job.urgency === "Immediate"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                    >

                      {job.urgency}

                    </span>

                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-5">

                    <span
                      className={`px-3 py-1 rounded-full text-sm

                      ${
                        job.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }
                    `}
                    >

                      {job.status || "Active"}

                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => handleView(job._id)}
                        className="text-cyan-600 hover:underline"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= VIEW JOB MODAL ================= */}

      {
        selectedJob && (

          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">

              {/* TOP */}

              <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white p-6 relative">

                <button
                  onClick={() => setSelectedJob(null)}
                  className="absolute right-5 top-4 text-2xl"
                >
                  ×
                </button>

                <h2 className="text-3xl font-bold">
                  {selectedJob.title}
                </h2>

                <p className="text-cyan-100 mt-2">
                  {selectedJob.location}
                </p>

              </div>

              {/* DETAILS */}

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Category
                  </p>

                  <h3 className="text-lg font-semibold mt-1">
                    {selectedJob.category}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Job Type
                  </p>

                  <h3 className="text-lg font-semibold mt-1">
                    {selectedJob.jobType}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Payment
                  </p>

                  <h3 className="text-lg font-semibold mt-1">
                    ₹ {selectedJob.payment}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Workers Needed
                  </p>

                  <h3 className="text-lg font-semibold mt-1">
                    {selectedJob.workersNeeded}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Urgency
                  </p>

                  <h3 className="text-lg font-semibold mt-1">
                    {selectedJob.urgency}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-sm text-slate-500">
                    Status
                  </p>

                  <h3 className="text-lg font-semibold mt-1">
                    {selectedJob.status}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5 md:col-span-2">

                  <p className="text-sm text-slate-500">
                    Skills Required
                  </p>

                  <h3 className="text-lg font-semibold mt-1">
                    {selectedJob.skills || "Not specified"}
                  </h3>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5 md:col-span-2">

                  <p className="text-sm text-slate-500">
                    Description
                  </p>

                  <p className="text-slate-700 leading-relaxed mt-2">
                    {selectedJob.description}
                  </p>

                </div>

              </div>

              {/* FOOTER */}

              <div className="px-6 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                <p className="text-sm text-slate-500">

                  Posted on :

                  {
                    new Date(selectedJob.createdAt)
                      .toLocaleDateString()
                  }

                </p>

                <button
                  onClick={() => setSelectedJob(null)}
                  className="bg-cyan-600 text-white px-5 py-2 rounded-xl hover:bg-cyan-700 transition"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>

  );

};

export default Jobs;


import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  MapPin,
  Bookmark,
  Share2,
  Eye,
  IndianRupee,
  Briefcase,
} from "lucide-react";

const FindJobs = () => {

  const [jobs, setJobs] =
    useState([]);

  const [
    selectedStates,
    setSelectedStates,
  ] = useState([]);

  const [
    selectedCities,
    setSelectedCities,
  ] = useState([]);

  const [savedJobs, setSavedJobs] =
    useState([]);

  const [selectedJob, setSelectedJob] =
    useState(null);

  const locationData = {

    Odisha: [
      "Bhubaneswar",
      "Cuttack",
      "Puri",
      "Rourkela",
      "Sambalpur",
    ],

    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
    ],

    Karnataka: [
      "Bangalore",
      "Mysore",
      "Mangalore",
    ],

    Delhi: [
      "New Delhi",
      "Dwarka",
      "Rohini",
    ],
  };

  const fetchJobs = async () => {

    try {

      const token =
  localStorage.getItem("token");

      const response =
        await axios.get(

          "http://localhost:3000/api/postedjobs/all",

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(
        response.data.jobs
      );

      setJobs(
        response.data.jobs || []
      );

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchJobs();

  }, []);

  const toggleState = (state) => {

    if (
      selectedStates.includes(
        state
      )
    ) {

      setSelectedStates(

        selectedStates.filter(
          (item) =>
            item !== state
        )
      );

      setSelectedCities(

        selectedCities.filter(
          (city) =>

            !locationData[
              state
            ].includes(city)
        )
      );

    } else {

      setSelectedStates([
        ...selectedStates,
        state,
      ]);
    }
  };

  const toggleCity = (city) => {

    if (
      selectedCities.includes(
        city
      )
    ) {

      setSelectedCities(

        selectedCities.filter(
          (item) =>
            item !== city
        )
      );

    } else {

      setSelectedCities([
        ...selectedCities,
        city,
      ]);
    }
  };

  const filteredJobs =
    jobs.filter((job) => {

      if (
        selectedCities.length === 0
      ) {

        return true;
      }

      const jobLocation =
        job.location
          ?.trim()
          .toLowerCase();

      return selectedCities.some(
        (city) => {

          return jobLocation?.includes(

            city
              .trim()
              .toLowerCase()
          );
        }
      );
    });

  const saveJob = (jobId) => {

    if (
      savedJobs.includes(jobId)
    ) {

      setSavedJobs(

        savedJobs.filter(
          (id) =>
            id !== jobId
        )
      );

    } else {

      setSavedJobs([
        ...savedJobs,
        jobId,
      ]);
    }
  };

  const shareJob = async (
    job
  ) => {

    try {

      await navigator.share({

        title: job.title,

        text:
          `${job.title} in ${job.location}`,

        url:
          window.location.href,
      });

    } catch (error) {

      console.log(error);
    }
  };

  const applyJob = async (
  jobId
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
      await axios.post(

        "http://localhost:3000/api/applications/apply",

        {
          jobId,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    alert(
      response.data.message
    );

  } catch (error) {

    console.log(error);

    alert(

      error.response?.data
        ?.message ||

      "Application failed"
    );
  }
};

  return (

    <div className="max-w-7xl mx-auto p-6">

      <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100 mb-8">

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">

              Find Jobs

            </h1>

            <p className="text-gray-500 mt-2">

              Explore opportunities based on your preferred cities

            </p>

          </div>

          <div className="bg-cyan-600 text-white px-6 py-4 rounded-2xl shadow-lg">

            <p className="text-sm opacity-90">

              Available Jobs

            </p>

            <p className="text-2xl font-bold">

              {
                filteredJobs.length
              }

            </p>

          </div>

        </div>

        <div className="mt-8">

          <h2 className="text-lg font-semibold text-gray-800 mb-4">

            Choose Preferred States

          </h2>

          <div className="flex flex-wrap gap-3">

            {Object.keys(
              locationData
            ).map((state) => (

              <button
                key={state}
                onClick={() =>
                  toggleState(
                    state
                  )
                }

                className={`px-5 py-2 rounded-xl border transition ${
                  selectedStates.includes(
                    state
                  )

                    ? "bg-cyan-600 text-white border-cyan-600"

                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >

                {state}

              </button>
            ))}

          </div>

        </div>

        {selectedStates.length >
          0 && (

          <div className="mt-8">

            <h2 className="text-lg font-semibold text-gray-800 mb-4">

              Choose Preferred Cities

            </h2>

            <div className="flex flex-wrap gap-3">

              {selectedStates.flatMap(
                (state) =>

                  locationData[
                    state
                  ].map((city) => (

                    <button
                      key={city}
                      onClick={() =>
                        toggleCity(
                          city
                        )
                      }

                      className={`px-5 py-2 rounded-xl border transition ${
                        selectedCities.includes(
                          city
                        )

                          ? "bg-green-500 text-white border-green-500"

                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                    >

                      {city}

                    </button>
                  ))
              )}

            </div>

          </div>
        )}

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {filteredJobs.map(
          (job) => (

            <div
              key={job._id}
              className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl transition duration-300"
            >

              <div className="p-6">

                <div className="flex items-start justify-between">

                  <div>

                    <div className="flex items-center gap-4 mb-4">

                      <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center">

                        <Briefcase
                          size={28}
                          className="text-cyan-700"
                        />

                      </div>

                      <div>

                        <h2 className="text-2xl font-bold text-gray-800">

                          {job.title}

                        </h2>

                        <p className="text-gray-500">

                          {
                            job.companyName ||
                            "Independent Employer"
                          }

                        </p>

                        <p className="text-sm text-gray-400">

                          Posted by {
                            job.employerName
                          }

                        </p>

                      </div>

                    </div>

                    <div className="flex gap-3 flex-wrap mb-5">

                      <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm">

                        {
                          job.category
                        }

                      </span>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                        {
                          job.status
                        }

                      </span>

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">

                        {
                          job.jobType
                        }

                      </span>

                    </div>

                  </div>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        saveJob(
                          job._id
                        )
                      }

                      className={`p-3 rounded-xl transition ${
                        savedJobs.includes(
                          job._id
                        )

                          ? "bg-yellow-100 text-yellow-600"

                          : "bg-gray-100 text-gray-600"
                      }`}
                    >

                      <Bookmark size={20} />

                    </button>

                    <button
                      onClick={() =>
                        shareJob(job)
                      }

                      className="p-3 rounded-xl bg-gray-100 text-gray-600"
                    >

                      <Share2 size={20} />

                    </button>

                  </div>

                </div>

                <p className="text-gray-600 leading-relaxed mb-6">

                  {
                    job.description
                  }

                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">

                  <div className="bg-gray-50 p-4 rounded-2xl">

                    <div className="flex items-center gap-2 text-gray-500 mb-2">

                      <IndianRupee size={16} />

                      <span className="text-sm">

                        Payment

                      </span>

                    </div>

                    <p className="font-bold text-lg text-gray-800">

                      ₹{
                        job.payment
                      }

                    </p>

                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl">

                    <div className="flex items-center gap-2 text-gray-500 mb-2">

                      <MapPin size={16} />

                      <span className="text-sm">

                        Location

                      </span>

                    </div>

                    <p className="font-bold text-lg text-gray-800">

                      {
                        job.location
                      }

                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      applyJob(
                        job._id
                      )
                    }

                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-medium transition"
                  >

                    Apply

                  </button>

                  <button
                    className="bg-gray-100 hover:bg-gray-200 px-4 rounded-xl transition"
                    onClick={() =>
                      setSelectedJob(
                        job
                      )
                    }
                  >

                    <Eye size={22} />

                  </button>

                </div>

              </div>

            </div>
          )
        )}

      </div>

      {selectedJob && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">

            <div className="p-6 border-b flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold text-gray-800">

                  {
                    selectedJob.title
                  }

                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedJob(
                    null
                  )
                }

                className="text-3xl text-gray-500 hover:text-red-500"
              >

                ×

              </button>

            </div>

            <div className="p-6 space-y-6">

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-gray-50 p-5 rounded-2xl">

                  <p className="text-gray-500">

                    Employer Name

                  </p>

                  <p className="font-semibold text-lg">

                    {
                      selectedJob.employerName
                    }

                  </p>

                </div>

                <div className="bg-gray-50 p-5 rounded-2xl">

                  <p className="text-gray-500">

                    Company Name

                  </p>

                  <p className="font-semibold text-lg">

                    {
                      selectedJob.companyName
                    }

                  </p>

                </div>

              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">

                <h3 className="text-2xl font-semibold mb-4 text-gray-800">

                  Description

                </h3>

                <p className="text-gray-600 leading-relaxed">

                  {
                    selectedJob.description
                  }

                </p>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default FindJobs;
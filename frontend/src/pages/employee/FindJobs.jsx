import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Select from "react-select";

import { useNavigate } from "react-router-dom";

import {
  MapPin,
  Bookmark,
  Share2,
  Eye,
  IndianRupee,
  Briefcase,
} from "lucide-react";

import {
  toast
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const FindJobs = () => {

  const navigate =
    useNavigate();

  const [jobs, setJobs] =
    useState([]);

  const [savedJobs, setSavedJobs] =
    useState([]);

  const [
    selectedState,
    setSelectedState,
  ] = useState(null);

  const [
    selectedCities,
    setSelectedCities,
  ] = useState([]);

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

  const stateOptions =
    Object.keys(locationData).map(
      (state) => ({
        value: state,
        label: state,
      })
    );

  const cityOptions =
    selectedState
      ? locationData[
          selectedState.value
        ].map((city) => ({
          value: city,
          label: city,
        }))
      : [];

  const fetchJobs =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

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

        setJobs(
          response.data.jobs || []
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to fetch jobs"
        );
      }
    };

  useEffect(() => {

    fetchJobs();

  }, []);

  const filteredJobs =
    jobs.filter((job) => {

      if (
        selectedCities.length === 0
      ) {

        return true;
      }

      return selectedCities.some(
        (city) =>

          job.location
            ?.toLowerCase()
            .includes(
              city.value.toLowerCase()
            )
      );
    });

  const saveJob =
  async (jobId) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.post(

          "http://localhost:3000/api/savedjobs/save",

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

      toast.success(
        response.data.message
      );

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

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to save job"
      );
    }
  };
  const shareJob =
    async (job) => {

      try {

        await navigator.share({

          title:
            job.title,

          text:
            `${job.title} in ${job.location}`,

          url:
            `${window.location.origin}/employee/job/${job._id}`,
        });

        toast.success(
          "Job shared successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Sharing failed"
        );
      }
    };

  return (

    <div className="max-w-7xl mx-auto p-6">

      {/* HEADER */}

      <div className="bg-white rounded-3xl shadow-md p-6 border border-gray-100 mb-8">

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">

              Find Jobs

            </h1>

            <p className="text-gray-500 mt-2">

              Discover opportunities based on preferred cities

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

        {/* FILTERS */}

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div>

            <label className="block mb-2 font-semibold text-gray-700">

              Search State

            </label>

            <Select
              options={
                stateOptions
              }

              value={
                selectedState
              }

              onChange={(
                value
              ) => {

                setSelectedState(
                  value
                );

                setSelectedCities(
                  []
                );
              }}

              placeholder="Select state..."
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold text-gray-700">

              Search Cities

            </label>

            <Select
              options={
                cityOptions
              }

              isMulti

              value={
                selectedCities
              }

              onChange={
                setSelectedCities
              }

              placeholder="Select cities..."
            />

          </div>

        </div>

      </div>

      {/* JOB CARDS */}

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

                          {
                            job.title
                          }

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

                    {/* SAVE */}

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

                      <Bookmark
                        size={20}
                      />

                    </button>

                    {/* SHARE */}

                    <button
                      onClick={() =>
                        shareJob(
                          job
                        )
                      }

                      className="p-3 rounded-xl bg-gray-100 text-gray-600"
                    >

                      <Share2
                        size={20}
                      />

                    </button>

                  </div>

                </div>

                {/* DESCRIPTION */}

                <p className="text-gray-600 leading-relaxed mb-6">

                  {
                    job.description
                  }

                </p>

                {/* INFO */}

                <div className="grid grid-cols-2 gap-4 mb-6">

                  <div className="bg-gray-50 p-4 rounded-2xl">

                    <div className="flex items-center gap-2 text-gray-500 mb-2">

                      <IndianRupee
                        size={16}
                      />

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

                      <MapPin
                        size={16}
                      />

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

                {/* BUTTON */}

                <button

                  onClick={() =>

                    navigate(

                      `/employee/job/${job._id}`
                    )
                  }

                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
                >

                  <Eye size={20} />

                  View Details

                </button>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
};

export default FindJobs;
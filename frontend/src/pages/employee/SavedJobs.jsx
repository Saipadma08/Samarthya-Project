import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import {
  Bookmark,
  MapPin,
  IndianRupee,
  Briefcase,
  Eye,
  Trash2,
} from "lucide-react";

import {
  toast
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const SavedJobs = () => {

  const navigate =
    useNavigate();

  const [
    savedJobs,
    setSavedJobs,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const fetchSavedJobs =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(

            "http://localhost:3000/api/savedjobs/all",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setSavedJobs(
          response.data.jobs || []
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load saved jobs"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchSavedJobs();

  }, []);

 const removeSavedJob =
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

      setSavedJobs(

        savedJobs.filter(
          (item) =>

            item.jobId?._id !==
            jobId
        )
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to remove saved job"
      );
    }
  };

  if (loading) {

    return (

      <div className="flex items-center justify-center h-screen text-2xl font-semibold text-gray-600">

        Loading...

      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto p-6">

      {/* HEADER */}

      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-8">

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div>

            <div className="flex items-center gap-3 mb-2">

              <Bookmark
                size={32}
                className="text-cyan-700"
              />

              <h1 className="text-4xl font-bold text-gray-800">

                Saved Jobs

              </h1>

            </div>

            <p className="text-gray-500">

              View and manage your saved opportunities

            </p>

          </div>

          <div className="bg-cyan-600 text-white px-6 py-4 rounded-2xl shadow-lg">

            <p className="text-sm opacity-90">

              Total Saved

            </p>

            <p className="text-2xl font-bold">

              {
                savedJobs.length
              }

            </p>

          </div>

        </div>

      </div>

      {/* EMPTY */}

      {
        savedJobs.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-16 text-center">

            <Bookmark
              size={70}
              className="mx-auto text-gray-300 mb-5"
            />

            <h2 className="text-3xl font-bold text-gray-700 mb-3">

              No Saved Jobs

            </h2>

            <p className="text-gray-500 text-lg">

              Save jobs to view them later

            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-2 gap-6">

            {savedJobs.map(
              (item) => {

                const job =
                  item.jobId;

                if (!job)
                  return null;

                return (

                  <div
                    key={item._id}

                    className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl transition duration-300"
                  >

                    <div className="p-6">

                      {/* TOP */}

                      <div className="flex items-start justify-between mb-5">

                        <div className="flex items-center gap-4">

                          <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center">

                            <Briefcase
                              size={30}
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

                              {
                                job.jobType
                              }

                            </p>

                          </div>

                        </div>

                        <button

                          onClick={() =>

                            removeSavedJob(
                              job._id
                            )
                          }

                          className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition"
                        >

                          <Trash2
                            size={20}
                          />

                        </button>

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

                        <Eye
                          size={20}
                        />

                        View Details

                      </button>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )
      }

    </div>
  );
};

export default SavedJobs;
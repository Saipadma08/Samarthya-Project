import React, { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import ProfileImage from "../../components/images/ProfileImage";


import {
  FiMapPin,
  FiBriefcase,
  FiArrowLeft,
  FiArrowRight
} from "react-icons/fi";


const Search = () => {

  const [searchType, setSearchType] = useState("users");

  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const [selectedJob, setSelectedJob] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  async function handleSearch(e) {

    const value = e.target.value;

    setQuery(value);

    try {

      const res = await axios.get(
        `http://localhost:3000/api/search/${searchType}?q=${value}`,
        {
          withCredentials: true
        }
      );

      setResults(res.data);

    } catch (err) {

      console.log(err);

    }

  }

  /*
  
  JOB VIEW
  
  */

  if (selectedJob) {

    return (

      <div className="p-3">

        <button
          onClick={() => setSelectedJob(null)}
          className="
            mb-5 flex items-center gap-2
            text-cyan-700 font-medium
            hover:text-cyan-900 transition
          "
        >

          <FiArrowLeft />

          Back to Search

        </button>

        <div
          className="
            bg-white rounded-2xl shadow
            p-6
          "
        >

          <h1 className="text-3xl font-bold">
            {selectedJob.job.title}
          </h1>

          <p className="mt-2 text-gray-500">
            Posted by {selectedJob.employer?.name}
          </p>

          <div className="mt-5 space-y-3">

            <div className="flex items-center gap-2">
              <FiMapPin />
              <p>{selectedJob.job.location}</p>
            </div>

            <div className="flex items-center gap-2">
              <FiBriefcase />
              <p>{selectedJob.job.jobType}</p>
            </div>

          </div>

          <div className="mt-6">

            <p className="text-gray-700">
              {selectedJob.job.description}
            </p>

          </div>

        </div>

      </div>

    );

  }

  /*
  
  SEARCH PAGE
  
  */

  return (

    <div className="p-2">

      <div>
        <button
          onClick={() => window.history.back()}
          className="
            flex items-center gap-2
            text-cyan-700 font-medium
            hover:text-cyan-900 transition
          "
        >
          <FiArrowLeft />
          Back
        </button>
    </div>

      {/* toggle buttons */}

      <div className="flex justify-center gap-4 mb-6">

        <button
          onClick={() => {

            setSearchType("users");

            setResults([]);

            setQuery("");

          }}
          className={`
            px-5 py-2 rounded-lg font-medium
            transition w-20 h-10
            flex justify-center items-center
            ${searchType === "users"
              ? "bg-cyan-600 text-white"
              : "bg-gray-200 text-gray-700"
            }
          `}
        >

          Users

        </button>

        <button
          onClick={() => {

            setSearchType("jobs");

            setResults([]);

            setQuery("");

          }}
          className={`
            px-5 py-2 rounded-lg font-medium
            transition w-20 h-10
            flex justify-center items-center
            ${searchType === "jobs"
              ? "bg-cyan-600 text-white"
              : "bg-gray-200 text-gray-700"
            }
          `}
        >

          Jobs

        </button>

      </div>

      {/* search bar */}
      <div className="flex justify-center">
        <div className="flex justify-center w-full lg:w-1/2 rounded-full bg-linear-to-br from-cyan-500 via-sky-500 to-teal-700 px-px shadow-sm shadow-gray-300">

          <input
            type="text"
            placeholder={
              searchType === "users"
                ? "Search users..."
                : "Search jobs..."
            }
            value={query}
            onChange={handleSearch}
            className="
          bg-white w-full
            h-11 border border-gray-400
            rounded-full px-4
            outline-none
            focus:border-cyan-600
          "
          />

        </div>
      </div>



      {/* results */}

      <div className="mt-6 space-y-4">

        {

          searchType === "users"

            ? (

              results.map((item) => (
                <div key={item.user._id} className="flex justify-center">

                  <Link

                    to={`/${loggedInUser.role}/profile-view/${item.user._id}`}

                    className="
                    w-full lg:w-2/3
                    bg-white shadow rounded-2xl
                    p-4 hover:shadow-lg transition
                    cursor-pointer block
                    "
                    >

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-full overflow-hidden">

                        <ProfileImage
                          profileImage={item.user.profileImage}
                        />

                      </div>

                      <div>

                        <p className="font-semibold text-lg">
                          {item.user.name}
                        </p>

                        <p className="text-gray-500">
                          {item.user.role}
                        </p>

                      </div>

                    </div>

                  </Link>
                </div>

              ))

            )

            : (

              results.map((item) => (

                <div
                  key={item.job._id}
                  className="
                  bg-white shadow rounded-2xl
                  p-5 hover:shadow-lg transition
                  border border-gray-100
                "
                >

                  {/* top */}

                  <div className="flex justify-between gap-4">

                    <div>

                      <h2 className="text-xl font-semibold text-gray-800">
                        {item.job.title}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        Posted by {item.employer?.name}
                      </p>

                    </div>

                    <p className="font-semibold text-cyan-700 text-lg whitespace-nowrap">
                      ₹ {item.job.payment}
                    </p>

                  </div>

                  {/* middle */}

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-5 gap-4">

                    <div className="flex flex-col gap-2 text-gray-600">

                      <div className="flex items-center gap-2">
                        <FiMapPin />
                        <p>{item.job.location}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <FiBriefcase />
                        <p>{item.job.jobType}</p>
                      </div>

                    </div>

                    {/* button */}

                    <div className="flex justify-end">

                      <button
                        onClick={() => setSelectedJob(item)}
                        className="
                        bg-cyan-600 text-white
                        px-4 py-2 rounded-lg
                        hover:bg-cyan-700 transition
                        flex items-center gap-2
                      "
                      >

                        View

                        <FiArrowRight />

                      </button>

                    </div>

                  </div>

                </div>

              ))

            )

        }

      </div>

    </div>

  );

};

export default Search;
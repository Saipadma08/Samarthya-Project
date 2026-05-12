import React, { useState } from "react";
import axios from "axios";

import ProfileImage from "../../components/images/ProfileImage";

import InlineProfileView from "../profile/InlineProfileView";

import {
  FiMapPin,
  FiBriefcase,
  FiArrowLeft,
  FiArrowRight
} from "react-icons/fi";

// import your public profile component
import PublicProfile from "../profile/PublicProfile";

const Search = () => {

  const [searchType, setSearchType] = useState("users");

  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

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

  USER PROFILE VIEW
  
  */

  if (selectedUser) {

    return (

      <div className="p-3">

        <button
          onClick={() => setSelectedUser(null)}
          className="
            mb-5 flex items-center gap-2
            text-cyan-700 font-medium
            hover:text-cyan-900 transition
          "
        >

          <FiArrowLeft />

          Back to Search

        </button>

        <InlineProfileView
          user={selectedUser.user}
          profile={selectedUser.profile}
        />

      </div>

    );

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
            ${
              searchType === "users"
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
            ${
              searchType === "jobs"
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
            w-full lg:w-1/2
            h-11 border border-gray-400
            rounded-xl px-4
            outline-none
            focus:border-cyan-600
          "
        />

      </div>

      {/* results */}

      <div className="mt-6 space-y-4">

        {

          searchType === "users"

          ? (

            results.map((item) => (
              <div key={item.user._id} className="flex justify-center">

                <div
                  
                  onClick={() => setSelectedUser(item)}
                  className=" w-full lg:w-2/3
                    bg-white shadow rounded-2xl
                    p-4 hover:shadow-lg transition
                    cursor-pointer
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

                </div>
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
import React, { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-hot-toast";

import {
  Eye,
  MessageCircle,
  Phone,
  Search,
} from "lucide-react";

const Applicants = () => {

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedApplicant,
    setSelectedApplicant] =
    useState(null);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchApplicants();

  }, []);

  const fetchApplicants = async () => {

    try {

      const response =
        await axios.get(

          "http://localhost:3000/api/applications/employer",

          {
            withCredentials: true
          }
        );

      setApplications(
        response.data.applications || []
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load applicants"
      );

    } finally {

      setLoading(false);
    }
  };

  const updateStatus = async (
    applicationId,
    status
  ) => {

    try {

      await axios.patch(

        `http://localhost:3000/api/applications/status/${applicationId}`,

        { status },

        {
          withCredentials: true
        }
      );

      toast.success(
        `Applicant ${status.toLowerCase()} successfully`
      );

      fetchApplicants();

      setSelectedApplicant(null);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to update status"
      );
    }
  };

  const filteredApplications =
    applications.filter((item) =>

      item.job?.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  if (loading) {

    return (
      <div className="p-10 text-center text-lg">
        Loading applicants...
      </div>
    );
  }

  return (

    <div className="p-6 bg-slate-100 min-h-screen">

      {/* HEADER */}

      <div className="bg-white rounded-3xl shadow-sm border p-6 mb-6">

        <h1 className="text-4xl font-bold text-slate-900">
          Applicants
        </h1>

        <p className="text-slate-500 mt-2">
          Total Applications:
          {" "}
          {filteredApplications.length}
        </p>

        {/* SEARCH */}

        <div className="mt-6 relative">

          <Search
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
            size={18}
          />

          <input
            type="text"
            placeholder="
              Search by job title...
            "
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              pl-12
              pr-4
              py-3
              rounded-2xl
              border
              bg-slate-50
              outline-none
              focus:ring-2
              focus:ring-cyan-500
            "
          />
        </div>
      </div>

      {/* NO APPLICANTS */}

      {
        filteredApplications.length === 0 && (

          <div className="
            bg-white
            rounded-3xl
            p-10
            text-center
            shadow-sm
          ">

            <h2 className="
              text-2xl
              font-semibold
              text-slate-700
            ">
              No applicants found
            </h2>

            <p className="
              text-slate-500
              mt-2
            ">
              Try searching another job title
            </p>

          </div>
        )
      }

      {/* APPLICANTS LIST */}

      <div className="space-y-5">

        {
          filteredApplications.map((item) => (

            <div
              key={item._id}

              className="
                bg-white
                rounded-3xl
                p-6
                shadow-sm
                border
                flex
                justify-between
                items-center
                gap-5
              "
            >

              {/* LEFT */}

              <div className="flex gap-5">

                <img
                  src={
                    item.employeeProfileImage ||

                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }

                  alt=""

                  className="
                    w-24
                    h-24
                    rounded-full
                    object-cover
                    border
                  "
                />

                <div>

                  <h2 className="
                    text-2xl
                    font-bold
                    text-slate-900
                  ">
                    {item.employeeName}
                  </h2>

                  <p className="text-slate-500">
                    {item.employeeEmail}
                  </p>

                  <div className="mt-3 space-y-1">

                    <p>
                      <span className="font-semibold">
                        Applied For:
                      </span>
                      {" "}
                      {item.job?.title}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Skills:
                      </span>
                      {" "}
                      {
                        item.employeeSkills?.length > 0
                          ? item.employeeSkills.join(", ")
                          : "No skills added"
                      }
                    </p>

                    <p>
                      <span className="font-semibold">
                        Gender:
                      </span>
                      {" "}
                      {
                        item.employeeGender ||
                        "Not specified"
                      }
                    </p>

                    <p>
                      <span className="font-semibold">
                        Applied On:
                      </span>
                      {" "}
                      {
                        new Date(
                          item.createdAt
                        ).toLocaleDateString()
                      }
                    </p>

                  </div>

                  {/* TRANS SUPPORT MESSAGE */}

                  {
                    item.employeeGender
                      ?.toLowerCase() ===
                    "transgender"

                    &&

                    item.job?.jobType !==
                    "Contract"

                    && (

                      <div className="
                        mt-4
                        bg-pink-50
                        border
                        border-pink-200
                        text-pink-700
                        p-3
                        rounded-xl
                        text-sm
                        font-medium
                      ">

                        🌈 Hiring this employee
                        qualifies for a
                        5% payment discount
                        under inclusive hiring.

                      </div>
                    )
                  }

                </div>
              </div>

              {/* RIGHT */}

              <div className="
                flex
                flex-col
                items-end
                gap-4
              ">

                <span
                  className={`
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold

                    ${
                      item.status === "Accepted"
                        ? "bg-green-100 text-green-700"

                        : item.status === "Rejected"
                        ? "bg-red-100 text-red-700"

                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {item.status}
                </span>

                <button
                  onClick={() =>
                    setSelectedApplicant(item)
                  }

                  className="
                    flex
                    items-center
                    gap-2
                    bg-cyan-600
                    hover:bg-cyan-700
                    text-white
                    px-5
                    py-3
                    rounded-xl
                    transition
                  "
                >

                  <Eye size={18} />

                  View Details

                </button>

              </div>
            </div>
          ))
        }
      </div>

      {/* MODAL */}

      {
        selectedApplicant && (

          <div className="
            fixed
            inset-0
            bg-black/40
            z-50
            flex
            justify-center
            items-center
            p-4
          ">

            <div className="
              bg-white
              rounded-3xl
              w-full
              max-w-5xl
              max-h-[90vh]
              overflow-y-auto
              shadow-2xl
            ">

              {/* HEADER */}

              <div className="
                flex
                justify-between
                items-center
                border-b
                p-6
              ">

                <h2 className="
                  text-4xl
                  font-bold
                ">
                  Applicant Details
                </h2>

                <button
                  onClick={() =>
                    setSelectedApplicant(null)
                  }
                  className="
                    text-4xl
                    text-slate-500
                  "
                >
                  ×
                </button>

              </div>

              <div className="p-6 space-y-6">

                {/* JOB DETAILS */}

                <div className="
                  border
                  rounded-3xl
                  p-6
                ">

                  <h3 className="
                    text-2xl
                    font-bold
                    text-cyan-700
                    mb-5
                  ">
                    Job Details
                  </h3>

                  <div className="
                    grid
                    md:grid-cols-2
                    gap-4
                  ">

                    <p>
                      <span className="font-semibold">
                        Title:
                      </span>
                      {" "}
                      {
                        selectedApplicant.job?.title
                      }
                    </p>

                    <p>
                      <span className="font-semibold">
                        Payment:
                      </span>
                      {" "}
                      ₹
                      {
                        selectedApplicant.job?.payment
                      }
                    </p>

                    <p>
                      <span className="font-semibold">
                        Location:
                      </span>
                      {" "}
                      {
                        selectedApplicant.job?.location
                      }
                    </p>

                    <p>
                      <span className="font-semibold">
                        Category:
                      </span>
                      {" "}
                      {
                        selectedApplicant.job?.category
                      }
                    </p>

                  </div>
                </div>

                {/* EMPLOYEE DETAILS */}

                <div className="
                  border
                  rounded-3xl
                  p-6
                ">

                  <div className="
                    flex
                    justify-between
                    gap-5
                    flex-wrap
                  ">

                    <div className="
                      flex
                      gap-5
                    ">

                      <img
                        src={
                          selectedApplicant.employeeProfileImage ||

                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }

                        alt=""

                        className="
                          w-28
                          h-28
                          rounded-full
                          object-cover
                          border
                        "
                      />

                      <div>

                        <h3 className="
                          text-3xl
                          font-bold
                        ">
                          {
                            selectedApplicant.employeeName
                          }
                        </h3>

                        <p className="
                          text-slate-500
                        ">
                          {
                            selectedApplicant.employeeEmail
                          }
                        </p>

                        <div className="
                          mt-4
                          space-y-2
                        ">

                          <p>
                            <span className="font-semibold">
                              Gender:
                            </span>
                            {" "}
                            {
                              selectedApplicant.employeeGender
                            }
                          </p>

                          <p>
                            <span className="font-semibold">
                              Skills:
                            </span>
                            {" "}
                            {
                              selectedApplicant.employeeSkills?.join(", ")
                            }
                          </p>

                          <p>
                            <span className="font-semibold">
                              Status:
                            </span>
                            {" "}
                            {
                              selectedApplicant.status
                            }
                          </p>

                        </div>
                      </div>
                    </div>

                    {/* DUMMY PROFILE BUTTON */}

                    <button
                      className="
                        border
                        border-cyan-500
                        text-cyan-600
                        px-6
                        py-3
                        rounded-2xl
                        h-fit
                        hover:bg-cyan-50
                      "
                    >
                      View Employee Profile
                    </button>

                  </div>

                  {/* CONTACT SECTION */}

                  {
                    selectedApplicant.status ===
                    "Accepted"

                    && (

                      <div className="
                        mt-6
                        bg-green-50
                        border
                        border-green-200
                        rounded-2xl
                        p-5
                      ">

                        <h4 className="
                          text-xl
                          font-bold
                          text-green-700
                          mb-3
                        ">
                          Contact Applicant
                        </h4>

                        <p className="mb-2">
                          📧
                          {" "}
                          {
                            selectedApplicant.employeeEmail
                          }
                        </p>

                        <div className="
                          flex
                          gap-3
                          mt-4
                          flex-wrap
                        ">

                          <button
                            className="
                              flex
                              items-center
                              gap-2
                              bg-cyan-600
                              text-white
                              px-5
                              py-3
                              rounded-xl
                            "
                          >
                            <MessageCircle size={18} />
                            In-App Chat
                          </button>

                          <button
                            className="
                              flex
                              items-center
                              gap-2
                              bg-green-600
                              text-white
                              px-5
                              py-3
                              rounded-xl
                            "
                          >
                            <Phone size={18} />
                            Contact
                          </button>

                        </div>

                        <p className="
                          text-sm
                          text-slate-500
                          mt-4
                        ">
                          You can now contact
                          this applicant since
                          the application has
                          been accepted.
                        </p>

                      </div>
                    )
                  }

                  {/* ACTION BUTTONS */}

                  <div className="
                    flex
                    gap-5
                    mt-8
                  ">

                    <button
                      onClick={() =>
                        updateStatus(
                          selectedApplicant._id,
                          "Accepted"
                        )
                      }

                      className="
                        flex-1
                        bg-green-500
                        hover:bg-green-600
                        text-white
                        py-4
                        rounded-2xl
                        text-xl
                        font-semibold
                      "
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          selectedApplicant._id,
                          "Rejected"
                        )
                      }

                      className="
                        flex-1
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        py-4
                        rounded-2xl
                        text-xl
                        font-semibold
                      "
                    >
                      Reject
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Applicants;
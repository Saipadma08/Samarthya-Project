import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  ArrowLeft,
  Eye,
  X,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  useNavigate,
} from "react-router-dom";

import { useParams } from "react-router-dom";

const ApplicantsPage = () => {

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
    selectedApplicant,
    setSelectedApplicant,
  ] = useState(null);

  const [
    search,
    setSearch,
  ] = useState("");

const [searchParams] = useSearchParams();

const { applicationId } = useParams();

  useEffect(() => {

    fetchApplicants();

  }, []);
  useEffect(() => {

  if (applicationId && applications.length > 0) {

   const selected =
  applications.find(
    (item) =>
      item._id === applicationId
  );

    if (selected) {
      setSelectedApplicant(selected);
    }
  }

}, [applicationId, applications]);

  const fetchApplicants =
    async () => {

      try {

        const response =
          await axios.get(

            "http://localhost:3000/api/applications/employer",

            {
              withCredentials: true,
            }
          );

        const validApplications =
          response.data.applications.filter(
            (item) => item.job
          );

        setApplications(
          validApplications
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

  const updateStatus =
    async (
      applicationId,
      status
    ) => {

      // prevent duplicate clicks
      if (
        selectedApplicant?.status ===
        status
      ) {

        toast.error(
          `Application already ${status}`
        );

        return;
      }

      try {

        await axios.patch(

          `http://localhost:3000/api/applications/status/${applicationId}`,

          { status },

          {
            withCredentials: true,
          }
        );

        toast.success(
          `Application ${status}`
        );

        const updatedApplications =
          applications.map(
            (item) => {

              if (
                item._id ===
                applicationId
              ) {

                return {

                  ...item,

                  status,
                };
              }

              return item;
            }
          );

        setApplications(
          updatedApplications
        );

        setSelectedApplicant({

          ...selectedApplicant,

          status,
        });

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to update status"
        );
      }
    };

  const filteredApplications =
    applications.filter(
      (item) => {

        const title =
          item.job?.title
          ?.toLowerCase() || "";

        return title.includes(
          search.toLowerCase()
        );
      }
    );

  if (loading) {

    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium">
        Loading applicants...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      <div className="max-w-6xl mx-auto">

        <button
          onClick={() =>
            navigate(
              "/employer/posted-jobs"
            )
          }
          className="flex items-center gap-2 text-cyan-700 mb-4 text-sm font-medium"
        >
          <ArrowLeft size={18} />

          Back To Jobs
        </button>

        <div className="bg-white rounded-3xl shadow-sm border p-5">

          <h1 className="text-3xl font-bold text-slate-900">
            Applicants
          </h1>

          <p className="text-gray-500 mt-1">
            Total Applications:
            {" "}
            {
              filteredApplications.length
            }
          </p>

          <div className="mt-5 mb-6">

            <input
              type="text"
              placeholder="Search applicants by job title..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-2xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-cyan-500
              "
            />

          </div>

          <div className="space-y-4">

            {
              filteredApplications
              .length === 0 && (

                <div className="
                  text-center
                  py-10
                  text-gray-500
                ">
                  No applicants found
                </div>
              )
            }

            {
              filteredApplications.map(
                (item) => {

                  const gender =
                    item
                    .employeeProfile
                    ?.gender;

                  const isTransgender =
                    gender
                    ?.toLowerCase()
                    .includes(
                      "trans"
                    );

                  const showDiscount =
                    isTransgender &&
                    item.job
                    ?.jobType !==
                      "Contract";

                  return (

                    <div
                      key={
                        item._id
                      }
                      className="
                        bg-gray-50
                        border
                        rounded-2xl
                        p-4
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-5
                      "
                    >

                      <div className="flex gap-4">

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
                            text-xl
                            font-bold
                            text-slate-800
                          ">
                            {
                              item.employeeName
                            }
                          </h2>

                          <p className="
                            text-gray-600
                            text-sm
                          ">
                            {
                              item.employeeEmail
                            }
                          </p>

                          <p className="
                            text-sm
                            mt-2
                          ">
                            <span className="font-semibold">
                              Applied For:
                            </span>
                            {" "}
                            {
                              item.job?.title
                            }
                          </p>

                          <p className="
                            text-sm
                          ">
                            <span className="font-semibold">
                              Skills:
                            </span>
                            {" "}
                            {
                              item
                              .employeeProfile
                              ?.skills?.length
                                ? item
                                  .employeeProfile
                                  .skills
                                  .join(", ")
                                : "No skills added"
                            }
                          </p>

                          <p className="
                            text-sm
                            text-gray-600
                          ">
                            Gender:
                            {" "}
                            {
                              item
                              .employeeProfile
                              ?.gender ||
                              "Not specified"
                            }
                          </p>

                          {
                            showDiscount && (

                              <div className="
                                mt-2
                                bg-cyan-50
                                border
                                border-cyan-200
                                rounded-xl
                                p-2
                                text-xs
                                text-cyan-800
                                max-w-md
                              ">
                                Hiring this transgender employee
                                for this role makes this job eligible
                                for a 5% payment discount support initiative.
                              </div>
                            )
                          }

                        </div>

                      </div>

                      <div className="
                        flex
                        flex-col
                        items-start
                        md:items-end
                        gap-3
                      ">

                        <span
                          className={`px-4 py-1 rounded-full text-xs font-semibold ${
                            item.status ===
                            "Accepted"
                              ? "bg-green-100 text-green-700"
                              : item.status ===
                                "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {
                            item.status
                          }
                        </span>

                        <button
                          onClick={() =>
                            setSelectedApplicant(
                              item
                            )
                          }
                          className="
                            bg-cyan-600
                            hover:bg-cyan-700
                            text-white
                            px-5
                            py-2
                            rounded-xl
                            text-sm
                            font-medium
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <Eye size={16} />

                          View Details
                        </button>

                      </div>

                    </div>
                  );
                }
              )
            }

          </div>

        </div>

      </div>

      {
        selectedApplicant && (

            <div className="
            fixed
            inset-0
            bg-black/40
            flex
            justify-center
            items-start
            overflow-y-auto
            z-50
            p-4
            pt-10
            ">

            <div className="
                bg-white
                w-full
                max-w-5xl
                rounded-3xl
                shadow-xl
                overflow-hidden
                my-6
                ">

              <div className="
                flex
                justify-between
                items-center
                border-b
                px-6
                py-4
              ">

                <h2 className="
                  text-3xl
                  font-bold
                  text-slate-900
                ">
                  Applicant Details
                </h2>

                <button
                  onClick={() =>
                    setSelectedApplicant(
                      null
                    )
                  }
                >
                  <X size={30} />
                </button>

              </div>

              <div className="
                p-6
                space-y-5
              ">

                <div className="
                  border
                  rounded-3xl
                  p-5
                ">

                  <h3 className="
                    text-2xl
                    font-bold
                    text-cyan-700
                    mb-4
                  ">
                    Job Details
                  </h3>

                  <div className="
                    grid
                    md:grid-cols-2
                    gap-4
                    text-sm
                  ">

                    <div>
                      <span className="font-semibold">
                        Title:
                      </span>
                      {" "}
                      {
                        selectedApplicant
                        .job?.title
                      }
                    </div>

                    <div>
                      <span className="font-semibold">
                        Payment:
                      </span>
                      {" "}
                      ₹
                      {
                        selectedApplicant
                        .job?.payment
                      }
                    </div>

                    <div>
                      <span className="font-semibold">
                        Location:
                      </span>
                      {" "}
                      {
                        selectedApplicant
                        .job?.location
                      }
                    </div>

                    <div>
                      <span className="font-semibold">
                        Category:
                      </span>
                      {" "}
                      {
                        selectedApplicant
                        .job?.category
                      }
                    </div>

                  </div>

                </div>

                <div className="
                  border
                  rounded-3xl
                  p-5
                ">

                  <div className="
                    flex
                    flex-col
                    lg:flex-row
                    justify-between
                    gap-6
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
                          text-2xl
                          font-bold
                          text-slate-800
                        ">
                          {
                            selectedApplicant.employeeName
                          }
                        </h3>

                        <p className="text-gray-500">
                          {
                            selectedApplicant.employeeEmail
                          }
                        </p>

                        <div className="
                          mt-4
                          space-y-2
                          text-sm
                        ">

                          <p>
                            <span className="font-semibold">
                              Gender:
                            </span>
                            {" "}
                            {
                              selectedApplicant
                              .employeeProfile
                              ?.gender ||
                              "Not specified"
                            }
                          </p>

                          <p>
                            <span className="font-semibold">
                              Skills:
                            </span>
                            {" "}
                            {
                              selectedApplicant
                              .employeeProfile
                              ?.skills?.length
                                ? selectedApplicant
                                  .employeeProfile
                                  .skills
                                  .join(", ")
                                : "No skills added"
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

                    <button
                      className="
                        border
                        border-cyan-500
                        text-cyan-700
                        hover:bg-cyan-50
                        px-5
                        py-2
                        rounded-xl
                        text-sm
                        font-medium
                        h-fit
                      "
                    >
                      View Employee Profile
                    </button>

                  </div>

                  {
                    selectedApplicant
                    .employeeProfile
                    ?.gender
                    ?.toLowerCase()
                    .includes("trans") &&

                    selectedApplicant
                    .job
                    ?.jobType !==
                    "Contract" && (

                      <div className="
                        mt-5
                        bg-cyan-50
                        border
                        border-cyan-200
                        rounded-xl
                        p-3
                        text-sm
                        text-cyan-800
                      ">
                        Hiring this transgender employee
                        for this role makes this job
                        eligible for a 5% payment
                        discount support initiative.
                      </div>
                    )
                  }

                  {
                    selectedApplicant.status ===
                    "Accepted" && (

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

                        <div className="
                          space-y-2
                          text-sm
                        ">

                          <p>
                            📧
                            {" "}
                            {
                              selectedApplicant.employeeEmail
                            }
                          </p>

                          <p>
                            📞
                            {" "}
                            {
                              selectedApplicant
                              .employeeProfile
                              ?.phone ||
                              "Phone not available"
                            }
                          </p>

                        </div>

                        <div className="
                          flex
                          gap-3
                          mt-5
                          flex-wrap
                        ">

                          <button
                            className="
                              bg-cyan-600
                              hover:bg-cyan-700
                              text-white
                              px-5
                              py-3
                              rounded-xl
                              font-medium
                            "
                          >
                            In-App Chat
                          </button>

                          <button
                            className="
                              bg-green-600
                              hover:bg-green-700
                              text-white
                              px-5
                              py-3
                              rounded-xl
                              font-medium
                            "
                          >
                            Contact
                          </button>

                        </div>

                        <p className="
                          text-sm
                          text-slate-500
                          mt-4
                        ">
                          You can now contact
                          this applicant because
                          the application has
                          been accepted.
                        </p>

                      </div>
                    )
                  }

                  <div className="
                    grid
                    grid-cols-2
                    gap-4
                    mt-6
                  ">

                    <button
                      onClick={() =>
                        updateStatus(
                          selectedApplicant._id,
                          "Accepted"
                        )
                      }
                      className="
                        bg-green-500
                        hover:bg-green-600
                        text-white
                        py-3
                        rounded-2xl
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
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        py-3
                        rounded-2xl
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

export default ApplicantsPage;
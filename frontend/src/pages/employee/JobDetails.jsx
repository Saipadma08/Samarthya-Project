import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  toast
} from "react-toastify";

import {
  useNavigate,
  useParams,
  useLocation
} from "react-router-dom";

import {
  BriefcaseBusiness,
  Bookmark,
  Share2,
  Building2,
  IndianRupee,
  MapPin,
  Users,
  Clock3,
  Briefcase,
  Clock,
  BadgeCheck,
  Calendar
} from "lucide-react";

const OverviewItem = ({
  icon,
  label,
  value
}) => (

  <div className="
    flex
    items-center
    justify-between
    border-b
    border-gray-100
    py-2
  ">

    <div className="
      flex
      items-center
      gap-2
      text-gray-500
    ">

      <div className="
        text-[#119dc7]
        scale-90
      ">
        {icon}
      </div>

      <span className="
        text-[11px]
        sm:text-[12px]
      ">
        {label}
      </span>

    </div>

    <span className="
      text-[12px]
      sm:text-[13px]
      font-semibold
      text-[#07143b]
    ">
      {value}
    </span>

  </div>
);

const JobDetails = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const { jobId } =
    useParams();

  const [job, setJob] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saved, setSaved] =
    useState(false);

  const [
    applicationStatus,
    setApplicationStatus
  ] = useState(null);

  const [
    applicationId,
    setApplicationId
  ] = useState(null);

  useEffect(() => {

    fetchJob();

    fetchApplicationStatus();

  }, [jobId]);

  const fetchJob =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:3000/api/postedjobs/${jobId}`,

            {
              withCredentials: true
            }
          );

        setJob(
          response.data.job
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  const fetchApplicationStatus =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await axios.get(

            `http://localhost:3000/api/applications/status/${jobId}`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        if (
          response.data.application
        ) {

          setApplicationStatus(
            response.data.application.status
          );

          setApplicationId(
            response.data.application._id
          );
        }

      } catch (error) {

        console.log(error);
      }
    };

  const handleApply =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        await axios.post(

          "http://localhost:3000/api/applications/apply",

          {
            jobId: job._id
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        toast.success(
          "Applied successfully"
        );

        fetchApplicationStatus();

      } catch (error) {

        console.log(error);

        toast.error(

          error?.response?.data
            ?.message ||

          "Failed to apply"
        );
      }
    };

  const handleSaveJob =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        await axios.post(

          "http://localhost:3000/api/savedjobs/save",

          {
            jobId: job._id
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setSaved(true);

        toast.success(
          "Job saved successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to save job"
        );
      }
    };

  const handleShare =
    async () => {

      try {

        await navigator.share({

          title: job.title,

          text: job.description,

          url: window.location.href
        });

      } catch (error) {

        console.log(error);
      }
    };

  const handleMarkCompleted =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        await axios.patch(

          "http://localhost:3000/api/applications/complete",

          {
            applicationId
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setApplicationStatus(
          "Completed"
        );

        toast.success(
          "Work marked as completed"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to update status"
        );
      }
    };

  if (loading) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        text-lg
        font-semibold
      ">

        Loading...

      </div>
    );
  }

  if (!job) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        text-red-500
        text-xl
        font-semibold
      ">

        Job not found

      </div>
    );
  }

  return (

    <div className="
      bg-[#f5f7fb]
      min-h-screen
      px-2
      sm:px-4
      py-3
    ">

      {/* BACK */}

      <button

        onClick={() => {

          if (
            location.state?.from ===
            "applications"
          ) {

            navigate(
              "/employee/applications"
            );

          } else {

            navigate(
              "/employee/find-jobs"
            );
          }
        }}

        className="
          flex
          items-center
          gap-2
          text-[#1798c1]
          text-[12px]
          sm:text-[13px]
          font-medium
          mb-3
        "
      >

        ← Back to Jobs

      </button>

      {/* GRID */}

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-3
      ">

        {/* LEFT */}

        <div className="
          lg:col-span-8
          flex
          flex-col
          gap-3
        ">

          {/* MAIN */}

          <div className="
            bg-white
            rounded-[20px]
            border
            border-gray-100
            p-4
            sm:p-5
            shadow-sm
          ">

            <div className="
              flex
              flex-col
              lg:flex-row
              justify-between
              gap-5
            ">

              {/* INFO */}

              <div className="
                flex
                flex-col
                sm:flex-row
                gap-4
              ">

                <div className="
                  w-24
                  h-24
                  rounded-[20px]
                  bg-cyan-100
                  flex
                  items-center
                  justify-center
                ">

                  <BriefcaseBusiness
                    className="
                      w-10
                      h-10
                      text-cyan-700
                    "
                  />

                </div>

                <div>

                  <h1 className="
                    text-[22px]
                    sm:text-[30px]
                    font-bold
                    text-[#07143b]
                  ">

                    {job.title}

                  </h1>

                  <p className="
                    text-gray-600
                    mt-2
                  ">

                    {
                      job.companyName ||

                      "Independent Employer"
                    }

                  </p>

                  <div className="
                    flex
                    flex-wrap
                    gap-2
                    mt-4
                  ">

                    <span className="
                      px-3
                      py-1
                      rounded-full
                      text-[11px]
                      bg-green-100
                      text-green-700
                    ">

                      {job.status}

                    </span>

                    <span className="
                      px-3
                      py-1
                      rounded-full
                      text-[11px]
                      bg-yellow-100
                      text-yellow-700
                    ">

                      {job.jobType}

                    </span>

                    <span className="
                      px-3
                      py-1
                      rounded-full
                      text-[11px]
                      bg-purple-100
                      text-purple-700
                    ">

                      {job.urgency}

                    </span>

                  </div>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="
                flex
                flex-col
                gap-2
                w-full
                lg:w-52
              ">

                {
                  applicationStatus ? (

                    <button
                      disabled
                      className="
                        h-12
                        rounded-2xl
                        bg-green-600
                        text-white
                        font-semibold
                      "
                    >

                      {applicationStatus}

                    </button>

                  ) : (

                    <button

                      onClick={handleApply}

                      className="
                        h-12
                        rounded-2xl
                        bg-[#119dc7]
                        text-white
                        font-semibold
                      "
                    >

                      Apply Now

                    </button>
                  )
                }

                <button

                  onClick={handleSaveJob}

                  className="
                    h-11
                    rounded-xl
                    border
                    border-[#119dc7]
                    text-[#119dc7]
                    font-semibold
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >

                  <Bookmark size={18} />

                  {
                    saved
                      ? "Saved"
                      : "Save"
                  }

                </button>

                <button

                  onClick={handleShare}

                  className="
                    h-11
                    rounded-xl
                    border
                    border-gray-300
                    font-semibold
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >

                  <Share2 size={18} />

                  Share

                </button>

              </div>

            </div>

            {/* ABOUT */}

            <div className="mt-6">

              <h2 className="
                text-[16px]
                font-bold
                mb-2
              ">

                About This Job

              </h2>

              <p className="
                text-gray-600
              ">

                {job.description}

              </p>

            </div>

            {/* SKILLS */}

            <div className="
              border-t
              border-gray-100
              pt-4
              mt-4
            ">

              <h2 className="
                text-[16px]
                font-semibold
                mb-3
              ">

                Required Skills

              </h2>

              <div className="
                flex
                flex-wrap
                gap-2
              ">

                {
                  Array.isArray(job.skills)

                    ? (

                      job.skills.map(
                        (skill, index) => (

                          <span
                            key={index}
                            className="
                            px-3
                            py-1
                            rounded-full
                            bg-cyan-50
                            text-[#119dc7]
                            text-[11px]
                          "
                          >

                            {skill}

                          </span>
                        )
                      )

                    ) : (

                      <span className="
                      px-3
                      py-1
                      rounded-full
                      bg-cyan-50
                      text-[#119dc7]
                      text-[11px]
                    ">

                        {job.skills}

                      </span>
                    )
                }

              </div>

            </div>

          </div>

          {/* EMPLOYER DETAILS */}

          <div className="
  flex flex-col
  items-center
  gap-4
  bg-white
  p-5 
  shadow-md shadow-gray-200
  rounded-md
">

  <p className="text-cyan-600 font-medium text-2xl mb-5">Employer Details</p>

            <div className="
    w-28
    h-36
    rounded-xl
    overflow-hidden
    
    shrink-0
  ">

              <img
                src={
                  job?.employerImage ||
                  "https://ik.imagekit.io/fybgmadbnl26/samarthya/avatar-cover/ChatGPT%20Image%20May%207,%202026,%2001_22_22%20AM.png?updatedAt=177809745761"
                }

                alt="Employer"

                className="
        w-full
        h-full
        object-cover
      "
              />

            </div>

            <div className="flex-1">

              <p className="
      text-gray-500
      text-sm
    ">
                Employer Name
              </p>

              <p className="font-semibold mb-3">
                {job.employerName}
              </p>

              <p className="
      text-gray-500
      text-sm
      mt-2
    ">
                Company Name
              </p>

              <p className="font-semibold mb-1">
                {
                  job.companyName ||
                  "Independent Employer"
                }
              </p>


              <p className="
      text-gray-500
      text-sm
      mt-2
    ">
                Email
              </p>

              <p className="font-semibold mb-5">
                {
                  job.employerEmail
                }
              </p>



            </div>

            <button
              onClick={() =>
                navigate(
                  `/employee/profile-view/${job.employerId}`
                )
              }

              className="
      px-4
      py-2
      border
      border-cyan-500
      text-cyan-700
      hover:bg-cyan-50
      rounded-xl
      font-semibold
      transition
    "
            >
              View Profile
            </button>

          </div>



          {/* CONTACT SECTION */}

          {
            applicationStatus ===
            "Accepted" && (

              <div className="
                bg-green-50
                rounded-[20px]
                border
                border-green-200
                p-5
                shadow-sm
              ">

                <h2 className="
                  text-[18px]
                  font-bold
                  text-green-700
                  mb-3
                ">

                  Employer Contact Unlocked

                </h2>

                <p className="
                  text-gray-600
                  mb-4
                ">

                  Your application
                  was accepted.

                </p>

                <div className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                ">

                  <button
                    className="
                      bg-cyan-600
                      hover:bg-cyan-700
                      text-white
                      px-4
                      py-3
                      rounded-xl
                      font-semibold
                    "
                  >

                    In-App Chat

                  </button>

                  <button
                    className="
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      px-4
                      py-3
                      rounded-xl
                      font-semibold
                    "
                  >

                    Contact Employer

                  </button>

                </div>

                {
                  applicationStatus !==
                  "Completed" && (

                    <button

                      onClick={
                        handleMarkCompleted
                      }

                      className="
                        mt-4
                        w-full
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        py-3
                        rounded-xl
                        font-semibold
                      "
                    >

                      Mark Work Completed

                    </button>
                  )
                }

              </div>
            )
          }

        </div>

        {/* RIGHT */}

        <div className="
          lg:col-span-4
        ">

          <div className="
            bg-white
            rounded-[20px]
            border
            border-gray-100
            p-4
            shadow-sm
          ">

            <h2 className="
              text-[18px]
              font-bold
              mb-3
            ">

              Job Overview

            </h2>

            <OverviewItem
              icon={<IndianRupee size={18} />}
              label="Payment"
              value={`₹${job.payment}`}
            />

            <OverviewItem
              icon={<MapPin size={18} />}
              label="Location"
              value={job.location}
            />

            <OverviewItem
              icon={<Users size={18} />}
              label="Workers Needed"
              value={job.workersNeeded}
            />

            <OverviewItem
              icon={<Clock3 size={18} />}
              label="Category"
              value={job.category}
            />

            <OverviewItem
              icon={<Briefcase size={18} />}
              label="Job Type"
              value={job.jobType}
            />

            <OverviewItem
              icon={<Clock size={18} />}
              label="Urgency"
              value={job.urgency}
            />

            <OverviewItem
              icon={<BadgeCheck size={18} />}
              label="Status"
              value={job.status}
            />

            <OverviewItem
              icon={<Calendar size={18} />}
              label="Posted On"
              value={
                new Date(
                  job.createdAt
                ).toLocaleDateString()
              }
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default JobDetails;
import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  toast
} from "react-toastify";


import {
  useNavigate,
  useParams
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

  <div className="flex items-center justify-between border-b border-gray-100 py-2">

    <div className="flex items-center gap-2 text-gray-500">

      <div className="text-[#119dc7] scale-90">
        {icon}
      </div>

      <span className="text-[11px] sm:text-[12px]">
        {label}
      </span>

    </div>

    <span className="text-[12px] sm:text-[13px] font-semibold text-[#07143b]">
      {value}
    </span>

  </div>
);

const JobDetails = () => {

  const { jobId } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saved, setSaved] = useState(false);

  useEffect(() => {

    fetchJob();

  }, [jobId]);

  const fetchJob = async () => {

    try {

      const response = await axios.get(
        `http://localhost:3000/api/postedjobs/${jobId}`,
        {
          withCredentials: true
        }
      );

      setJob(response.data.job);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const handleApply = async () => {

  try {

    const token =
      localStorage.getItem("token");

    if (!token) {

      toast.error(
        "Please login first"
      );

      return;
    }

    await axios.post(

      "http://localhost:3000/api/applications/apply",

      {
        jobId: job._id
      },

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success(
      "Applied successfully!"
    );

  } catch (error) {

    console.log(error);

    toast.error(

      error?.response?.data
        ?.message ||

      "Failed to apply"
    );
  }
}; 

  const handleSaveJob = async () => {

  try {

    const token =
      localStorage.getItem("token");

    if (!token) {

      toast.error(
        "Please login first"
      );

      return;
    }

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

      error?.response?.data
        ?.message ||

      "Failed to save job"
    );
  }
};

  const handleShare = async () => {

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

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading...
      </div>

    );
  }

  if (!job) {

    return (

      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl font-semibold">
        Job not found
      </div>

    );
  }

  return (

    <div className="bg-[#f5f7fb] min-h-screen px-2 sm:px-4 py-3">

      {/* BACK */}

      <button
        onClick={() => navigate("/employee/find-jobs")}
        className="flex items-center gap-2 text-[#1798c1] text-[12px] sm:text-[13px] font-medium mb-3"
      >
        ← Back to Jobs
      </button>

      {/* GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">

        {/* LEFT */}

        <div className="lg:col-span-8 flex flex-col gap-3">

          {/* MAIN CARD */}

          <div className="bg-white rounded-[20px] border border-gray-100 p-4 sm:p-5 shadow-sm">

            <div className="flex flex-col lg:flex-row justify-between gap-5">

              {/* LEFT INFO */}

              <div className="flex flex-col sm:flex-row gap-4">

                {/* ICON */}

                <div className="w-24 h-24 rounded-[20px] bg-cyan-100 flex items-center justify-center shrink-0">

                  <BriefcaseBusiness className="w-10 h-10 text-cyan-700" />

                </div>

                {/* TEXT */}

                <div>

                  <h1 className="text-[22px] sm:text-[28px] lg:text-[34px] leading-tight font-bold text-[#07143b]">
                    {job.title}
                  </h1>

                  <p className="text-[13px] sm:text-[15px] text-gray-600 mt-2">
                    {job.companyName || "Independent Employer"}
                  </p>

                  <p className="text-[12px] sm:text-[13px] text-gray-500 mt-1">

                    Posted by{" "}

                    <span className="font-semibold text-gray-700">
                      {job.employerName || "Employer"}
                    </span>

                  </p>

                  {/* TAGS */}

                  <div className="flex flex-wrap gap-2 mt-4">

                    <span className="px-3 py-[5px] rounded-full text-[11px] font-medium bg-green-100 text-green-700">
                      {job.status}
                    </span>

                    <span className="px-3 py-[5px] rounded-full text-[11px] font-medium bg-yellow-100 text-yellow-700">
                      {job.jobType}
                    </span>

                    <span className="px-3 py-[5px] rounded-full text-[11px] font-medium bg-purple-100 text-purple-700">
                      {job.urgency}
                    </span>

                  </div>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col gap-2 w-full lg:w-[200px]">

                <button
                    onClick={handleApply}
                    className="h-[46px] lg:h-[52px] rounded-[16px] bg-[#119dc7] text-white text-[15px] lg:text-[18px] font-semibold hover:bg-[#0e8cb2] transition"
                    >
                    Apply Now
                    </button>

               <button
                onClick={handleSaveJob}
                className={`w-full h-[42px] rounded-[14px] border text-[14px] font-semibold transition flex items-center justify-center gap-2 ${
                    saved
                    ? "bg-[#e6f7fd] border-[#119dc7] text-[#119dc7]"
                    : "border-[#119dc7] text-[#119dc7] hover:bg-[#f2fbfe]"
                }`}
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
                  className="h-[46px] lg:h-[52px] rounded-[16px] border border-gray-300 text-[#111827] text-[15px] lg:text-[18px] font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                >

                  <Share2 className="w-5 h-5" />

                  Share

                </button>

              </div>

            </div>

            {/* ABOUT */}

            <div className="mt-6">

              <h2 className="text-[15px] sm:text-[16px] font-bold text-[#07143b] mb-2">
                About This Job
              </h2>

              <p className="text-[13px] sm:text-[14px] text-gray-600 leading-6">
                {job.description}
              </p>

            </div>

            {/* REQUIRED SKILLS */}

            <div className="border-t border-gray-100 pt-4 mt-4">

              <h2 className="text-[15px] sm:text-[16px] font-semibold text-[#07143b] mb-3">
                Required Skills
              </h2>

              <div className="flex flex-wrap gap-2">

                {Array.isArray(job.skills) &&
                job.skills.length > 0 ? (

                  job.skills.map((skill, index) => (

                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-cyan-50 text-[#119dc7] text-[11px] font-medium"
                    >
                      {skill}
                    </span>

                  ))

                ) : typeof job.skills === "string" ? (

                  <span className="px-3 py-1 rounded-full bg-cyan-50 text-[#119dc7] text-[11px] font-medium">
                    {job.skills}
                  </span>

                ) : (

                  <span className="text-[12px] text-gray-400">
                    No skills specified
                  </span>

                )}

              </div>

            </div>

          </div>

          {/* EMPLOYER DETAILS */}

          <div className="bg-white rounded-[20px] border border-gray-100 p-4 sm:p-5 shadow-sm">

            <div className="flex items-start gap-4">

              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center shrink-0">

                <Building2 className="w-7 h-7 text-purple-700" />

              </div>

              <div className="w-full">

                <h2 className="text-[16px] sm:text-[18px] font-bold text-[#07143b] mb-4">
                  Employer Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <p className="text-[11px] sm:text-[12px] text-gray-500 mb-1">
                      Employer Name
                    </p>

                    <p className="text-[14px] sm:text-[15px] font-semibold text-[#07143b]">
                      {job.employerName || "Employer"}
                    </p>

                  </div>

                  <div>

                    <p className="text-[11px] sm:text-[12px] text-gray-500 mb-1">
                      Company Name
                    </p>

                    <p className="text-[14px] sm:text-[15px] font-semibold text-[#07143b]">
                      {job.companyName || "Independent Employer"}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="lg:col-span-4 flex flex-col gap-3">

          {/* OVERVIEW */}

          <div className="bg-white rounded-[20px] border border-gray-100 p-4 shadow-sm">

            <h2 className="text-[16px] lg:text-[18px] font-bold text-[#07143b] mb-3">
              Job Overview
            </h2>

            <div className="space-y-2">

              <OverviewItem
                icon={<IndianRupee size={18} />}
                label="Payment"
                value={`₹${job.salary || job.payment || 3000}`}
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
                value={new Date(job.createdAt).toLocaleDateString()}
              />

            </div>

          </div>

          {/* ABOUT EMPLOYER */}

          <div className="bg-white rounded-[20px] border border-gray-100 p-4 shadow-sm">

            <h2 className="text-[16px] sm:text-[17px] font-bold text-[#07143b] mb-2">
              About the Employer
            </h2>

            <p className="text-[12px] text-gray-500 leading-5">

              This job is posted by an individual /
              organization looking to hire skilled
              professionals.

            </p>

            <button
  onClick={() =>
    toast.info(
      "Employer profile feature coming soon"
    )
  }
  className="mt-4 h-[42px] w-full rounded-[12px] border border-[#119dc7] text-[#119dc7] text-[13px] sm:text-[14px] font-semibold hover:bg-cyan-50 transition"
>
  View Employer Profile
</button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default JobDetails;
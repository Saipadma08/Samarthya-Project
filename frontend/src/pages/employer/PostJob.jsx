import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

import { locations } from "../../utils/locationOptions";

const PostJob = () => {

  const [loading, setLoading] =
    useState(false);

  const categoryJobs = {

    Low: [
      "Cleaning",
      "Cooking",
      "Dish Washing",
      "Sweeping",
      "Gardening",
      "Laundry",
      "Car Washing",
      "Office Cleaning",
      "Delivery Helper",
      "Pet Care"
    ],

    Medium: [
      "Electrician",
      "Plumber",
      "Driver",
      "Receptionist",
      "Security Guard",
      "Data Entry",
      "Store Assistant",
      "Tailoring",
      "Beautician",
      "Machine Operator"
    ],

    High: [
      "Software Developer",
      "Web Designer",
      "Accountant",
      "Digital Marketing",
      "Graphic Designer",
      "Project Manager",
      "HR Manager",
      "Nurse",
      "Teacher",
      "Business Consultant"
    ]
  };

  const paymentRanges = {

    "One-time": {

      Low: {
        Cleaning: "₹300 - ₹700",
        Cooking: "₹500 - ₹1200",
        "Dish Washing": "₹300 - ₹600",
        Sweeping: "₹250 - ₹500",
        Gardening: "₹400 - ₹1000",
        Laundry: "₹300 - ₹700",
        "Car Washing": "₹300 - ₹800",
        "Office Cleaning": "₹500 - ₹1500",
        "Delivery Helper": "₹400 - ₹1000",
        "Pet Care": "₹500 - ₹1500",
      },

      Medium: {
        Electrician: "₹800 - ₹2500",
        Plumber: "₹700 - ₹2200",
        Driver: "₹600 - ₹2000",
        Receptionist: "₹5000 - ₹10000",
        "Security Guard": "₹700 - ₹2000",
        "Data Entry": "₹500 - ₹1500",
        "Store Assistant": "₹500 - ₹1400",
        Tailoring: "₹700 - ₹2500",
        Beautician: "₹1000 - ₹4000",
        "Machine Operator": "₹1200 - ₹3500",
      },

      High: {
        "Software Developer": "₹5000 - ₹20000",
        "Web Designer": "₹3000 - ₹15000",
        Accountant: "₹2000 - ₹10000",
        "Digital Marketing": "₹2500 - ₹12000",
        "Graphic Designer": "₹2000 - ₹10000",
        "Project Manager": "₹7000 - ₹30000",
        "HR Manager": "₹4000 - ₹15000",
        Nurse: "₹2000 - ₹8000",
        Teacher: "₹1000 - ₹5000",
        "Business Consultant": "₹5000 - ₹25000",
      },
    },

    Daily: {

      Low: {
        Cleaning: "₹500 - ₹1200/day",
        Cooking: "₹800 - ₹2000/day",
      },

      Medium: {
        Electrician: "₹1500 - ₹4000/day",
        Plumber: "₹1200 - ₹3500/day",
      },

      High: {
        "Software Developer": "₹8000 - ₹30000/day",
        "Web Designer": "₹5000 - ₹20000/day",
      },
    },

    Contract: {

      Low: {
        Cleaning: "₹5000 - ₹15000/month",
        Cooking: "₹8000 - ₹25000/month",
      },

      Medium: {
        Electrician: "₹20000 - ₹60000/month",
        Plumber: "₹18000 - ₹55000/month",
      },

      High: {
        "Software Developer": "₹50000 - ₹300000/month",
        "Web Designer": "₹40000 - ₹200000/month",
      },
    },
  };

  const defaultPayments = {

    Cleaning: "300",
    Cooking: "500",
    "Dish Washing": "300",
    Sweeping: "250",
    Gardening: "400",
    Laundry: "300",
    "Car Washing": "300",
    "Office Cleaning": "500",
    "Delivery Helper": "400",
    "Pet Care": "500",

    Electrician: "800",
    Plumber: "700",
    Driver: "600",
    Receptionist: "8000",
    "Security Guard": "700",
    "Data Entry": "500",
    "Store Assistant": "500",
    Tailoring: "700",
    Beautician: "1000",
    "Machine Operator": "1200",

    "Software Developer": "5000",
    "Web Designer": "3000",
    Accountant: "2000",
    "Digital Marketing": "2500",
    "Graphic Designer": "2000",
    "Project Manager": "7000",
    "HR Manager": "4000",
    Nurse: "2000",
    Teacher: "1000",
    "Business Consultant": "5000",
  };

  const [job, setJob] = useState({

    category: "Low",

    title: "Cleaning",

    description: "",

    payment: "300",

    state: "",

    city: "",

    location: "",

    urgency: "Normal",

    jobType: "One-time",

    workersNeeded: 1,

    skills: "",
  });

  const handleCategoryChange = (e) => {

    const selectedCategory =
      e.target.value;

    const firstJob =
      categoryJobs[selectedCategory][0];

    setJob({

      ...job,

      category: selectedCategory,

      title: firstJob,

      payment:
        defaultPayments[firstJob],
    });
  };

  const handleTitleChange = (e) => {

    const selectedTitle =
      e.target.value;

    setJob({

      ...job,

      title: selectedTitle,

      payment:
        defaultPayments[selectedTitle],
    });
  };

  const handlePostJob = async () => {

    try {

      setLoading(true);

      if (
        !job.title ||
        !job.description ||
        !job.payment ||
        !job.location
      ) {

        toast.error(
          "Please fill all required fields"
        );

        return;
      }

      if (Number(job.payment) < 300) {

        toast.error(
          "Payment must be at least ₹300"
        );

        return;
      }

      if (
        Number(job.workersNeeded) < 1
      ) {

        toast.error(
          "Workers needed must be at least 1"
        );

        return;
      }

      const response =
        await axios.post(

          "http://localhost:3000/api/postedjobs/create",

          {
            category: job.category,
            title: job.title,
            description: job.description,
            payment: Number(job.payment),
            location: job.location,
            urgency: job.urgency,
            jobType: job.jobType,
            workersNeeded:
              Number(job.workersNeeded),
            skills: job.skills,
          },

          {
            withCredentials: true,
          }
        );

      toast.success(
        "Job posted successfully"
      );

      console.log(response.data);

      setJob({

        category: "Low",

        title: "Cleaning",

        description: "",

        payment: "300",

        state: "",

        city: "",

        location: "",

        urgency: "Normal",

        jobType: "One-time",

        workersNeeded: 1,

        skills: "",
      });

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to post job"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="max-w-3xl mx-auto px-3">

      <p className="text-[24px] font-semibold mb-5 text-center">

        Post a New Job

      </p>

      <div className="bg-white p-4 rounded-2xl shadow space-y-4">

        <div>

          <label className="text-sm font-medium">

            Job Category

          </label>

          <select
            className="w-full mt-1 h-11.5 px-3 border rounded-lg"
            value={job.category}
            onChange={handleCategoryChange}
          >

            <option>Low</option>
            <option>Medium</option>
            <option>High</option>

          </select>

        </div>

        <div>

          <label className="text-sm font-medium">

            Job Title

          </label>

          <select
            className="w-full mt-1 h-11.5 px-3 border rounded-lg"
            value={job.title}
            onChange={handleTitleChange}
          >

            {
              categoryJobs[job.category].map(
                (title, index) => (

                  <option
                    key={index}
                    value={title}
                  >
                    {title}
                  </option>
                )
              )
            }

          </select>

        </div>

        <div className="text-sm p-3 rounded-lg bg-cyan-50 border border-cyan-100">

          <p className="text-gray-600 text-[13px]">

            📋 Multiple applicants can apply.
            You can select workers manually.

          </p>

        </div>

        <div>

          <label className="text-sm font-medium">

            Job Description

          </label>

          <textarea
            rows={3}
            maxLength={500}
            className="w-full mt-1 p-3 border rounded-lg resize-none"
            placeholder="Describe the work..."
            value={job.description}
            onChange={(e) =>
              setJob({
                ...job,
                description: e.target.value
              })
            }
          />

          <p className="text-xs text-gray-500 mt-1">

            {job.description.length}/500

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>

            <label className="text-sm font-medium">

              Payment (₹)

            </label>

            <p className="text-xs text-cyan-600 mt-1 mb-1">

              Suggested Range:
              {" "}
              {
                paymentRanges[
                  job.jobType
                ]?.[
                  job.category
                ]?.[
                  job.title
                ]
              }

            </p>

            <input
              className="w-full mt-1 h-11.5 px-3 border rounded-lg"
              placeholder="Enter payment"
              value={job.payment}
              onChange={(e) =>
                setJob({
                  ...job,
                  payment: e.target.value
                })
              }
            />

            {
              Number(job.payment) < 300 && (

                <p className="text-red-500 text-xs mt-1">

                  Minimum payment should be ₹300

                </p>
              )
            }

          </div>

          <div className="grid grid-cols-1 gap-4">

            <div>

              <label className="text-sm font-medium">

                State

              </label>

              <select
                className="w-full mt-1 h-11.5 px-3 border rounded-lg outline-none focus:border-cyan-500"
                value={job.state}
                onChange={(e) =>

                  setJob({

                    ...job,

                    state: e.target.value,

                    city: "",

                    location: "",
                  })
                }
              >

                <option value="">

                  Select State

                </option>

                {
                  Object.keys(locations).map(
                    (state) => (

                      <option
                        key={state}
                        value={state}
                      >

                        {state}

                      </option>
                    )
                  )
                }

              </select>

            </div>

            <div>

              <label className="text-sm font-medium">

                City

              </label>

              <select
                className="w-full mt-1 h-11.5 px-3 border rounded-lg outline-none focus:border-cyan-500 disabled:bg-gray-100"
                value={job.city}
                disabled={!job.state}
                onChange={(e) =>

                  setJob({

                    ...job,

                    city: e.target.value,

                    location:
                      `${e.target.value}, ${job.state}`,
                  })
                }
              >

                <option value="">

                  Select City

                </option>

                {
                  job.state &&
                  locations[job.state].map(
                    (city) => (

                      <option
                        key={city}
                        value={city}
                      >

                        {city}

                      </option>
                    )
                  )
                }

              </select>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>

            <label className="text-sm font-medium">

              Job Type

            </label>

            <select
              className="w-full mt-1 h-11.5 px-3 border rounded-lg"
              value={job.jobType}
              onChange={(e) =>
                setJob({
                  ...job,
                  jobType: e.target.value
                })
              }
            >

              <option>One-time</option>
              <option>Daily</option>
              <option>Contract</option>

            </select>

          </div>

          <div>

            <label className="text-sm font-medium">

              Workers Needed

            </label>

            <input
              type="number"
              min="1"
              className="w-full mt-1 h-11.5 px-3 border rounded-lg"
              placeholder="e.g. 2"
              value={job.workersNeeded}
              onChange={(e) =>
                setJob({
                  ...job,
                  workersNeeded: e.target.value
                })
              }
            />

          </div>

        </div>

        <div>

          <label className="text-sm font-medium">

            Required Skills (optional)

          </label>

          <input
            className="w-full mt-1 h-11.5 px-3 border rounded-lg"
            placeholder="e.g. cleaning, cooking"
            value={job.skills}
            onChange={(e) =>
              setJob({
                ...job,
                skills: e.target.value
              })
            }
          />

        </div>

        <div>

          <label className="text-sm font-medium">

            Urgency Level

          </label>

          <select
            className="w-full mt-1 h-11.5 px-3 border rounded-lg"
            value={job.urgency}
            onChange={(e) =>
              setJob({
                ...job,
                urgency: e.target.value
              })
            }
          >

            <option>Normal</option>
            <option>Urgent</option>
            <option>Immediate</option>

          </select>

        </div>

        <button
          onClick={handlePostJob}
          disabled={loading}
          className="w-full bg-cyan-600 text-white h-11.5 rounded-lg text-sm font-semibold hover:opacity-90 transition disabled:opacity-60"
        >

          {
            loading
            ? "Posting..."
            : "Post Job"
          }

        </button>

      </div>

    </div>
  );
};

export default PostJob;
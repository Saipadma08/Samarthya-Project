import React, { useState } from "react";
import axios from "axios";

const PostJob = () => {

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
        "Dish Washing": "₹400 - ₹900/day",
        Sweeping: "₹400 - ₹800/day",
        Gardening: "₹700 - ₹1800/day",
        Laundry: "₹500 - ₹1000/day",
        "Car Washing": "₹500 - ₹1200/day",
        "Office Cleaning": "₹1000 - ₹2500/day",
        "Delivery Helper": "₹700 - ₹1800/day",
        "Pet Care": "₹800 - ₹2000/day",
      },

      Medium: {
        Electrician: "₹1500 - ₹4000/day",
        Plumber: "₹1200 - ₹3500/day",
        Driver: "₹1000 - ₹3000/day",
        Receptionist: "₹8000 - ₹15000/day",
        "Security Guard": "₹1000 - ₹2800/day",
        "Data Entry": "₹800 - ₹2000/day",
        "Store Assistant": "₹800 - ₹1800/day",
        Tailoring: "₹1200 - ₹3500/day",
        Beautician: "₹2000 - ₹6000/day",
        "Machine Operator": "₹2500 - ₹7000/day",
      },

      High: {
        "Software Developer": "₹8000 - ₹30000/day",
        "Web Designer": "₹5000 - ₹20000/day",
        Accountant: "₹4000 - ₹15000/day",
        "Digital Marketing": "₹5000 - ₹18000/day",
        "Graphic Designer": "₹4000 - ₹15000/day",
        "Project Manager": "₹10000 - ₹40000/day",
        "HR Manager": "₹6000 - ₹20000/day",
        Nurse: "₹3000 - ₹12000/day",
        Teacher: "₹2000 - ₹8000/day",
        "Business Consultant": "₹10000 - ₹50000/day",
      },
    },

    Contract: {
      Low: {
        Cleaning: "₹5000 - ₹15000/month",
        Cooking: "₹8000 - ₹25000/month",
        "Dish Washing": "₹4000 - ₹12000/month",
        Sweeping: "₹4000 - ₹10000/month",
        Gardening: "₹7000 - ₹20000/month",
        Laundry: "₹5000 - ₹14000/month",
        "Car Washing": "₹5000 - ₹15000/month",
        "Office Cleaning": "₹10000 - ₹30000/month",
        "Delivery Helper": "₹8000 - ₹22000/month",
        "Pet Care": "₹8000 - ₹25000/month",
      },

      Medium: {
        Electrician: "₹20000 - ₹60000/month",
        Plumber: "₹18000 - ₹55000/month",
        Driver: "₹15000 - ₹45000/month",
        Receptionist: "₹50000 - ₹100000/month",
        "Security Guard": "₹15000 - ₹35000/month",
        "Data Entry": "₹12000 - ₹30000/month",
        "Store Assistant": "₹12000 - ₹28000/month",
        Tailoring: "₹18000 - ₹50000/month",
        Beautician: "₹25000 - ₹80000/month",
        "Machine Operator": "₹30000 - ₹90000/month",
      },

      High: {
        "Software Developer": "₹50000 - ₹300000/month",
        "Web Designer": "₹40000 - ₹200000/month",
        Accountant: "₹30000 - ₹150000/month",
        "Digital Marketing": "₹35000 - ₹180000/month",
        "Graphic Designer": "₹30000 - ₹150000/month",
        "Project Manager": "₹80000 - ₹400000/month",
        "HR Manager": "₹50000 - ₹200000/month",
        Nurse: "₹25000 - ₹100000/month",
        Teacher: "₹20000 - ₹80000/month",
        "Business Consultant": "₹100000 - ₹500000/month",
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
    location: "",
    urgency: "Normal",
    jobType: "One-time",
    workersNeeded: 1,
    skills: "",
  });

  const handleCategoryChange = (e) => {

    const selectedCategory = e.target.value;

    const firstJob =
      categoryJobs[selectedCategory][0];

    setJob({
      ...job,
      category: selectedCategory,
      title: firstJob,
      payment: defaultPayments[firstJob],
    });
  };

  const handleTitleChange = (e) => {

    const selectedTitle = e.target.value;

    setJob({
      ...job,
      title: selectedTitle,
      payment: defaultPayments[selectedTitle],
    });
  };

  const handlePostJob = async () => {

    try {

      if (
        !job.title ||
        !job.description ||
        !job.payment ||
        !job.location
      ) {
        alert("Please fill all required fields ❌");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/postedjobs/create",

        {
          category: job.category,
          title: job.title,
          description: job.description,
          payment: Number(job.payment),
          location: job.location,
          urgency: job.urgency,
          jobType: job.jobType,
          workersNeeded: Number(job.workersNeeded),
          skills: job.skills,
        },

        {
          withCredentials: true,
        }
      );

      alert("Job Posted Successfully ✅");

      console.log(response.data);

      setJob({
        category: "Low",
        title: "Cleaning",
        description: "",
        payment: "300",
        location: "",
        urgency: "Normal",
        jobType: "One-time",
        workersNeeded: 1,
        skills: "",
      });

    } catch (error) {

      console.log(error);

      alert("Failed to post job ❌");
    }
  };

  return (

    <div className="max-w-3xl mx-auto">

      <p className="text-2xl font-semibold mb-6 text-center">
        Post a New Job
      </p>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">

        <div>
          <label className="text-sm font-medium">
            Job Category
          </label>

          <select
            className="w-full mt-1 p-3 border rounded-lg"
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
            className="w-full mt-1 p-3 border rounded-lg"
            value={job.title}
            onChange={handleTitleChange}
          >
            {categoryJobs[job.category].map(
              (title, index) => (
                <option
                  key={index}
                  value={title}
                >
                  {title}
                </option>
              )
            )}
          </select>
        </div>

        <div className="text-sm p-4 rounded-lg bg-cyan-50 border border-cyan-100">

          {job.category === "Low" ? (
            <p className="text-cyan-700">
              ⚡ Instant Job: First employee who
              accepts gets assigned automatically.
            </p>
          ) : (
            <p className="text-yellow-700">
              📋 Multiple applicants can apply.
              You can select workers manually.
            </p>
          )}

        </div>

        <div>
          <label className="text-sm font-medium">
            Job Description
          </label>

          <textarea
            rows={4}
            className="w-full mt-1 p-3 border rounded-lg"
            placeholder="Describe the work..."
            value={job.description}
            onChange={(e) =>
              setJob({
                ...job,
                description: e.target.value
              })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">
              Payment (₹)
            </label>

            <p className="text-xs text-cyan-600 mt-1 mb-1">
              Suggested Range:
              {" "}
              {
                paymentRanges[job.jobType]?.[job.category]?.[job.title]
              }
            </p>

            <input
              className="w-full mt-1 p-3 border rounded-lg"
              placeholder="Enter payment"
              value={job.payment}
              onChange={(e) =>
                setJob({
                  ...job,
                  payment: e.target.value
                })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Location
            </label>

            <input
              className="w-full mt-1 p-3 border rounded-lg"
              placeholder="e.g. Bhubaneswar"
              value={job.location}
              onChange={(e) =>
                setJob({
                  ...job,
                  location: e.target.value
                })
              }
            />
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">
              Job Type
            </label>

            <select
              className="w-full mt-1 p-3 border rounded-lg"
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
              className="w-full mt-1 p-3 border rounded-lg"
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
            className="w-full mt-1 p-3 border rounded-lg"
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
            className="w-full mt-1 p-3 border rounded-lg"
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
          className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Post Job
        </button>

      </div>

    </div>
  );
};

export default PostJob;
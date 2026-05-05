import React, { useState } from "react";

const PostJob = () => {

  const [job, setJob] = useState({
    title: "",
    category: "Low",
    description: "",
    payment: "",
    location: "",
    urgency: "Normal",
    jobType: "One-time",
    workersNeeded: "",
    skills: "",
  });

  const handlePostJob = () => {
    if (
      !job.title ||
      !job.description ||
      !job.payment ||
      !job.location
    ) {
      alert("Please fill all required fields ❌");
      return;
    }

    alert("Job Posted Successfully ✅");
    console.log(job);
  };

  return (

    <div className="max-w-3xl mx-auto">

      {/* PAGE TITLE */}
      <p className="text-2xl font-semibold mb-6">
        Post a New Job
      </p>


      <div className="bg-white p-6 rounded-xl shadow space-y-6">

        {/* Job Title */}
        <div>
          <label className="text-sm font-medium">
            Job Title
          </label>
          <input
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="e.g. Cleaning Work"
            value={job.title}
            onChange={(e) =>
              setJob({ ...job, title: e.target.value })
            }
          />
        </div>


        {/* Category */}
        <div>
          <label className="text-sm font-medium">
            Job Category
          </label>
          <select
            className="w-full mt-1 p-3 border rounded-lg"
            value={job.category}
            onChange={(e) =>
              setJob({ ...job, category: e.target.value })
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>


        {/* Category Info */}
        <div className="text-sm p-4 rounded-lg bg-cyan-50 border border-cyan-100">

          {job.category === "Low" ? (
            <p className="text-cyan-700">
              ⚡ Instant Job: First employee who accepts gets assigned automatically.
            </p>
          ) : (
            <p className="text-yellow-700">
              📋 Multiple applicants can apply. You can select workers manually.
            </p>
          )}

        </div>


        {/* Description */}
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
              setJob({ ...job, description: e.target.value })
            }
          />
        </div>


        {/* Payment + Location */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">
              Payment (₹)
            </label>
            <input
              className="w-full mt-1 p-3 border rounded-lg"
              placeholder="e.g. 500"
              value={job.payment}
              onChange={(e) =>
                setJob({ ...job, payment: e.target.value })
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
                setJob({ ...job, location: e.target.value })
              }
            />
          </div>

        </div>


        {/* Job Type + Workers */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">
              Job Type
            </label>
            <select
              className="w-full mt-1 p-3 border rounded-lg"
              value={job.jobType}
              onChange={(e) =>
                setJob({ ...job, jobType: e.target.value })
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
                setJob({ ...job, workersNeeded: e.target.value })
              }
            />
          </div>

        </div>


        {/* Skills */}
        <div>
          <label className="text-sm font-medium">
            Required Skills (optional)
          </label>
          <input
            className="w-full mt-1 p-3 border rounded-lg"
            placeholder="e.g. cleaning, cooking"
            value={job.skills}
            onChange={(e) =>
              setJob({ ...job, skills: e.target.value })
            }
          />
        </div>


        {/* Urgency */}
        <div>
          <label className="text-sm font-medium">
            Urgency Level
          </label>
          <select
            className="w-full mt-1 p-3 border rounded-lg"
            value={job.urgency}
            onChange={(e) =>
              setJob({ ...job, urgency: e.target.value })
            }
          >
            <option>Normal</option>
            <option>Urgent</option>
            <option>Immediate</option>
          </select>
        </div>


        {/* Submit */}
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
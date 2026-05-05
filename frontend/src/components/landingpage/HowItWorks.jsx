import React from "react"

import {
  FiUserPlus,
  FiSearch,
  FiMessageSquare,
  FiCheckCircle,
  FiStar,
} from "react-icons/fi"


const HowItWorks = () => {

  const steps = [
    {
      title: "Create Account",
      desc: "Sign up as employee or employer and create your profile.",
      icon: <FiUserPlus />,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Find / Post Job",
      desc: "Employers post jobs and employees search for opportunities.",
      icon: <FiSearch />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Connect & Chat",
      desc: "Use secure messaging to discuss job details safely.",
      icon: <FiMessageSquare />,
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Complete Work",
      desc: "Finish the job and give feedback to build trust.",
      icon: <FiCheckCircle />,
      color: "from-orange-500 to-red-400",
    },
    {
      title: "Gain Trust Score",
      desc: "Earn trust score based on your work and reviews.",
      icon: <FiStar />,
      color: "from-pink-500 to-purple-500",
    },
  ]


  return (
    <div className="w-full py-16 px-6">

      {/* Title */}
      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold text-gray-800">
          How It Works
        </h2>

        <p className="text-gray-600 mt-2">
          Simple steps to connect workers and employers safely
        </p>

      </div>


      {/* Steps */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-6">

        {steps.map((step, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition text-center"
          >

            {/* Icon */}
            <div
              className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-white text-xl bg-linear-to-r ${step.color}`}
            >
              {step.icon}
            </div>


            {/* Step number */}
            <p className="text-sm text-gray-400 mt-2">
              Step {index + 1}
            </p>


            {/* Title */}
            <h3 className="font-semibold mt-1">
              {step.title}
            </h3>


            {/* Description */}
            <p className="text-sm text-gray-600 mt-2">
              {step.desc}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}

export default HowItWorks
import React from "react"
import { motion } from "framer-motion"

import {
  FiShield,
  FiMessageSquare,
  FiUserCheck,
  FiBriefcase,
  FiStar,
  FiAlertCircle,
} from "react-icons/fi"

const Features = () => {

  const features = [
    {
      title: "Verified Users",
      desc: "All employees and employers are verified to ensure safety and trust.",
      icon: <FiUserCheck />,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Secure Messaging",
      desc: "Employees and employers can chat safely inside the platform.",
      icon: <FiMessageSquare />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Easy Job Posting",
      desc: "Employers can post jobs and workers can apply easily.",
      icon: <FiBriefcase />,
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Trust Score",
      desc: "Users earn trust score based on completed work and feedback.",
      icon: <FiStar />,
      color: "from-pink-500 to-red-400",
    },
    {
      title: "Complaint System",
      desc: "Report problems and ensure fair and safe working environment.",
      icon: <FiAlertCircle />,
      color: "from-orange-500 to-yellow-400",
    },
    {
      title: "Secure Platform",
      desc: "Designed for safe, inclusive, and respectful employment.",
      icon: <FiShield />,
      color: "from-indigo-500 to-purple-500",
    },
  ]


  return (
    <div className="w-full bg-white py-16 px-6">

      {/* Title */}
      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold text-gray-800">
          Features
        </h2>

        <p className="text-gray-600 mt-2">
          Everything you need for safe and inclusive employment
        </p>

      </div>


      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">

        {features.map((item, index) => (

          <div
            key={index}
            className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition"
          >

            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-linear-to-r ${item.color}`}
            >
              {item.icon}
            </div>


            {/* Title */}
            <h3 className="text-lg font-semibold mt-4">
              {item.title}
            </h3>


            {/* Description */}
            <p className="text-gray-600 text-sm mt-2">
              {item.desc}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Features
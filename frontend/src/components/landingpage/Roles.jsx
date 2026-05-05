import React from "react"
import { Link } from "react-router-dom"

import {
  FiUser,
  FiBriefcase,
  FiShield,
} from "react-icons/fi"


const Roles = () => {

  const roles = [
    {
      title: "Employee",
      desc: "Find jobs, connect with employers, complete work, and build trust score.",
      icon: <FiUser />,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Employer",
      desc: "Post jobs, hire workers, chat securely, and manage applications easily.",
      icon: <FiBriefcase />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Admin",
      desc: "Monitor users, verify accounts, handle complaints, and maintain platform safety.",
      icon: <FiShield />,
      color: "from-pink-500 to-red-400",
    },
  ]


  return (
    <div className="w-full bg-white py-16 px-6">

      {/* Title */}
      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold text-gray-800">
          User Roles
        </h2>

        <p className="text-gray-600 mt-2">
          Different roles with different responsibilities
        </p>

      </div>


      {/* Cards */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">

        {roles.map((role, index) => (

          <div
            key={index}
            className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition text-center"
          >

            {/* Icon */}
            <div
              className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center text-white text-2xl bg-linear-to-r ${role.color}`}
            >
              {role.icon}
            </div>


            {/* Title */}
            <h3 className="text-xl font-semibold mt-4">
              {role.title}
            </h3>


            {/* Description */}
            <p className="text-gray-600 mt-2 text-sm">
              {role.desc}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Roles
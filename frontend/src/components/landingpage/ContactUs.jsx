import React from "react"

const ContactUs = () => {
  return (
    <div className="w-full py-16 px-6">

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">
          Contact Us
        </h2>

        <p className="text-gray-600 mt-2">
          Have questions? We are here to help you.
        </p>
      </div>


      {/* Container */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-7">

        {/* LEFT → FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <form className="flex flex-col gap-4">

            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-500"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-500"
            />

            {/* Role */}
            <select
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option>User Type</option>
              <option>Employee</option>
              <option>Employer</option>
              <option>Visitor</option>
            </select>

            {/* Issue Type */}
            <select
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option>Issue Type</option>
              <option>Job related</option>
              <option>Account problem</option>
              <option>Report user</option>
              <option>Technical issue</option>
              <option>Other</option>
            </select>

            {/* Message */}
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-500"
            />

            {/* Button */}
            <button
              type="submit"
              className="bg-cyan-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
            >
              Send Message
            </button>

          </form>

        </div>


        {/* RIGHT → INFO */}
        <div className="flex flex-col justify-center gap-6">

          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Get in touch
            </h3>

            <p className="text-gray-600 mt-2">
              Contact SAMARTHYA support team for help with jobs,
              accounts, or any issue related to the platform.
            </p>
          </div>


          <div className="bg-white shadow rounded-xl p-5">

            <p className="font-medium">📧 Email</p>
            <p className="text-gray-600">
              support@samarthya.com
            </p>

          </div>


          <div className="bg-white shadow rounded-xl p-5">

            <p className="font-medium">📞 Phone</p>
            <p className="text-gray-600">
              +91 9876543210
            </p>

          </div>


          <div className="bg-white shadow rounded-xl p-5">

            <p className="font-medium">📍 Location</p>
            <p className="text-gray-600">
              Bhubaneswar, India
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ContactUs
import React from 'react'

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-4">
          Contact Us
        </h1>

        <p className="text-gray-600 mb-6">
          Have questions or complaints? Send us a message.
        </p>


        <form className="space-y-4">

          <input
            type="text"
            placeholder="Your name"
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            placeholder="Your email"
            className="w-full border p-3 rounded"
          />

          <select className="w-full border p-3 rounded">
            <option>Employee</option>
            <option>Employer</option>
            <option>Other</option>
          </select>

          <textarea
            placeholder="Message"
            rows="5"
            className="w-full border p-3 rounded"
          />

          <button
            className="bg-cyan-600 text-white px-6 py-2 rounded"
          >
            Send Message
          </button>

        </form>

      </div>

    </div>
  )
}

export default ContactUs

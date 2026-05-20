import React, { useState } from "react";

import axios from "axios";

const ContactUs = () => {

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    userType: "",
    issueType: "",
    message: "",

  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(

        "http://localhost:3000/api/contact/send",

        formData

      );

      alert(response.data.message);

      setFormData({

        name: "",
        email: "",
        userType: "",
        issueType: "",
        message: "",

      });

    } catch (error) {

      console.log(error);

      alert("Failed to send message");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="py-20 px-6 bg-white w-[90%]">

      {/* TITLE */}

      <div className="text-center mb-12">

        <h2
          className="text-4xl font-bold text-gray-800"
        >
          Contact Us
        </h2>

        <p className="text-slate-500 mt-4 max-w-2xl mx-auto">

          Need help with jobs, hiring, account issues
          or platform support? Reach out to Samarthya.

        </p>

      </div>


      {/* MAIN CONTAINER */}

      <div
        className="
        max-w-7xl mx-auto
        grid lg:grid-cols-2
        gap-10
      "
      >

        {/* LEFT SIDE FORM */}

        <div
          className="
          bg-white
          rounded-3xl
          shadow-xl
          border border-slate-200
          p-8
        "
        >

          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Send us a message
          </h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >

            {/* NAME */}

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="
              border border-slate-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2 focus:ring-cyan-500
            "
            />

            {/* EMAIL */}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="
              border border-slate-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2 focus:ring-cyan-500
            "
            />

            {/* USER TYPE */}

            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="
              border border-slate-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2 focus:ring-cyan-500
            "
            >

              <option value="">
                Select User Type
              </option>

              <option value="Employee">
                Employee
              </option>

              <option value="Employer">
                Employer
              </option>

              <option value="Visitor">
                Visitor
              </option>

            </select>

            {/* ISSUE TYPE */}

            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              required
              className="
              border border-slate-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2 focus:ring-cyan-500
            "
            >

              <option value="">
                Select Issue Type
              </option>

              <option value="Job related">
                Job related
              </option>

              <option value="Account problem">
                Account problem
              </option>

              <option value="Report user">
                Report user
              </option>

              <option value="Technical issue">
                Technical issue
              </option>

              <option value="Other">
                Other
              </option>

            </select>

            {/* MESSAGE */}

            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Write your message..."
              className="
              border border-slate-300
              rounded-2xl
              p-4
              outline-none
              focus:ring-2 focus:ring-cyan-500
              resize-none
            "
            />

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
              bg-cyan-600
              text-white
              py-4
              rounded-2xl
              font-semibold
              hover:scale-[1.02]
              transition
              shadow-lg
            "
            >

              {
                loading
                  ? "Sending..."
                  : "Send Message"
              }

            </button>

          </form>

        </div>


        {/* RIGHT SIDE */}

        <div className="flex flex-col justify-center gap-6">

          <div>

            <h3 className="text-3xl font-bold text-slate-800">
              Get in touch
            </h3>

            <p className="text-slate-600 mt-4 leading-relaxed">

              Samarthya connects employees and employers
              through a trusted platform. Contact our support
              team for assistance regarding jobs, hiring,
              reports, verification or technical issues.

            </p>

          </div>


          {/* CARDS */}

          <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-200">

            <p className="text-lg font-semibold">
              📧 Email Support
            </p>

            <p className="text-slate-500 mt-2">
              support@samarthya.com
            </p>

          </div>


          <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-200">

            <p className="text-lg font-semibold">
              📍 Location
            </p>

            <p className="text-slate-500 mt-2">
              Bhubaneswar, India
            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ContactUs;
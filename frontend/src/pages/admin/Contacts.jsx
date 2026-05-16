import React, { useEffect, useState } from "react";

import axios from "axios";

const Contacts = () => {

  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchContacts();

  }, []);

  const fetchContacts = async () => {

    try {

      const response = await axios.get(

        "http://localhost:3000/api/contact/all",

        {
          withCredentials: true,
        }
      );

      setContacts(response.data.contacts);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  // ================= MARK AS READ =================

  const markMessageAsRead = async (id) => {

    try {

      await axios.put(

        `http://localhost:3000/api/contact/${id}/read`,

        {},

        {
          withCredentials: true,
        }
      );

      setContacts((prev) =>
        prev.map((contact) =>
          contact._id === id
            ? { ...contact, status: "Read" }
            : contact
        )
      );

    } catch (error) {

      console.log(error);

    }

  };


  // ================= COUNTS =================

  const totalMessages = contacts.length;

  const unreadMessages = contacts.filter(
    (contact) => contact.status === "Unread"
  ).length;

  const readMessages = contacts.filter(
    (contact) => contact.status === "Read"
  ).length;


  return (

    <div className="min-h-screen bg-[#f5f7fb] p-4 sm:p-6">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>

          <h1
            className="
            text-4xl
            font-extrabold
            bg-gradient-to-r
            from-cyan-600
            via-blue-600
            to-violet-600
            bg-clip-text
            text-transparent
          "
          >
            Contact Messages
          </h1>

          <p className="text-slate-500 mt-3">
            Messages received from employees,
            employers and visitors.
          </p>

        </div>


        {/* SMALL STATS */}

        <div className="flex flex-wrap gap-3">

          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">

            <p className="text-xs text-slate-500">
              Total
            </p>

            <h3 className="font-bold text-slate-800">
              {totalMessages}
            </h3>

          </div>

          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">

            <p className="text-xs text-slate-500">
              Read
            </p>

            <h3 className="font-bold text-green-600">
              {readMessages}
            </h3>

          </div>

          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">

            <p className="text-xs text-slate-500">
              Unread
            </p>

            <h3 className="font-bold text-orange-500">
              {unreadMessages}
            </h3>

          </div>

        </div>

      </div>


      {/* LOADING */}

      {
        loading ? (

          <div className="text-center py-20 text-slate-500">
            Loading messages...
          </div>

        ) : (

          <div className="grid gap-6">

            {
              contacts.map((contact, index) => (

                <div
                  key={contact._id}

                  onClick={() => {

                    if (contact.status === "Unread") {

                      markMessageAsRead(contact._id);

                    }

                  }}

                  className="
                  bg-white
                  rounded-3xl
                  border border-slate-200
                  shadow-sm
                  p-6
                  hover:shadow-lg
                  transition
                  cursor-pointer
                "
                >

                  {/* TOP */}

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>

                      <div className="flex items-center gap-3 flex-wrap">

                        <h2 className="text-2xl font-bold text-slate-800">
                          {contact.name}
                        </h2>

                        {
                          index === 0 && (

                            <span
                              className="
                              text-xs
                              bg-cyan-100
                              text-cyan-700
                              px-3 py-1
                              rounded-full
                              font-medium
                            "
                            >
                              Recent Message
                            </span>

                          )
                        }

                      </div>

                      <p className="text-slate-500 break-all mt-1">
                        {contact.email}
                      </p>

                    </div>

                    <div className="flex flex-wrap gap-3">

                      <span
                        className="
                        px-4 py-2
                        rounded-full
                        text-sm
                        font-medium
                        bg-cyan-100
                        text-cyan-700
                      "
                      >
                        {contact.userType}
                      </span>

                      <span
                        className="
                        px-4 py-2
                        rounded-full
                        text-sm
                        font-medium
                        bg-violet-100
                        text-violet-700
                      "
                      >
                        {contact.issueType}
                      </span>

                    </div>

                  </div>


                  {/* MESSAGE */}

                  <div className="mt-6">

                    <p className="text-sm text-slate-500 mb-2">
                      Message
                    </p>

                    <div
                      className="
                      bg-slate-50
                      rounded-2xl
                      p-5
                      text-slate-700
                      leading-relaxed
                    "
                    >
                      {contact.message}
                    </div>

                  </div>


                  {/* FOOTER */}

                  <div className="mt-5 flex justify-between items-center">

                    <p className="text-sm text-slate-400">

                      {
                        new Date(contact.createdAt)
                          .toLocaleString()
                      }

                    </p>

                    <span
                      className={`

                      px-4 py-1
                      rounded-full
                      text-sm

                      ${
                        contact.status === "Unread"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }
                    `}
                    >
                      {contact.status}
                    </span>

                  </div>

                </div>

              ))
            }

          </div>

        )
      }

    </div>

  );

};

export default Contacts;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

const Requests = () => {

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("incoming");

  const [incomingRequests, setIncomingRequests] =
    useState([]);

  const [sentRequests, setSentRequests] =
    useState([]);

  useEffect(() => {

    fetchIncomingRequests();

    fetchSentRequests();

  }, []);



  async function fetchIncomingRequests() {

    try {

      const res =
        await axios.get(

          "http://localhost:3000/api/connections/pending",

          {
            withCredentials: true
          }

        );

      setIncomingRequests(
        res.data
      );

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  }


  async function fetchSentRequests() {

    try {

      const res =
        await axios.get(

          "http://localhost:3000/api/connections/sent",

          {
            withCredentials: true
          }

        );

      setSentRequests(
        res.data
      );

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  }



  async function handleAccept(id) {

    try {

      await axios.put(

        `http://localhost:3000/api/connections/accept/${id}`,

        {},

        {
          withCredentials: true
        }

      );

      setIncomingRequests(prev =>

        prev.filter(
          req => req._id !== id
        )

      );

    }

    catch (err) {

      console.log(err);

    }

  }



  async function handleReject(id) {

    try {

      await axios.delete(

        `http://localhost:3000/api/connections/reject/${id}`,

        {
          withCredentials: true
        }

      );

      if (activeTab === "incoming") {

        setIncomingRequests(prev =>

          prev.filter(
            req => req._id !== id
          )

        );

      }

      else {

        setSentRequests(prev =>

          prev.filter(
            req => req._id !== id
          )

        );

      }

    }

    catch (err) {

      console.log(err);

    }

  }

  async function handleCancelRequest(userId) {

    try {

      await axios.delete(

        `http://localhost:3000/api/connections/cancel/${userId}`,

        {
          withCredentials: true
        }

      );

      setSentRequests(prev =>

        prev.filter(req =>

          req.receiverId._id !== userId

        )

      );

    }

    catch (err) {

      console.log(err);

    }

  }


  if (loading) {

    return <p>Loading...</p>

  }

  const displayedRequests =

    activeTab === "incoming"

      ? incomingRequests

      : sentRequests;



  return (

    <div>

      <div className="flex gap-4 mb-6">

        <button

          onClick={() => setActiveTab("incoming")}

          className={`px-4 py-1 rounded-md w-28 shadow-xs shadow-gray-200

              ${activeTab === "incoming"

              ? "bg-cyan-600 text-white"

              : "bg-gray-200 hover:cursor-pointer hover:bg-gray-200"

            }`}

        >

          Incoming

        </button>


        <button

          onClick={() => setActiveTab("sent")}

          className={`px-4 py-1 rounded-md w-28 shadow-sm shadow-gray-200

              ${activeTab === "sent"

              ? "bg-cyan-600 text-white"

              : "bg-gray-200 hover:cursor-pointer hover:bg-gray-200 "

            }`}

        >

          Sent

        </button>

      </div>



      {

        displayedRequests.length===0
          ?
          <p>

          {
          activeTab==="incoming"
          ? "No incoming requests"
          : "No sent requests"
          }

          </p>
          :

          displayedRequests.map(req => {
            const otherUser = activeTab === "incoming" ? req.senderId : req.receiverId;
            return (

              <div

                key={req._id}

                className=" flex items-center justify-between border-b py-4 "

              >
                <Link
                
                  to={`/${currentUser.role}/profile-view/${otherUser._id}`}

                  className="flex items-center gap-4 cursor-pointer hover:bg-gray-50  rounded-lg  p-2  transition  "

                >
                  <div
                    className=" flex items-center gap-4 "
                  >

                    <img

                      src={
                        otherUser.profileImage
                        ||

                        "https://ik.imagekit.io/fybgmadbnl26/samarthya/avatar-cover/ChatGPT%20Image%20May%207,%202026,%2001_17_32%20AM-resized.PNG"
                      }

                      className=" w-12 h-12 rounded-full object-cover "
                    />


                    <div>

                      <h3>

                        {otherUser.name}

                      </h3>

                      <p
                        className=" text-sm text-gray-500 "
                      >

                        {otherUser.role}

                      </p>

                    </div>

                  </div>
                </Link>




                {
                  activeTab === "incoming"

                    ?

                    <div className="flex gap-3 mt-4">

                      <button
                        onClick={() => handleAccept(req._id)}
                        className="
                       flex justify-center items-center 
                       bg-cyan-600 h-8 
                       text-white px-4 py-2 rounded 
                       hover:cursor-pointer hover:bg-cyan-700
                      "
                      >

                        Accept

                      </button>

                      <button
                        onClick={() => handleReject(req._id)}
                        className=" flex justify-center items-center 
                       bg-mist-700 h-8 text-white 
                       px-4 py-2 rounded 
                       hover:cursor-pointer hover:bg-mist-800 "
                      >

                        Reject

                      </button>

                    </div>

                    :

                    <button

                      onClick={() => handleCancelRequest(req.receiverId._id)}

                      className="flex justify-center items-center 
                      bg-mist-700 h-8 text-white 
                      px-4 py-2 rounded 
                      hover:cursor-pointer hover:bg-mist-800"

                    >

                      Cancel Request

                    </button>

                }

              </div>

            )

          })

      }

    </div>

  )

}

export default Requests;
import React from "react";
import { Link } from "react-router-dom";

import { FiEdit } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import { FiMoreVertical } from "react-icons/fi";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {toast} from "react-toastify";

const ProfileActions = ({
  currentUser,
  viewedUser,
  isPublicView = false
}) => {

  const currentUserId = currentUser?._id || currentUser?.id;

  const [connectionData, setConnectionData] =
    useState({

      status: "none",

      incoming: false,

      connectionId: null

    });

  const [showReport, setShowReport] = useState(false);

  const [reason, setReason] = useState("");

  const [showMenu, setShowMenu] = useState(false);

  const [category, setCategory] = useState("");


  const menuRef = useRef(null);

  async function handleConnect() {

    try {

      await axios.post(

        `http://localhost:3000/api/connections/send/${viewedUser._id}`,

        {},

        {
          withCredentials: true
        }

      );

      setConnectionData({

        status: "pending",

        incoming: false,

        connectionId: null

      });

    }

    catch (err) {

      console.log(err);

    }

  }


  async function handleAccept() {

    try {

      await axios.put(

        `http://localhost:3000/api/connections/accept/${connectionData.connectionId}`,

        {},

        {
          withCredentials: true
        }

      );

      setConnectionData({

        status: "connected",

        incoming: false,

        connectionId: null

      });

    }

    catch (err) {

      console.log(err);

    }

  }


  async function handleReject() {

    try {

      await axios.delete(

        `http://localhost:3000/api/connections/reject/${connectionData.connectionId}`,

        {
          withCredentials: true
        }

      );

      setConnectionData({

        status: "none",

        incoming: false,

        connectionId: null

      });

    }

    catch (err) {

      console.log(err);

    }

  }

  async function handleBlock() {

    await axios.post(

      `http://localhost:3000/api/block/${viewedUser._id}`,

      {},

      {
        withCredentials: true
      }

    );

    setConnectionData({
      status: "blocked"
    });

    setShowMenu(false);

  }



  async function handleUnblock() {

    await axios.delete(

      `http://localhost:3000/api/block/${viewedUser._id}`,

      {
        withCredentials: true
      }

    );

    setConnectionData({
      status: "none"
    });

    setShowMenu(false);

  }

  async function handleRemoveConnection() {

    try {

      await axios.delete(

        `http://localhost:3000/api/connections/remove/${viewedUser._id}`,

        {
          withCredentials: true
        }

      );

      setConnectionData({

        status: "none",
        incoming: false,
        connectionId: null

      });

      setShowMenu(false);

    }

    catch (err) {

      console.log(err);

    }

  }



  async function handleCancelRequest() {

    try {

      await axios.delete(

        `http://localhost:3000/api/connections/cancel/${viewedUser._id}`,

        {
          withCredentials: true
        }

      );

      setConnectionData({

        status: "none",
        incoming: false,
        connectionId: null

      });

      setShowMenu(false);

    }

    catch (err) {

      console.log(err);

    }

  }


  function renderMenuItems() {

    // BLOCKED
    if (connectionData.status === "blocked") {

      return (

        <>

          <button
            onClick={handleUnblock}
            className="
w-full
text-left
px-4
py-2
hover:bg-gray-100
"
          >
            Unblock
          </button>

          <button
            onClick={() => {

              setShowReport(true);

              setShowMenu(false);

            }}
            className="
w-full
text-left
px-4
py-2
text-red-500
hover:bg-gray-100
"
          >
            Report
          </button>

        </>

      );

    }


    // CONNECTED
    if (connectionData.status === "connected") {

      return (

        <>

          <button
            onClick={handleRemoveConnection}
            className="
w-full
text-left
px-4
py-2
hover:bg-gray-100
"
          >
            Remove Connection
          </button>


          <button
            onClick={handleBlock}
            className=" w-full text-left px-4 py-2 hover:bg-gray-100 "
          >
            Block User
          </button>


          <button
            onClick={() => {

              setShowReport(true);

              setShowMenu(false);

            }}
            className="
w-full
text-left
px-4
py-2
text-red-500
hover:bg-gray-100
"
          >
            Report
          </button>

        </>

      );

    }


    // PENDING
    if (connectionData.status === "pending") {

      return (

        <>

          <button
            onClick={handleCancelRequest}
            className="
w-full
text-left
px-4
py-2
hover:bg-gray-100
"
          >
            Cancel Request
          </button>


          <button
            onClick={handleBlock}
            className="
w-full
text-left
px-4
py-2
hover:bg-gray-100
"
          >
            Block User
          </button>


          <button
            onClick={() => {

              setShowReport(true);

              setShowMenu(false);

            }}
            className="
w-full
text-left
px-4
py-2
text-red-500
hover:bg-gray-100
"
          >
            Report
          </button>

        </>

      );

    }


    // NONE

    return (

      <>

        <button
          onClick={handleBlock}
          className=" w-full text-left px-4 py-2 hover:bg-gray-100 "
        >
          Block User
        </button>


        <button
          onClick={() => {

            setShowReport(true);

            setShowMenu(false);

          }}
          className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 "
        >
          Report
        </button>

      </>

    );

  }


  async function submitReport() {

    try {

      if (!category) return;

      await axios.post(

        "http://localhost:3000/api/report",

        {

          reportedUserId:
            viewedUser._id,

          targetType:
            "profile",

          targetId:
            viewedUser._id,

          targetModel:
            "users",

          category,

          description:
            reason

        },

        {
          withCredentials: true
        }

      );

      toast.success(
        "Report submitted"
      );


      setShowReport(false);

      setReason("");

      setCategory("");

    }

    catch (err) {

      console.log(err);

      toast.error(

        err.response?.data?.message ||

        "Failed"

      );

    }

  }


  useEffect(() => {

    async function fetchStatus() {

      try {

        if (
          String(currentUserId) === String(viewedUser?._id)
        ) return;


        const res =
          await axios.get(

            `http://localhost:3000/api/connections/status/${viewedUser._id}`,

            {
              withCredentials: true
            }

          );

        setConnectionData(
          res.data
        );

      }

      catch (err) {

        console.log(err);

      }

    }

    fetchStatus();

  }, [viewedUser]);

  useEffect(() => {

    function handleClickOutside(event) {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {

        setShowMenu(false);

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  if (!viewedUser) return null;

  const isOwnProfile = String(currentUserId) === String(viewedUser?._id);


  const threeDotMenu = (

    <div ref={menuRef} className="relative">

      <button
        onClick={() =>
          setShowMenu(!showMenu)
        }

        className="
    p-2
    rounded-md
    hover:bg-gray-100
    "
      >

        <FiMoreVertical size={20} />

      </button>

      {

        showMenu &&

        <div
          className="
      absolute
      right-0
      top-12
      w-48
      bg-white
      rounded-lg
      shadow-lg
      border
      z-50
      "
        >

          {renderMenuItems()}

        </div>

      }

    </div>

  );


  const reportModal = (

    showReport &&

    <div
      className="
fixed
inset-0
bg-black/40
flex
justify-center
items-center
z-50
"
    >

      <div
        className="
bg-white
p-5
rounded-xl
w-[90%]
md:w-[40%]
lg:w-[40%]
"
      >

        <h2
          className="
text-lg
font-semibold
mb-3
"
        >

          Report User

        </h2>

        <select

          value={category}

          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }

          className="
border
w-full
rounded-lg
p-3
mb-3
"

        >

          <option value="">
            Select category
          </option>

          <option value="spam">
            Spam
          </option>

          <option value="harassment">
            Harassment
          </option>

          <option value="fake_account">
            Fake Account
          </option>

          <option value="inappropriate">
            Inappropriate
          </option>

          <option value="other">
            Other
          </option>

        </select>

        <textarea
          value={reason}

          onChange={(e) =>
            setReason(
              e.target.value
            )
          }
          className="w-full h-30 p-2 shadow-sm shadow-gray-300 rounded-md"
          placeholder="
Additional details
"
        />


        <div
          className="
flex
justify-end
gap-2
mt-4
"
        >

          <button
            onClick={() =>
              setShowReport(false)
            }
            className="
border
px-4
py-2
rounded-lg
hover:cursor-pointer
hover:shadow-sm shadow-gray-400
"
          >

            Cancel

          </button>


          <button
            onClick={submitReport}
            className="
bg-red-500
text-white
px-4
py-2
rounded-lg
hover:cursor-pointer
hover:shadow-sm shadow-gray-400
"
          >

            Submit

          </button>

        </div>

      </div>

    </div>

  );


  // own profile
  if (isOwnProfile) {

    return (

      <div>

        {
          currentUser?.role === "employee"

            ?

            <Link
              to="/employee/edit-profile"

              className="
      flex items-center justify-center gap-2
      bg-cyan-600 text-white
      rounded-md px-3 h-8
      lg:px-6 lg:h-10
      "
            >

              Edit Profile

              <FiEdit />

            </Link>

            :

            <Link
              to="/employer/edit-profile"

              className="
      flex items-center justify-center gap-2
      bg-cyan-600 text-white
      rounded-md px-3 h-8
      lg:px-6 lg:h-10
      "
            >

              Edit Profile

              <FiEdit />

            </Link>

        }

      </div>

    )

  }



  if (
    isPublicView
    &&
    currentUser?.role === "admin"
  ) {

    return null;

  }



  // CONNECT

  if (connectionData.status === "none") {

    return (
      <>
        <div className="flex gap-2">
          <button

            onClick={handleConnect}

            className=" flex items-center gap-2 bg-cyan-600 text-white rounded-md px-4 py-2 "

          >

            Connect

            <FiUserPlus />

          </button>

          {threeDotMenu}
        </div>

        {reportModal}

      </>
    )

  }



  // INCOMING REQUEST

  if (

    connectionData.status === "pending"

    &&

    connectionData.incoming

  ) {

    return (

      <>

        <div className="flex gap-2 items-start">
          <div className="flex flex-col lg:flex-row gap-2">

            <div>
              <button

                onClick={handleAccept}

                className="flex justify-center items-center bg-cyan-600 h-8 w-20 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-cyan-700"

              >

                Accept

              </button>
            </div>

            <div>
              <button

                onClick={handleReject}

                className="flex justify-center items-center bg-mist-700 h-8 w-20 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-mist-800"

              >

                Reject

              </button>
            </div>

          </div>

          {threeDotMenu}

        </div>

        {reportModal}

      </>

    )

  }



  // OUTGOING PENDING

  if (connectionData.status === "pending") {

    return (
      <>

        <div className="flex gap-2">

          <button

            className="
        bg-gray-400
        text-white
        rounded-md px-4 py-2
        "

          >

            Pending

          </button>

          {threeDotMenu}

        </div>

        {reportModal}

      </>

    )

  }



  // CONNECTED

  if (connectionData.status === "connected") {

    return (
      <>
        <div className="flex gap-2">

          <Link
            to={`/${currentUser.role}/messages`}

            state={{
              user: {
                _id: viewedUser._id,
                name: viewedUser.name,
                profileImage: viewedUser.profileImage
              }
            }}

            className="
          flex items-center gap-2
          bg-sky-500
          text-white
          rounded-md px-4 py-2
          hover:cursor-pointer
          hover:bg-sky-600
          "

          >

            Message

            <FiMessageCircle />

          </Link>

          {threeDotMenu}
        </div>

        {reportModal}

      </>

    )

  }

  if (connectionData.status === "blocked") {


    return (
      <>

        <div className="flex gap-2">

          <button
            className="
bg-gray-400
text-white
px-6
rounded
cursor-not-allowed
"
          >

            Blocked

          </button>

          <div>
            {threeDotMenu}
          </div>

        </div>

        {reportModal}

      </>

    )

  }

};

export default ProfileActions;
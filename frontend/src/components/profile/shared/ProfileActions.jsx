import React from "react";
import { Link } from "react-router-dom";

import { FiEdit } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import { FiMoreVertical } from "react-icons/fi";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

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

  const [showMenu, setShowMenu] = useState(false);

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
          className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 "
        >
          Report
        </button>

      </>

    );

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

  if (!viewedUser) return null;

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

    )

  }



  // INCOMING REQUEST

  if (

    connectionData.status === "pending"

    &&

    connectionData.incoming

  ) {

    return (

      <div className="flex gap-2">

        <button

          onClick={handleAccept}

          className="flex justify-center items-center bg-cyan-600 h-8 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-cyan-700"

        >

          Accept

        </button>



        <button

          onClick={handleReject}

          className="flex justify-center items-center bg-mist-700 h-8 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-mist-800"

        >

          Reject

        </button>

        {threeDotMenu}

      </div>

    )

  }



  // OUTGOING PENDING

  if (connectionData.status === "pending") {

    return (

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

    )

  }



  // CONNECTED

  if (connectionData.status === "connected") {

    return (
      <div className="flex gap-2">

        <button

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

        </button>

        {threeDotMenu}
      </div>

    )

  }

  //Blocked
  if (connectionData.status === "blocked") {

    return (

      <div className="flex gap-2">

        <button
          className=" bg-gray-400 text-white px-6 rounded cursor-not-allowed"
        >

          Blocked

        </button>
        <div>
          {threeDotMenu}
        </div>

      </div>

    )

  }

};

export default ProfileActions;
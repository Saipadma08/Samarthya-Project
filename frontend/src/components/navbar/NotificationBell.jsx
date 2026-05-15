import React, { useEffect, useState, useContext} from "react";

import {FiBell} from "react-icons/fi";

import axios from "axios";

import {SocketContext} from "../../context/SocketContext";

import { useNavigate } from "react-router-dom";


const NotificationBell = () => {

  const socket = useContext( SocketContext);

  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  const role = JSON.parse(localStorage.getItem("user")).role;

  useEffect(() => {

    fetchNotifications();

    socket.on("newNotification", handleRealtime);

    window.addEventListener("notification-read", fetchNotifications);

    return () => {

      socket.off( "newNotification", handleRealtime );

    };

    window.removeEventListener("notification-read", fetchNotifications);

  }, []);



  async function
    fetchNotifications() {

    try {

      const res =
        await axios.get(

          "http://localhost:3000/api/notifications",

          {
            withCredentials: true
          }

        );


      const unread =

        res.data.filter(

          n => !n.read

        );

      setCount(
        unread.length
      );

    }

    catch (err) {

      console.log(err);

    }

  }



  function
    handleRealtime() {

    setCount(
      prev => prev + 1
    );

  }



  return (

    <div
      onClick={()=> navigate(`/${role}/notifications`)}

      className="
        relative
        p-2
        hover:bg-gray-100
        rounded-full
        cursor-pointer
        text-xl
        transition
        "
    >

      <FiBell />


      {
        count > 0
        &&

        <div
          className="
            absolute
            top-0
            right-0
            bg-red-500
            text-white
            w-4
            h-4
            rounded-full
            text-xs
            flex
            items-center
            justify-center
            "
        >

          {count}

        </div>

      }

    </div>

  );

};

export default NotificationBell
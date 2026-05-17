import React,
{
  useEffect,
  useState,
  useContext
}
  from "react";

import { FiMessageSquare }
  from "react-icons/fi";

import {
  SocketContext
}
  from "../../context/SocketContext";

import {
  useNavigate
}
  from "react-router-dom";


const MessageIcon = () => {

  const socket =
    useContext(
      SocketContext
    );

  const navigate =
    useNavigate();


  const [
    unseenChats,
    setUnseenChats
  ] = useState(

    JSON.parse(
      localStorage.getItem(
        "unseenChats"
      )
    ) || []

  );


  const [
    activeChat,
    setActiveChat
  ] = useState(

    localStorage.getItem(
      "activeChat"
    ) || null

  );



  // listen active chat changes

  useEffect(() => {

    function updateActive(e) {

      setActiveChat(
        e.detail
      );

    }


    window.addEventListener(

      "activeChatChanged",

      updateActive

    );


    return () => {

      window.removeEventListener(

        "activeChatChanged",

        updateActive

      );

    };

  }, []);




  // receive unread chat

  useEffect(() => {

    if (!socket)
      return;


    const handleUnread = (data) => {

      const senderId =

        data.sender.toString();


      // already viewing this chat
      // ignore navbar badge

      const currentActiveChat =
        localStorage.getItem(
          "activeChat"
        );

      if (
        currentActiveChat ===
        senderId
      ) {
        return;
      }


      const existing = JSON.parse(
        localStorage.getItem(
          "unseenChats"
        )
      ) || [];


      if (
        existing.includes(
          senderId
        )
      ) {
        return;
      }


      const updated = [

        ...existing,
        senderId

      ];


      localStorage.setItem(

        "unseenChats",

        JSON.stringify(
          updated
        )

      );


      setUnseenChats(
        updated
      );


      window.dispatchEvent(

        new Event(
          "unseenUpdated"
        )

      );

    };


    socket.on(

      "newUnreadChat",

      handleUnread

    );


    return () => {

      socket.off(

        "newUnreadChat",

        handleUnread

      );

    };

  }, [
    socket
  ]);




  // sync updates

  useEffect(() => {

    function sync() {

      setUnseenChats(

        JSON.parse(

          localStorage.getItem(
            "unseenChats"
          )

        ) || []

      );

    }


    sync();


    window.addEventListener(
      "chatSeen",
      sync
    );

    window.addEventListener(
      "unseenUpdated",
      sync
    );


    return () => {

      window.removeEventListener(
        "chatSeen",
        sync
      );

      window.removeEventListener(
        "unseenUpdated",
        sync
      );

    };

  }, []);




  return (

    <div

      onClick={() =>

        navigate(
          "/employee/messages"
        )

      }

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

      <FiMessageSquare />


      {

        unseenChats.length > 0 &&

        <div

          className="
          absolute
          -top-1
          -right-1
          bg-red-500
          text-white
          rounded-full
          min-w-5
          h-5
          px-1
          text-xs
          flex
          items-center
          justify-center
          "

        >

          {unseenChats.length}

        </div>

      }

    </div>

  );

}

export default MessageIcon;
import React,
{
    useEffect,
    useState,
    useContext
}
    from "react";

import ChatPage from "./ChatPage";

import { FiArrowLeft } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

import { Link, useParams } from "react-router-dom";

import { useLocation } from "react-router-dom";

import axios
    from "axios";

import {
    SocketContext
}
    from "../../context/SocketContext";

const MessagesLayout = () => {

    const location = useLocation();

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    const { userId } = useParams();

    const [
        chatUsers,
        setChatUsers
    ] = useState([]);

    const [
        selectedUser,
        setSelectedUser
    ] = useState(null);

    const [
        search,
        setSearch
    ] = useState("");

    const [unseenChats, setUnseenChats] = useState(
        JSON.parse(localStorage.getItem("unseenChats")) || []
    );


    const socket =
        useContext(
            SocketContext
        );



    useEffect(() => {

        fetchChatUsers();

    }, []);



    useEffect(() => {

        if (location.state?.user) {

            setSelectedUser(
                location.state.user
            );

        }

    }, [location]);


    useEffect(() => {

        async function loadSelectedUser() {

            if (!userId)
                return;

            // first search existing chat list

            const foundUser =

                chatUsers.find(

                    user =>

                        user._id === userId

                );

            if (foundUser) {

                setSelectedUser(
                    foundUser
                );

                return;
            }

            // user has no previous chats
            // fetch profile directly

            try {

                const res =

                    await axios.get(

                        `http://localhost:3000/api/user/${userId}`,

                        {
                            withCredentials: true
                        }

                    );

                setSelectedUser(
                    res.data
                );

            }

            catch (err) {

                console.log(err);

            }

        }

        loadSelectedUser();

    }, [
        userId,
        chatUsers
    ]);


    useEffect(() => {

        if (!socket) return;

        const handleUnread = (data) => {

            const senderId = data.sender.toString();

            const activeChat =
                localStorage.getItem(
                    "activeChat"
                );

            if (
                activeChat &&
                activeChat === senderId
            ) {

                fetchChatUsers();

                return;
            }

            const existing =
                JSON.parse(
                    localStorage.getItem(
                        "unseenChats"
                    )
                ) || [];

            if (
                existing.includes(
                    senderId
                )
            ) {

                fetchChatUsers();

                return;
            }

            const updated = [
                ...existing,
                senderId
            ];

            localStorage.setItem(
                "unseenChats",
                JSON.stringify(updated)
            );

            setUnseenChats(
                updated
            );

            window.dispatchEvent(
                new Event(
                    "unseenUpdated"
                )
            );

            fetchChatUsers();
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

    }, [socket]);

    useEffect(() => {

        function refreshChats() {

            fetchChatUsers();

        }

        window.addEventListener(
            "unseenUpdated",
            refreshChats
        );

        return () => {

            window.removeEventListener(
                "unseenUpdated",
                refreshChats
            );

        };

    }, []);


    useEffect(() => {

        return () => {

            localStorage.removeItem(
                "activeChat"
            );

            window.dispatchEvent(

                new CustomEvent(
                    "activeChatChanged",
                    {
                        detail: null
                    }
                )

            );

        };

    }, []);




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




    async function fetchChatUsers() {

        try {

            const res = await axios.get(
                "http://localhost:3000/api/messages/chat-users",
                {
                    withCredentials: true
                }
            );

            const currentUserId =
                loggedInUser?._id || loggedInUser?.id;

            let apiUsers =
                res.data.filter(
                    user =>
                        user._id !== currentUserId
                );

            if (location.state?.user) {

                const selected =
                    location.state.user;

                const exists =

                    apiUsers.some(
                        u => u._id === selected._id
                    );

                if (!exists) {

                    apiUsers.unshift(
                        selected
                    );

                }

            }

            setChatUsers(
                apiUsers
            );

        }

        catch (err) {

            console.log(err);

        }

    }


    const filteredUsers =

        chatUsers.filter(

            user =>

                user.name
                    .toLowerCase()

                    .includes(

                        search.toLowerCase()

                    )

        );


    async function handleDeleteChat() {

        const confirmed = window.confirm(
            "Are you sure you want to delete this chat?"
        );

        if (!confirmed) return;

        try {

            await axios.delete(
                `http://localhost:3000/api/messages/delete-chat/${selectedUser._id}`,
                {
                    withCredentials: true
                }
            );

            // remove active chat
            localStorage.removeItem(
                "activeChat"
            );

            window.dispatchEvent(
                new CustomEvent(
                    "activeChatChanged",
                    {
                        detail: null
                    }
                )
            );


            // remove deleted user from red-dot list
            const updatedUnseen = (

                JSON.parse(
                    localStorage.getItem(
                        "unseenChats"
                    )
                )

                || []

            ).filter(

                id =>

                    id !== selectedUser._id.toString()

            );


            localStorage.setItem(

                "unseenChats",

                JSON.stringify(
                    updatedUnseen
                )

            );


            setUnseenChats(
                updatedUnseen
            );


            window.dispatchEvent(
                new Event(
                    "unseenUpdated"
                )
            );


            // update chat list
            await fetchChatUsers();

            // close current chat
            setSelectedUser(null);

            alert(
                "Chat deleted successfully"
            );

        }

        catch (err) {

            console.log(err);

            alert(
                "Failed to delete chat"
            );

        }

    }



    return (

        <div
            className="
flex
h-[calc(100vh-180px)]
lg:h-[calc(100vh-150px)]
gap-5
"
        >


            {/* LEFT */}

            <div

                className={`

shadow-sm
shadow-gray-300
p-4

${selectedUser

                        ?

                        "hidden lg:block lg:w-[30%]"

                        :

                        "w-full lg:w-[30%]"
                    }

`}

            >


                <input

                    placeholder=
                    "Search chats"

                    value={search}

                    onChange={(e) =>

                        setSearch(
                            e.target.value
                        )

                    }

                    className="
w-full
border
rounded-md
px-3
py-2
mb-4
"
                />



                <Link

                    to={
                        loggedInUser.role === "admin"
                            ?
                            "/admin/all-admins"

                            :
                            loggedInUser.role === "employee"

                                ?
                                "/employee/my-connections"

                                :
                                "/employer/my-connections"
                    }

                    className="
                    block
w-40
mb-4
bg-cyan-600
text-white
rounded-md
py-2
text-center
"

                >

                    {
                        loggedInUser.role === "admin"
                            ?
                            "All Admins"
                            :
                            "View Connections"
                    }

                </Link>




                <div
                    className="
space-y-2
overflow-y-auto
h-[65vh]
"
                >

                    {

                        filteredUsers.map(

                            user => (

                                <div

                                    key={user._id}

                                    onClick={() => {

                                        setSelectedUser(
                                            user
                                        );

                                        localStorage.setItem(
                                            "activeChat",
                                            user._id.toString()
                                        );

                                        window.dispatchEvent(

                                            new CustomEvent(
                                                "activeChatChanged",
                                                {
                                                    detail:
                                                        user._id.toString()
                                                }
                                            )

                                        );


                                        const existing =

                                            JSON.parse(

                                                localStorage.getItem(
                                                    "unseenChats"
                                                )

                                            ) || [];


                                        const updated =

                                            existing.filter(

                                                id =>

                                                    id !== user._id.toString()

                                            );


                                        localStorage.setItem(

                                            "unseenChats",

                                            JSON.stringify(
                                                updated
                                            )

                                        );


                                        // notify navbar badge immediately
                                        window.dispatchEvent(

                                            new Event(
                                                "unseenUpdated"
                                            )

                                        );


                                        setUnseenChats(
                                            updated
                                        );


                                        window.dispatchEvent(

                                            new CustomEvent(

                                                "chatSeen",

                                                {
                                                    detail:
                                                        user._id
                                                }

                                            )

                                        );

                                    }}

                                    className={`

flex
items-center
gap-3
p-2
rounded-md
shadow-sm shadow-mist-200
cursor-pointer
transition

${selectedUser?._id === user._id

                                            ?

                                            "bg-blue-100 border border-blue-200"

                                            :

                                            "hover:bg-gray-100"
                                        }

`}

                                >


                                    <img

                                        src={

                                            user.profileImage ||

                                            "https://ik.imagekit.io/fybgmadbnl26/samarthya/avatar-cover/ChatGPT%20Image%20May%207,%202026,%2001_17_32%20AM-resized.PNG"

                                        }

                                        className="
w-12
h-12
rounded-full
"
                                    />


                                    <div className="flex justify-between w-full">


                                        <div>

                                            <p className="font-semibold">

                                                {user.name}

                                            </p>


                                            <p
                                                className="
text-sm
text-gray-500
truncate
max-w-37.5
"
                                            >

                                                {user.lastMessage || "Start a conversation"}

                                            </p>

                                        </div>



                                        {

                                            unseenChats.includes(
                                                user._id.toString()
                                            )

                                            &&

                                            <div
                                                className="
w-3
h-3
rounded-full
bg-red-500
mt-2
shrink-0
"
                                            />

                                        }


                                    </div>

                                </div>

                            )

                        )

                    }

                </div>

            </div>





            {/* RIGHT */}

            <div

                className={`shadow-sm shadow-gray-300 flex flex-col h-full
                    ${selectedUser

                        ?

                        "w-91 md:w-full lg:w-[70%]"

                        :

                        "hidden lg:flex lg:w-[70%]"
                    }

                `}

            >

                {

                    selectedUser

                        ?

                        <>
                            <div
                                className="
 px-3
 py-1
 border-b
 flex
 items-center
 justify-between
 shrink-0
"
                            >

                                {/* LEFT SIDE */}
                                <div
                                    className="
      flex
      items-center
      gap-3
      "
                                >

                                    {/* back button mobile */}

                                    <button
                                        onClick={() => {
                                            setSelectedUser(null);

                                            localStorage.removeItem("activeChat");

                                            window.dispatchEvent(
                                                new CustomEvent(
                                                    "activeChatChanged",
                                                    { detail: null }
                                                )
                                            );
                                        }}

                                        className="lg:hidden"
                                    >
                                        <FiArrowLeft />
                                    </button>


                                    <Link
                                        to={`/${loggedInUser.role}/profile/${selectedUser._id}`}
                                        className="
          flex
          items-center
          gap-3
          hover:bg-gray-100
          px-2
          py-1
          rounded-md
          "
                                    >

                                        <img
                                            src={
                                                selectedUser.profileImage ||
                                                "https://ik.imagekit.io/fybgmadbnl26/samarthya/avatar-cover/ChatGPT%20Image%20May%207,%202026,%2001_17_32%20AM-resized.PNG"
                                            }
                                            className="
              w-10
              h-10
              rounded-full
              object-cover
              "
                                        />

                                        <div>
                                            <p className="font-semibold text-sm">
                                                {selectedUser.name}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                View profile
                                            </p>
                                        </div>

                                    </Link>

                                </div>


                                {/* RIGHT SIDE */}

                                <FaTrash
                                    onClick={handleDeleteChat}
                                    className="
       cursor-pointer
       text-red-600
       text-lg
       hover:scale-110
       transition
       "
                                />

                            </div>


                            <ChatPage
                                userId={
                                    selectedUser._id
                                }
                            />
                        </>

                        :

                        <div
                            className="
hidden
lg:flex
flex-1
justify-center
items-center
text-2xl
text-blue-300
font-medium
"
                        >

                            Select chat

                        </div>

                }

            </div>

        </div>

    );

};

export default MessagesLayout;
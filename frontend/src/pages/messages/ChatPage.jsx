import React,
{
    useEffect,
    useState,
    useContext,
    useRef
}
    from "react";

import axios from "axios";

import { SocketContext } from "../../context/SocketContext";

import { FiPaperclip } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";

const ChatPage = ({ userId }) => {

    const socket =
        useContext(
            SocketContext
        );

    const [
        messages,
        setMessages
    ] = useState([]);

    const [
        text,
        setText
    ] = useState("");

    const [
        selectedImage,
        setSelectedImage
    ] = useState(null);


    const currentUser =

        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const bottomRef =
        useRef();



    useEffect(() => {

        if (userId) {

            fetchMessages();

        }

    }, [userId]);



    useEffect(() => {

        socket.on("receiveMessage", (message) => {

            const senderId =
                message.sender?._id ||
                message.sender?.toString() ||
                message.sender;

            const receiverId =
                message.receiver?._id ||
                message.receiver?.toString() ||
                message.receiver;

            if (
                senderId === userId ||
                receiverId === userId
            ) {

                setMessages(prev => [
                    ...prev,
                    message
                ]);

            }

        });


        return () => {

            socket.off(
                "receiveMessage"
            );

        };

    }, [socket, userId]);




    useEffect(() => {

        bottomRef.current
            ?.scrollIntoView({

                behavior: "smooth"

            });

    }, [messages]);




    async function
        fetchMessages() {

        try {

            const res =

                await axios.get(

                    `http://localhost:3000/api/messages/${userId}`,

                    {
                        withCredentials: true
                    }

                );

            setMessages(
                res.data
            );

        }

        catch (err) {

            console.log(err);

        }

    }




    async function
        sendMessage() {

        if (
            !text.trim()
            &&
            !selectedImage
        ) return;


        try {

            const formData =
                new FormData();

            formData.append(
                "receiverId",
                userId
            );

            formData.append(
                "text",
                text
            );

            if (selectedImage) {

                formData.append(
                    "image",
                    selectedImage
                );

            }

            const res =

                await axios.post(

                    `http://localhost:3000/api/messages/send/${userId}`,

                    formData,

                    {
                        withCredentials: true
                    }

                );


            setMessages(
                prev => [
                    ...prev,
                    res.data
                ]
            );

            setText("");

            setSelectedImage(
                null
            );

        }

        catch (err) {

            console.log(err);

        }

    }


    async function shareLocation() {

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;

                try {

                    const res =
                        await axios.post(

                            `http://localhost:3000/api/messages/send-location/${userId}`,

                            {
                                latitude,
                                longitude
                            },

                            {
                                withCredentials: true
                            }

                        );

                    setMessages(prev => [
                        ...prev,
                        res.data
                    ]);

                }

                catch (err) {

                    console.log(err);

                }

            });

    }



    return (

        <div
            className="
flex
flex-col
flex-1
min-h-0
"
        >


            <div
                className="
flex-1
overflow-y-auto
scrollbar-hide
p-4
min-h-0
"
            >

                <div className="space-y-3">

                    {

                        messages.map(m => {

                            const senderId =
                                m.sender?._id ||
                                m.sender?.toString() ||
                                m.sender;

                            return (

                                <div

                                    key={m._id}

                                    className={`

flex

${senderId === currentUser.id

                                            ?

                                            "justify-end"

                                            :

                                            "justify-start"

                                        }

`}

                                >

                                    <div

                                        className={`

w-fit
max-w-[70%]
px-4
py-2
rounded-lg
wrap-break-word

${senderId === currentUser.id

                                                ?

                                                "bg-cyan-600 text-white"

                                                :

                                                "bg-gray-200"

                                            }

`}

                                    >

                                        <div>

                                            {m.image && (

                                                <img

                                                    src={m.image}

                                                    className="
            max-w-35
sm:max-w-55
w-full
rounded-lg
mb-2
object-cover
            "

                                                />

                                            )}

                                            {m.text}


                                            {m.location && (

                                                <div className="bg-white rounded-xl p-5 w-full">

                                                    <div className="flex items-center gap-2 mb-2">

                                                        <FaLocationDot
                                                            className="text-neutral-600"
                                                        />

                                                        <span className="font-medium">
                                                            Shared location
                                                        </span>

                                                    </div>

                                                    <a
                                                        href={`https://maps.google.com/?q=${m.location.latitude},${m.location.longitude}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="
      text-cyan-600
      text-sm
      font-medium
      underline
      flex justify-center items-center
      "
                                                    >
                                                        Open Location
                                                    </a>

                                                </div>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            )

                        })

                    }


                    <div ref={bottomRef} />

                </div>

            </div>




            <div
                className="
border-t
px-4
py-3
"
            >

                {
                    selectedImage && (

                        <div className="mb-3">

                            <img

                                src={
                                    URL.createObjectURL(
                                        selectedImage
                                    )
                                }

                                className="
                    h-20
                    w-20
                    object-cover
                    rounded-lg
                    border
                    "

                            />

                        </div>

                    )
                }

                <div
                    className="
        flex
        items-center
        gap-3
        "
                >

                    <label
                        className="
            p-2
            rounded-full
            hover:bg-gray-100
            cursor-pointer
            text-gray-600
            "
                    >

                        <FiPaperclip size={20} />

                        <input
                            type="file"
                            hidden
                            accept="image/*"

                            onChange={(e) =>

                                setSelectedImage(
                                    e.target.files[0]
                                )

                            }

                        />

                    </label>


                    <button
                        onClick={shareLocation}
                        className="
            p-2
            rounded-full
            hover:bg-gray-100
            text-gray-600
            "
                    >

                        <MdLocationOn size={20} />

                    </button>


                    <input

                        value={text}

                        onChange={(e) =>

                            setText(
                                e.target.value
                            )

                        }

                        placeholder="Type message..."

                        className="
            flex-1
            border
            rounded-full
            px-4
            py-2
            outline-none
            w-15
            "
                    />


                    <button

                        onClick={sendMessage}

                        className="
            bg-cyan-600
            text-white
            rounded-full
            p-3
            hover:bg-cyan-700
            "
                    >

                        <IoSend size={18} />

                    </button>

                </div>

            </div>

        </div>

    );

};

export default ChatPage;
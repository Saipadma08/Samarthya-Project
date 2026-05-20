import React,
{
    useEffect,
    useState,
    useRef
}
    from "react";

import { Link } from "react-router-dom";

import axios from "axios";

const NotificationsPage = () => {

    const [notifications,
        setNotifications
    ] = useState([]);

    const observer =
        useRef();

    const role =
        JSON.parse(
            localStorage.getItem("user")
        ).role;


    useEffect(() => {

        fetchNotifications();

        return () => {

            if (
                observer.current
            ) {

                observer.current.disconnect();

            }

        };

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

            setNotifications(
                res.data
            );

        }

        catch (err) {

            console.log(err);

        }

    }



    async function
        markRead(id) {

        try {

            await axios.put(

                `http://localhost:3000/api/notifications/read/${id}`,

                {},

                {
                    withCredentials: true
                }

            );


            setNotifications(
                prev =>

                    prev.map(

                        n =>

                            n._id === id

                                ?

                                {
                                    ...n,
                                    read: true
                                }

                                :

                                n

                    )

            );


            window.dispatchEvent(

                new Event(
                    "notification-read"
                )

            );

        }

        catch (err) {

            console.log(err);

        }

    }



    const notificationRef =
        (node) => {

            if (!node)
                return;


            observer.current =
                new IntersectionObserver(

                    (entries) => {

                        entries.forEach(

                            (entry) => {

                                if (

                                    entry.isIntersecting

                                    &&

                                    entry.target.dataset.read
                                    ===
                                    "false"

                                ) {

                                    markRead(

                                        entry.target.dataset.id

                                    );

                                }

                            }

                        );

                    },

                    {
                        threshold: 0.7
                    }

                );


            observer.current.observe(
                node
            );

        };



    const getNotificationLink = (notification) => {

        switch (notification.type) {

            case "job_completion_request":
                return "/employer/applicants";

            case "job_completion_verified":
                return "/employee/applications";

            case "job_completion_denied":
                return "/employee/applications";

            // ADMIN REVIEW REQUEST
            case "review_request":
                return `/admin/account-review?userId=${notification.sender?._id}`;

            // these should NOT be clickable
            case "account_unblocked":
            case "suspension_removed":
            case "review_approved":
            case "review_rejected":
                return null;

            default:
                return `/${role}/profile-view/${notification.sender?._id}`;
        }
    };



    return (

        <div
            className="
            max-w-3xl
            mx-auto
            p-0
            lg:p-5
            "
        >

            <h1
                className="
                text-2xl
                font-bold
                mb-6
                "
            >

                Notifications

            </h1>


            {notifications.length === 0
                ?

                <p>
                    No notifications
                </p>

                :

                notifications.map((n) => {

                    const link =
                        getNotificationLink(n);

                    return (

                        link ?

                            (

                                <Link
                                    key={n._id}
                                    to={link}
                                >

                                    <div

                                        ref={
                                            notificationRef
                                        }

                                        data-id={
                                            n._id
                                        }

                                        data-read={
                                            n.read
                                        }

                                        className={`

                    border-b
                    border-b-cyan-600
                    rounded-md
                    shadow-neutral-200
                    shadow-sm
                    p-4
                    mb-5
                    text-sm
                    lg:text-md

                    ${!n.read
                                                ?
                                                "bg-blue-50"
                                                :
                                                "bg-white"}

                    cursor-pointer

                    `}

                                    >

                                        <div className="
                    flex
                    items-center
                    gap-3
                    ">

                                            <img

                                                src={

                                                    n.sender
                                                        ?.profileImage ||

                                                    "https://ik.imagekit.io/fybgmadbnl26/samarthya/avatar-cover/ChatGPT%20Image%20May%207,%202026,%2001_17_32%20AM-resized.PNG"

                                                }

                                                className="
                            w-11
                            h-11
                            rounded-full
                            "

                                            />

                                            <div>

                                                <p>

                                                    <b>

                                                        {

                                                            n.type === "account_unblocked"

                                                                ||

                                                                n.type === "suspension_removed"

                                                                ?

                                                                "Samarthya Team"

                                                                :

                                                                n.sender?.name

                                                        }

                                                    </b>

                                                    {" "}

                                                    {n.text}

                                                </p>

                                                <p className="
                            text-xs
                            text-gray-500
                            ">

                                                    {

                                                        new Date(
                                                            n.createdAt
                                                        )

                                                            .toLocaleString()

                                                    }

                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </Link>

                            )

                            :

                            (

                                <div
                                    key={n._id}
                                >

                                    <div

                                        ref={
                                            notificationRef
                                        }

                                        data-id={
                                            n._id
                                        }

                                        data-read={
                                            n.read
                                        }

                                        className="

                    border-b
                    border-b-cyan-600
                    rounded-md
                    shadow-neutral-200
                    shadow-sm
                    p-4
                    mb-5
                    text-sm
                    lg:text-md
                    bg-white

                    "

                                    >

                                        <div className="
                    flex
                    items-center
                    gap-3
                    ">

                                            <img

                                                src="https://ik.imagekit.io/fybgmadbnl26/samarthya/avatar-cover/ChatGPT%20Image%20May%207,%202026,%2001_17_32%20AM-resized.PNG"

                                                className="
                            w-11
                            h-11
                            rounded-full
                            "

                                            />

                                            <div>

                                                <p>

                                                    <b>

                                                        Samarthya Team

                                                    </b>

                                                    {" "}

                                                    {n.text}

                                                </p>

                                                <p className="
                            text-xs
                            text-gray-500
                            ">

                                                    {

                                                        new Date(
                                                            n.createdAt
                                                        )

                                                            .toLocaleString()

                                                    }

                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )

                    );

                })

            }

        </div>

    );

};

export default NotificationsPage;
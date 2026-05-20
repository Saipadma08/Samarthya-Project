import React, {
    useEffect,
    useState,
    useRef
} from "react";

import axios from "axios";
import { useSearchParams } from "react-router-dom";

const DisabledAccounts = () => {

    const [activeTab, setActiveTab] =
        useState("blocked");

    const [users, setUsers] =
        useState([]);

    const [searchParams] =
        useSearchParams();

    const targetUserId =
        searchParams.get("userId");

    const targetType =
        searchParams.get("type");

    const refs = useRef({});


    useEffect(() => {

        if (targetType) {

            setActiveTab(
                targetType
            );

        }

    }, []);



    useEffect(() => {

        fetchUsers();

    }, [activeTab]);



    const fetchUsers =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const res =
                    await axios.get(

                        `http://localhost:3000/api/user-management/disabled/${activeTab}`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }

                    )

                let fetchedUsers =
                    res.data;

                if (targetUserId) {

                    fetchedUsers =
                        fetchedUsers.filter(

                            u =>

                                u._id ===
                                targetUserId

                        );

                }

                setUsers(
                    fetchedUsers
                );

            }

            catch (err) {

                console.log(
                    err.response?.data
                );

            }

        };



    useEffect(() => {

        if (
            targetUserId &&
            refs.current[targetUserId]
        ) {

            setTimeout(() => {

                refs.current[
                    targetUserId
                ]?.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            }, 500);

        }

    }, [users]);



    const handleUnblock =
        async (id) => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await axios.put(    
                    `http://localhost:3000/api/user-management/unblock/${id}`,

                    {},

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }

                );

                fetchUsers();

            } catch (err) {

                console.log(err);

            }

        };


    const handleRemoveSuspension =
        async (id) => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await axios.put(

                    `http://localhost:3000/api/report/remove-suspension/${id}`,

                    {},

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }

                );

                fetchUsers();

            } catch (err) {

                console.log(err);

            }

        };



    return (

        <div className="p-8">

            <h1 className="
text-3xl
font-bold
mb-6
">

                Disabled Accounts

            </h1>


            <div className="
flex
gap-5
mb-8
">

                <button

                    onClick={() => setActiveTab(
                        "blocked"
                    )}

                    className={`
px-6 py-2 rounded-xl

${activeTab === "blocked"

                            ?

                            "bg-red-500 text-white"

                            :

                            "bg-gray-200"

                        }
`}

                >

                    Blocked

                </button>


                <button

                    onClick={() => setActiveTab(
                        "suspended"
                    )}

                    className={`
px-6 py-2 rounded-xl

${activeTab === "suspended"

                            ?

                            "bg-orange-500 text-white"

                            :

                            "bg-gray-200"

                        }
`}

                >

                    Suspended

                </button>


            </div>



            <div className="space-y-5">

                {
                    users.length === 0 ?

                        (

                            <div className="
        bg-white
        p-8
        rounded-xl
        shadow
        ">

                                No users found

                            </div>

                        )

                        :

                        users.map(user => (

                            <div

                                key={user._id}

                                ref={(el) =>

                                    refs.current[
                                    user._id
                                    ] = el
                                }

                                className={`
bg-white
shadow-lg
rounded-2xl
p-5
border

${targetUserId === user._id

                                        ?

                                        "border-red-500"

                                        :

                                        "border-gray-100"

                                    }

`}
                            >

                                <div className="
flex
justify-between
items-center
">

                                    <div>

                                        <div

                                            onClick={() =>
                                                window.location.href =
                                                `/admin/profile-view/${user._id}`
                                            }

                                            className="
        flex
        items-center
        gap-4
        cursor-pointer
        hover:bg-gray-50
        rounded-xl
        p-2
        transition
        "

                                        >

                                            <img

                                                src={
                                                    user.profileImage ||

                                                    "https://ik.imagekit.io/fybgmadbnl26/samarthya/avatar-cover/ChatGPT%20Image%20May%207,%202026,%2001_17_32%20AM-resized.PNG"
                                                }

                                                alt="profile"

                                                className="
            w-16
            h-16
            rounded-full
            object-cover
            "

                                            />


                                            <div>

                                                <h2 className="
            font-bold
            text-lg
            hover:text-cyan-600
            ">

                                                    {user.name}

                                                </h2>

                                                <p className="text-gray-600">

                                                    {user.email}

                                                </p>

                                            </div>

                                        </div>


                                        <p className="mt-4">

                                            <span className="font-medium">

                                                Reason:

                                            </span>

                                            {" "}

                                            {

                                                activeTab === "blocked"

                                                    ?

                                                    user.blockReason ||

                                                    "No reason provided"

                                                    :

                                                    user.suspensionReason ||

                                                    "No reason provided"

                                            }

                                        </p>

                                        {

                                            user.appealRejectCount > 0

                                            &&

                                            <div className="
mt-4
bg-red-50
border
border-red-200
rounded-xl
p-3 
">

                                                <p className="
font-medium
text-red-700
">

                                                    Appeal History

                                                </p>

                                                <p className="text-sm">

                                                    Rejected Attempts:
                                                    {user.appealRejectCount}

                                                </p>

                                                <p className="text-sm">

                                                    Current Status:

                                                    {user.deactivationAppealStatus}

                                                </p>

                                                {

                                                    user.lastAppealRejectedAt &&

                                                    <p className="
text-sm
text-gray-600
">

                                                        Last Rejected:

                                                        {

                                                            new Date(
                                                                user.lastAppealRejectedAt
                                                            ).toLocaleString()

                                                        }

                                                    </p>

                                                }

                                            </div>

                                        }

                                    </div>


                                    <div className="
flex
gap-3
">

                                        {
                                            activeTab === "blocked"

                                                ?

                                                <button

                                                    onClick={() =>
                                                        handleUnblock(
                                                            user._id
                                                        )
                                                    }

                                                    className="
bg-green-500
text-white
px-4
py-2
rounded-lg
"

                                                >

                                                    Unblock

                                                </button>

                                                :

                                                <button

                                                    onClick={() =>
                                                        handleRemoveSuspension(
                                                            user._id
                                                        )
                                                    }

                                                    className="
bg-orange-500
text-white
px-4
py-2
rounded-lg
"

                                                >

                                                    Remove Suspension

                                                </button>

                                        }

                                    </div>

                                </div>

                            </div>

                        ))

                }

            </div>

        </div>

    );

};

export default DisabledAccounts
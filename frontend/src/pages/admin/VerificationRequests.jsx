import React,
{
    useEffect,
    useState
}
    from "react";

import axios from "axios";
import toast from "react-hot-toast";

const VerificationRequests = () => {

    const [users, setUsers] =
        useState([]);

    const fetchUsers =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const res =
                    await axios.get(

                        "http://localhost:3000/api/verification",

                        {

                            headers: {

                                Authorization:
                                    `Bearer ${token}`

                            }

                        }

                    );

                setUsers(
                    res.data
                );

            }

            catch (err) {

                console.log(err);

                toast.error(
                    "Failed to load users"
                );

            }

        };



    useEffect(() => {

        fetchUsers();

    }, []);



    const handleAction =
        async (

            id,
            action

        ) => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );


                const res = await axios.put(

                    `http://localhost:3000/api/verification/${id}`,

                    {

                        action

                    },

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data)
                );


                toast.success(

                    action === "approve"

                        ?

                        "User verified"

                        :

                        "Verification rejected"

                );


                fetchUsers();

            }

            catch (err) {

                console.log(err);

                toast.error(
                    "Action failed"
                );

            }

        };



    return (

        <div className="
w-full
p-6
min-h-screen
bg-gray-50
">

            <h1 className="
text-4xl
font-bold
mb-8
">

                Verification Requests

            </h1>


            {

                users.length === 0

                    ?

                    <div className="
bg-white
p-8
rounded-xl
shadow
">

                        No pending requests

                    </div>

                    :

                    <div className="
flex
flex-col
gap-6
">

                        {

                            users.map(

                                (user) => (

                                    <div

                                        key={user._id}

                                        className="
bg-white
rounded-xl
shadow-md
p-6
flex
justify-between
items-center
"

                                    >

                                        <div
                                            className="
flex
gap-4
items-center
"
                                        >

                                            <img

                                                src={

                                                    user.profileImage ||

                                                    "https://ik.imagekit.io/fybgmadbnl26/samarthya/avatar-cover/ChatGPT%20Image%20May%207,%202026,%2001_17_32%20AM-resized.PNG" +
                                                    user.name

                                                }

                                                alt=""

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
text-xl
">

                                                    {user.name}

                                                </h2>


                                                <p className="
text-gray-600
">

                                                    {user.email}

                                                </p>


                                                <p className="
text-sm
text-cyan-600
mt-2
">

                                                    {user.role}

                                                </p>

                                            </div>

                                        </div>


                                        <div
                                            className="
flex
gap-3
"
                                        >

                                            <button

                                                onClick={() =>

                                                    window.open(

                                                        `/admin/profile-view/${user._id}`,

                                                        "_blank"

                                                    )

                                                }

                                                className="
bg-blue-500
text-white
px-4
py-2
rounded
"

                                            >

                                                View Profile

                                            </button>


                                            <button

                                                onClick={() =>

                                                    handleAction(

                                                        user._id,

                                                        "approve"

                                                    )

                                                }

                                                className="
bg-green-500
text-white
px-4
py-2
rounded
"

                                            >

                                                Approve

                                            </button>


                                            <button

                                                onClick={() =>

                                                    handleAction(

                                                        user._id,

                                                        "reject"

                                                    )

                                                }

                                                className="
bg-red-500
text-white
px-4
py-2
rounded
"

                                            >

                                                Reject

                                            </button>

                                        </div>

                                    </div>

                                )

                            )

                        }

                    </div>

            }

        </div>

    )

}

export default VerificationRequests;
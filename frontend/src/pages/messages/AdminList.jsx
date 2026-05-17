import { useEffect, useState } from "react";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AdminList = () => {

    const [
        admins,
        setAdmins
    ] = useState([]);

    const navigate =
        useNavigate();

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("user")
        );

    const filteredAdmins =
        admins.filter(
            admin =>
                admin._id !== loggedInUser.id
        );

    useEffect(() => {

        fetchAdmins();

    }, []);


    async function fetchAdmins() {

        try {

            const res =
                await axios.get(
                    "http://localhost:3000/api/auth/admins",
                    {
                        withCredentials: true
                    }
                );

            setAdmins(
                res.data
            );

        }
        catch (err) {

            console.log(err);

        }

    }


    return (

        <div
            className="
bg-white
rounded-xl
p-6
shadow-sm
"
        >

            <div
                onClick={() => navigate(-1)}
                className="
                        flex
                        items-center
                        gap-2
                        text-cyan-600
                        cursor-pointer
                        mb-4
                        hover:text-cyan-700
                        w-fit
                        "
            >
                <IoArrowBack size={22} />
                <span>Back</span>
            </div>

            <h2
                className="
text-2xl
font-semibold
mb-6
"
            >

                All Admins

            </h2>

            {

                filteredAdmins.map(
                    admin => (

                        <div

                            key={admin._id}

                            className="
flex
justify-between
items-center
border-b
py-4
"

                        >

                            <div
                                className="
flex
items-center
gap-3
"
                            >

                                <img

                                    src={

                                        admin.profileImage ||
                                        "https://ik.imagekit.io/fybgmadbnl26/samarthya/avatar-cover/ChatGPT%20Image%20May%207,%202026,%2001_17_32%20AM-resized.PNG"

                                    }

                                    alt=""

                                    className="
w-14
h-14
rounded-full
object-cover
"

                                />

                                <div>

                                    <p
                                        className="
font-medium
"
                                    >

                                        {admin.name}

                                    </p>

                                    <p
                                        className="
text-gray-500
"
                                    >

                                        Admin

                                    </p>

                                </div>

                            </div>


                            <button

                                onClick={() =>

                                    navigate(

                                        `/admin/messages`,
                                        {
                                            state: {
                                                user: {
                                                    _id: admin._id,
                                                    name: admin.name,
                                                    profileImage: admin.profileImage
                                                }
                                            }
                                        }

                                    )

                                }

                                className="
bg-cyan-600
text-white
px-5
py-2
rounded-md
"

                            >

                                Message

                            </button>

                        </div>

                    ))

            }

        </div>

    );

}

export default AdminList;
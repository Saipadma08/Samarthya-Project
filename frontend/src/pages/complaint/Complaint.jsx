import React,
{
    useEffect,
    useState
}
    from "react";

import axios
    from "axios";

import { Link } from "react-router-dom";


const Complaint = () => {

    const [
        activeTab,
        setActiveTab
    ] = useState(
        "against"
    );

    const [
        data,
        setData
    ] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {

        fetchData();

    }, [activeTab]);


    async function fetchData() {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const url =

                activeTab === "against"

                    ?

                    "http://localhost:3000/api/report/complaints"

                    :

                    "http://localhost:3000/api/report/my-reports";


            const res =

                await axios.get(

                    url,

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );

            setData(
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
max-w-4xl
mx-auto
"
        >

            <h1
                className="
text-2xl
font-bold
mb-6
"
            >

                Complaints

            </h1>


            <div
                className="
flex
gap-3
mb-6
"
            >

                <button

                    onClick={() => {

                        setActiveTab(
                            "against"
                        )

                    }}

                    className={

                        activeTab === "against"

                            ?

                            "bg-cyan-600 text-white px-4 py-2 rounded"

                            :

                            "bg-gray-200 px-4 py-2 rounded"

                    }

                >

                    Reports Against Me

                </button>


                <button

                    onClick={() => {

                        setActiveTab(
                            "reported"
                        )

                    }}

                    className={

                        activeTab === "reported"

                            ?

                            "bg-cyan-600 text-white px-4 py-2 rounded"

                            :

                            "bg-gray-200 px-4 py-2 rounded"

                    }

                >

                    Reported By Me

                </button>

            </div>



            <div
                className="
space-y-4
"
            >

                {

                    <div className="space-y-5">

                        {
                            data.length === 0 ?

                                <div
                                    className="
bg-white
rounded-2xl
shadow
p-10
text-center
text-gray-500
"
                                >

                                    No reports found

                                </div>

                                :

                                data.map((report) => (

                                    <div
                                        key={report._id}

                                        className="
bg-white
rounded-2xl
shadow-md
border
border-gray-100
p-5
space-y-4
"
                                    >

                                        <div
                                            className="
flex
justify-between
items-center
"
                                        >

                                            <div>

                                                <h2
                                                    className="
font-semibold
text-lg
"
                                                >

                                                    {
                                                        activeTab === "against"

                                                            ?

                                                            report.reporter?.name

                                                            :

                                                            report.reportedUser?.name

                                                    }

                                                </h2>


                                                <p
                                                    className="
text-sm
text-gray-500
"
                                                >

                                                    {
                                                        activeTab === "against"

                                                            ?

                                                            "Reported you"

                                                            :

                                                            "You reported"
                                                    }

                                                </p>

                                            </div>


                                            <span
                                                className={`

px-3
py-1
rounded-full
text-xs
font-medium

${report.status === "pending"

                                                        ?

                                                        "bg-yellow-100 text-yellow-700"

                                                        :

                                                        report.status === "cleared"

                                                            ?

                                                            "bg-green-100 text-green-700"

                                                            :

                                                            report.status === "blocked"

                                                                ?

                                                                "bg-red-100 text-red-700"

                                                                :

                                                                "bg-orange-100 text-orange-700"

                                                    }

`}
                                            >

                                                {report.status}

                                            </span>

                                        </div>


                                        <div
                                            className="
grid
grid-cols-2
gap-4
text-sm
"
                                        >

                                            <div>

                                                <p className="text-gray-400">
                                                    Category
                                                </p>

                                                <p className="font-medium">
                                                    {report.category}
                                                </p>

                                            </div>


                                            <div>

                                                <p className="text-gray-400">
                                                    Target
                                                </p>

                                                <p className="font-medium">
                                                    {report.targetType}
                                                </p>

                                            </div>

                                        </div>


                                        <div>

                                            <p className="text-gray-400 text-sm">

                                                Description

                                            </p>

                                            <p>

                                                {
                                                    report.description ||

                                                    "No details provided"
                                                }

                                            </p>

                                        </div>

                                        <div className="pt-2">

                                            {

                                                report.targetType === "post"

                                                    ?

                                                    <Link

                                                        to={`/${currentUser.role}/post/${report.targetId?._id}`}

                                                        className="
text-cyan-600
font-medium
hover:underline
"

                                                    >

                                                        View Reported Post

                                                    </Link>

                                                    :

                                                    <Link

                                                        to={`/${currentUser.role}/profile-view/${report.reportedUser?._id}`}

                                                        className="
text-cyan-600
font-medium
hover:underline
"

                                                    >

                                                        View Profile

                                                    </Link>

                                            }

                                        </div>


                                        <div
                                            className="
text-xs
text-gray-400
pt-2
border-t
"
                                        >

                                            {
                                                new Date(
                                                    report.createdAt
                                                ).toLocaleString(
                                                    "en-IN"
                                                )
                                            }

                                        </div>

                                    </div>

                                ))

                        }

                    </div>

                }

            </div>

        </div>

    );

};

export default Complaint
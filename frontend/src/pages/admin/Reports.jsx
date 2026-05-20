import React,
{
    useEffect,
    useState
}
    from "react";

import axios from "axios";

import {
    Link
}
    from "react-router-dom";

import {
    toast
}
    from "react-toastify";


const Reports = () => {

    const [
        reports,
        setReports
    ] = useState([]);

    const [
        showSuspendPopup,
        setShowSuspendPopup
    ] = useState(false);

    const [
        selectedReport,
        setSelectedReport
    ] = useState(null);

    const [
        days,
        setDays
    ] = useState(7);



    useEffect(() => {

        fetchReports();

    }, []);



    async function fetchReports() {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const res =

                await axios.get(

                    "http://localhost:3000/api/report/all",

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );

            setReports(
                res.data
            );

        }

        catch (err) {

            console.log(err);

        }

    }



    async function handleAction(
        url
    ) {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            await axios.put(

                url,

                {},

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );

            toast.success(
                "Updated"
            );

            fetchReports();

        }

        catch (err) {

            console.log(err);

        }

    }



    async function handleSuspend() {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            await axios.put(

                `http://localhost:3000/api/report/suspend/${selectedReport}`,

                {

                    days

                },

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );

            toast.success(
                "User suspended"
            );

            setShowSuspendPopup(
                false
            );

            fetchReports();

        }

        catch (err) {

            console.log(err);

        }

    }



    return (

        <div
            className="
space-y-5
pb-8
"
        >

            <h1
                className="
text-2xl
font-bold
"
            >

                Reports

            </h1>


            {

                reports.length === 0

                    ?

                    <div
                        className="
bg-white
rounded-2xl
shadow-md
p-10
text-center
text-gray-500
"
                    >

                        No reports available

                    </div>

                    :

                    reports.map((report) => (

                        <div

                            key={report._id}

                            className="
bg-white
rounded-2xl
shadow-md
border
border-gray-100
p-4
md:p-6
space-y-5
"

                        >

                            <div
                                className="
flex
flex-col
md:flex-row
md:justify-between
gap-4
"
                            >

                                <div>

                                    <h2
                                        className="
font-bold
text-xl
"
                                    >

                                        {report.reportedUser?.name}

                                    </h2>

                                    <p
                                        className="
text-gray-500
text-sm
"
                                    >

                                        reported by
                                        {" "}
                                        {report.reporter?.name}

                                    </p>

                                </div>



                                <span
                                    className={`

self-start

px-4
py-1
rounded-full
text-xs

${report.status === "pending"

                                            ?

                                            "bg-yellow-100 text-yellow-700"

                                            :

                                            report.status === "blocked"

                                                ?

                                                "bg-red-100 text-red-700"

                                                :

                                                report.status === "suspended"

                                                    ?

                                                    "bg-orange-100 text-orange-700"

                                                    :

                                                    "bg-green-100 text-green-700"

                                        }

`}
                                >

                                    {report.status}

                                </span>

                            </div>




                            <div
                                className="
grid
grid-cols-1
md:grid-cols-2
gap-5
"
                            >

                                <div>

                                    <p
                                        className="
text-gray-400
text-sm
"
                                    >

                                        Category

                                    </p>

                                    <p>

                                        {report.category}

                                    </p>

                                </div>



                                <div>

                                    <p
                                        className="
text-gray-400
text-sm
"
                                    >

                                        Target

                                    </p>

                                    <p>

                                        {report.targetType}

                                    </p>

                                </div>

                            </div>




                            <div>

                                <p
                                    className="
text-gray-400
text-sm
"
                                >

                                    Description

                                </p>

                                <p>

                                    {

                                        report.description ||

                                        "No details"

                                    }

                                </p>

                            </div>




                            <div>

                                {

                                    report.targetType === "post"

                                        ?

                                        <Link

                                            to={`/admin/post/${report.targetId?._id}`}

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

                                            to={`/admin/profile-view/${report.reportedUser?._id}`}

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
border-t
pt-4
flex
flex-wrap
gap-3
"
                            >

                                <button

                                    onClick={() =>

                                        handleAction(

                                            `http://localhost:3000/api/report/clear/${report._id}`

                                        )

                                    }

                                    className="
px-4
py-2
rounded-lg
bg-cyan-600
text-white
flex-1
sm:flex-none
"
                                >

                                    Clear

                                </button>



                                <button

                                    onClick={() =>

                                        handleAction(

                                            `http://localhost:3000/api/report/block/${report._id}`

                                        )

                                    }

                                    className="
px-4
py-2
rounded-lg
bg-red-500
text-white
flex-1
sm:flex-none
"
                                >

                                    Block

                                </button>



                                <button

                                    onClick={() => {

                                        setSelectedReport(
                                            report._id
                                        );

                                        setShowSuspendPopup(
                                            true
                                        );

                                    }}

                                    className="
px-4
py-2
rounded-lg
bg-orange-500
text-white
flex-1
sm:flex-none
"
                                >

                                    Suspend

                                </button>


                                {

                                    report.status === "blocked"

                                    &&

                                    <button

                                        onClick={() =>

                                            handleAction(

                                                `http://localhost:3000/api/report/unblock/${report._id}`

                                            )

                                        }

                                        className="
px-4
py-2
rounded-lg
bg-blue-500
text-white
flex-1
sm:flex-none
"

                                    >

                                        Unblock

                                    </button>

                                }



                                {

                                    report.status === "suspended"

                                    &&

                                    <button

                                        onClick={() =>

                                            handleAction(

                                                `http://localhost:3000/api/report/remove-suspension/${report._id}`

                                            )

                                        }

                                        className="
px-4
py-2
rounded-lg
bg-purple-500
text-white
flex-1
sm:flex-none
"

                                    >

                                        Remove Suspension

                                    </button>

                                }

                            </div>

                        </div>

                    ))

            }




            {

                showSuspendPopup &&

                <div
                    className="
fixed
inset-0
bg-black/40
flex
justify-center
items-center
z-50
"
                >

                    <div
                        className="
bg-white
rounded-xl
p-6
w-[90%]
max-w-sm
space-y-4
"
                    >

                        <h2
                            className="
font-semibold
text-lg
"
                        >

                            Suspend User

                        </h2>

                        <input

                            type="number"

                            value={days}

                            onChange={(e) => {

                                setDays(
                                    e.target.value
                                )

                            }}

                            className="
w-full
border
rounded-lg
p-3
"

                            placeholder="
Enter days
"
                        />


                        <div
                            className="
flex
justify-end
gap-3
"
                        >

                            <button

                                onClick={() => {

                                    setShowSuspendPopup(
                                        false
                                    )

                                }}

                                className="
px-4
py-2
bg-gray-200
rounded-lg
"
                            >

                                Cancel

                            </button>


                            <button

                                onClick={
                                    handleSuspend
                                }

                                className="
px-4
py-2
bg-orange-500
text-white
rounded-lg
"

                            >

                                Suspend

                            </button>

                        </div>

                    </div>

                </div>

            }

        </div>

    )

};


export default Reports;
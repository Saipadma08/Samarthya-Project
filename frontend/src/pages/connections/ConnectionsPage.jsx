import React from "react";
import { useState } from "react";

import MyConnections from "../../components/connections/MyConnections";

import Requests from "../../components/connections/Requests";

const ConnectionsPage = () => {

    

    const [activeTab, setActiveTab]
        =
        useState("connections");


    return (

        <div
            className=" flex flex-col lg:flex-row gap-5 h-full "
        >


            {/* left side */}

            <div
                className="w-full lg:w-[30%] rounded-md grid grid-cols-2 lg:grid-cols-1 gap-15 lg:gap-5 shadow-sm shadow-gray-300 p-4 "
            >

                <button

                    onClick={() =>
                        setActiveTab(
                            "connections"
                        )
                    }

                    className={`flex justify-center items-center p-2 rounded-lg transition h-8 lg:h-10 shadow-sm shadow-gray-300

                        ${activeTab === "connections"

                            ?

                            "bg-cyan-600 text-white"

                            :

                            "bg-white text-black hover:bg-gray-100"

                        }

                    `}

                >

                    My Connections

                </button>


                <button

                    onClick={() =>
                        setActiveTab(
                            "requests"
                        )
                    }

                    className={`flex justify-center items-center p-2 rounded-lg transition h-8 lg:h-10 shadow-sm shadow-gray-300

                    ${activeTab === "requests"

                            ?

                            "bg-cyan-600 text-white"

                            :

                            "bg-white text-black hover:bg-gray-100"

                        }

                    `}

                >

                    Requests

                </button>

            </div>



            {/* right side */}

            <div
                className="w-full lg:w-[70%] rounded-md shadow-sm shadow-gray-300 p-4 lg:px-10 "
            >

                {
                    activeTab === "connections"

                    &&

                    <MyConnections />
                }


                {
                    activeTab === "requests"

                    &&

                    <Requests />
                }

            </div>


        </div>

    )

}

export default ConnectionsPage;
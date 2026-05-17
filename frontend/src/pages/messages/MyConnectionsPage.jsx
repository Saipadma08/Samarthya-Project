import React from 'react'
import MyConnections from '../../components/connections/MyConnections'

import { IoArrowBack } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';

const MyConnectionsPage = () => {

    const navigate = useNavigate();

    return (
        <div>

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

            <MyConnections />
        </div>
    )
}

export default MyConnectionsPage

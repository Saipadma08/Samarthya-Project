import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectionsCount = () => {

    const [connectionsCount, setConnectionsCount] = useState(0);

    const loggedInUser = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {

        fetchConnectionsCount();

    }, [loggedInUser]);

    async function fetchConnectionsCount() {

        try {

            const res =
                await axios.get(

                    `http://localhost:3000/api/connections/count/${loggedInUser.id}`,

                    {
                        withCredentials: true
                    }

                );

            setConnectionsCount(
                res.data.count
            );

        }

        catch (err) {

            console.log(err);

        }

    }

    return (
        <div className="flex gap-6">

            <div>

                <p className="font-bold text-lg">
                    {connectionsCount}
                </p>

                { connectionsCount === 1 ? 
                    <p className="text-sm text-gray-500">
                        Connection
                    </p> : 
                    <p className="text-sm text-gray-500">
                        Connections
                    </p>
                }

            </div>

        </div>
    )
}

export default ConnectionsCount

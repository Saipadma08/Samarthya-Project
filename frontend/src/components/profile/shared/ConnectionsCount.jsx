import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectionsCount = ({ userId }) => {

    const [connectionsCount, setConnectionsCount] = useState(0);

    useEffect(() => {

        if(userId){

            fetchConnectionsCount();

        }

    }, [userId]);


    async function fetchConnectionsCount() {

        try {

            const res =
                await axios.get(

                    `http://localhost:3000/api/connections/count/${userId}`,

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

                <p className="text-sm text-gray-500">

                    {
                    connectionsCount === 1
                    ?
                    "Connection"
                    :
                    "Connections"
                    }

                </p>

            </div>

        </div>

    );

}

export default ConnectionsCount;
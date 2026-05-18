import { useEffect, useState } from "react";
import axios from "axios";

const PostConnectionButton = ({ authorId }) => {

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

    const [status,setStatus] =
        useState("none");


    useEffect(()=>{

        fetchStatus();

    },[authorId]);


    const fetchStatus = async()=>{

        try{

            const res =
            await axios.get(

                `http://localhost:3000/api/connections/status/${authorId}`,

                {
                    withCredentials:true
                }

            );

            setStatus(
                res.data.status
            );

        }

        catch(err){

            console.log(err);

        }

    };


    const handleConnect = async()=>{

        try{

            await axios.post(

                `http://localhost:3000/api/connections/send/${authorId}`,

                {},

                {
                    withCredentials:true
                }

            );

            setStatus(
                "pending"
            );

        }

        catch(err){

            console.log(err);

        }

    };


    if(status==="connected"){

        return(

            <button
            className="
            w-26
            h-8
            px-4
            py-2
            flex justify-center items-center
            rounded-lg
            text-gray-600
            border
            cursor-default
            "
            >

                Connected

            </button>

        );

    }


    if(status==="pending"){

        return(

            <button
            className="
            bg-gray-300
            w-26
            h-8
            px-4
            py-2
            flex justify-center items-center
            rounded-lg
            text-white
            "
            >

                Pending

            </button>

        );

    }

    if(loggedInUser?.role === "admin"){
        return null;
    }


    return(

        <button

        onClick={handleConnect}

        className="
        w-26
        h-8
        flex justify-center items-center
        bg-cyan-600
        text-white
        px-4
        py-2
        rounded-lg
        hover:bg-cyan-700
        "

        >

            Connect

        </button>

    );

};

export default PostConnectionButton;
import React,
{
    useEffect,
    useState
}
from "react";

import axios
from "axios";

import {
    useParams
}
from "react-router-dom";

import PostCard
from "../../components/feed/PostCard";


const UserPostsPage=()=>{

    const[
        posts,
        setPosts
    ]=useState([]);

    const{
        userId
    }=useParams();


    useEffect(()=>{

        fetchPosts();

    },[userId]);


    const fetchPosts=
    async()=>{

        try{

            const token=
            localStorage.getItem(
                "token"
            );

            const res=
            await axios.get(

                `http://localhost:3000/api/feed-posts/user/${userId}`,

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );

            setPosts(
                res.data.posts
            );

        }

        catch(err){

            console.log(err);

        }

    };


    return(

        <div
        className="
        max-w-3xl
        mx-auto
        space-y-5
        "
        >

            <h1
            className="
            text-cyan-600
            bg-white
            text-2xl
            font-bold
            h-12
            shadow-sm shadow-gray-300
            sticky
            top-0
            z-20
            flex justify-center items-center
            "
            >

                Posts

            </h1>


            {

                posts.length===0

                ?

                <div
                className="
                bg-white
                p-6
                rounded-xl
                text-center
                text-gray-500
                "
                >

                    No posts yet

                </div>

                :

                posts.map(post=>(

                    <PostCard

                        key={
                            post._id
                        }

                        post={
                            post
                        }

                        fetchFeed={
                            fetchPosts
                        }

                    />

                ))

            }

        </div>

    );

};

export default UserPostsPage;
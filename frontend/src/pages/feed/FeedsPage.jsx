import React,
{
    useEffect,
    useState
}
    from "react";

import axios
    from "axios";

import CreatePost
    from "../../components/feed/CreatePost";

import FeedList
    from "../../components/feed/FeedList";


const FeedsPage = () => {

    const [
        posts,
        setPosts
    ] = useState([]);

    const [
        activeTab,
        setActiveTab
    ] = useState(
        "feed"
    );


    const fetchFeed =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const res =
                    await axios.get(

                        "http://localhost:3000/api/feed-posts/feed",

                        {

                            headers: {

                                Authorization:
                                    `Bearer ${token}`

                            }

                        }

                    );

                setPosts(
                    res.data.posts
                );

            }

            catch (err) {

                console.log(err);

            }

        };


    useEffect(() => {

        fetchFeed();

    }, []);



    return (

        <div
            className="
        w-[90%]
        mx-auto
        shadow-sm
        shadow-gray-300
        pb-5
        "
        >

            <div
                className="
            sticky
top-0
z-20
bg-gray-50
shadow-sm
shadow-gray-300
border-b
border-b-gray-400
flex
gap-4
mb-6
py-4
p-10
            "
            >


                <button

                    onClick={() => {

                        setActiveTab(
                            "feed"
                        );

                    }}

                    className={ `{ w-40 px-3 py-2

                        ${activeTab === "feed"

                            ?

                            "bg-cyan-600 text-white rounded-lg"

                            :

                            "bg-gray-200 rounded-lg hover:cursor-pointer"}

                        }`   }

                >

                    Feed

                </button>


                <button

                    onClick={() => {

                        setActiveTab(
                            "create"
                        );

                    }}

                    className={ `{ w-40 px-3 py-2

                        ${activeTab === "create"

                            ?

                            "bg-cyan-600 text-white rounded-lg"

                            :

                            "bg-gray-200 rounded-lg hover:cursor-pointer"}

                        }`   }

                >

                    Create Post

                </button>



            </div>

            <div className="px-0 lg:px-15">

                {

                    activeTab === "create"

                        ?

                        <CreatePost

                            fetchFeed={
                                fetchFeed
                            }

                            setActiveTab={
                                setActiveTab
                            }

                        />

                        :

                        <FeedList

                            posts={
                                posts
                            }

                            fetchFeed={
                                fetchFeed
                            }

                        />

                }

            </div>





        </div>

    );

};

export default FeedsPage;
import axios from "axios";

import { Link } from "react-router-dom";

import PostConnectionButton from "./PostConnectionButton";

import {
    FiThumbsUp,
    FiMoreVertical,
    FiTrash,
    FiFlag,
    FiShare2,
    FiEdit,
    FiMessageCircle
}
    from "react-icons/fi";

import {
    useState,
    useRef,
    useEffect
}
    from "react";


import {
    useNavigate
}
    from "react-router-dom";

import {
    toast
}
    from "react-toastify";


const PostCard = ({ post, fetchFeed }) => {

    const [reason, setReason] =
        useState("");

    const menuRef = useRef();

    const navigate = useNavigate();

    const [
        showMenu,
        setShowMenu
    ] = useState(false);

    const [showReport, setShowReport] =
        useState(false);

    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const [
        isEditing,
        setIsEditing
    ] = useState(false);

    const [
        editedText,
        setEditedText
    ] = useState(
        post.text
    );

    const [
        showComments,
        setShowComments
    ] = useState(false);

    const [
        comment,
        setComment
    ] = useState("");

    const [category, setCategory] = useState("");


    const currentUser = JSON.parse(localStorage.getItem("user"));


    const isMyPost =

        post.author._id === currentUser.id;



    useEffect(() => {

        const handleClickOutside = (e) => {

            if (

                menuRef.current &&

                !menuRef.current.contains(
                    e.target
                )

            ) {

                setShowMenu(false);

            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);



    const handleLike = async () => {

        try {

            const token =

                localStorage.getItem(
                    "token"
                );

            await axios.put(

                `http://localhost:3000/api/feed-posts/like/${post._id}`,

                {},

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );

            if (fetchFeed) {

                fetchFeed();

            }

        }

        catch (err) {

            console.log(err);

        }

    };



    const handleDelete = async () => {

        try {

            const token =

                localStorage.getItem(
                    "token"
                );

            await axios.delete(

                `http://localhost:3000/api/feed-posts/${post._id}`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );

            setShowDeletePopup(
                false
            );

            fetchFeed();

        }

        catch (err) {

            console.log(err);

        }

    }


    const handleUpdate =
        async () => {

            try {

                const token =

                    localStorage.getItem(
                        "token"
                    );

                await axios.put(

                    `http://localhost:3000/api/feed-posts/${post._id}`,

                    {

                        text:
                            editedText

                    },

                    {

                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );

                setIsEditing(
                    false
                );

                fetchFeed();

            }

            catch (err) {

                console.log(err);

            }

        }


    const handleComment = async () => {

        try {

            if (!comment.trim()) return;

            const token =
                localStorage.getItem("token");

            await axios.put(

                `http://localhost:3000/api/feed-posts/comment/${post._id}`,

                {
                    text: comment
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setComment("");

            await fetchFeed();

            setShowComments(true);

        }

        catch (err) {

            console.log(err);

        }

    }


    const handleShare = () => {

        localStorage.setItem(

            "sharePost",

            JSON.stringify({

                postId: post._id,

                text: post.text,

                image: post.image,

                author: post.author.name,

                authorImage:
                    post.author.profileImage

            })

        );

        toast.success(

            "Select a chat to share"

        );

        navigate(

            `/${currentUser.role}/messages`

        );

        setShowMenu(false);

    }


    async function submitReport() {

        try {

            if (!category) return;

            await axios.post(

                "http://localhost:3000/api/report",

                {

                    reportedUserId:
                        post.author._id,

                    targetType:
                        "post",

                    targetId:
                        post._id,

                    targetModel:
                        "FeedPost",

                    category,

                    description:
                        reason

                },

                {
                    withCredentials: true
                }

            );

            toast.success(
                "Report submitted"
            );

            setShowReport(false);

            setReason("");

            setCategory("");

        }

        catch (err) {

            console.log(err);

            toast.error(

                err.response?.data?.message ||

                "Failed"

            );

        }

    }


    return (

        <div className="bg-white rounded-xl shadow-md shadow-gray-300">

            <div
                className="
flex
justify-between
items-center
px-5
py-2
shadow-xs
shadow-gray-300
relative
"
            >

                {/* LEFT */}

                <Link
                    to={`/${currentUser.role}/profile-view/${post.author._id}`}
                >
                    <div
                        className="
    flex
    gap-3
    items-center
    "
                    >

                        <img
                            src={post.author.profileImage}
                            className="
            w-12
            h-12
            rounded-full
            "
                        />

                        <div>

                            <h2 className="font-semibold">

                                {post.author.name}

                            </h2>

                            <p className="text-sm text-gray-500">

                                {post.author.role}

                            </p>

                        </div>

                    </div>

                </Link>

                <div className="flex gap-2">


                    <div className="flex items-center gap-3 ml-auto">

                        {
                            !isMyPost &&

                            <PostConnectionButton
                                authorId={post.author._id}
                            />
                        }

                    </div>



                    {/* RIGHT THREE DOT */}

                    <div ref={menuRef} className="relative ml-auto">

                        <button

                            onClick={() => {

                                setShowMenu(
                                    !showMenu
                                )

                            }}

                            className="
        p-2
        rounded-full
        hover:bg-gray-100
        "
                        >

                            <FiMoreVertical
                                size={20}
                            />

                        </button>


                        {

                            showMenu && (

                                <div
                                    className="
            absolute
            right-0
            top-10
            bg-white
            rounded-xl
            shadow-lg
            border
            border-blue-300
            w-36
            z-50
            overflow-hidden
            "
                                >

                                    {

                                        isMyPost

                                            ?

                                            <>


                                                <button

                                                    onClick={
                                                        handleShare
                                                    }

                                                    className="
flex
items-center
gap-2
px-4
py-3
w-full
hover:bg-gray-100
"

                                                >

                                                    <FiShare2 />

                                                    Share

                                                </button>


                                                <button

                                                    onClick={() => {

                                                        setIsEditing(
                                                            true
                                                        );

                                                        setShowMenu(
                                                            false
                                                        );

                                                    }}

                                                    className="
flex
items-center
gap-2
px-4
py-3
w-full
hover:bg-gray-100
"

                                                >

                                                    <FiEdit />

                                                    Edit

                                                </button>


                                                <button

                                                    onClick={() => {

                                                        setShowDeletePopup(
                                                            true
                                                        )

                                                    }}

                                                    className="
                flex
                items-center
                gap-2
                px-4
                py-3
                w-full
                hover:bg-gray-100
                hover:cursor-pointer
                text-red-500
                "

                                                >

                                                    <FiTrash />

                                                    Delete

                                                </button>


                                            </>

                                            :

                                            <>


                                                <button

                                                    onClick={
                                                        handleShare
                                                    }

                                                    className="
flex
items-center
gap-2
px-4
py-3
w-full
hover:bg-gray-100
"

                                                >

                                                    <FiShare2 />

                                                    Share

                                                </button>


                                                <button

                                                    onClick={() => {

                                                        setShowReport(true);

                                                        setShowMenu(false);

                                                    }}

                                                    className="
flex
items-center
gap-2
px-4
py-3
w-full
hover:bg-gray-100
"

                                                >

                                                    <FiFlag />

                                                    Report

                                                </button>


                                            </>

                                    }

                                </div>

                            )

                        }

                    </div>
                </div>

            </div>

            <div className="px-5">

                <div>

                    {

                        isEditing

                            ?

                            <div
                                className="mt-4"
                            >

                                <textarea

                                    value={
                                        editedText
                                    }

                                    onChange={(e) =>

                                        setEditedText(
                                            e.target.value
                                        )

                                    }

                                    className="
w-full
border
rounded-lg
p-3
"
                                />


                                <div
                                    className="
flex
justify-end
gap-2
mt-2
"
                                >

                                    <button

                                        onClick={() => {

                                            setIsEditing(
                                                false
                                            )

                                        }}

                                        className="
px-3
py-1
bg-gray-200
rounded
"
                                    >

                                        Cancel

                                    </button>


                                    <button

                                        onClick={
                                            handleUpdate
                                        }

                                        className="
px-3
py-1
bg-cyan-600
text-white
rounded
"
                                    >

                                        Save

                                    </button>

                                </div>

                            </div>

                            :

                            <p className="mt-4">

                                {post.text}

                                {

                                    post.edited &&

                                    <span
                                        className="
text-xs
text-gray-400
ml-2
"
                                    >

                                        edited

                                    </span>

                                }

                            </p>

                    }

                </div>

                <div>

                    {

                        post.image &&

                        <img
                            src={post.image}
                            className="
                    rounded-lg
                    mt-4
                    max-h-70
                    w-full
                    object-contain
                    shadow-sm shadow-gray-300
                    "
                        />

                    }

                </div>

            </div>


            <div className="flex gap-3 mt-4 border-t px-5 py-2">
                <div className="flex flex-col gap-3">

                    <div>
                        <button
                            onClick={handleLike}
                            className="
                    flex items-center
                    gap-2
                    w-15
                    text-gray-600
                    hover:text-cyan-600
                    "
                        >
                            <FiThumbsUp />

                            {post.likes.length}
                        </button>
                    </div>

                    <div>
                        <p className="text-sm text-gray-400">
                            {
                                new Date(
                                    post.createdAt
                                ).toLocaleString(
                                    "en-IN",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        hour: "numeric",
                                        minute: "2-digit"
                                    }
                                )
                            }
                        </p>
                    </div>

                </div>


                <div className="ms-auto">
                    <button

                        onClick={() => {

                            setShowComments(

                                !showComments

                            )

                        }}

                        className="
flex
items-center
gap-2
text-gray-600
hover:text-cyan-600
"

                    >

                        <FiMessageCircle />

                        {

                            post.comments?.length || 0

                        }

                    </button>
                </div>
            </div>


            {

                showComments &&

                <div
                    className="
px-5
pb-5
border-t
space-y-3
pt-4
"
                >

                    <div
                        className="
flex
gap-2
"
                    >

                        <input

                            value={
                                comment
                            }

                            onChange={(e) =>

                                setComment(
                                    e.target.value
                                )

                            }

                            placeholder="
Write a comment...
"

                            className="
flex-1
border
rounded-lg
px-3
py-2
outline-none
"
                        />


                        <button

                            onClick={
                                handleComment
                            }

                            className="
bg-cyan-600
text-white
px-4
rounded-lg
hover:bg-cyan-700
hover:cursor-pointer
"

                        >

                            Post

                        </button>

                    </div>


                    {

                        post.comments?.map(

                            (c, index) => (

                                <div

                                    key={index}

                                    className="
flex
gap-3
"

                                >

                                    <img

                                        src={
                                            c.user?.profileImage
                                        }

                                        className="
w-8
h-8
rounded-full
"
                                    />


                                    <div
                                        className="
bg-gray-100
px-3
py-2
rounded-xl
"

                                    >

                                        <p
                                            className="
font-semibold
text-sm
"

                                        >

                                            {
                                                c.user?.name
                                            }

                                        </p>


                                        <p>

                                            {
                                                c.text
                                            }

                                        </p>

                                    </div>

                                </div>

                            )

                        )

                    }

                </div>

            }



            {

                showDeletePopup && (

                    <div
                        className="
fixed
inset-0
bg-black/40
flex
justify-center
items-center
z-100
"
                    >

                        <div
                            className="
bg-white
rounded-2xl
p-6
w-[320px]
shadow-xl
"
                        >

                            <h2
                                className="
font-bold
text-lg
mb-2
"
                            >

                                Delete post?

                            </h2>


                            <p
                                className="
text-gray-500
mb-6
"
                            >

                                This action cannot be undone.

                            </p>


                            <div
                                className="
flex
justify-end
gap-3
"
                            >

                                <button

                                    onClick={() => {

                                        setShowDeletePopup(
                                            false
                                        )

                                    }}

                                    className="
px-4
py-2
rounded-lg
bg-gray-200
"
                                >

                                    Cancel

                                </button>


                                <button

                                    onClick={
                                        handleDelete
                                    }

                                    className="
px-4
py-2
rounded-lg
bg-red-500
text-white
"
                                >

                                    Delete

                                </button>

                            </div>

                        </div>

                    </div>

                )

            }


            {
                showReport &&

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
p-5
rounded-xl
w-[90%]
md:w-[40%]
lg:w-[40%]
"
                    >

                        <h2
                            className="
text-lg
font-semibold
mb-5
text-center
"
                        >

                            Report User

                        </h2>

                        <select

                            value={category}

                            onChange={(e) =>
                                setCategory(
                                    e.target.value
                                )
                            }

                            className="
border
w-full
rounded-lg
p-3
mb-3
"

                        >

                            <option value="">
                                Select category
                            </option>

                            <option value="spam">
                                Spam
                            </option>

                            <option value="harassment">
                                Harassment
                            </option>

                            <option value="fake_account">
                                Fake Account
                            </option>

                            <option value="inappropriate">
                                Inappropriate
                            </option>

                            <option value="other">
                                Other
                            </option>

                        </select>

                        <textarea

                            value={reason}

                            onChange={(e) =>
                                setReason(
                                    e.target.value
                                )
                            }
                            className="w-full h-30 p-2 shadow-sm shadow-gray-300 rounded-md"
                            placeholder="
Additional details
"
                        />


                        <div
                            className="
flex
justify-end
gap-2
mt-4
"
                        >

                            <button

                                onClick={() => {

                                    setShowReport(false);

                                }}

                                className="
border
px-4
py-2
rounded-lg
hover:cursor-pointer
hover:shadow-sm shadow-gray-400
"

                            >

                                Cancel

                            </button>


                            <button

                                onClick={submitReport}

                                className="
bg-red-500
text-white
px-4
py-2
rounded-lg
hover:cursor-pointer
hover:shadow-sm shadow-gray-400
"

                            >

                                Submit

                            </button>

                        </div>

                    </div>

                </div>

            }



        </div>

    );
};

export default PostCard;
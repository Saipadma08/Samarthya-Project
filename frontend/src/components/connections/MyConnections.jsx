import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiMessageCircle, FiUser, FiMoreVertical } from "react-icons/fi";


const MyConnections = () => {

  const [connections, setConnections] = useState([]);

  const [openMenu, setOpenMenu] = useState(null);

  const [loading, setLoading] = useState(true);

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );


  useEffect(() => {

    fetchConnections();

  }, []);



  async function fetchConnections() {

    try {

      const res =
        await axios.get(

          "http://localhost:3000/api/connections/my-connections",

          {
            withCredentials: true
          }

        );

      setConnections(
        res.data
      );

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  }

  async function handleRemove(userId) {

    try {

      await axios.delete(

        `http://localhost:3000/api/connections/remove/${userId}`,

        {
          withCredentials: true
        }

      );

      setConnections(prev =>

        prev.filter(connection => {

          const otherUser =

            connection.senderId._id
              === currentUser.id

              ?

              connection.receiverId

              :

              connection.senderId;


          return otherUser._id !== userId;

        })

      );

    }

    catch (err) {

      console.log(err);

    }

  }

  async function handleBlock(id) {

    try {

      await axios.put(

        `http://localhost:3000/api/connections/block/${id}`,

        {},

        {
          withCredentials: true
        }

      );

      setConnections(prev =>

        prev.filter(
          c => c._id !== id
        )

      );

    }

    catch (err) {

      console.log(err);

    }

  }



  if (loading) {

    return (
      <p>
        Loading...
      </p>
    )

  }



  return (

    <div>

      <h2
        className=" text-2xl font-semibold mb-6 "
      >

        My Connections

      </h2>


      {
        connections.length === 0

          ?

          <p>
            No connections yet
          </p>

          :

          connections.map(connection => {

            const otherUser =

              connection.senderId._id
                === currentUser.id

                ?

                connection.receiverId

                :

                connection.senderId;


            return (

              <div

                key={connection._id}

                className=" flex items-center justify-between border-b py-5"

              >

                <Link

                  to={`/${currentUser.role}/profile-view/${otherUser._id}`}

                  className="flex items-center gap-4 cursor-pointer hover:bg-gray-50  rounded-lg  p-2  transition  "

                >
                  <div
                    className=" flex items-center gap-4 "
                  >

                    <img

                      src={
                        otherUser.profileImage
                        ||

                        "https://ik.imagekit.io/fybgmadbnl26/samarthya/avatar-cover/ChatGPT%20Image%20May%207,%202026,%2001_17_32%20AM-resized.PNG"
                      }

                      className=" w-10 h-10 rounded-full object-cover "
                    />


                    <div>

                      <h3
                        className="text-sm lg:text-md"
                      >

                        {otherUser.name}

                      </h3>


                      <p
                        className=" text-sm text-gray-500 "
                      >

                        {otherUser.role}

                      </p>

                    </div>

                  </div>
                </Link>




                <div
                  className=" flex gap-3 "
                >

                  <Link

                    to={`/${currentUser.role}/profile/${otherUser._id}`}

                    className=" flex justify-center items-center gap-1 bg-cyan-600 h-8 text-white text-sm px-4 py-2 rounded hover:cursor-pointer hover:bg-cyan-700 "
                  >

                    <div className="hidden sm:block">View Profile</div> <FiUser />

                  </Link>


                  <Link

                    to={`/${currentUser.role}/messages`}
                    state={{
                        user:{
                            _id:otherUser._id,
                            name:otherUser.name,
                            profileImage:otherUser.profileImage
                        }
                    }}

                    className=" flex justify-center gap-1 items-center bg-sky-500 h-8 text-white text-sm px-4 py-2 rounded hover:cursor-pointer hover:bg-sky-600 "

                  >

                    <div className="hidden sm:block">Message</div> <FiMessageCircle />

                  </Link>

                  <div className="relative">

                    <button
                      onClick={() =>

                        setOpenMenu(

                          openMenu === otherUser._id

                            ?

                            null

                            :

                            otherUser._id

                        )

                      }
                    >

                      <FiMoreVertical />

                    </button>


                    {
                      openMenu === otherUser._id

                      &&

                      <div
                        className=" absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10 "
                      >

                        <button

                          onClick={() =>
                            handleRemove(
                              otherUser._id
                            )
                          }

                          className=" w-full text-left px-4 py-3 hover:bg-gray-100 "
                        >

                          Remove Connection

                        </button>

                        <button
                          onClick={() => handleBlock(connection._id)}
                          className=" w-full text-left text-red-700 px-4 py-3 hover:bg-gray-100 ">
                          Block
                        </button>

                        <button className=" w-full text-left px-4 py-3 hover:bg-gray-100 ">
                          Report
                        </button>

                      </div>

                    }

                  </div>

                </div>

              </div>

            )

          })

      }

    </div>

  )

}

export default MyConnections;
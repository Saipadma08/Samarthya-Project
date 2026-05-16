import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlockedAccounts = () => {

  const [blockedUsers,setBlockedUsers]=
  useState([]);

  const [loading,setLoading]=
  useState(true);

  const currentUser =JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{

      fetchBlockedUsers();

  },[]);



  async function fetchBlockedUsers(){

      try{

          const res=
          await axios.get(

              "http://localhost:3000/api/block",

              {
                  withCredentials:true
              }

          );

          setBlockedUsers(
              res.data
          );

      }

      catch(err){

          console.log(err);

      }

      finally{

          setLoading(false);

      }

  }



  async function handleUnblock(userId){

      try{

          await axios.delete(

              `http://localhost:3000/api/block/${userId}`,

              {
                  withCredentials:true
              }

          );

          setBlockedUsers(prev=>

              prev.filter(

                  user=>

                  user.blocked._id
                  !==
                  userId

              )

          );

      }

      catch(err){

          console.log(err);

      }

  }


  if(loading){

      return <p>Loading...</p>;

  }


  return (

      <div>

          <h2
          className="text-2xl font-semibold mb-6"
          >

              Blocked Accounts

          </h2>


          {

          blockedUsers.length===0

          ?

          <p>
            No blocked users
          </p>

          :

          blockedUsers.map(user=>(

          <div

            key={user._id}

            className="
            flex
            items-center
            justify-between
            border-b
            py-4
            "

          >

            <Link

              to={`/${currentUser.role}/profile-view/${user.blocked._id}`}

              className="
              flex
              items-center
              gap-4
              hover:bg-gray-50
              rounded-lg
              p-2
              "

            >

            <img

              src={
                user.blocked.profileImage
                ||
                "https://ik.imagekit.io/fybgmadbnl26/samarthya/avatar-cover/ChatGPT%20Image%20May%207,%202026,%2001_17_32%20AM-resized.PNG"
              }

              className="
              w-12
              h-12
              rounded-full
              object-cover
              "

            />


            <div>

              <h3>

                {user.blocked.name}

              </h3>


              <p
              className="
              text-sm
              text-gray-500
              "
              >

                {user.blocked.role}

              </p>

            </div>

            </Link>



            <button

              onClick={()=>

              handleUnblock(

              user.blocked._id

              )

              }

              className="
              bg-gray-700
              text-white
              px-4
              py-2
              rounded
              hover:bg-gray-800
              "

            >

                Unblock

            </button>

          </div>

          ))

          }

      </div>

  );

};

export default BlockedAccounts;
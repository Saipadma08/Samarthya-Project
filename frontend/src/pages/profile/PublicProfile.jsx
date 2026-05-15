import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import axios from "axios";

import ProfilePage from "./ProfilePage";

const PublicProfile = () => {
   const { userId } = useParams();

   const [user, setUser] = useState(null);
   const [profile, setProfile] = useState(null);

   const loggedInUser = JSON.parse(localStorage.getItem("user"));

   useLayoutEffect(() => {

      const container = document.getElementById("main-content");

      if (container) {

         container.scrollTop = 0;

      }

   }, []);

   useEffect(() => {

      axios.get(`http://localhost:3000/api/profile/${userId}`)
      .then((res) => {
         setUser(res.data.user);
         setProfile(res.data.profile);
      });

   }, [userId]);

  return (
    <div>
      <div className="mb-4">

         <button
            onClick={() => window.history.back()}
            className="
               flex items-center gap-2
               text-cyan-700 font-medium
               hover:text-cyan-900
            "
         >
            ← Back
         </button>

         <p className="text-gray-500 text-sm mt-1">
            Viewing public profile
         </p>

      </div>
      <ProfilePage
         currentUser={loggedInUser}
         user={user}
         profile={profile}
         isPublicView={true}
      />
    </div>
  )
}

export default PublicProfile

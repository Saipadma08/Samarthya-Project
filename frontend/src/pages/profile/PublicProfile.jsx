import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ProfilePage from "./ProfilePage";

const PublicProfile = () => {
   const { userId } = useParams();

   const [user, setUser] = useState(null);
   const [profile, setProfile] = useState(null);

   useEffect(() => {

      axios.get(`http://localhost:3000/api/profile/${userId}`)
      .then((res) => {
         setUser(res.data.user);
         setProfile(res.data.profile);
      });

   }, [userId]);

  return (
    <div>
      <ProfilePage
         user={user}
         profile={profile}
         isOwnProfile={false}
      />
    </div>
  )
}

export default PublicProfile

// UserProfileView.jsx

import React,{useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

import ProfilePage from "./ProfilePage";

const UserProfileView=()=>{

const {userId}=useParams();

const [user,setUser]=useState(null);
const [profile,setProfile]=useState(null);

const currentUser=
JSON.parse(
localStorage.getItem("user")
);

useEffect(()=>{

fetchProfile();

},[userId]);

async function fetchProfile(){

try{

const res=
await axios.get(

`http://localhost:3000/api/profile/${userId}`,

{
withCredentials:true
}

);

setUser(res.data.user);

setProfile(
res.data.profile
);

}

catch(err){

console.log(err);

}

}

if(!user){

return <p>Loading...</p>

}

return(

<div>

<button
onClick={()=>
window.history.back()
}
className="
mb-4
text-cyan-700
"
>

← Back

</button>

<ProfilePage
currentUser={currentUser}
user={user}
profile={profile}
isPublicView={true}
/>

</div>

);

};

export default UserProfileView;
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ProfilePage from "../profile/ProfilePage";

const Profile = () => {

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api/employer/profile-data", {
      withCredentials: true
    })
    .then((res) => {
      setUser(res.data.user);
      setProfile(res.data.profile);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-full overflow-x-hidden">

      <ProfilePage
        currentUser={user}
        user={user}
        profile={profile}
      />

    </div>
  );
};

export default Profile;


// import React from "react";
// import { Link } from "react-router-dom";

// import CoverImage from "../../components/employer/profile/CoverImage";
// import ProfileImage from "../../components/employer/profile/ProfileImage";
// import EmployerInfo from "../../components/employer/profile/EmployerInfo";
// import TrustCard from "../../components/employer/profile/TrustCard";
// import EditProfileButton from "../../components/employer/profile/EditProfileButton";
// import About from "../../components/employer/profile/About";
// import ContactInfo from "../../components/employer/profile/ContactInfo";
// import JobsCategoryPosted from "../../components/employer/profile/JobsCategoryPosted";
// import HiringHistory from "../../components/employer/profile/HiringHistory";
// import ReviewSection from "../../components/employer/profile/ReviewSection";
// import TrustScoreDetails from "../../components/employer/profile/TrustScoreDetails";

// import { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = () => {

//   const [user, setUser] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get("http://localhost:3000/api/employer/profile-data", {
//       withCredentials: true
//     })
//     .then((res) => {
//       setUser(res.data.user);
//       setProfile(res.data.profile);
//       setLoading(false);
//     })
//     .catch((err) => {
//       console.log(err);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="w-full overflow-x-hidden">

//       {/* MAIN CARD */}

//       <div className="w-full min-h-100 rounded-xl shadow-md bg-white relative overflow-hidden">

//         {/* Cover Image */}
//         <div>
//           <CoverImage coverImage={profile?.coverImage}/>
//         </div>

//         {/* content */}
//         <div className="relative grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-14 p-6 pt-8">

//           {/* profile Image */}
//           <div className="flex justify-center lg:justify-start">
//             <ProfileImage profileImage={user?.profileImage}/>
//           </div>

//           {/* employer info */}
//           <div>
//             <EmployerInfo user={user} profile={profile}/>
//           </div>

//           {/* trust card */}
//           <div className="flex items-end">
//             <TrustCard/>
//           </div>

//           {/* edit profile button */}
//           <div className="flex items-end justify-end lg:justify-center text-sm lg:text-md">
//             <EditProfileButton/>
//           </div>
//         </div>
//       </div>

//       {/* about */}

//       <div>
//         <About profile={profile}/>
//       </div>

//       {/* Contact Info */} 
//       <div>
//         <ContactInfo user={user} profile={profile}/>
//       </div>

//       {/* Jobs Category Posted */}
//       <div>
//         <JobsCategoryPosted profile={profile}/>
//       </div>

//       {/* Hiring History */} 
//       <div>
//         <HiringHistory/>
//       </div>
            
      
//       {/* Review section */} 
//       <div>
//         <ReviewSection/>
//       </div>
      
//       {/* TRUST-SCORE DETAILS */} 
//       <div>
//         <TrustScoreDetails/>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardHeader = ({user}) => {

  // const [user, setUser] = useState({});

  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/employer/profile-data', {
  //     withCredentials: true
  //   })
  //   .then((res) => {
  //     setUser(res.data.user);  
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }, []);


  return (
    <div>
        <p className="text-2xl lg:text-4xl text-cyan-700 font-semibold">
            Welcome, {user ? user.name : "Loading..."}
        </p>

        <p className="text-gray-600 mt-2">
            Manage your jobs, applicants and workers here.
        </p>
    </div>
  )
}

export default DashboardHeader

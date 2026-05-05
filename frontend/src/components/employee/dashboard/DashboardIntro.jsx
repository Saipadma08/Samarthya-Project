import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardIntro = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/api/employee/profile-data', {
      withCredentials: true
    })
    .then((res) => {
      setUser(res.data.user);   // ✅ store full user
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div>
      <p className="text-2xl lg:text-4xl text-cyan-700 font-semibold">
        Welcome, {user ? user.name : "Loading..."}
      </p>

      <p className="text-gray-600 mt-2">
        Manage your jobs, applications here.
      </p>
    </div>
  );
};

export default DashboardIntro;
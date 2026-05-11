import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardHeader = ({user}) => {

  return (
    <div>
        <p className="text-2xl text-cyan-700 font-semibold">
            Welcome, {user ? user.name : "Loading..."}
        </p>

        <p className="text-gray-600 mt-2">
            Manage your jobs, applicants and workers here.
        </p>
    </div>
  )
}

export default DashboardHeader

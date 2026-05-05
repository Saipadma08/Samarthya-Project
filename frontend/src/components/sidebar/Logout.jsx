import React from "react";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = ({ collapsed }) => {

  const navigate = useNavigate();

  const handleLogout = async () =>{
    axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true })
    .then((res) =>{
  
      localStorage.removeItem("user");

      toast.success("Logged out successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    })
    .catch((err) => {
      toast.error("Logout failed");
    })

  }
  
  return (
    <div className="p-2">
      <button
        onClick={handleLogout}
        className={`flex items-center h-9 p-2 gap-3 mb-15 lg:mb-0 rounded-xl w-full transition-all
        hover:bg-cyan-500
        ${collapsed ? "lg:justify-center" : ""}
        `}
      >
        <span className="text-xl">
          <FiLogOut />
        </span>

        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Logout;
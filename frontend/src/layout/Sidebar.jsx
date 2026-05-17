import React, { useState } from "react";
import Logout from "../components/sidebar/Logout";

import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiUserPlus,
  FiUser,
  FiBriefcase,
  FiMessageSquare,
  FiUsers,
  FiSettings,
  FiClock,
  FiBookmark,
  FiAlertCircle,
  FiPlusSquare,
  FiBarChart2,
  FiMenu,
  FiX,
  FiMail,
  FiGrid 
} from "react-icons/fi";

import Logo from "../assets/logo-4.png";
import { NavLink } from "react-router-dom";

const Sidebar = ({ collapsed, setCollapsed, role }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Role based menus
  const menus = {
    employee: [
      { name: "Home", path: "/employee/dashboard", icon: <FiHome /> },
      { name: "Profile", path: "/employee/profile", icon: <FiUser /> },
      { name: "Feeds", path: "/employee/feeds", icon: <FiGrid /> },
      { name: "Find Jobs", path: "/employee/find-jobs", icon: <FiBriefcase /> },
      { name: "Saved Jobs", path: "/employee/saved-jobs", icon: <FiBookmark /> },
      { name: "Applications", path: "/employee/applications", icon: <FiBriefcase /> },
      { name: "Messages", path: "/employee/messages", icon: <FiMessageSquare /> },
      { name: "Connections", path: "/employee/connections", icon: <FiUsers /> },
      { name: "Work History", path: "/employee/work-history", icon: <FiClock /> },
      { name: "Complaint", path: "/employee/complaint", icon: <FiAlertCircle /> },
      { name: "Settings", path: "/employee/settings", icon: <FiSettings /> },
    ],

    employer: [
      { name: "Home", path: "/employer/dashboard", icon: <FiHome /> },
      { name: "Profile", path: "/employer/profile", icon: <FiUser /> },
      { name: "Feeds", path: "/employer/feeds", icon: <FiGrid /> },
      { name: "Post Job", path: "/employer/post-job", icon: <FiPlusSquare /> },
      { name: "My Jobs", path: "/employer/posted-jobs", icon: <FiBriefcase /> },
      { name: "Applicants", path: "/employer/applicants", icon: <FiUsers /> },
      { name: "Messages", path: "/employer/messages", icon: <FiMessageSquare /> },
      { name: "Connections", path: "/employer/connections", icon: <FiUsers /> },
      { name: "Complaint", path: "/employer/complaint", icon: <FiAlertCircle /> },
      { name: "Settings", path: "/employer/settings", icon: <FiSettings /> },
    ],

    admin: [
      { name: "Dashboard", path: "/admin/dashboard", icon: <FiHome /> },
      { name: "Add Admin", path: "/admin/add-admin", icon: <FiUserPlus /> },
      { name: "Users", path: "/admin/users", icon: <FiUsers /> },
      { name: "Jobs", path: "/admin/jobs", icon: <FiBriefcase /> },
      { name: "Messages", path: "/admin/messages", icon: <FiMessageSquare /> },
      { name: "Reports", path: "/admin/reports", icon: <FiBarChart2 /> },
      { name: "Contacts", path: "/admin/contacts", icon: <FiMail /> },
      { name: "Settings", path: "/admin/settings", icon: <FiSettings /> },
    ]
  };

  const menuItems = menus[role] || [];

  // same button opens + closes
  const toggleMobileSidebar = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <>
      {/* MOBILE HAMBURGER BUTTON */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-15 left-4 z-100 bg-white text-cyan-600 p-2 rounded-lg shadow-md"
      >
        {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          bg-cyan-600 text-white h-full flex flex-col transition-all duration-300

          /* Desktop */
          lg:relative
          ${collapsed ? "lg:w-24" : "lg:w-60"}

          /* Mobile */
          fixed top-28 lg:top-0 left-0 z-50 w-60 pb-20 lg:pb-4
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* DESKTOP COLLAPSE BUTTON */}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="hidden lg:flex items-center absolute h-16 right-0 top-0 bg-white text-cyan-600 rounded-tl-2xl rounded-bl-2xl p-1 shadow"
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>

        {/* LOGO */}
        <div>
          <div
            className="hidden sm:block w-10 h-10 lg:w-12 lg:h-12  rounded-full shadow-2xl overflow-hidden bg-cover bg-center m-2 mt-4"
            style={{ backgroundImage: `url(${Logo})` }}
          />
        </div>
        

        {/* MENU */}
        <div className="flex-1 w-full flex flex-col text-sm lg:text-[2.3vh] font-medium p-2 gap-1 mt-3">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-white text-cyan-600"
                    : "hover:bg-cyan-500"
                }
                ${collapsed ? "lg:justify-center" : ""}
                `
              }
            >
              <span className="text-xl">
                {item.icon}
              </span>

              {!collapsed && (
                <span>{item.name}</span>
              )}
            </NavLink>
          ))}
        </div>

        {/* LOGOUT */}

        <div>
          <Logout collapsed={collapsed} />
        </div>
        
      </div>
    </>
  );
};

export default Sidebar;
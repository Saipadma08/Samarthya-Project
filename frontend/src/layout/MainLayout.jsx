import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ role }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        role={role}
      />

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 min-h-screen">

        <Navbar role={role} />

        {/* PAGE + FOOTER */}
        <div className="flex flex-col flex-1 overflow-auto bg-white">

          {/* MAIN CONTENT */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>

          {/* FOOTER */}
          <Footer />

        </div>
      </div>
    </div>
  );
};

export default MainLayout;
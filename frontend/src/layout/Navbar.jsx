import React from "react";

import SearchBar from "../components/navbar/SearchBar";
import ContactAndAbout from "../components/navbar/ContactAndAbout";
import MessageIcon from "../components/navbar/MessageIcon";
import NotificationBell from "../components/navbar/NotificationBell";
import ProfileMenu from "../components/navbar/ProfileMenu";

import Logo from "../assets/logo-4.png"; 
import SamarthyaText from "../assets/Samarthya-text.png";


const Navbar = () => {
  return (
    <div className="h-28 lg:h-16 bg-white sticky top-0 z-50 shadow-sm shadow-gray-300 px-6">

      {/* Main wrapper */}
      <div className="h-full flex flex-col lg:flex-row items-center justify-between py-2">


        {/* LEFT SIDE */}
        <div className="flex items-center gap-6 w-full lg:w-auto justify-end">

          <div
            className="block lg:hidden w-12 h-12 rounded-full shadow-2xl overflow-hidden bg-cover bg-center mx-2"
            style={{ backgroundImage: `url(${Logo})` }}
          />

          <div>
            <img
              src={SamarthyaText}
              alt="Samarthya"
              className="h-6 lg:h-8"
            />
          </div>

          <div>
            <SearchBar />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 lg:gap-5 w-full lg:w-auto justify-end">

          <ContactAndAbout />

          <MessageIcon />

          <NotificationBell />

          <ProfileMenu />

        </div>

      </div>

    </div>
  );
};

export default Navbar;
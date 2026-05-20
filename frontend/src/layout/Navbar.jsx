import React from "react";
import { useLocation, Link } from "react-router-dom";

import SearchBar from "../components/navbar/SearchBar";
import ContactAndAbout from "../components/navbar/ContactAndAbout";
import MessageIcon from "../components/navbar/MessageIcon";
import NotificationBell from "../components/navbar/NotificationBell";
import ProfileMenu from "../components/navbar/ProfileMenu";

import Logo from "../assets/logo-4.png";
import SamarthyaText from "../assets/Samarthya-text.png";

const Navbar = () => {

  const location = useLocation();

  const hideSearchBar =
    location.pathname.includes("/search");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const isAdmin =
    user?.role === "admin";

  return (

    <div className="
      h-28
      lg:h-16
      bg-white
      sticky
      top-0
      z-50
      shadow-sm
      shadow-gray-300
      px-6
    ">

      <div className="
        h-full
        flex
        flex-col
        lg:flex-row
        items-center
        justify-between
        py-2
      ">

        {/* LEFT */}

        <div className="
          flex
          items-center
          gap-6
          lg:gap-55
          w-full
          lg:w-auto
          justify-center
        ">

          <div
            className="
              block
              lg:hidden
              w-12
              h-12
              rounded-full
              shadow-2xl
              overflow-hidden
              bg-cover
              bg-center
              mx-2
            "

            style={{
              backgroundImage:
                `url(${Logo})`
            }}
          />

          <img
            src={SamarthyaText}
            alt="Samarthya"
            className="h-6 lg:h-8"
          />

          {

            !hideSearchBar &&

            <SearchBar />

          }

        </div>


        {/* RIGHT */}

        <div className="
          flex
          items-center
          gap-2
          lg:gap-5
          w-full
          lg:w-auto
          justify-end
        ">

          {

            isAdmin ?

              (

                <div className="flex gap-4">

                  <Link

                    to="/admin/disabled-accounts"

                    className="text-sm font-medium hover:text-cyan-600 "

                  >

                    Disabled Accounts

                  </Link>


                  <Link

                    to="/admin/account-review"

                    className="text-sm font-medium hover:text-cyan-600"

                  >

                    Account Review

                  </Link>

                </div>

              )

              :

              (

                <ContactAndAbout />

              )

          }

          <MessageIcon />

          <NotificationBell />

          <ProfileMenu />

        </div>

      </div>

    </div>

  );

};

export default Navbar;
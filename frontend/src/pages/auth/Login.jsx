import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import Nav from "../../components/landingpage/Nav";
import LoginForm from "../../components/login/LoginForm";
import AnimationText from "../../components/login/AmimationText";
import Footer from "../../components/landingpage/Footer";

import MainBackgroundImg from "../../assets/main-background-5.png";

const Login = () => {

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <Nav />

      <div
        className="min-h-screen flex flex-col items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${MainBackgroundImg})` }}
      >

        <div className="grid grid-cols-1 lg:grid-cols-2">

          <div className="text-sm lg:text-lg text-mauve-700 font-medium p-5 flex flex-col text-center">
            <p className="mt-0 lg:mt-15">
              Log in to access your account, connect with trusted users, and continue your journey on a secure and inclusive platform.
            </p>

            <div className="hidden lg:block py-5">
              <AnimationText />
            </div>
            
          </div>

          
            <div className=" my-5 w-full flex items-center justify-center">
              <LoginForm/>
            </div>

        </div>

        <div className="block sm:hidden py-5">
        <AnimationText />
      </div>

      </div>

      <Footer />

    </div>
  );
};

export default Login;
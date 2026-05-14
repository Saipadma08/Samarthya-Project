import React, { useState, useEffect } from "react";
import Nav from "../../components/landingpage/Nav";
import Footer from "../../components/landingpage/Footer";
import SignupForm from "../../components/signup/SignupForm";
import AnimationText from "../../components/signup/AnimationText";

import MainBackgroundImg from "../../assets/main-background-5.png";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";

const Signup = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { role } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: role,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm((prev) => ({ ...prev, role: role }));
  }, [role]);


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
              Create your account to access secure opportunities, connect with trusted users, and unlock the full potential of the platform.
            </p>

            <div className="block sm:hidden mt-3">

              <ReactTyped
                strings={["Your entry point to opportunity."]}
                typeSpeed={70}
                showCursor={false}
                className="text-black"
              />

            </div>

            <div className="hidden lg:block py-5">
              <AnimationText />
            </div>
            
          </div>

          
            <div className=" my-5 w-full flex items-center justify-center">
              <SignupForm
                form={form}
                setForm={setForm}
                errors={errors}
                setErrors={setErrors}
              />
            </div>

        </div>

      </div>

      <div className="block sm:hidden py-5">
        <AnimationText />
      </div>

      <Footer />

    </div>
  );
};

export default Signup;
import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Nav from "../../components/landingpage/Nav";
import AnimationText from "../../components/forgotPassword/AmimationText";
import Footer from "../../components/landingpage/Footer";

import MainBackgroundImg from "../../assets/main-background-5.png";
import SamarthyaText from "../../assets/Samarthya-text.png"


const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [loading, setLoading] =
        useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await axios.post(

                "http://localhost:3000/api/auth/forgot-password",

                { email }

            );

            toast.success(res.data.message);

            navigate("/verify-otp", {

                state: {

                    email,

                    fromForgotPassword: true

                }

            });

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||
                "Something went wrong"

            );

        }

        finally {

            setLoading(false);

        }

    };

  return (
    <div>
      <Nav />

      <div
        className="min-h-screen flex flex-col items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${MainBackgroundImg})` }}
      >
        <div className='my-7 block lg:hidden'>
          <div className='w-28 h-6 shadow-2xl flex overflow-hidden bg-cover bg-center' style={{ backgroundImage: `url(${SamarthyaText})` }}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">

          <div className="text-sm lg:text-lg text-mauve-700 font-medium p-5 flex flex-col text-center">
            <p className="mt-0 lg:mt-15">
              Forgot your password? Verify your identity and set a new password securely.
            </p>

            <div className="hidden lg:block py-5">
              <AnimationText />
            </div>
            
          </div>

          
            <div className=" my-5 w-full flex items-center justify-center">
              <form
                onSubmit={handleSubmit}
                className="
                bg-white
                shadow-xl
                rounded-2xl
                p-8
                w-[90%]
                sm:w-100
                flex
                flex-col
                gap-5
                "
            >

                <h1 className="text-3xl text-center text-black font-semibold mt-0 my-5">
                    Forgot Password
                </h1>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                    className="border border-white border-b-gray-400 p-2 rounded w-full pr-16"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-cyan-600 text-white py-2 mt-5 rounded-lg hover:bg-cyan-900 transition"
                >

                    {
                        loading
                            ? "Sending OTP..."
                            : "Send OTP"
                    }

                </button>

            </form>
            </div>

        </div>

        <div className="block sm:hidden py-5">
        <AnimationText />
      </div>

      </div>

      <Footer />
    </div>
  )
}

export default ForgotPassword

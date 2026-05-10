import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Nav from "../../components/landingpage/Nav";
import AnimationText from "../../components/resetPassword/AmimationText";
import Footer from "../../components/landingpage/Footer";

import MainBackgroundImg from "../../assets/main-background-5.png";
import SamarthyaText from "../../assets/Samarthya-text.png"

const ResetPassword = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email;

    const otp = location.state?.otp;

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword,
        setConfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword,
        setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const validatePassword = (password) => {

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        return passwordRegex.test(password);

    };

    const [passwordWarning, setPasswordWarning] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validatePassword(newPassword)) {

            setPasswordWarning(
                "Password does not meet requirements"
            );

            return;
        }
        else {

            setPasswordWarning("");

        }

        // password mismatch
        if (newPassword !== confirmPassword) {

            toast.error(
                "Passwords do not match"
            );

            return;

        }

        try {

            setLoading(true);

            const res = await axios.post(

                "http://localhost:3000/api/auth/reset-password",

                {
                    email,
                    newPassword
                }

            );

            toast.success(res.data.message);

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Password reset failed"

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
                            className="bg-white shadow-2xl rounded-3xl p-8 w-[90%] sm:w-105 flex flex-col gap-5 "
                        >

                            <h1
                                className="text-3xl text-center text-black font-semibold mt-0 my-2"
                            >
                                Reset Password
                            </h1>

                            <div className="text-xs text-gray-500 px-1">

                                <p>Password must contain:</p>

                                <ul className="list-disc pl-5">

                                    <li>Minimum 8 characters</li>
                                    <li>One uppercase letter</li>
                                    <li>One lowercase letter</li>
                                    <li>One number</li>
                                    <li>One special character</li>

                                </ul>

                            </div>

                            <div className='relative'>
                                <input
                                    type={
                                        showNewPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="New password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    required
                                    className="border border-white border-b-gray-400 p-2 rounded w-full pr-16"
                                />

                                <span
                                    className="absolute right-3 top-3 cursor-pointer text-sm text-purple-700"
                                    onClick={() =>
                                        setShowNewPassword(
                                            !showNewPassword
                                        )
                                    }
                                >

                                    {
                                        showNewPassword
                                            ? "Hide"
                                            : "Show"
                                    }

                                </span>
                            </div>

                            {
                                passwordWarning && (

                                    <p className="text-red-500 text-sm">
                                        {passwordWarning}
                                    </p>

                                )
                            }


                            <div className="relative">

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    required
                                    className=" border border-white border-b-gray-400 p-2 rounded w-full pr-16 "
                                />

                                <span
                                    className="absolute right-3 top-3 cursor-pointer text-sm text-purple-700 "
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >

                                    {
                                        showConfirmPassword
                                            ? "Hide"
                                            : "Show"
                                    }

                                </span>

                            </div>



                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-cyan-600 text-white py-2 mt-5 rounded-lg hover:bg-cyan-900 transition"
                            >

                                {
                                    loading
                                        ? "Updating..."
                                        : "Reset Password"
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

export default ResetPassword

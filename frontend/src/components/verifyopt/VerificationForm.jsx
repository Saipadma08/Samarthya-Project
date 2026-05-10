import React, { useState, useEffect } from "react";

import axios from "axios";

import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const VerificationForm = () => {

    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);

    const location = useLocation();

    const navigate = useNavigate();

    const fromAddAdmin = location.state?.fromAddAdmin;

    const [timeLeft, setTimeLeft] = useState(600);

    const [canResend, setCanResend] = useState(false);

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    // email passed from signup page
    const email =
        location.state?.email ||
        localStorage.getItem("verificationEmail");

    console.log(email);

    useEffect(() => {

        if (timeLeft <= 0) {

            setCanResend(true);

            return;
        }

        const timer = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft]);

    const handleResendOtp = async () => {

        try {

            const res = await axios.post(

                "http://localhost:3000/api/auth/resend-otp",

                { email }

            );

            toast.success(res.data.message);

            setTimeLeft(600);

            setCanResend(false);

        }

        catch (err) {

            toast.error(
                err.response?.data?.message
            );

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await axios.post(

                "http://localhost:3000/api/auth/verify-otp",

                {
                    email,
                    otp,
                    fromAddAdmin
                },

                {
                    withCredentials: true
                }

            );

            toast.success(
                "Email verified successfully", {
                position: "top-right",
                autoClose: 2000,
            }
            );

            // store logged in user

            if (!fromAddAdmin) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.user)
                );

            }

            // redirect based on role
            const role = res.data.user.role;

            setTimeout(() => {

                if (fromAddAdmin) {

                    navigate("/admin/add-admin");

                    return;
                }

                if (role === "employee") {

                    navigate("/employee/dashboard");

                }

                else if (role === "employer") {

                    navigate("/employer/dashboard");

                }

                else if (role === "admin") {

                    navigate("/admin/dashboard");

                }

            }, 1000);

            localStorage.removeItem("verificationEmail");

        }

        catch (err) {

            toast.error(
                err.response?.data?.message ||
                "OTP verification failed"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="
            bg-white
            w-[90%]
            sm:w-112.5
            shadow-2xl
            rounded-3xl
            px-7
            py-10
            flex
            flex-col
            gap-6
            "
        >

            <div className="text-center">

                <h1 className="text-4xl font-bold">
                    Verify OTP
                </h1>

                <p className="text-gray-500 mt-3 text-sm">

                    Enter the OTP sent to

                    <span className="font-semibold">
                        {" "} {email}
                    </span>

                </p>

            </div>

            {/* OTP input */}
            <div>

                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) =>
                        setOtp(e.target.value)
                    }
                    required
                    className="
                    w-full
                    border-b
                    border-gray-400
                    py-3
                    outline-none
                    text-lg
                    tracking-[8px]
                    text-center
                    "
                />

            </div>

            {/* button */}
            <button
                type="submit"
                disabled={loading}
                className="
                bg-cyan-600
                hover:bg-cyan-700
                text-white
                py-3
                rounded-xl
                text-lg
                transition
                disabled:opacity-70
                "
            >

                {
                    loading
                        ? "Verifying..."
                        : "Verify OTP"
                }

            </button>


            <p className="text-center text-sm text-gray-500">

                OTP expires in:

                <span className="font-semibold">

                    {" "}
                    {minutes}:
                    {seconds.toString().padStart(2, "0")}

                </span>

            </p>

            <button
                type="button"
                onClick={handleResendOtp}
                disabled={!canResend}
                className="text-cyan-700 font-semibold disabled:text-gray-400"
            >

                Resend OTP

            </button>

        </form>

    );

};

export default VerificationForm;
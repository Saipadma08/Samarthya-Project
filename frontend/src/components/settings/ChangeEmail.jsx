import React, { useState, useEffect } from "react";

import axios from "axios";

import { toast } from "react-toastify";

const ChangeEmail = () => {

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newEmail, setNewEmail] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const [otpSent, setOtpSent] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [showPassword, setShowPassword] =
    useState(false);

    const [timer, setTimer] = useState(600);

    const [canResend, setCanResend] = useState(false);

    // send otp
    const handleSendOtp = async (e) => {

        e.preventDefault();

        if (!currentPassword || !newEmail) {

            toast.error(
                "All fields are required"
            );

            return;
        }

        try {

            setLoading(true);

            const res = await axios.put(

                "http://localhost:3000/api/auth/change-email",

                {
                    currentPassword,
                    newEmail
                },

                {
                    withCredentials: true
                }

            );

            toast.success(res.data.message);

            setOtpSent(true);

            setTimer(600);

            setCanResend(false);

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
    useEffect(() => {

        let interval;

        if (otpSent && timer > 0) {

            interval = setInterval(() => {

                setTimer((prev) => prev - 1);

            }, 1000);

        }

        else if (timer === 0) {

            setCanResend(true);

        }

        return () => clearInterval(interval);

    }, [otpSent, timer]);


    const handleResendOtp = async () => {

        try {

            setLoading(true);

            const res = await axios.put(

                "http://localhost:3000/api/auth/change-email",

                {
                    currentPassword,
                    newEmail
                },

                {
                    withCredentials: true
                }

            );

            toast.success("OTP resent");

            setTimer(600);

            setCanResend(false);

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

    // verify otp
    const handleVerifyOtp = async (e) => {

        e.preventDefault();

        if (!otp) {

            toast.error("OTP is required");

            return;
        }

        try {

            setLoading(true);

            const res = await axios.put(

                "http://localhost:3000/api/auth/verify-email-change",

                { otp },

                {
                    withCredentials: true
                }

            );

            toast.success(res.data.message);

            // update local storage
            const user = JSON.parse(
                localStorage.getItem("user")
            );

            user.email = res.data.email;

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            // reset fields
            setCurrentPassword("");

            setNewEmail("");

            setOtp("");

            setOtpSent(false);

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

        <div className="flex flex-col gap-5">

          <h2
          className="text-2xl font-semibold mb-6"
          >
           Change Email
        </h2>

            {

                !otpSent ? (

                    <form
                        onSubmit={handleSendOtp}
                        className="flex flex-col gap-4"
                    >

                        <div className="relative">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }

                                placeholder="Current Password"

                                value={currentPassword}

                                onChange={(e) =>
                                    setCurrentPassword(
                                        e.target.value
                                    )
                                }

                                className="
                                border
                                border-white
                                border-b-gray-400
                                p-2
                                rounded
                                w-full
                                pr-16
                                "
                            />

                            <span
                                className="
                                absolute
                                right-3
                                top-3
                                cursor-pointer
                                text-sm
                                text-purple-700
                                "
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >

                                {
                                    showPassword
                                        ? "Hide"
                                        : "Show"
                                }

                            </span>

                        </div>

                        <input
                            type="email"
                            placeholder="New Email"
                            value={newEmail}
                            onChange={(e) =>
                                setNewEmail(
                                    e.target.value
                                )
                            }
                            className="
                            border
                            border-white
                            border-b-gray-400
                            p-2
                            rounded
                            "
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                            bg-cyan-600
                            text-white
                            py-2
                            rounded-lg
                            hover:bg-cyan-800
                            transition mt-8
                            "
                        >

                            {

                                loading
                                    ? "Sending OTP..."
                                    : "Send OTP"

                            }

                        </button>

                    </form>

                ) : (

                    <form
                        onSubmit={handleVerifyOtp}
                        className="flex flex-col gap-4"
                    >

                        <p className="text-sm text-gray-500">

                            OTP sent to:

                            <span className="font-semibold">
                                {" "}
                                {newEmail}
                            </span>

                        </p>

                        <p className="text-xs text-gray-400 text-start leading-5">
                            Didn't receive the OTP?
                            Check your spam folder or make sure the entered
                            email address is correct.
                        </p>

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) =>
                                setOtp(e.target.value)
                            }
                            className="
                            border
                            border-white
                            border-b-gray-400
                            p-2
                            rounded
                            tracking-[5px]
                            "
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                            bg-cyan-600
                            text-white
                            py-2
                            rounded-lg
                            hover:bg-cyan-800
                            transition
                            "
                        >

                            {

                                loading
                                    ? "Verifying..."
                                    : "Verify & Update Email"

                            }

                        </button>

                        <p className="text-sm text-gray-500 text-center">

                            OTP expires in:

                            {" "}

                            {Math.floor(timer / 60)}:
                            {String(timer % 60).padStart(2, "0")}

                        </p>

                        <button
                            type="button"

                            disabled={!canResend}

                            onClick={handleResendOtp}

                            className="
                            text-cyan-700
                            text-sm
                            hover:underline
                            disabled:text-gray-400
                            "
                        >

                            Resend OTP

                        </button>

                    </form>

                )

            }

        </div>

    );

};

export default ChangeEmail;
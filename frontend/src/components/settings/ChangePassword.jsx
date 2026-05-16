import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    const [showNewPassword, setShowNewPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {

            toast.error("All fields are required");

            return;
        }

        if (!passwordRegex.test(newPassword)) {

            toast.error(
                "Password does not meet requirements"
            );

            return;
        }

        if (newPassword !== confirmPassword) {

            toast.error(
                "Passwords do not match"
            );

            return;
        }

        try {

            setLoading(true);

            const res = await axios.put(
                "http://localhost:3000/api/auth/change-password",
                {
                    currentPassword,
                    newPassword
                },
                {
                    withCredentials: true
                }
            );

            toast.success(res.data.message);

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        }

        catch (err) {

            toast.error(
                err.response?.data?.message
                || "Something went wrong"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
        >

         <h2
          className="text-2xl font-semibold mb-6"
          >

          Change Password
        </h2>

            <div className="text-sm text-gray-500">

                <p>Password must contain:</p>

                <ul className="list-disc ml-5">
                    <li>Minimum 8 characters</li>
                    <li>One uppercase letter</li>
                    <li>One lowercase letter</li>
                    <li>One number</li>
                    <li>One special character</li>
                </ul>

            </div>

            {/* Current Password */}
            <div className="relative">

                <input
                    type={
                        showCurrentPassword
                            ? "text"
                            : "password"
                    }
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) =>
                        setCurrentPassword(e.target.value)
                    }
                    className="border border-white border-b-gray-400 p-2 rounded w-full pr-16"
                />

                <span
                    className="absolute right-3 top-3 cursor-pointer text-sm text-purple-700"
                    onClick={() =>
                        setShowCurrentPassword(
                            !showCurrentPassword
                        )
                    }
                >
                    {
                        showCurrentPassword
                            ? "Hide"
                            : "Show"
                    }
                </span>

            </div>

            {/* New Password */}
            <div className="relative">

                <input
                    type={
                        showNewPassword
                            ? "text"
                            : "password"
                    }
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) =>
                        setNewPassword(e.target.value)
                    }
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

            {/* Confirm Password */}
            <div className="relative">

                <input
                    type={
                        showConfirmPassword
                            ? "text"
                            : "password"
                    }
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                    className="border border-white border-b-gray-400 p-2 rounded w-full pr-16"
                />

                <span
                    className="absolute right-3 top-3 cursor-pointer text-sm text-purple-700"
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

            <Link
                to="/forgot-password"
                className="
                    text-sm
                    text-cyan-700
                    hover:underline
                    w-fit
                "
                state={{ fromSettings: true }}
            >
                Forgot Password?
            </Link>

            <button
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
                        ? "Updating..."
                        : "Update Password"
                }

            </button>

        </form>

    );

};

export default ChangePassword;
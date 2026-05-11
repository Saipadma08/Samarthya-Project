import React from 'react'
import { useState } from 'react'

import ChangePassword from '../../components/settings/ChangePassword';
import ChangeEmail from '../../components/settings/ChangeEmail';
import DeleteAccount from '../../components/settings/DeleteAccount';
import BlockedAccounts from '../../components/settings/BlockedAccounts';

const Settings = () => {

    const [activeTab, setActiveTab] = useState("password");

    return (
        <div className="flex flex-col lg:flex-row gap-5 h-full">
            {/* desktop view-left & mobile view-top */}
            <div className="w-full lg:w-[30%] grid grid-cols-2 lg:grid-cols-1 gap-5 shadow-sm shadow-gray-300 p-4">
                <button
                    onClick={() => setActiveTab("password")}
                    className={`p-2 rounded-lg transition h-10 shadow-sm shadow-gray-300
                    ${activeTab === "password"
                            ? "bg-cyan-600 text-white"
                            : "bg-white text-black hover:bg-gray-100"}
                    `}
                >
                    Change Password
                </button>

                <button
                    onClick={() => setActiveTab("email")}
                    className={`p-2 rounded-lg transition h-10 shadow-sm shadow-gray-300
                    ${activeTab === "email"
                            ? "bg-cyan-600 text-white"
                            : "bg-white text-black hover:bg-gray-100"}
                    `}
                >
                    Change Email
                </button>

                <button
                    onClick={() => setActiveTab("blocked-accounts")}
                    className={`p-2 rounded-lg transition h-10 shadow-sm shadow-gray-300
                    ${activeTab === "blocked-accounts"
                            ? "bg-cyan-600 text-white"
                            : "bg-white text-black hover:bg-gray-100"}
                    `}
                >
                    Blocked Accounts
                </button>

                <button
                    onClick={() => setActiveTab("delete-account")}
                    className={`p-2 rounded-lg transition h-10 shadow-sm shadow-gray-300
                    ${activeTab === "delete-account"
                            ? "bg-cyan-600 text-white"
                            : "bg-white text-black hover:bg-gray-100"}
                    `}
                >
                    Delete Account
                </button>
            </div>

            {/* desktop view-right & mobile view-bottom */}
            <div className="w-full lg:w-[70%] shadow-sm shadow-gray-300 p-4 px-2 lg:px-36">
                {
                    activeTab === "password" &&
                    <ChangePassword />
                }

                {
                    activeTab === "email" &&
                    <ChangeEmail />
                }
                {
                    activeTab === "delete-account" &&
                    <DeleteAccount />
                }
                {
                    activeTab === "blocked-accounts" &&
                    <BlockedAccounts/>
                }
            </div>
        </div>
    )
}

export default Settings

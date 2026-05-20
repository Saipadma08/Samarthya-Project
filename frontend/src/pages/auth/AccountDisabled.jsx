import React,
{
    useState,
    useEffect
}
    from "react";

import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import Nav from "../../components/landingpage/Nav";
import Footer from "../../components/landingpage/Footer";

import MainBackgroundImg
    from "../../assets/main-background-5.png";

const AccountDisabled = () => {

    const [searchParams] =
        useSearchParams();

    const [email, setEmail] = useState("");

    const [message, setMessage] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const data = {

        type:
            searchParams.get("type") || "",

        reason:
            searchParams.get("reason") || "",

        until:
            searchParams.get("until") || ""

    };


    const requestReview =
        async () => {

            if (!email) {

                toast.error(
                    "Please enter email"
                );

                return;

            }

            try {

                setLoading(true);

                await axios.post(
                    "http://localhost:3000/api/user-management/request-review",
                    {
                        email,
                        message
                    }
                );

                toast.success(
                    "Review request submitted"
                );

                setMessage("");

            }

            catch (err) {

                toast.error(

                    err.response?.data?.message ||

                    "Failed to submit request"

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

                <div className="
min-h-screen
flex
items-center
justify-center
p-5
">

                    <div className="
bg-white
w-full
max-w-lg
rounded-3xl
shadow-xl
p-8
text-center
">

                        <h1 className="
text-3xl
font-bold
text-red-600
mb-5
">

                            {

                                data.type ===
                                    "blocked"

                                    ?

                                    "Account Blocked"

                                    :

                                    "Account Suspended"

                            }

                        </h1>

                        <p className="
text-gray-600
mb-4
">

                            Your account is temporarily unavailable

                        </p>

                        <div className="
bg-red-50
rounded-xl
p-4
mb-5
">

                            <p className="
font-medium
">

                                Reason:

                            </p>

                            <p>

                                {

                                    data.reason ||

                                    "No reason provided"

                                }

                            </p>

                        </div>

                        {

                            data.until && (

                                <div className="
mb-5
">

                                    <p className="
text-sm
text-gray-500
">

                                        Ends:

                                        {

                                            new Date(
                                                data.until
                                            )

                                                .toLocaleDateString()

                                        }

                                    </p>

                                </div>

                            )

                        }


                        <input

                            type="email"

                            value={email}

                            onChange={(e) =>

                                setEmail(
                                    e.target.value
                                )

                            }

                            placeholder=
                            "Enter your email"

                            className="
w-full
border
rounded-xl
p-3
mb-4
outline-none
focus:ring-2
focus:ring-cyan-500
"
                        />

                        <textarea

                            value={message}

                            onChange={(e) =>

                                setMessage(
                                    e.target.value
                                )

                            }

                            placeholder="
Explain why your account should be reviewed (optional)
"

                            rows="4"

                            className="
w-full
border
rounded-xl
p-3
mb-5
outline-none
focus:ring-2
focus:ring-cyan-500
"

                        />

                        <button

                            onClick={
                                requestReview
                            }

                            disabled={loading}

                            className="
bg-cyan-600
text-white
px-6
py-3
rounded-xl
hover:bg-cyan-700
disabled:opacity-50
w-full
"

                        >

                            {

                                loading

                                    ?

                                    "Submitting..."

                                    :

                                    loading
                                        ?
                                        "Submitting..."
                                        :
                                        "Request Review"

                            }

                        </button>

                    </div>

                </div>

            </div>

            <Footer />


        </div>

    );

};

export default AccountDisabled
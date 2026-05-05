import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const LoginForm = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    let error = false;

    if (email === "") {
      setEmailErrorMsg("Email is required");
      error = true;
    } else {
      setEmailErrorMsg("");
    }

    if (password === "") {
      setPasswordErrorMsg("Password is required");
      error = true;
    } else {
      setPasswordErrorMsg("");
    }

    if (error) return;

    axios.post('http://localhost:3000/api/auth/login', {email, password}, { withCredentials: true })
    .then((res) => {

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1500,
      });

      if(res.data.user.role === "employee"){
        setTimeout(() => {
          navigate("/employee/dashboard");
        }, 2000);
      }
      else if(res.data.user.role === "employer"){
        setTimeout(() => {
          navigate("/employer/dashboard");
        }, 2000);
      }
      else if(res.data.user.role === "admin"){
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Login failed");
    })

  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-[85%] lg:w-[70%] flex flex-col gap-3 bg-white p-5 mt-0 lg:mt-14 shadow-lg shadow-gray-600 rounded-2xl"
    >

      <h2 className="text-3xl font-semibold text-center text-black py-3">
        Login
      </h2>

      {/* Email */}
      <input
        type="text"
        placeholder="Enter your email"
        className="border border-white border-b-gray-400 p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className="text-red-500 text-sm">{emailErrorMsg}</p>

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border border-white border-b-gray-400 p-2 rounded w-full pr-16"
        />
        <span
          className="absolute right-3 top-4 cursor-pointer text-sm text-purple-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>

      <p className="text-red-500 text-sm">{passwordErrorMsg}</p>

      <button className="bg-cyan-600 text-white py-2 mt-5 rounded-lg hover:bg-cyan-900 transition">
        Log in
      </button>

      <p className="text-center text-sm mt-2">
        New user?{" "}
        <Link to="/" className="text-purple-900 font-semibold">
          Sign up
        </Link>
      </p>

      <p className="text-center text-sm text-gray-500 mt-2">
        Samarthya — Inclusive & Secure Platform
      </p>

    </form>
  );
};

export default LoginForm;
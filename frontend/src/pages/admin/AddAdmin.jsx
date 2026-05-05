import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import MainBackgroundImg from "../../assets/main-background-4.png";


const AddAdmin = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {

        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };
    

    const handleSubmit = (e) => { 
    e.preventDefault();

    let newErrors = {};

    if(!form.name){
      newErrors.name = "Name required";
    }
    else if(!/^[A-Za-z ]+$/.test(form.name)){
      newErrors.name = "Name can only contain letters";
    }

    if(!form.email){
      newErrors.email = "Email required";
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)){
      newErrors.email = "Invalid email";
    }

    if(!form.password){
      newErrors.password = "Password required";
    }
    else if( !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(form.password)){
      newErrors.password = "Weak password";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      axios.post('http://localhost:3000/api/admin/add-admin', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      },
      {
        withCredentials: true
      }
      )
      .then((res) => {

        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        toast.success("Admin added successfully!");
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      })

    }
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${MainBackgroundImg})` }}
        >
            <div className="w-[95%] lg:w-[50%] bg-white  rounded-xl p-4 flex flex-col shadow-lg shadow-gray-600">

                <h2 className="text-2xl text-center text-black font-semibold my-5">
                Add another Admin
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2">

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="border border-white border-b-gray-400 p-2 rounded"
                />
                <p className="text-red-500 text-sm">{errors.name}</p>

                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border border-white border-b-gray-400 p-2 rounded"
                />
                <p className="text-red-500 text-sm">{errors.email}</p>

                {/* Password */}
                <div className="relative">
                    <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="border border-white border-b-gray-400 p-2 rounded w-full pr-16"
                    />
                    <span
                    className="absolute right-3 top-2 cursor-pointer text-sm text-purple-700"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? "Hide" : "Show"}
                    </span>
                </div>
                <p className="text-red-500 text-sm">{errors.password}</p>

                {/* Confirm Password */}
                <div className="relative">
                    <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="border border-white border-b-gray-400 p-2 rounded w-full pr-16"
                    />
                    <span
                    className="absolute right-3 top-2 cursor-pointer text-sm text-purple-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                    {showConfirmPassword ? "Hide" : "Show"}
                    </span>
                </div>

                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>

                <button type="submit" className="bg-cyan-600 text-white py-2 my-4 rounded-lg hover:bg-cyan-900 transition">
                    Add
                </button>

                </form>
            </div>
        </div>
    </div>
  )
}

export default AddAdmin


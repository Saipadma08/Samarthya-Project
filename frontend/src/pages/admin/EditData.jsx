import React, { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import {DEFAULT_PROFILE_IMAGE} from "../../constants/defaultImages";

const EditData = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [profilePreview, setProfilePreview] = useState("");

  const [profileFile, setProfileFile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");

  // fetch current admin data
  useEffect(() => {

    axios.get("http://localhost:3000/api/auth/me", {
      withCredentials: true
    })

    .then((res) => {

      const user = res.data.user;

      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || ""
      });

      setProfilePreview(user.profileImage || "");

      setLoading(false);

    })

    .catch((err) => {

      console.log(err);

      setLoading(false);

    });

  }, []);

  const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));

   };

   const handleProfileImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setProfileFile(file);

    setProfilePreview(URL.createObjectURL(file));

    };

  // handle input change
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("phone", form.phone);

        // append image file
        if (profileFile) {
            formData.append("profileImage", profileFile);
        }

        const res = await axios.put(

        "http://localhost:3000/api/admin/edit-data",

        formData,

        {
            withCredentials: true,
            headers: {
            "Content-Type": "multipart/form-data"
            }
        }

        );

        setMessage(res.data.message);

        setTimeout(() => {
            navigate("/admin/dashboard");
        }, 1500);

    }

    catch (err) {

        console.log(err);

        setMessage("Failed to update admin data");

    }

  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (

    <div className="flex justify-center px-4 py-8">

      <form
        onSubmit={handleSubmit}
        className="
        w-full
        max-w-2xl
        bg-white
        shadow-xl
        rounded-2xl
        p-8
        flex
        flex-col
        gap-6
        "
      >

        {/* title */}
        <h2 className="text-3xl font-bold text-center text-cyan-700">
          Edit Admin Data
        </h2>

        {/* profile image */}
        <div className="flex flex-col items-center gap-3">

          <img
            src={profilePreview || DEFAULT_PROFILE_IMAGE}
            alt="Admin Profile"
            className="
            w-28
            h-28
            rounded-full
            object-cover
            border
            "
          />

          <label
            className="
            cursor-pointer
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            px-4
            py-2
            rounded-lg
            transition
            "
          >

            Upload Profile Image

            <input
                type="file"
                accept="image/*"
                onChange={handleProfileImage}
                className="hidden"
            />

          </label>

          {
            profileFile && (

              <p className="text-sm text-gray-500">
                {profileFile.name}
              </p>

            )
          }

        </div>

        {/* basic info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* name */}
          <div>

            <label className="font-medium">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="input"
            />

          </div>

          {/* email */}
          <div>

            <label className="font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="input"
            />

          </div>

          {/* phone */}
          <div className="md:col-span-2">

            <label className="font-medium">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="input"
            />

          </div>

        </div>

        {/* button */}
        <button
          type="submit"
          className="
          bg-cyan-600
          hover:bg-cyan-700
          text-white
          py-3
          rounded-xl
          text-lg
          transition
          "
        >
          Save Changes
        </button>

        {/* message */}
        {
          message && (

            <p className="text-center text-green-600">
              {message}
            </p>

          )
        }

      </form>

      {/* helper class */}
      <style>{`

        .input {
          width: 100%;
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 10px;
          outline: none;
        }

        .input:focus {
          border-color: #06b6d4;
        }

      `}</style>

    </div>

  );

};

export default EditData;
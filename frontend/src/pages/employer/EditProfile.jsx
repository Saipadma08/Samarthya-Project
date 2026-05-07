import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import {
  DEFAULT_PROFILE_IMAGE,
  DEFAULT_COVER_IMAGE
} from "../../constants/defaultImages";

const EditProfile = () => {

  const navigate = useNavigate();

  const employerOptions = [
    { value: "Individual Household", label: "Individual Household" },
    { value: "Freelancer", label: "Freelancer" },
    { value: "Event Organizer", label: "Event Organizer" },
    { value: "Small Shop Owner", label: "Small Shop Owner" },
    { value: "Independent Hirer", label: "Independent Hirer" },
    { value: "Company", label: "Company" }
  ];

  const categoryOptions = [
    { value: "Construction", label: "Construction" },
    { value: "Cleaning", label: "Cleaning" },
    { value: "Beauty", label: "Beauty" },
    { value: "Photography", label: "Photography" },
    { value: "Cooking", label: "Cooking" },
    { value: "Driving", label: "Driving" },
    { value: "Electrician", label: "Electrician" },
    { value: "Plumbing", label: "Plumbing" }
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    employerType: "",
    companyName: "",
    location: "",
    phone: "",
    about: "",
    jobCategories: []
  });

  const [profilePreview, setProfilePreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const [loading, setLoading] = useState(true);

  // FETCH DATA
  useEffect(() => {

    axios.get(
      "http://localhost:3000/api/employer/profile-data",
      {
        withCredentials: true
      }
    )
    .then((res) => {

      const { user, profile } = res.data;

      setForm({
        name: user?.name || "",
        email: user?.email || "",
        employerType: profile?.employerType || "",
        companyName: profile?.companyName || "",
        location: profile?.location || "",
        phone: profile?.phone || "",
        about: profile?.about || "",
        jobCategories: profile?.jobCategories || []
      });

      setProfilePreview(user?.profileImage || "");
      setCoverPreview(profile?.coverImage || "");

      setLoading(false);

    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });

  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // PROFILE IMAGE
  const handleProfileImage = (e) => {

    const file = e.target.files[0];

    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  // COVER IMAGE
  const handleCoverImage = (e) => {

    const file = e.target.files[0];

    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach(key => {

      if (key === "jobCategories") {

        form.jobCategories.forEach(category => {
          formData.append("jobCategories", category);
        });

      } else {

        formData.append(key, form[key]);
      }

    });

    if (profileFile) {
      formData.append("profileImage", profileFile);
    }

    if (coverFile) {
      formData.append("coverImage", coverFile);
    }

    try {

      await axios.put(
        "http://localhost:3000/api/employer/profile-data",
        formData,
        {
          withCredentials: true
        }
      );

      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate("/employer/profile");
      }, 2000);

    } catch (err) {

      console.log(err);

      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10">
        Loading...
      </p>
    );
  }

  return (

    <div className="flex justify-center px-4 py-8">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-6"
      >

        <h2 className="text-3xl font-bold text-center text-cyan-700">
          Edit Employer Profile
        </h2>

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center gap-3">

          <img
            src={profilePreview || DEFAULT_PROFILE_IMAGE}
            className="w-24 h-24 rounded-full object-cover border"
          />

          <label className="cursor-pointer bg-cyan-600 text-white px-4 py-2 rounded-lg">

            Upload Profile Image

            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImage}
              className="hidden"
            />

          </label>

          {profileFile && (
            <p className="text-sm text-gray-500">
              {profileFile.name}
            </p>
          )}

        </div>

        {/* COVER IMAGE */}
        <div className="flex flex-col gap-2">

          <label className="font-medium">
            Cover Image
          </label>

            <img
              src={coverPreview || DEFAULT_COVER_IMAGE}
              className="h-32 w-full object-cover rounded-lg"
            />

          <label className="cursor-pointer border-2 border-dashed p-4 text-center rounded-lg hover:bg-gray-50">

            Upload Cover Image

            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImage}
              className="hidden"
            />

          </label>

        </div>

        {/* BASIC INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label>Name</label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label>Email</label>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label>Phone</label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label>Location</label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="input"
            />
          </div>

        </div>

        {/* EMPLOYER TYPE */}
        <div>

          <label className="mb-2 block">
            Employer Type
          </label>

          <select
            name="employerType"
            value={form.employerType}
            onChange={handleChange}
            className="input"
          >

            <option value="">
              Select Employer Type
            </option>

            {employerOptions.map((item, index) => (
              <option
                key={index}
                value={item.value}
              >
                {item.label}
              </option>
            ))}

          </select>

        </div>

        {/* JOB CATEGORIES */}
        <div>

          <label className="mb-2 block">
            Hiring Categories
          </label>

          <Select
            isMulti
            options={categoryOptions}

            value={categoryOptions.filter(option =>
              form.jobCategories.includes(option.value)
            )}

            onChange={(selected) => {

              setForm(prev => ({
                ...prev,
                jobCategories: selected.map(item => item.value)
              }));

            }}
          />

        </div>

        {/* COMPANY NAME */}
        {form.employerType === "Company" && (

          <div>

            <label>
              Company Name
            </label>

            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className="input"
            />

          </div>

        )}

        {/* ABOUT */}
        <textarea
          name="about"
          value={form.about}
          onChange={handleChange}
          placeholder="About employer..."
          className="input h-28"
        />

      

        {/* BUTTON */}
        <button className="bg-cyan-600 hover:bg-cyan-800 text-white py-3 rounded-xl text-lg transition">

          Save Changes

        </button>

      </form>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 8px;
          outline: none;
        }

        .input:focus {
          border-color: #06b6d4;
        }
      `}</style>

    </div>
  );
};

export default EditProfile;
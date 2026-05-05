import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {

  const navigate = useNavigate();

  const jobOptions = {
    high: ["Software Engineer", "Doctor", "Lawyer"],
    medium: ["Makeup Artist", "Photographer", "Electrician"],
    low: ["Cleaner", "Helper", "Delivery Boy"]
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    jobType: "",
    location: "",
    openToWork: false,
    about: "",
    skills: ""
  });

  const [profilePreview, setProfilePreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const [loading, setLoading] = useState(true);

  // 🔹 Fetch data
  useEffect(() => {
    axios.get('http://localhost:3000/api/employee/profile-data', {
      withCredentials: true
    })
    .then((res) => {
      const { user, profile } = res.data;

      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: profile?.phone || "",
        category: profile?.category || "",
        jobType: profile?.jobType || "",
        location: profile?.location || "",
        openToWork: profile?.openToWork || false,
        about: profile?.about || "",
        skills: profile?.skills?.join(", ") || ""
      });

      setProfilePreview(user.profileImage || "");
      setCoverPreview(profile?.coverImage || "");

      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  //  Handle input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "category" && { jobType: "" })
    }));
  };

  //  File handlers
  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  //  Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });

    formData.append("skills", form.skills);

    if (profileFile) formData.append("profileImage", profileFile);
    if (coverFile) formData.append("coverImage", coverFile);

    try {
      await axios.put(
        'http://localhost:3000/api/employee/profile-data',
        formData,
        { withCredentials: true }
      );

      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate("/employee/profile");
      }, 2000);
      
    } catch (err) {
      console.log(err);
      alert("Error updating profile");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-6"
      >

        <h2 className="text-3xl font-bold text-center text-cyan-700">
          Edit Profile
        </h2>

        {/* 🔹 PROFILE IMAGE */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={profilePreview || "https://via.placeholder.com/100"}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <label className="cursor-pointer bg-cyan-600 text-white px-4 py-2 rounded-lg">
            Upload Profile Image
            <input
              type="file"
              onChange={(e) => {
                handleProfileImage(e);
                console.log(e.target.files[0]?.name);
              }}
              className="hidden"
            />
          </label>

          {profileFile && (
            <p className="text-sm text-gray-500 mt-1">
              {profileFile.name}
            </p>
          )}
        </div>

        {/* 🔹 COVER IMAGE */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Cover Image</label>
          {coverPreview && (
            <img src={coverPreview} className="h-32 w-full object-cover rounded-lg" />
          )}
          <label className="cursor-pointer border-2 border-dashed p-4 text-center rounded-lg hover:bg-gray-50">
            Upload Cover Image
            <input
              type="file"
              onChange={handleCoverImage}
              className="hidden"
            />
          </label>
        </div>

        {/* 🔹 BASIC INFO */}
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

        {/* 🔹 JOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <select name="category" value={form.category} onChange={handleChange} className="input">
            <option value="">Select Category</option>
            <option value="high">High Skill</option>
            <option value="medium">Medium Skill</option>
            <option value="low">Low Skill</option>
          </select>

          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            className="input"
            disabled={!form.category}
          >
            <option value="">Select Job</option>
            {form.category &&
              jobOptions[form.category]?.map((job, i) => (
                <option key={i}>{job}</option>
              ))}
          </select>

        </div>

        {/* 🔹 SWITCH */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="openToWork"
            checked={form.openToWork}
            onChange={handleChange}
          />
          Open to Work
        </label>

        {/* 🔹 ABOUT */}
        <textarea
          name="about"
          value={form.about}
          onChange={handleChange}
          placeholder="About you..."
          className="input h-24"
        />

        {/* 🔹 SKILLS */}
        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className="input"
        />

        {/* 🔹 BUTTON */}
        <button className="bg-cyan-600 hover:bg-cyan-800 text-white py-3 rounded-xl text-lg">
          Save Changes
        </button>

      </form>

      {/* 🔹 Tailwind helper */}
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
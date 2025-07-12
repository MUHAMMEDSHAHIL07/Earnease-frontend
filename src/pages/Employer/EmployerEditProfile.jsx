import React, { useEffect, useState } from "react";
import { Upload, Mail, Phone, Globe, MapPin, Building2, Info } from "lucide-react";
import axios from "axios";

const EmployerEditProfile = () => {
  const store = JSON.parse(localStorage.getItem("earneaseUser"));
  const [employer,setEmployer] = useState([])
  const [verification,setVerfication] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:5000/api/employer/getprofile",{withCredentials:true})
    .then((res)=>setEmployer(res.data.employer))
    .catch((error)=>console.log(error))
  },[])

  useEffect(()=>{
     axios.get("http://localhost:5000/api/employer/getprofile",{withCredentials:true})
    .then((res)=>setVerfication(res.data.verification))
    .catch((error)=>console.log(error))
  },[])
  
console.log(employer);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Edit Company Profile</h1>
        <p className="text-sm text-gray-500 mb-6">Update your company information visible to job seekers</p>

        
        <div className="flex items-center gap-6 mb-8">
          <img
            src={store?.avatarUrl}
            alt="Company Logo"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <input
              type="file"
              id="avatarUpload"
              accept="image/*"
              className="hidden"
            />
            <label
              htmlFor="avatarUpload"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              Upload Logo
            </label>
            <p className="text-xs text-gray-500 mt-1">Recommended: Square image, at least 400×400px</p>
          </div>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name*</label>
            <input
              type="text"
               value={employer.companyname}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="text"
                className="w-full pl-10 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="email"
                value={employer.email}
                className="w-full pl-10 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="company@example.com"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="url"
                className="w-full pl-10 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.company.com"
              />
            </div>
          </div>

          {/* About Company */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">About Company</label>
            <textarea
              rows="4"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your company culture, mission, and values…"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Share what makes your company unique and attractive to potential employees
            </p>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="url"
                value={verification.industry}
                className="w-full pl-10 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="EG:PVT LTD"
              />
            </div>
          </div>

          {/* Company Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
            <div className="relative">
              <Info className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <select className="w-full pl-10 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select size</option>
                <option>1-10</option>
                <option>11-50</option>
                <option>51-200</option>
                <option>201+</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="text"
                className="w-full pl-10 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={verification.address}
                placeholder="Enter company location"
              />
            </div>
          </div>

          {/* Founded Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Founded Year</label>
            <input
              type="number"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="YYYY"
            />
          </div>
        </form>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerEditProfile;

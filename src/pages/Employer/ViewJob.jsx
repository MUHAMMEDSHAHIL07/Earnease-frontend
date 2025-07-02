import React, { useEffect, useState } from "react";
import {
  Briefcase,
  MapPin,
  IndianRupee,
  Clock,
  Users,
  Trash2,
  Pencil,
  Menu,
  X,
} from "lucide-react";
import axios from "axios";
import EmployerSidebar from "../Employer/EmployerSidebar"

const ViewJob = () => {
  const [jobs, setJob] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employer/getJob", {
          withCredentials: true,
        });
        setJob(res.data.getJob);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchJob();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Mobile Toggle Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h2 className="text-lg font-semibold text-blue-600">Your Jobs</h2>
      </div>

      {/* Sidebar */}
      <EmployerSidebar sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
            Jobs You've Posted
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 relative"
              >
                {/* Edit and Delete Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 transition"
                    title="Edit Job"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete Job"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  {job.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4">{job.Description}</p>

                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{job.Location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-gray-500" />
                    <span>{job.Salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{job.WorkHour}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>Gender: {job.Gender}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {job.Category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {jobs.length === 0 && (
            <p className="text-center text-gray-600 mt-10">
              You haven't posted any jobs yet.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewJob;

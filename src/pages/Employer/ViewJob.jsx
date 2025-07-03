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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ViewJob = () => {
  const [jobs, setJob] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()
  const HandleDelete = async(id)=>{
     try{
      await axios.delete(`http://localhost:5000/api/employer/deleteJob/${id}`,{withCredentials:true})
      setJob((prev)=>prev.filter((job)=>job._id!==id))
      toast.success("job deleted successfully") 
     }
     catch(error){
      const msg = error.response?.data?.message || err.message
      console.log(msg)
     }
  }

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employer/getJobs", {
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
  
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h2 className="text-lg font-semibold text-blue-600">Your Jobs</h2>
      </div>

  
      <EmployerSidebar sidebarOpen={sidebarOpen} />

 
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

                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700 transition"
                    title="Edit Job"
                    onClick={() => {
                      navigate(`/employer/editjob/${job._id}`)}}
                  >
                    
                    <Pencil size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete Job"
                    onClick={()=>HandleDelete(job._id)}
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

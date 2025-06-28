import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UploadCloud } from "lucide-react"; 
const VerifyEmployer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const employerId = location.state?.employerId || localStorage.getItem("employerId");

    useEffect(() => {
        if (location.state?.employerId) {
            localStorage.setItem("employerId", location.state.employerId);
        }
    }, [location.state]);

    const [formData, setFormData] = useState({
        companyType: '',
        industry: '',
        address: '',
        contactPerson: '',
        contactEmail: '',
        license: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, license: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!employerId) {
            toast.error("Missing employer ID");
            return;
        }

        const data = new FormData();
        data.append("employerId", employerId);
        data.append("companyType", formData.companyType);
        data.append("industry", formData.industry);
        data.append("address", formData.address);
        data.append("contactPerson", formData.contactPerson);
        data.append("contactEmail", formData.contactEmail);
        data.append("license", formData.license);

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/api/employer/verify", data, {
                withCredentials: true,
            });
            toast.success(res.data.message);
            localStorage.removeItem("employerId");
            navigate("/employer/verification-pending");
        } catch (err) {
            toast.info(err.response?.data?.message || "Verification failed");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-white p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl space-y-6"
                encType="multipart/form-data"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Employer Verification</h2>
                <p className="text-sm text-gray-500 text-center mb-4">Please provide accurate company details and upload valid documents.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="companyType"
                        placeholder="Company Type (e.g., Pvt Ltd)"
                        value={formData.companyType}
                        onChange={handleChange}
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="text"
                        name="industry"
                        placeholder="Industry (e.g., IT, Education)"
                        value={formData.industry}
                        onChange={handleChange}
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="text"
                        name="contactPerson"
                        placeholder="Contact Person Name"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="email"
                        name="contactEmail"
                        placeholder="Contact Email"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <textarea
                    name="address"
                    placeholder="Company Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                {/* Upload Section */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Upload License Document</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                            <div className="flex flex-col items-center justify-center pt-4 pb-3">
                                <UploadCloud className="h-6 w-6 text-blue-500 mb-1" />
                                <p className="text-sm text-gray-600">{formData.license?.name || "Click or drag to upload .pdf/.jpg/.png"}</p>
                            </div>
                            <input
                                type="file"
                                name="license"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                className="hidden"
                                required
                            />
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-md transition text-white ${loading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading ? "Submitting..." : "Submit Verification"}
                </button>

            </form>
        </div>
    );
};
export default VerifyEmployer;

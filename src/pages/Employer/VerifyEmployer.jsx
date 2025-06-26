import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyEmployer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const employerId = location.state?.employerId || localStorage.getItem("employerId")
    useEffect(() => {
        if (location.state?.employerId) {
            localStorage.setItem("employerId", location.state.employerId);
        }
    }, [location.state])

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
            const res = await axios.post("http://localhost:5000/api/employer/verify", data, {
                withCredentials: true,
            });
            toast.success(res.data.message);
            localStorage.removeItem("employerId")
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Verification failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl space-y-4"
                encType="multipart/form-data"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Employer Verification</h2>

                <input
                    type="text"
                    name="companyType"
                    placeholder="Company Type (e.g., Pvt Ltd)"
                    value={formData.companyType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="industry"
                    placeholder="Industry (e.g., IT, Education)"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <textarea
                    name="address"
                    placeholder="Company Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />


                <input
                    type="text"
                    name="contactPerson"
                    placeholder="Contact Person Name"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="email"
                    name="contactEmail"
                    placeholder="Contact Email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="file"
                    name="license"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Submit Verification
                </button>
            </form>
        </div>
    );
};

export default VerifyEmployer;

// src/pages/admin/EmployerDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EmployerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/employers/pending")
      .then(res => setData(res.data.verification))
      .catch(err => console.log(err.message));
  }, [id]);

  const handleAction = (action) => {
    axios.patch(`http://localhost:5000/admin/employers/${action}/${id}`)
      .then(() => navigate("/admin/employers/pending"))
      .catch(err => console.error("Error updating status:", err));
  };

  if (!data) return <div className="p-4">Loading…</div>;

  const { employerId, licenseUrl } = data;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{employerId.companyname} - Verification</h2>
      <p><strong>Email:</strong> {employerId.email}</p>
      <p><strong>Joined:</strong> {new Date(employerId.createdAt).toLocaleDateString()}</p>

      <h3 className="mt-4 mb-2 font-semibold">License Document</h3>
      {licenseUrl ? (
        <img src={licenseUrl} alt="License" className="w-64 border rounded" />
      ) : (
        <p>No license uploaded.</p>
      )}

      <div className="mt-6 flex gap-3">
        <button onClick={() => handleAction("approve")} className="bg-green-500 text-white px-4 py-2 rounded">
          Approve
        </button>
        <button onClick={() => handleAction("reject")} className="bg-red-500 text-white px-4 py-2 rounded">
          Reject
        </button>
        <button onClick={() => navigate(-1)} className="border px-4 py-2 rounded">
          Back
        </button>
      </div>
    </div>
  );
};

export default EmployerDetail;

import React from "react";
import "./LabManagement.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const LabManagement = () => {
  const navigate = useNavigate();
  const labs = [
    { id: "CL01", name: "Software Lab", type: "Hardware", maxCapacity: 50, technicalOfficer: "T001 - M. Maskhan" },
    { id: "CL02", name: "Software Lab", type: "Software", maxCapacity: 40, technicalOfficer: "T002 - J. Doe" },
    { id: "CL03", name: "Hardware Lab", type: "Hardware", maxCapacity: 60, technicalOfficer: "T003 - A. Smith" },
  ];

  const handleAddLabClick = () => {
    navigate("/add-lab"); // Navigate to the Add Lab form
  };

  const handleEditClick = (lab) => {
    navigate("/edit-lab", { state: lab }); // Pass lab details to EditLab.jsx
  };

  return (
    <div className="lab-management-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <h1 className="title">Lab Management</h1>
        <div className="lab-cards">
          {labs.map((lab) => (
            <div key={lab.id} className="lab-card">
              <h2>{lab.id}</h2>
              <p>{lab.name}</p>
              <button className="edit-button" onClick={() => handleEditClick(lab)}>
                Edit
              </button>
            </div>
          ))}
        </div>
        <button className="add-lab-button" onClick={handleAddLabClick}>
          Add Lab
        </button>
      </div>
    </div>
  );
};

export default LabManagement;

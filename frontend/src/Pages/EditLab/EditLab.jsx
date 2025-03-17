import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditLab.css";

function EditLab() {
  const location = useLocation(); // Get passed state (lab details)
  const navigate = useNavigate();
  
  const labDetails = location.state || {}; // Fallback if no state is passed

  const [labName, setLabName] = useState(labDetails.id || "");
  const [labType, setLabType] = useState(labDetails.type || "");
  const [maxCapacity, setMaxCapacity] = useState(labDetails.maxCapacity || "");
  const [technicalOfficer, setTechnicalOfficer] = useState(labDetails.technicalOfficer || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Lab details updated successfully!");
    navigate("/lab-management"); // Redirect back to Lab Management after editing
  };

  return (
    <div className="edit-lab-container">
      <Sidebar />
      <div className="edit-lab-content">
        <form className="edit-lab-form" onSubmit={handleSubmit}>
          <h2>Edit Lab</h2>
          <label>
            Lab Name:
            <input
              type="text"
              value={labName}
              onChange={(e) => setLabName(e.target.value)}
            />
          </label>
          <label>
            Lab Type:
            <select value={labType} onChange={(e) => setLabType(e.target.value)}>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
            </select>
          </label>
          <label>
            Max Capacity:
            <input
              type="number"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
            />
          </label>
          <label>
            Technical Officer:
            <select
              value={technicalOfficer}
              onChange={(e) => setTechnicalOfficer(e.target.value)}
            >
              <option value="T001 - M. Maskhan">T001 - M. Maskhan</option>
              <option value="T002 - J. Doe">T002 - J. Doe</option>
              <option value="T003 - A. Smith">T003 - A. Smith</option>
            </select>
          </label>
          <button type="submit" className="edit-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditLab;

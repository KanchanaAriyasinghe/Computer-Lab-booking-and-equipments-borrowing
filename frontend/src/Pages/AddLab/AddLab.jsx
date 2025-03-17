import React from "react";
import "./AddLab.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const AddLab = () => {
  return (
    <div className="add-lab-container">
      <Sidebar />
      <div className="add-lab-form">
        <h2>Add Lab</h2>
        <form>
          {/* Lab Name */}
          <div className="form-group">
            <label htmlFor="labName">Lab Name</label>
            <input type="text" id="labName" placeholder="Enter lab name" />
          </div>

          {/* Lab Type */}
          <div className="form-group">
            <label htmlFor="labType">Lab Type</label>
            <select id="labType">
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Max Capacity */}
          <div className="form-group">
            <label htmlFor="maxCapacity">Max Capacity</label>
            <input type="number" id="maxCapacity" placeholder="Enter max capacity" />
          </div>

          {/* Technical Officer */}
          <div className="form-group">
            <label htmlFor="technicalOfficer">Technical Officer</label>
            <select id="technicalOfficer">
              <option value="T001 - M. Malikm">T001 - M. Malikm</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="add-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddLab;

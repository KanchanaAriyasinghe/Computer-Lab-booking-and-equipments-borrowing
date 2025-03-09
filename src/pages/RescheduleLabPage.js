import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Ensure this is correctly imported
import "../styles/RescheduleLabPage.css"; // Ensure this file exists

const RescheduleLabPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    course: "",
    lab: "",
    reason: "",
    medicalReport: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here (e.g., send the data to backend)
    console.log(formData);
  };

  return (
    <div className="page-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="reschedule-container">
        <h2>Reschedule Lab</h2>
        <p>Please fill out the form below to request a lab reschedule.</p>

        {/* Reschedule Form */}
        <form className="reschedule-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="regNo">Registration Number:</label>
            <input
              type="text"
              id="regNo"
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course Code:</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lab">Lab Number:</label>
            <input
              type="text"
              id="lab"
              name="lab"
              value={formData.lab}
              onChange={handleChange}
              required
              placeholder="Enter Lab Number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason for Reschedule:</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="medicalReport">Attach Medical Report (PDF):</label>
            <input
              type="file"
              id="medicalReport"
              name="medicalReport"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="reschedule-btn">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RescheduleLabPage;

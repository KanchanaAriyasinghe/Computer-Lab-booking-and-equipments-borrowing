import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./EditLecturer.css";

const EditLecturer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lecturerData = location.state?.lecturer || {}; // Get lecturer data from state

  const [lecturerDetails, setLecturerDetails] = useState({
    id: lecturerData.id || "",
    name: lecturerData.name || "",
    email: lecturerData.email || "",
    password: lecturerData.password || "",
    department: lecturerData.department || "",
    semester: lecturerData.semester || "",
    courses: lecturerData.courses ? lecturerData.courses.join(", ") : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLecturerDetails({ ...lecturerDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Lecturer Details:", lecturerDetails);
    // Redirect back to Lecturer Management after editing
    navigate("/lecturers");
  };

  return (
    <div className="edit-lecturer-container">
      <Sidebar />
      <div className="form-container">
        <h2>Edit Lecturer Details</h2>
        <form onSubmit={handleSubmit}>
          <label>ID Number</label>
          <input type="text" name="id" value={lecturerDetails.id} disabled />

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={lecturerDetails.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={lecturerDetails.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={lecturerDetails.password}
            onChange={handleChange}
          />

          <label>Department</label>
          <select
            name="department"
            value={lecturerDetails.department}
            onChange={handleChange}
          >
            <option value="Com">Com</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
          </select>

          <label>Semester</label>
          <select
            name="semester"
            value={lecturerDetails.semester}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5, 6].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>

          <label>Courses</label>
          {/* Courses are displayed as a comma-separated string */}
          <input
            type="text"
            name="courses"
            value={lecturerDetails.courses}
            onChange={handleChange}
          />

          <button type="submit" className="edit-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLecturer;

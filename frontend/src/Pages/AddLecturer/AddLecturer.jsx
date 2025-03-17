import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar"; // Importing Sidebar

import "./AddLecturer.css";

const AddLecturer = () => {
  const [lecturer, setLecturer] = useState({
    idNumber: "",
    name: "",
    email: "",
    password: "",
    department: "Com",
    courses: "EC5070",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLecturer({ ...lecturer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lecturer Details:", lecturer);
  };

  return (
    <div className="add-lecturer-container">
      <Sidebar /> {/* Sidebar Component */}
      <div className="form-container">
        <h2>Add Lecturer</h2>
        <form onSubmit={handleSubmit}>
          <label>ID Number</label>
          <input
            type="text"
            name="idNumber"
            value={lecturer.idNumber}
            onChange={handleChange}
            required
          />

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={lecturer.name}
            onChange={handleChange}
            required
          />

          <label>E-Mail</label>
          <input
            type="email"
            name="email"
            value={lecturer.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={lecturer.password}
            onChange={handleChange}
            required
          />

          <label>Department</label>
          <select
            name="department"
            value={lecturer.department}
            onChange={handleChange}
          >
            <option value="Com">Com</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
          </select>

          <label>Courses</label>
          <select
            name="courses"
            value={lecturer.courses}
            onChange={handleChange}
          >
            <option value="EC5070">EC5070</option>
            <option value="EC6060">EC6060</option>
          </select>

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddLecturer;

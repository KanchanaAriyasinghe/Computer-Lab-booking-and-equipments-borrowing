 // AddStudentForm.jsx
 import React from 'react';
 import './AddStudent.css';
 import Sidebar from "../../components/Sidebar/Sidebar";
 

 const AddStudentForm = () => {
  return (
  <div className="add-student-container">
  <Sidebar />
  <div className="form-container">
  <h2>Add Student</h2>
  <div className="form-wrapper">
  <div className="form-group">
  <label htmlFor="registrationNumber">Registration Number</label>
  <input type="text" id="registrationNumber" name="registrationNumber" />
  </div>
  <div className="form-group">
  <label htmlFor="name">Name</label>
  <input type="text" id="name" name="name" />
  </div>
  <div className="form-group">
  <label htmlFor="email">E-Mail</label>
  <input type="email" id="email" name="email" />
  </div>
  <div className="form-group">
  <label htmlFor="password">Password</label>
  <input type="password" id="password" name="password" />
  </div>
  <div className="form-group">
  <label htmlFor="department">Department</label>
  <select id="department" name="department">
  <option value="">Select Department</option>
  <option value="computerScience">Computer Science</option>
  <option value="electricalEngineering">Electrical Engineering</option>
  <option value="mechanicalEngineering">Mechanical Engineering</option>
  </select>
  </div>
  <div className="form-group">
  <label htmlFor="semester">Semester</label>
  <input type="text" id="semester" name="semester" />
  </div>
  <div className="form-group">
  <label htmlFor="batch">Batch</label>
  <select id="batch" name="batch">
  <option value="">Select Batch</option>
  <option value="2021">2021</option>
  <option value="2022">2022</option>
  <option value="2023">2023</option>
  </select>
  </div>
  <button type="submit" className="add-button">Add</button>
  </div>
  </div>
  </div>
  );
 };
 

 export default AddStudentForm;

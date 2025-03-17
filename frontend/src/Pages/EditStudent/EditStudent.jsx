 // EditStudentDetails.jsx
 

 import React from 'react';
 import './EditStudent.css';
 import { useParams, useNavigate } from 'react-router-dom';
 

 const EditStudentDetails = () => {
  return (
  <div className="edit-student-details-container">
  <div className="edit-student-details">
  <h2>Edit Student Details</h2>
  <div className="form-group">
  <label htmlFor="registrationNumber">Registration Number</label>
  <input type="text" id="registrationNumber" value="2021E009" readOnly />
  </div>
  <div className="form-group">
  <label htmlFor="name">Name</label>
  <input type="text" id="name" value="A.Y.I.D. Perera" />
  </div>
  <div className="form-group">
  <label htmlFor="email">E-Mail</label>
  <input type="email" id="email" value="2021e009@eng.jfn.ac.lk" />
  </div>
  <div className="form-group">
  <label htmlFor="password">Password</label>
  <input type="password" id="password" value="**********" />
  </div>
  <div className="form-group">
  <label htmlFor="department">Department</label>
  <select id="department" defaultValue="Com">
  <option value="Com">Com</option>
  <option value="IT">IT</option>
  {/* Add more options as needed */}
  </select>
  </div>
  <div className="form-group">
  <label htmlFor="semester">Semester</label>
  <select id="semester" defaultValue="6">
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  {/* Add more options as needed */}
  </select>
  </div>
  <div className="form-group">
  <label htmlFor="batch">Batch</label>
  <select id="batch" defaultValue="E21">
  <option value="E20">E20</option>
  <option value="E21">E21</option>
  <option value="E22">E22</option>
  {/* Add more options as needed */}
  </select>
  </div>
  <button className="edit-button">Edit</button>
  </div>
  </div>
  );
 };
 

 export default EditStudentDetails;

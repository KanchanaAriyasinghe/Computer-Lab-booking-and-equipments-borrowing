import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar"; // Importing Sidebar component
import "./LecturerManagement.css"; // Importing CSS styles
import { useNavigate } from "react-router-dom";

const LecturerManagement = () => {
  const navigate = useNavigate();

  // Initialize lecturers array with useState
  const [lecturers, setLecturers] = useState([
    {
      id: "L001",
      name: "A.Y.I.D. Perera",
      email: "L001@eng.jfn.ac.lk",
      password: "********",
      department: "Com",
      semester: "6",
      courses: ["EC6060", "EC5070"],
    },
    {
      id: "L002",
      name: "K. Silva",
      email: "L002@eng.jfn.ac.lk",
      password: "********",
      department: "IT",
      semester: "3",
      courses: ["IT2040", "IT3050"],
    },
  ]);

  const handleAddLecturerClick = () => {
    navigate("/add-lecturer"); // Navigate to the AddLecturerForm
  };

  const handleEditClick = (lecturer) => {
    navigate("/edit-lecturer", { state: { lecturer } }); // Pass the selected lecturer's details to EditLecturer
  };

  // Function to delete a lecturer by ID
  const handleDeleteClick = (id) => {
    setLecturers((oldLecturers) =>
      oldLecturers.filter((lecturer) => lecturer.id !== id)
    );
  };

  return (
    <div className="lecturer-management-container">
      <Sidebar /> {/* Sidebar Component */}
      <div className="main-content">
        <h1>Lecturer Management</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <table className="lecturer-table">
          <thead>
            <tr>
              <th>No</th>
              <th>ID Number</th>
              <th>Name</th>
              <th>Department</th>
              <th>Courses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lecturers.map((lecturer, index) => (
              <tr key={lecturer.id}>
                <td>{index + 1}</td>
                <td>{lecturer.id}</td>
                <td>{lecturer.name}</td>
                <td>{lecturer.department}</td>
                <td>{lecturer.courses.join(", ")}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(lecturer)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(lecturer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="add-lecturer-btn"
          onClick={handleAddLecturerClick}
        >
          Add Lecturer
        </button>
      </div>
    </div>
  );
};

export default LecturerManagement;

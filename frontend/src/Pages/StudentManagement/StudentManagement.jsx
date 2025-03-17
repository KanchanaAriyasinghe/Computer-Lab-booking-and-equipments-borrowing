import React, { useState } from 'react';
import './StudentManagement.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from 'react-router-dom';

const StudentManagement = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([
    { id: 1, registrationNumber: '2021E009', name: 'A.Y.I.D. Perera', department: 'Com', batch: 'E21', currentSemester: 6, email: '2021e009@eng.jfn.ac.lk', password: 'password123' },
    { id: 2, registrationNumber: '2021E009', name: 'A.Y.I.D. Perera', department: 'Com', batch: 'E21', currentSemester: 6, email: '2021e009@eng.jfn.ac.lk', password: 'password123' },
    { id: 3, registrationNumber: '2021E009', name: 'A.Y.I.D. Perera', department: 'Com', batch: 'E21', currentSemester: 6, email: '2021e009@eng.jfn.ac.lk', password: 'password123' },
  ]);

  const handleAddStudentClick = () => {
    navigate('/add-student'); // Navigate to the AddStudentForm
  };

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  const handleEditStudent = (id) => {
    navigate(`/edit-student/${id}`);
  };

  return (
    <div className="student-management-container">
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <h1>Student Management</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button><i className="fas fa-search"></i></button> {/* Replace with your icon component */}
        </div>

        <table className="student-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Registration Number</th>
              <th>Name</th>
              <th>Department</th>
              <th>Batch</th>
              <th>Current Semester</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.registrationNumber}</td>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.batch}</td>
                <td>{student.currentSemester}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditStudent(student.id)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteStudent(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="add-student-button" onClick={handleAddStudentClick}>Add Student</button>
      </div>
    </div>
  );
};

export default StudentManagement;

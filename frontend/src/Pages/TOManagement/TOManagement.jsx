import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./TOManagement.css";
import { useNavigate } from "react-router-dom";

function TOManagement() {
  const navigate = useNavigate();

  const initialData = [
    {
      idNumber: "T001",
      name: "M. Malshan",
      email: "MMalshan@gnjha.ac.lk",
      password: "********",
      lab: "CL01",
    },
    // Add more data here...
  ];

  const [tableData, setTableData] = useState(initialData);

  const handleAddTOClick = () => {
    navigate("/add-to");
  };

  const handleEditClick = (toDetails) => {
    navigate("/edit-to", { state: { toDetails } });
  };

  const handleDeleteRow = (idNumber) => {
    const updatedData = tableData.filter((row) => row.idNumber !== idNumber);
    setTableData(updatedData);
  };

  return (
    <div className="to-management-container">
      <Sidebar />
      <div className="main-content">
        <h1>TO Management</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        <table className="to-table">
          <thead>
            <tr>
              <th>No</th>
              <th>ID Number</th>
              <th>Name</th>
              <th>Lab</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={row.idNumber}>
                <td>{index + 1}</td>
                <td>{row.idNumber}</td>
                <td>{row.name}</td>
                <td>{row.lab}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEditClick({
                        idNumber: row.idNumber,
                        name: row.name,
                        email: row.email,
                        password: row.password,
                        lab: row.lab,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteRow(row.idNumber)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-to-btn" onClick={handleAddTOClick}>
          Add TO
        </button>
      </div>
    </div>
  );
}

export default TOManagement;

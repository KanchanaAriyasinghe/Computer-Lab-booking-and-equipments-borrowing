import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar"; // Importing Sidebar
import "./EditTO.css"; // Importing CSS

const EditTO = () => {
  const [formData, setFormData] = useState({
    name: "M. Maisham",
    idNumber: "T001",
    email: "MMaisham@gnjha.ac.lk",
    password: "********",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="edit-to-container">
      <Sidebar /> {/* Sidebar Component */}
      <div className="edit-to-content">
        <form className="edit-to-form" onSubmit={handleSubmit}>
          <h2>Edit TO</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="idNumber">ID Number</label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-btn">Add</button>
        </form>
      </div>
    </div>
  );
};

export default EditTO;

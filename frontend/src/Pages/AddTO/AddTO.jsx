import React from "react";
import "./AddTO.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const AddTO = () => {
  return (
    <div className="add-to-container">
      <Sidebar />
      <div className="form-container">
        <h2>Add TO</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter Name" />
          </div>
          <div className="form-group">
            <label htmlFor="idNumber">ID Number</label>
            <input type="text" id="idNumber" placeholder="Enter ID Number" />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" placeholder="Enter E-mail" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter Password" />
          </div>
          <button type="submit" className="add-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddTO;

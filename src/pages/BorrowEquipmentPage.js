import React from "react";
import Sidebar from "../components/Sidebar"; // Ensure this is correctly imported
import "../styles/BorrowEquipmentPage.css"; // Ensure this file exists in your styles folder

const BorrowEquipmentPage = () => {
  const equipmentList = [
    {
      id: 1,
      name: "Projector",
      status: "Available",
      quantity: "2/3",
      imgSrc: "/images/projector.png", // Replace with the actual image path
    },
    {
      id: 2,
      name: "Mouse",
      status: "Available",
      quantity: "5/5",
      imgSrc: "/images/mouse.png", // Replace with the actual image path
    },
    {
      id: 3,
      name: "Laptop",
      status: "Available",
      quantity: "3/3",
      imgSrc: "/images/laptop.png", // Replace with the actual image path
    },
    {
      id: 4,
      name: "Keyboard",
      status: "Available",
      quantity: "4/4",
      imgSrc: "/images/keyboard.png", // Replace with the actual image path
    },
    {
      id: 5,
      name: "Arduino Uno",
      status: "Available",
      quantity: "10/10",
      imgSrc: "/images/arnano.png", // Replace with the actual image path
    },
    {
      id: 6,
      name: "Arduino Uno",
      status: "Available",
      quantity: "2/3",
      imgSrc: "/images/aruno.png", // Replace with the actual image path
    },
    {
      id: 7,
      name: "Breadboard",
      status: "Available",
      quantity: "2/2",
      imgSrc: "/images/br.png", // Replace with the actual image path
    },
  ];

  return (
    <div className="page-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="borrow-equipment-container">
        <h2>Borrow Equipment</h2>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search Equipment..." />
        </div>

        {/* Equipment List */}
        <div className="equipment-list">
          {equipmentList.map((equipment) => (
            <div key={equipment.id} className="equipment-item">
              <img src={equipment.imgSrc} alt={equipment.name} />
              <h3>{equipment.name}</h3>
              <p>Status: {equipment.status}</p>
              <p>Quantity: {equipment.quantity}</p>
              <button className="request-btn">Request</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BorrowEquipmentPage;

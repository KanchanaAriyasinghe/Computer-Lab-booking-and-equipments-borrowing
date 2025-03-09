// NoticesPage.js
import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/NoticesPage.css"; // Ensure this file exists

const NoticesPage = () => {
  const notices = [
    {
      id: 1,
      title: "Computer Lab 01 booking accepted.",
      date: "February 1, 2025",
      icon: "✅",
    },
    {
      id: 2,
      title: "Computer Lab 02 booking rejected",
      date: "February 2, 2025",
      icon: "❌",
    },
    {
      id: 3,
      title: "EC6060 Software Engineering Lab 02 reschedule accepted",
      date: "February 4, 2025",
      icon: "🧑‍💻",
    },
  ];

  return (
    <div className="page-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <div className="notices-container">
          <h1>Notifications</h1>
          <div className="notices-list">
            {notices.map((notice) => (
              <div key={notice.id} className="notice-item">
                <span className="icon">{notice.icon}</span>
                <div className="notice-content">
                  <h3>{notice.title}</h3>
                  <p>{notice.date}</p>
                </div>
                <button className="close-btn">✖</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticesPage;

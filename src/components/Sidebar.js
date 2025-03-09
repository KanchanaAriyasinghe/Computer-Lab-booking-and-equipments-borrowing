import React from "react";
import "../styles/Sidebar.css"; // Ensure this file exists in your styles folder

const Sidebar = () => {
  return (
  <nav className="sidebar"> {/* Change div to nav */}
    <div className="sidebar-logo">
      <img src="/images/2.png" alt="LabMate Logo" />
    </div>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/notices">Notices</a></li>
      <li><a href="/reschedule-lab">Reschedule Labs</a></li>
      <li><a href="/book-lab">Book Labs</a></li>
      <li><a href="/borrow-equipment">Borrow Equipment</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>
  </nav>
  );
};

export default Sidebar;

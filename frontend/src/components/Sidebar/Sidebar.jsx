import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaSignOutAlt ,FaUserCog,FaUsers,FaChalkboardTeacher} from "react-icons/fa";

// If no userType is provided, default to "Admin"
function Sidebar({ userType = "Admin" }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const menuItems = {
    Admin: [
      { icon: FaHome, tooltip: "Home", linkName: "Home", href: "/" },
      {
        icon: FaCalendarAlt,
        tooltip: "Schedule Labs",
        linkName: "Schedule Labs",
        href: "/scheduleLabs",
      },
      {
        icon: FaUsers,
        tooltip: "Student Management",
        linkName: "Student Management",
        href: "/student-management",
      },
      {
        icon: FaUserCog,
        tooltip: "TO Management",
        linkName: "TO Management",
        href: "/to-management",
      },
      {
        icon: FaChalkboardTeacher,
        tooltip: "Lecturer Management",
        linkName: "Lecturer Management",
        href: "/lecturer-management",
      },
      {
        icon: FaCalendarAlt,
        tooltip: "Lab Management",
        linkName: "Lab Management",
        href: "/lab-management",
      },
      {
        icon: FaSignOutAlt,
        tooltip: "Logout",
        linkName: "Logout",
        href: "/logout",
      },
      
    ],
  };

  const userMenuItems = menuItems[userType] || [];

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div>
      <div className="logo-details">
        <div className="logo_name">Dashboard</div>
        <i
          className={`bx ${isOpen ? "bx-menu-alt-right" : "bx-menu"}`}
          id="btn"
          onClick={toggleSidebar}
          style={{ cursor: "pointer" }}
        ></i>
      </div>
      </div>
      <div>
      <ul className="nav-list">
        {userMenuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <li key={index}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <IconComponent className="sidebar-icon" />
                <span className="links_name">{item.linkName}</span>
              </NavLink>
              <span className="tooltip">{item.tooltip}</span>
            </li>
          );
        })}
      </ul>
      </div>
    </div>
  );
}

export default Sidebar;

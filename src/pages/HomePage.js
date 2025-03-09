/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "../styles/HomePage.css"; // Ensure this file exists in your styles folder

const HomePage = () => {
  return (
    <div className="home-page-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <img src="/images/2.png" alt="LabMate Logo" /> {/* Replace with your logo image */}
        </div>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/notices">Notices</a></li>
          <li><a href="/reschedule-lab">Reschedule Labs</a></li>
          <li><a href="/book-lab">Book Labs</a></li>
          <li><a href="/borrow-equipment">Borrow Equipment</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <h2>Welcome Back,  2021/E/001 !</h2>
          <p>Always stay updated in your student portal</p>
          <img src="/images/1.png" alt="Welcome Image" className="welcome-image" />
        </div>

        {/* Lab Schedule Table */}
        <div className="lab-schedule">
          <h3>Lab Schedule</h3>
          <table>
            <thead>
              <tr>
                <th> Time Period </th>
                <th>Mon</th>
                <th>Tues</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>08.00 - 11.00</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                      
                
              </tr>
              <tr>
                <td>09.00 - 12.00</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                      
                
              </tr>
              <tr>
                <td>13.00 - 4.00 </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>


              </tr>
              <tr>
                <td>13.30 - 16.30 </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                
              </tr>

              {/* Repeat rows for each time slot */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

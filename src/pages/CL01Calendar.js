import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Ensure this is correctly imported
import "../styles/CL01Calendar.css"; // Ensure this file exists for styling

const CL01Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cl01-page-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="cl01-calendar-container">
        <h3>Lab Schedule for CL01 (Software Lab 1)</h3>

        {/* Lab Schedule Table */}
        <table className="cl01-schedule-table">
          <thead>
            <tr>
              <th>Time Period</th>
              <th>Mon</th>
              <th>Tues</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>08:00 - 11:00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>09:00 - 12:00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>13:00 - 16:00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>13:30 - 16:30</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* Add more time slots as needed */}
          </tbody>
        </table>

        {/* Back Button */}
        <button className="cl01-back-btn" onClick={() => window.history.back()}>
          Back
        </button>

        {/* Book Lab Button */}
        <button className="cl01-book-btn" onClick={openModal}>
          Book Lab
        </button>

        {/* Modal for Lab Booking */}
        {isModalOpen && (
          <div className="cl01-modal">
            <div className="cl01-modal-content">
              <h2>Book Lab 1</h2>
              <form>
                <div className="cl01-form-group">
                  <label htmlFor="date">Date:</label>
                  <input type="date" id="date" name="date" />
                </div>
                <div className="cl01-form-group">
                  <label htmlFor="time">Time:</label>
                  <input type="time" id="time" name="time" />
                </div>
                <div className="cl01-form-group">
                  <label htmlFor="reason">Reason:</label>
                  <input type="text" id="reason" name="reason" />
                </div>
                <div className="cl01-form-group">
                  <label htmlFor="department">For which department:</label>
                  <input type="text" id="department" name="department" />
                </div>
                <div className="cl01-form-group">
                  <label htmlFor="batch">For which batch:</label>
                  <input type="text" id="batch" name="batch" />
                </div>
                <div className="cl01-form-group">
                  <label htmlFor="course">For which course:</label>
                  <input type="text" id="course" name="course" />
                </div>
                <div className="cl01-form-group">
                  <label htmlFor="requirements">Additional Requirements:</label>
                  <textarea id="requirements" name="requirements"></textarea>
                </div>
                <button type="submit" className="cl01-submit-btn">
                  Submit
                </button>
              </form>
              <button className="cl01-close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CL01Calendar;

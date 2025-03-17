// ScheduleLabs.jsx
import React, { useState } from "react";
import "./ScheduleLabs.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const ScheduleLabs = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [course, setCourse] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState(""); // State for success/error messages

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleBatchChange = (e) => {
    setBatch(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const handleSchedule = () => {
    if (
      !selectedDate ||
      !selectedTime ||
      !department ||
      !batch ||
      !course
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    // Simulate successful scheduling
    setMessage("Lab scheduled successfully!");

    // Reset form fields (optional)
    setSelectedDate(null);
    setSelectedTime("10:00");
    setDepartment("");
    setBatch("");
    setCourse("");
    setDetails("");

    // Clear the message after a delay (optional)
    setTimeout(() => {
      setMessage("");
    }, 3000); // Clear after 3 seconds
  };

  return (
    <div className="schedule-labs-page">
      <Sidebar />

      <div className="schedule-labs-container">
        <Header />
        <div className="schedule-labs-content">
          <div className="schedule-labs-form">
            <h2>Schedule Lab</h2>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <TimePicker
                onChange={handleTimeChange}
                value={selectedTime}
                format="HH:mm"
                clearIcon={null}
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">For which department</label>
              <select
                id="department"
                value={department}
                onChange={handleDepartmentChange}
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                {/* Add more department options here */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="batch">For which batch</label>
              <select id="batch" value={batch} onChange={handleBatchChange}>
                <option value="">Select Batch</option>
                <option value="Batch 2021">Batch 2021</option>
                <option value="Batch 2022">Batch 2022</option>
                {/* Add batch options here */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="course">For which course</label>
              <select id="course" value={course} onChange={handleCourseChange}>
                <option value="">Select Course</option>
                <option value="Data Structures">Data Structures</option>
                <option value="Algorithms">Algorithms</option>
                {/* Add course options here */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="details">Additional Details</label>
              <textarea
                id="details"
                rows="4"
                value={details}
                onChange={handleDetailsChange}
              ></textarea>
            </div>
            <button className="schedule-button" onClick={handleSchedule}>
              Schedule
            </button>
              {message && <div className="message">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleLabs;

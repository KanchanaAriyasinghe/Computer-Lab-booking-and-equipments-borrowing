// pages/CL03Calendar.js
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CL03Calendar = () => {
    const [bookedSlots, setBookedSlots] = useState([]);  // Initialize booked slots state
    const [selectedDate, setSelectedDate] = useState(new Date());  // Initialize selected date state

    // Fetch booked slots for CL03
    useEffect(() => {
        fetch("http://localhost:5000/api/locations/CL03")  // Fetching data for CL03
            .then((res) => res.json())
            .then((data) => setBookedSlots(data.bookedSlots));  // Assuming the booked slots are in `bookedSlots` field
    }, []);

    // Check if the selected date is booked
    const isBooked = (date) => {
        return bookedSlots.some(
            (slot) => new Date(slot).toDateString() === date.toDateString()
        );
    };

    // Handle date click for booking
    const handleDateClick = (date) => {
        if (isBooked(date)) {
            alert("This slot is already booked. Please choose another.");
        } else {
            alert(`You selected ${date.toDateString()}. Proceed to book!`);
        }
    };

    return (
        <div className="calendar-container">
            <h1>Booking Calendar for Hardware Lab (CL03)</h1>
            <Calendar
                onClickDay={handleDateClick}
                value={selectedDate}
                tileClassName={({ date }) =>
                    isBooked(date) ? "booked-slot" : "available-slot"
                }
            />
        </div>
    );
};

export default CL03Calendar;

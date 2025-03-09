// pages/BookLabPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BookLabPage.css";

const labs = [
    { id: "CL01", name: "Software Lab 1" },
    { id: "CL02", name: "Software Lab 2" },
    { id: "CL03", name: "Hardware Lab" }
];

const BookLabPage = () => {
    const navigate = useNavigate();

    const handleViewCalendar = (labId) => {
        navigate(`/calendar/${labId}`); // Redirect to the calendar page for the selected lab
    };

    return (
        <div className="book-lab-container">
            <h1 className="title">Book Labs</h1>
            <div className="lab-list">
                {labs.map((lab) => (
                    <div key={lab.id} className="lab-card">
                        <h3>{lab.id}</h3>
                        <p>{lab.name}</p>
                        <button onClick={() => handleViewCalendar(lab.id)}>
                            Book
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookLabPage;

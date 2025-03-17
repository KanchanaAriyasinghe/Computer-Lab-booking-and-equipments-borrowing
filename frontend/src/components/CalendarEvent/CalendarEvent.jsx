// src/components/CalendarEvent/CalendarEvent.js
import React from 'react';
import './CalendarEvent.css';

function CalendarEvent({ title }) {
    return (
        <div className="calendar-event">
            {title}
        </div>
    );
}

export default CalendarEvent;

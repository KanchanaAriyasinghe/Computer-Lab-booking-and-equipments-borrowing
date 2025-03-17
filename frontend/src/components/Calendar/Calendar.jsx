import React, { useState, useEffect, useCallback } from 'react';
import './Calendar.css';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('week');
    const [selectedBatch, setSelectedBatch] = useState('E21');
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [currentWeek, setCurrentWeek] = useState(1);
    const [error, setError] = useState('');
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({
        day: '',
        startTime: '',
        endTime: '',
        title: '',
        batch: 'E21'
    });

    const getWeekStartDate = useCallback((date) => {
        const clone = new Date(date);
        clone.setDate(clone.getDate() - clone.getDay() + 1);
        return clone;
    }, []);

    const getWeekDates = useCallback((month, week) => {
        const year = currentDate.getFullYear();
        const firstDayOfMonth = new Date(year, month, 1);
        const firstWeekDay = firstDayOfMonth.getDay() || 7;
        const startDate = new Date(year, month, 1 + (week - 1) * 7 - (firstWeekDay - 1));
        const dates = [];
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            dates.push(date);
        }
        return dates;
    }, [currentDate]);

    const getTimeSlots = () => {
        const slots = [];
        // Morning slots (8 AM - 12 PM)
        for (let hour = 8; hour <= 12; hour++) {
            slots.push(`${hour}:00 AM`);
        }
        // Afternoon slots (1 PM - 4 PM)
        for (let hour = 1; hour <= 4; hour++) {
            slots.push(`${hour}:00 PM`);
        }
        return slots;
    };

    const handleAddEvent = () => {
        if (!newEvent.day || !newEvent.startTime || !newEvent.endTime || !newEvent.title) {
            setError('All fields are required!');
            return;
        }
        if (newEvent.startTime >= newEvent.endTime) {
            setError('End time must be after start time!');
            return;
        }

        setEvents([...events, {
            ...newEvent,
            id: Date.now(),
            batch: selectedBatch
        }]);
        setNewEvent({ day: '', startTime: '', endTime: '', title: '', batch: selectedBatch });
        setError('');
    };

    const handleUpdateEvent = () => {
        if (!editingEvent) return;
        setEvents(events.map(e => e.id === editingEvent.id ? editingEvent : e));
        setEditingEvent(null);
        setSelectedEvent(null);
    };

    const handleDeleteEvent = (id) => {
        setEvents(events.filter(e => e.id !== id));
        setSelectedEvent(null);
    };

    const renderWeekView = () => {
        const weekDates = getWeekDates(selectedMonth, currentWeek);
        const timeSlots = getTimeSlots();

        return (
            <div className="week-view">
                <div className="week-header">
                    {weekDates.map(date => (
                        <div key={date.toISOString()} className="week-day">
                            <div>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                            <div>{date.getDate()}</div>
                        </div>
                    ))}
                </div>
                <div className="week-body">
                    <div className="time-column">
                        {timeSlots.map(time => (
                            <div key={time} className="time-slot">{time}</div>
                        ))}
                    </div>
                    {weekDates.map(date => {
                        const dateString = date.toISOString().split('T')[0];
                        const dayEvents = events.filter(e => 
                            e.day === dateString && e.batch === selectedBatch
                        );

                        return (
                            <div key={dateString} className="day-column">
                                {dayEvents.map(event => {
                                    const start = parseInt(event.startTime.split(':')[0]);
                                    const end = parseInt(event.endTime.split(':')[0]);
                                    const top = ((start - 8) * 60) + (start >= 13 ? -60 : 0);
                                    const height = (end - start) * 60;

                                    return (
                                        <div
                                            key={event.id}
                                            className="event"
                                            style={{
                                                top: `${top}px`,
                                                height: `${height}px`
                                            }}
                                            onClick={() => setSelectedEvent(event)}
                                        >
                                            <div className="event-title">{event.title}</div>
                                            <div className="event-time">
                                                {event.startTime} - {event.endTime}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="calendar-container">
            <div className="controls">
                <div className="batch-selector">
                    {['E21', 'E22', 'E23', 'E24'].map(batch => (
                        <button
                            key={batch}
                            className={selectedBatch === batch ? 'active' : ''}
                            onClick={() => setSelectedBatch(batch)}
                        >
                            {batch}
                        </button>
                    ))}
                </div>

                <div className="view-controls">
                    <button onClick={() => setView('month')}>Month</button>
                    <button onClick={() => setView('week')}>Week</button>
                    <button onClick={() => setView('day')}>Day</button>
                    
                    <select
                        value={selectedMonth}
                        onChange={e => {
                            setSelectedMonth(parseInt(e.target.value));
                            setCurrentWeek(1);
                        }}
                    >
                        {months.map((month, index) => (
                            <option key={month} value={index}>{month}</option>
                        ))}
                    </select>

                    <div className="week-navigation">
                        <button
                            onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                            disabled={currentWeek === 1}
                        >
                            ←
                        </button>
                        <span>Week {currentWeek}</span>
                        <button
                            onClick={() => setCurrentWeek(Math.min(
                                Math.ceil(daysInMonth(currentDate.getFullYear(), selectedMonth) / 7),
                                currentWeek + 1
                            ))}
                            disabled={currentWeek === Math.ceil(daysInMonth(currentDate.getFullYear(), selectedMonth) / 7)}
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>

            {view === 'week' && renderWeekView()}

            <div className="event-form">
                <h3>Add New Event</h3>
                {error && <div className="error">{error}</div>}
                <input
                    type="date"
                    value={newEvent.day}
                    onChange={e => setNewEvent({...newEvent, day: e.target.value})}
                    placeholder="Date"
                />
                <input
                    type="time"
                    value={newEvent.startTime}
                    onChange={e => setNewEvent({...newEvent, startTime: e.target.value})}
                    placeholder="Start Time"
                />
                <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={e => setNewEvent({...newEvent, endTime: e.target.value})}
                    placeholder="End Time"
                />
                <input
                    type="text"
                    value={newEvent.title}
                    onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Event Title"
                />
                <button onClick={handleAddEvent}>Add Event</button>
            </div>

            {selectedEvent && (
                <div className="event-modal">
                    <div className="modal-content">
                        <h3>Edit Event</h3>
                        <input
                            value={selectedEvent.title}
                            onChange={e => setSelectedEvent({...selectedEvent, title: e.target.value})}
                        />
                        <input
                            type="time"
                            value={selectedEvent.startTime}
                            onChange={e => setSelectedEvent({...selectedEvent, startTime: e.target.value})}
                        />
                        <input
                            type="time"
                            value={selectedEvent.endTime}
                            onChange={e => setSelectedEvent({...selectedEvent, endTime: e.target.value})}
                        />
                        <div className="modal-actions">
                            <button onClick={() => handleUpdateEvent(selectedEvent)}>Save</button>
                            <button onClick={() => handleDeleteEvent(selectedEvent.id)}>Delete</button>
                            <button onClick={() => setSelectedEvent(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Calendar;
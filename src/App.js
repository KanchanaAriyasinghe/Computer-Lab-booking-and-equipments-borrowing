import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Import Sidebar
import LoginPage from "./pages/LoginPage"; // Import Login Page
import HomePage from "./pages/HomePage"; // Student Home Page
import NoticesPage from "./pages/NoticesPage"; // Student Notices Page
import RescheduleLabPage from "./pages/RescheduleLabPage"; // Student Reschedule Lab Page
import BookLabPage from "./pages/BookLabPage"; // Student Book Lab Page
import BorrowEquipmentPage from "./pages/BorrowEquipmentPage"; // Student Borrow Equipment Page
import CL01Calendar from "./pages/CL01Calendar"; // Import the CL01Calendar page

import "./App.css"; // Import global CSS

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login page is set as the default route */}
        <Route path="/" element={<LoginPage />} />

        {/* Student Routes */}
        <Route
          path="/home"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/notices"
          element={
            <Layout>
              <NoticesPage />
            </Layout>
          }
        />
        <Route
          path="/reschedule-lab"
          element={
            <Layout>
              <RescheduleLabPage />
            </Layout>
          }
        />
        <Route
          path="/book-lab"
          element={
            <Layout>
              <BookLabPage />
            </Layout>
          }
        />
        <Route
          path="/borrow-equipment"
          element={
            <Layout>
              <BorrowEquipmentPage />
            </Layout>
          }
        />

        {/* New route for CL01Calendar */}
        <Route
          path="/calendar/CL01"
          element={
            <Layout>
              <CL01Calendar />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

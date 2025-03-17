import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Calendar from "../../components/Calendar/Calendar";

import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <Sidebar userType="Admin" />
      <div className="home-content">
        <Header />
        <Calendar />
      </div>
    </div>
  );
}

export default Home;

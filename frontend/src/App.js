import React from "react";
import { Route, Routes } from "react-router-dom";
import {Home, Logout, LabManagement,AddLecturer,EditLecturer, LecturerManagement,StudentManagement, TOMnangement, AddLab,EditLab, ScheduleLabs, AddStudent,EditStudent,EditTO,AddTO} from './Pages'

function App() {
  return (
    <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scheduleLabs" element={<ScheduleLabs/>} />
              <Route path="/to-management" element={<TOMnangement/>} />
              <Route path="/student-management" element={<StudentManagement />} />
              <Route path="/lecturer-management" element={<LecturerManagement />} />
              <Route path="/lab-management" element={<LabManagement />} />
              <Route path="/add-student" element={<AddStudent />} />
              <Route path="/edit-student" element={<EditStudent />} />
              <Route path="/add-to" element={<AddTO />} />
              <Route path="/add-lab" element={<AddLab />} />
              <Route path="/edit-to" element={<EditTO />} />
              <Route path="/add-lecturer" element={<AddLecturer />} />
              <Route path="/edit-lecturer" element={<EditLecturer />} />
              <Route path="/edit-lab" element={<EditLab />} />
              <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;

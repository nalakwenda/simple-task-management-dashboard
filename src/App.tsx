import React from 'react';
import {Routes, Route, Link} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Projects from './pages/Projects';
import ProjectTasks from './pages/ProjectTasks';
import {PrivateRoute} from './components/Routing';

function App ()
{


  return (
    <div >

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
        <Route path="/calendar" element={<PrivateRoute component={Calendar} />} />
        <Route path="/projects" element={<PrivateRoute component={Projects} />} />
        <Route path="/projects/:projectId" element={<PrivateRoute component={ProjectTasks} />} />
      </Routes>
    </div>
  );
}

export default App;

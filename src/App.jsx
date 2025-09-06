import { useEffect, useState, useRef } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'

import Landing from './pages/Landing.jsx'
import Project from './pages/Project.jsx';

function App() {

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/project" element={<Project />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
    )
}

export default App

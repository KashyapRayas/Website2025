// src/App.jsx

import React, { useState, useEffect } from "react";
import './App.css';
import { ReactLenis, useLenis } from 'lenis/react';
import Preloader from './components/Preloader/Preloader.jsx';
// import TransitionLoader from './components/TransitionLoader';
import Landing from './pages/Landing.jsx';
import Project from './pages/Project.jsx';

function App() {

    const [isInitialLoading, setIsInitialLoading] = useState(true);

    const lenis = useLenis();

    const [view, setView] = useState('landing');

    const [isTransitioning, setIsTransitioning] = useState(false);

    const [selectedProject, setSelectedProject] = useState(null);

    // This function is passed to Landing.jsx and called when a project is clicked
    const handleProjectSelect = (projectData) => {
        setSelectedProject(projectData);
        setIsTransitioning(true);

        // Set a timeout for the transition loader's duration
        setTimeout(() => {
            setView('project'); // Switch the view
            setIsTransitioning(false); // Hide the transition loader
            window.scrollTo(0, 0); // Ensure the new view starts at the top
        }, 1500); // 1.5-second transition
    };

    // This function is passed to Project.jsx to handle returning to the landing page
    const handleBackToLanding = () => {
        setIsTransitioning(true);

        setTimeout(() => {
            setView('landing');
            setSelectedProject(null); // Clear the selected project data
            setIsTransitioning(false);
            window.scrollTo(0, 0);
        }, 1500);
    };

    return (
        <>
            <ReactLenis
                root
                options={{
                    duration: 3,
                    autoRaf: true
                }}
            >
            {<Preloader onComplete={() => setIsInitialLoading(false)}/>}
            <>
                {view === 'landing' &&
                <Landing
                onProjectSelect={handleProjectSelect}
                lenis={lenis}
                isLoading={isInitialLoading}
                />}
                {view === 'project' && <Project projectData={selectedProject} onBack={handleBackToLanding} />}
            </>
            </ReactLenis>
        </>
    );
}

export default App;

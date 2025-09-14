import React, { useState, useEffect, useCallback } from "react"; // Import useCallback
import './App.css';
import gsap from 'gsap'
import { ReactLenis, useLenis } from 'lenis/react';
import Preloader from './components/Preloader/Preloader.jsx';
import TransitionLoader from './components/TransitionLoader/TransitionLoader.jsx';
import Landing from './pages/Landing.jsx';
import Project from './pages/Project.jsx';

function App() {

    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const lenis = useLenis();
    const [view, setView] = useState('landing');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState('in');
    const [selectedProject, setSelectedProject] = useState(null);

    // Memoize these callback functions to prevent unnecessary re-renders of TransitionLoader
    const handleMidway = useCallback(() => {
        if (transitionDirection === 'in') {
            setView('project');
        } else {
            setView('landing');
        }
    }, [transitionDirection]);

    const handleTransitionComplete = useCallback(() => {
        setIsTransitioning(false);
    }, []);


    const handleProjectSelect = (projectData) => {
        // setSelectedProject(projectData);
        setTransitionDirection('in');
        setIsTransitioning(true);
    };

    const handleBackToLanding = useCallback(() => {
        setTransitionDirection('out');
        setIsTransitioning(true);
    }, []);


    return (
        <>
            <ReactLenis
                root
                options={{
                    duration: 3,
                    autoRaf: true
                }}
            >
            {isInitialLoading && (
                <Preloader onComplete={() => setIsInitialLoading(false)} />
            )}
            {isTransitioning && <TransitionLoader
                                direction={transitionDirection}
                                onMidway={handleMidway}
                                onComplete={handleTransitionComplete}
                                 />}
            <>
                {view === 'landing' &&
                <Landing
                onProjectSelect={handleProjectSelect}
                lenis={lenis}
                isLoading={isInitialLoading || isTransitioning}
                />}
                {view === 'project' && <Project
                isTransitioning={isTransitioning}
                handleBack={handleBackToLanding}
                // projectData={selectedProject}
                />}
            </>
            </ReactLenis>
        </>
    );
}

export default App;

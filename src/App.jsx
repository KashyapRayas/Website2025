import { useState, useCallback, useEffect } from "react";
import './App.css';
import { ReactLenis, useLenis } from 'lenis/react';
import Preloader from './components/Preloader/Preloader.jsx';
import TransitionLoader from './components/TransitionLoader/TransitionLoader.jsx';
import Landing from './pages/Landing.jsx';
import Project from './pages/Project.jsx';

function App() {

    const [isInitialLoading, setIsInitialLoading] = useState(false);
    const lenis = useLenis();
    const [view, setView] = useState('landing');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState('out');
    const [selectedProjectName, setSelectedProjectName] = useState(null);
    const [projectToLoad, setProjectToLoad] = useState(null)
    const [corrector, setCorrector] = useState(false)

    // Memoize these callback functions to prevent unnecessary re-renders of TransitionLoader
    const handleMidway = useCallback(() => {
        if (transitionDirection === 'in') {
            setView('project');
        }
        else if(transitionDirection === 'loop') {
            setSelectedProjectName(projectToLoad);
            setView('project');
            setCorrector(true);
        }
        else {
            setView('landing');
        }
    }, [transitionDirection]);

    const handleTransitionComplete = useCallback(() => {
        setIsTransitioning(false);
        setCorrector(false);
    }, []);

    const handleProjectSelect = (projectData) => {
        setSelectedProjectName(projectData.name);
        setTransitionDirection('in');
        setIsTransitioning(true);
    };

    const handleNextProjectSelect = (projectData) => {
        setProjectToLoad(projectData.name);
        setTransitionDirection('loop');
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
                isLoading={isInitialLoading}
                isIncomingTransition={isTransitioning && transitionDirection === 'out'}
                />
                }
                {view === 'project' && <Project
                handleBack={handleBackToLanding}
                isIncomingTransition={isTransitioning && (transitionDirection === 'in' || corrector)}
                selectedProjectName={selectedProjectName}
                onNextProjectSelect={handleNextProjectSelect}
                />}
            </>
            </ReactLenis>
        </>
    );
}

export default App;

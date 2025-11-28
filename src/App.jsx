// App.jsx (No changes needed)
import { useState, useCallback, useEffect} from "react"
import './App.css'
import { ReactLenis, useLenis } from 'lenis/react'

import Preloader from './components/Preloader/Preloader.jsx'
import TransitionLoader from './components/TransitionLoader/TransitionLoader.jsx'
import Landing from './pages/Landing.jsx'
import Project from './pages/Project.jsx'
import { useSmoothScrollConfig } from './hooks/useSmoothScrollConfig'

function App() {
    // Start with isInitialLoading true to ensure Preloader is shown
    const scrollConfig = useSmoothScrollConfig()
    const [isAssetLoaded, setIsAssetLoad] = useState(false) //change
    const [isPreloaderDone, setIsPreloaderDone] = useState(false)  //change
    const [view, setView] = useState('landing')
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [transitionDirection, setTransitionDirection] = useState('out')
    const [selectedProjectName, setSelectedProjectName] = useState(null)
    const [projectToLoad, setProjectToLoad] = useState(null)
    const [corrector, setCorrector] = useState(false)
    const lenis = useLenis() // useLenis must be called within <ReactLenis>


    const handleMidway = useCallback(() => {
        if (transitionDirection === 'in') {
            setView('project')
        }
        else if (transitionDirection === 'loop') {
            setSelectedProjectName(projectToLoad)
            setView('project')
            setCorrector(true)
        }
        else {
            setView('landing')
        }
    }, [transitionDirection, projectToLoad]);

    const handleTransitionComplete = useCallback(() => {
        setIsTransitioning(false)
        setCorrector(false)
        if (transitionDirection === "out") {
            const isSmall = window.innerWidth <= 1201;
            setTimeout(() => {
                // Safely scroll, lenis might not be mounted immediately if transitions are fast
                lenis?.scrollTo("#WORK", { duration: 2, offset: isSmall ? -60 : 0, });
            }, 500);
        }
    }, [transitionDirection, lenis]);

    const handleProjectSelect = (projectData) => {
        preloadProject()
        setSelectedProjectName(projectData.name)
        setTransitionDirection('in')
        setIsTransitioning(true)
    };

    const handleNextProjectSelect = (projectData) => {
        preloadProject()
        setProjectToLoad(projectData.name)
        setTransitionDirection('loop')
        setIsTransitioning(true)
    };

    const handleBackToLanding = useCallback(() => {
        preloadLanding()
        setTransitionDirection('out')
        setIsTransitioning(true)
    }, []);

    // Callback for when Preloader finishes its full animation sequence
    const handlePreloaderComplete = useCallback(() => {
        setIsPreloaderDone(true)
    }, []);

    return (
        <>
            {/* Show Preloader component only when initial loading is true */}
            {!isPreloaderDone && (
                <Preloader onComplete={handlePreloaderComplete} onMidway={()=>setIsAssetLoad(true)}/>
            )}

            <ReactLenis
                root
                options={{
                    duration: scrollConfig.enabled ? scrollConfig.duration : 0,
                    autoRaf: true
                }}
            >
                {isTransitioning && (
                    <TransitionLoader
                        direction={transitionDirection}
                        onMidway={handleMidway}
                        onComplete={handleTransitionComplete}
                    />
                )}

                {isAssetLoaded && view === 'landing' &&
                    <Landing
                        onProjectSelect={handleProjectSelect}
                        isLoaded={isAssetLoaded}
                        isPreloaderDone={isPreloaderDone}
                        isIncomingTransition={isTransitioning && transitionDirection === 'out'}
                    />
                }
                {view === 'project' &&
                    <Project
                        handleBack={handleBackToLanding}
                        isIncomingTransition={isTransitioning && (transitionDirection === 'in' || corrector)}
                        selectedProjectName={selectedProjectName}
                        onNextProjectSelect={handleNextProjectSelect}
                    />
                }
            </ReactLenis>
        </>
    );
}

export default App

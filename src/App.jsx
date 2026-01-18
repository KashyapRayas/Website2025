import { useState, useCallback, useEffect, useRef } from "react"
import './App.css'
import { ReactLenis, useLenis } from 'lenis/react'

import Preloader from './components/Preloader/Preloader.jsx'
import Landing from './pages/Landing.jsx'
import Project from './pages/Project.jsx'
import TransitionLoader from './components/TransitionLoader/TransitionLoader.jsx'
import { useSmoothScrollConfig } from './hooks/useSmoothScrollConfig'

function App() {
    const flag = true
    const scrollConfig = useSmoothScrollConfig()
    const [isAssetLoaded, setIsAssetLoad] = useState(flag)
    const [isPreloaderDone, setIsPreloaderDone] = useState(flag)
    const [view, setView] = useState('landing')
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [transitionDirection, setTransitionDirection] = useState('out')
    const [selectedProjectName, setSelectedProjectName] = useState(null)
    const [projectToLoad, setProjectToLoad] = useState(null)
    const [corrector, setCorrector] = useState(false)

    // We use a ref to access the Lenis instance because useLenis()
    // inside App returns null (since App is the parent of ReactLenis)
    const lenisRef = useRef(null)
    const skipHistoryPush = useRef(false)

    // 1. Disable Native Scroll Restoration
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    useEffect(() => {
        const originalTitle = document.title;
        const hiddenTitle = "Observation paused.";

        const handleVisibilityChange = () => {
            document.title = document.hidden ? hiddenTitle : originalTitle;
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    const handleMidway = useCallback(() => {
        const lenisInstance = lenisRef.current?.lenis;

        if (transitionDirection === 'in') {
            setView('project')
            // 2. Force scroll to top (immediate) when entering a project
            window.scrollTo(0, 0);
            lenisInstance?.scrollTo(0, { immediate: true });
        }
        else if (transitionDirection === 'loop') {
            setSelectedProjectName(projectToLoad)
            setView('project')
            setCorrector(true)
            // 2. Force scroll to top (immediate) when looping projects
            window.scrollTo(0, 0);
            lenisInstance?.scrollTo(0, { immediate: true });
        }
        else {
            setView('landing')
            // For landing, we stay at current scroll position until
            // handleTransitionComplete triggers the smooth scroll to #WORK
        }
    }, [transitionDirection, projectToLoad]);

    const handleTransitionComplete = useCallback(() => {
        setIsTransitioning(false)
        setCorrector(false)

        const lenisInstance = lenisRef.current?.lenis;

        if (transitionDirection === "out") {
            const isSmall = window.innerWidth <= 1201;
            setTimeout(() => {
                lenisInstance?.scrollTo("#WORK", { duration: 2, offset: isSmall ? -60 : 0 });
            }, 500);
        }
    }, [transitionDirection]);

    const handleProjectSelect = (projectData) => {
        if (!skipHistoryPush.current) {
            const slug = projectData.name.toLowerCase().replace(/\s/g, '_');
            window.history.pushState({ view: 'project', name: projectData.name }, '', `#${slug}`);
        }
        setSelectedProjectName(projectData.name)
        setTransitionDirection('in')
        setIsTransitioning(true)
    };

    const handleNextProjectSelect = (projectData) => {
        if (!skipHistoryPush.current) {
            const slug = projectData.name.toLowerCase().replace(/\s/g, '_');
            window.history.pushState({ view: 'project', name: projectData.name }, '', `#${slug}`);
        }
        setProjectToLoad(projectData.name)
        setTransitionDirection('loop')
        setIsTransitioning(true)
    };

    const handleBackToLanding = useCallback(() => {
        if (!skipHistoryPush.current) {
            window.history.pushState({ view: 'landing' }, '', window.location.pathname.split('#')[0]);
        }
        setTransitionDirection('out')
        setIsTransitioning(true)
    }, []);

    const handlePreloaderComplete = useCallback(() => {
        setIsPreloaderDone(true)
    }, []);

    useEffect(() => {
        if (!window.history.state) {
            window.history.replaceState({ view: 'landing' }, '', window.location.pathname);
        }

        const handlePopState = (event) => {
            const state = event.state;
            skipHistoryPush.current = true;

            if (!state || state.view === 'landing') {
                if (view !== 'landing') handleBackToLanding();
            } else if (state.view === 'project') {
                const targetProject = { name: state.name };
                if (view === 'landing') {
                    handleProjectSelect(targetProject);
                } else if (view === 'project' && selectedProjectName !== state.name && projectToLoad !== state.name) {
                    handleNextProjectSelect(targetProject);
                }
            }

            setTimeout(() => {
                skipHistoryPush.current = false;
            }, 0);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [view, selectedProjectName, projectToLoad, handleBackToLanding]);

    return (
        <>
            {!isPreloaderDone && (
                <Preloader onComplete={handlePreloaderComplete} onMidway={()=>setIsAssetLoad(true)}/>
            )}

            <ReactLenis
                ref={lenisRef}
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

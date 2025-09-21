import { useState, useCallback, Suspense, lazy } from "react"
import './App.css'
import { ReactLenis, useLenis } from 'lenis/react'

const Preloader = lazy(() => import('./components/Preloader/Preloader.jsx'))
const TransitionLoader = lazy(() => import('./components/TransitionLoader/TransitionLoader.jsx'))
const Landing = lazy(() => import('./pages/Landing.jsx'))
import Project from './pages/Project.jsx'

const preloadLanding = () => {
    import('./pages/Landing.jsx')
}

const preloadProject = () => {
    import('./pages/Project.jsx')
}

function App() {

    const [isInitialLoading, setIsInitialLoading] = useState(false)
    const [view, setView] = useState('landing')
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [transitionDirection, setTransitionDirection] = useState('out')
    const [selectedProjectName, setSelectedProjectName] = useState(null)
    const [projectToLoad, setProjectToLoad] = useState(null)
    const [corrector, setCorrector] = useState(false)
    const lenis = useLenis()

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
            setTimeout(() => {
                lenis.scrollTo("#WORK", { duration: 2 });
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


    return (
        <>
            <ReactLenis
                root
                options={{
                    duration: 3,
                    autoRaf: true
                }}
            >

            <Suspense fallback={null}>
                {isInitialLoading && (
                    <Preloader onComplete={() => setIsInitialLoading(false)} />
                )}
            </Suspense>

            <Suspense fallback={null}>
                {isTransitioning && (
                    <TransitionLoader
                        direction={transitionDirection}
                        onMidway={handleMidway}
                        onComplete={handleTransitionComplete}
                    />
                )}
            </Suspense>

            <Suspense fallback={null}>
                {view === 'landing' &&
                <Landing
                onProjectSelect={handleProjectSelect}
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
            </Suspense>
            </ReactLenis>
        </>
    );
}

export default App

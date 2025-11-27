// src/hooks/useAssetPreloader.js
import { useState, useEffect, useCallback, useRef } from 'react';
import projectsIndex from '../data/projects.json';

const BASE_PATH = "/Website2025";
const PROJECT_DATA_FOLDER = '../data/project_data/';

const getProjectJsonFilename = (projectName) => {
    const lowercased = projectName.toLowerCase();
    return lowercased.includes(' ') ? lowercased.replace(/ /g, '_') : lowercased;
};

// --- STATIC ASSETS ---
// Only list things that are hardcoded in your React components/CSS.
const STATIC_IMAGE_ASSETS = Object.freeze([
  '/box_anchor.svg',
  '/checked.svg',
  '/Cursor.svg',
  '/denji.svg',
  '/footer.svg',
  '/hand.svg',
  '/lego_44.svg',
  '/lego_210.svg',
  '/star.svg',
  '/unchecked.svg',

  '/icons/cursor.png',
  '/icons/figma_apply.png',
  '/icons/figma_cancel.png',
  '/icons/figma_search.png',

  // If you have a specific list of about images, keep them.
  // If they are in JSON, the scanner below will find them automatically.
  '/about_imgs/1.jpg',
  '/about_imgs/2.jpg',
  '/about_imgs/3.jpg',
  '/about_imgs/4.jpg',
  '/about_imgs/5.jpg',
  '/about_imgs/6.jpg',
  '/about_imgs/7.jpg',
  '/about_imgs/8.jpg',
  '/about_imgs/9.jpg',
  '/about_imgs/10.jpg',
  '/about_imgs/11.jpg',
  '/about_imgs/12.jpg',
  '/about_imgs/13.jpg',
  '/about_imgs/14.jpg',
  '/about_imgs/15.jpg',
  '/about_imgs/16.jpg',
  '/about_imgs/17.jpg',
  '/about_imgs/18.jpg',
  '/about_imgs/19.jpg',
  '/about_imgs/20.jpg',

  '/project_imgs/placeholder.png',
]);

const REACT_MODULES_TO_PRELOAD = Object.freeze([
  () => import('../pages/Project.jsx'),
  () => import('../pages/Landing.jsx'),
]);

const preloadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => {
        // Resolve even on error to prevent blocking the entire app
        resolve(src);
    };
    img.src = src;
  });
};

const preloadJson = async (filename) => {
  try {
    const module = await import(/* @vite-ignore */ `${PROJECT_DATA_FOLDER}${filename}.json`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load project JSON for ${filename}.json:`, error);
    return null;
  }
};

// Helper: recursively find strings in JSON that look like image paths
const scanForImages = (data, paths = new Set()) => {
    if (!data) return paths;

    // Convert the entire object to string and Regex match all image paths
    // This catches everything: "url": "/project_imgs/...", "banner": "...", etc.
    const jsonString = JSON.stringify(data);
    // Matches strings starting with /project_imgs/ or /about_imgs/ ending in common extensions
    const regex = /"(\/(?:project_imgs|about_imgs)\/[^"]+\.(?:png|jpg|jpeg|gif|webp|svg))"/gi;

    let match;
    while ((match = regex.exec(jsonString)) !== null) {
        paths.add(match[1]); // match[1] is the captured path inside quotes
    }
    return paths;
};

export const useAssetPreloader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadedCountRef = useRef(0);
  const totalCountRef = useRef(0);

  // Weights: Phase 1 (Core) = 25%, Phase 2 (Assets) = 75%
  // This ensures the bar moves slowly at start and does the heavy lifting in Phase 2
  const PHASE1_WEIGHT = 0.25;

  const calculateTotalProgress = useCallback(() => {
    if (totalCountRef.current === 0) return;

    const percentage = Math.round((loadedCountRef.current / totalCountRef.current) * 100);
    setProgress(Math.min(100, percentage));
  }, []);

  const startPreloading = useCallback(async () => {
    // 1. CRITICAL UI FIX: Delay start to let GSAP animation render first
    await new Promise(resolve => setTimeout(resolve, 200));

    loadedCountRef.current = 0;
    setProgress(0);
    setIsComplete(false);

    const assetsToLoad = new Set();
    const phase1Promises = [];

    // --- PHASE 1: Collect Static & Core Assets ---

    // A. Static Assets
    STATIC_IMAGE_ASSETS.forEach(asset => assetsToLoad.add(BASE_PATH + asset));

    // B. Project Thumbnails (from projects.json)
    projectsIndex.projects.forEach(project => {
        if (project.img) assetsToLoad.add(BASE_PATH + project.img);
    });

    // C. Prepare JSON files to load
    const projectJsonFilenames = projectsIndex.projects.map(p => getProjectJsonFilename(p.name));

    // Initial Total (We will increase this later when we scan JSONs)
    let currentTotal = assetsToLoad.size + REACT_MODULES_TO_PRELOAD.length + projectJsonFilenames.length;
    totalCountRef.current = currentTotal;

    const tick = () => {
        loadedCountRef.current++;
        calculateTotalProgress();
    };

    // --- EXECUTE PHASE 1 ---

    // Load Core Images
    Array.from(assetsToLoad).forEach(url => {
        phase1Promises.push(preloadImage(url).then(tick));
    });

    // Load React Modules
    REACT_MODULES_TO_PRELOAD.forEach(fn => {
        phase1Promises.push(fn().then(tick));
    });

    // Load JSONs and prepare for Phase 2
    const jsonPromises = projectJsonFilenames.map(filename =>
        preloadJson(filename).then(data => {
            tick();
            return data;
        })
    );

    // Wait for Phase 1 to partially complete so we have JSON data
    // We wait for JSONs specifically to build the full list
    const loadedJsonData = await Promise.all(jsonPromises);

    // --- PHASE 2: Brute Force Discovery ---
    // Now that we have the JSONs, find EVERY image mentioned in them
    const discoveredImages = new Set();
    loadedJsonData.forEach(data => scanForImages(data, discoveredImages));

    // Filter out images we already loaded in Phase 1
    const newImagesToLoad = Array.from(discoveredImages).filter(url => !assetsToLoad.has(BASE_PATH + url));

    // Update Total Count to include these new found images
    totalCountRef.current += newImagesToLoad.length;

    // Wait for remaining Phase 1 assets (images/modules) just to be safe
    // (They run in parallel, but we await them here to sync up)
    await Promise.all(phase1Promises);

    // --- EXECUTE PHASE 2: Load Discovered Images ---
    if (newImagesToLoad.length > 0) {
        await Promise.all(
            newImagesToLoad.map(url => {
                const fullUrl = BASE_PATH + url;
                return preloadImage(fullUrl).then(tick);
            })
        );
    }

    // --- DONE ---
    setProgress(100);
    setTimeout(() => setIsComplete(true), 500);

  }, [calculateTotalProgress]);

  useEffect(() => {
    startPreloading();
  }, [startPreloading]);

  return { progress, isComplete };
};

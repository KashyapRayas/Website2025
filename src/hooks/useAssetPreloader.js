// src/hooks/useAssetPreloader.js
import { useState, useEffect, useCallback, useRef } from 'react';
import projectsIndex from '../data/projects.json'; // Make sure this path is correct

const BASE_PATH = "/Website2025"; // Your base path for static assets
const PROJECT_DATA_FOLDER = '../data/project_data/'; // Path to your individual project JSONs

// Helper to convert project name to a valid JSON filename (e.g., "TABLE READ" -> "table_read")
const getProjectJsonFilename = (projectName) => {
    const lowercased = projectName.toLowerCase();
    return lowercased.includes(' ') ? lowercased.replace(/ /g, '_') : lowercased;
};

// --- STATIC ASSETS ---
// List of static image assets in your public folder.
// This list should be exhaustive for all images directly referenced in JSX or CSS
// that are NOT found dynamically within project JSONs.
const STATIC_IMAGE_ASSETS = Object.freeze([
  // Root public folder images from your image
  '/box_anchor.svg',
  '/checked.svg',
  '/Cursor.svg', // Assuming Cursor.svg is directly in public/
  '/denji.svg',
  '/footer.svg',
  '/hand.svg',
  '/lego_44.svg',
  '/lego_210.svg',
  '/star.svg',
  '/unchecked.svg',

  // Images in public/icons folder
  '/icons/cursor.png',
  '/icons/figma_apply.png',
  '/icons/figma_cancel.png',
  '/icons/figma_search.png',

  // Images in public/about_imgs folder
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

  // Images in public/project_imgs folder (those NOT dynamically loaded from project data JSONs)
  '/project_imgs/placeholder.png',

  // If you have dot_numbers images like /public/dot_numbers/0.png to 9.png
  // you might add them here:
  // '/dot_numbers/0.png', '/dot_numbers/1.png', /* ... up to */ '/dot_numbers/9.png',
]);

// List of React component modules to eagerly load
const REACT_MODULES_TO_PRELOAD = Object.freeze([
  () => import('../pages/Project.jsx'),
  // Add other top-level components that are dynamically imported if necessary
]);

// --- HELPER FUNCTIONS ---

// Preload a single image (always resolves to prevent blocking on errors)
const preloadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`);
      resolve(src); // Resolve anyway to not block the preloader
    };
    img.src = src;
  });
};

// Preload a single JSON file (for project data)
const preloadJson = async (filename) => {
  try {
    // Dynamically import JSON modules.
    // The /* @vite-ignore */ comment is crucial for bundlers like Vite
    // to correctly handle dynamic import paths when they're not fully static.
    const module = await import(/* @vite-ignore */ `${PROJECT_DATA_FOLDER}${filename}.json`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load project JSON for ${filename}.json:`, error);
    return null; // Return null on error
  }
};

// --- MAIN HOOK ---
export const useAssetPreloader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const loadedCountRef = useRef(0); // Tracks how many assets have been loaded
  const totalCountRef = useRef(0);  // Tracks the total number of assets to load

  // Memoized callback to update progress safely
  const updateProgress = useCallback((increment = 1) => {
    loadedCountRef.current += increment;
    const newProgress = Math.round((loadedCountRef.current / totalCountRef.current) * 100);
    setProgress(Math.min(100, newProgress)); // Cap at 100%
  }, []);

  // Memoized callback to set total assets safely
  const setTotalAssets = useCallback((count) => {
    totalCountRef.current = count;
  }, []);

  const startPreloading = useCallback(async () => {
    loadedCountRef.current = 0; // Reset loaded count for a fresh start
    setProgress(0);
    setIsComplete(false);

    const assetsToPreloadUrls = new Set(); // Use a Set to automatically deduplicate image URLs

    // 1. Add static image assets (prepend BASE_PATH)
    STATIC_IMAGE_ASSETS.forEach(asset => assetsToPreloadUrls.add(BASE_PATH + asset));

    // 2. Add landing page thumbnail images from projects.json (prepend BASE_PATH)
    // Note: projects.json contains paths like "/project_imgs/tr_1.png" which are relative to public.
    // We already prepended BASE_PATH above, so no need to add it twice if your project.img
    // paths are already absolute from public.
    projectsIndex.projects.forEach(project => {
      if (project.img) {
        assetsToPreloadUrls.add(BASE_PATH + project.img);
      }
    });

    // Prepare to load project data JSONs
    const projectJsonFilenames = projectsIndex.projects.map(p => getProjectJsonFilename(p.name));

    // Calculate initial total count of assets:
    // - Unique image URLs collected so far (static + landing thumbnails)
    // - Number of React module imports
    // - Number of project data JSON files
    const initialTotalAssetCount = assetsToPreloadUrls.size + REACT_MODULES_TO_PRELOAD.length + projectJsonFilenames.length;
    setTotalAssets(initialTotalAssetCount);

    // --- PHASE 1: Preload collected image assets (static + landing thumbnails) ---
    // Make sure to use Array.from(assetsToPreloadUrls) to process the Set
    await Promise.all(
      Array.from(assetsToPreloadUrls).map(url => preloadImage(url).then(() => updateProgress()))
    );

    // --- PHASE 2: Preload React Modules ---
    await Promise.all(
      REACT_MODULES_TO_PRELOAD.map(importFn => importFn().then(() => updateProgress()))
    );

    // --- PHASE 3: Preload Project Data JSONs ---
    const loadedProjectData = await Promise.all(
      projectJsonFilenames.map(filename =>
        preloadJson(filename).then(data => {
          updateProgress(); // Mark JSON file itself as loaded
          return data;
        })
      )
    );

    // --- PHASE 4: Discover and Preload Dynamic Images from Project Data ---
    const dynamicAssetsFromProjectData = new Set();
    loadedProjectData.filter(Boolean).forEach(project => { // Filter out any nulls from failed JSON loads
      if (project.content && Array.isArray(project.content)) {
        project.content.forEach(item => {
          if (item.type === "img" && item.url) {
            const fullImageUrl = BASE_PATH + item.url;
            // Only add if it's a new URL not already in our main set
            if (!assetsToPreloadUrls.has(fullImageUrl)) {
                 dynamicAssetsFromProjectData.add(fullImageUrl);
            }
          }
        });
      }
      // Add more logic here if images are structured differently in your JSONs
      // e.g., if (project.details && project.details.bannerImage) { dynamicAssetsFromProjectData.add(BASE_PATH + project.details.bannerImage); }
    });

    // Update total count to include newly discovered unique dynamic images.
    const newUniqueDynamicImageUrls = Array.from(dynamicAssetsFromProjectData);
    setTotalAssets(totalCountRef.current + newUniqueDynamicImageUrls.length);

    await Promise.all(
      newUniqueDynamicImageUrls.map(url => preloadImage(url).then(() => updateProgress()))
    );

    // --- FINALIZATION ---
    // Ensure progress reaches 100% and loaded count matches final total.
    loadedCountRef.current = totalCountRef.current;
    setProgress(100);

    // Add a small delay for a smoother user experience before transitioning
    setTimeout(() => setIsComplete(true), 300);

  }, [updateProgress, setTotalAssets]); // Dependencies for useCallback

  // Start preloading when the hook is first mounted
  useEffect(() => {
    startPreloading();
  }, [startPreloading]); // Dependency array ensures it runs once on mount

  return { progress, isComplete };
};

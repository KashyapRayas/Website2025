// src/hooks/useLoadingManager.js
import { useState, useEffect, useCallback } from 'react'

export const useLoadingManager = () => {
  const [progress, setProgress] = useState(0)
  const [loadedAssets, setLoadedAssets] = useState({
    images: 0,
    components: 0,
    totalImages: 0,
    totalComponents: 2 // Landing + Project
  })

  const updateProgress = useCallback(() => {
    const { images, components, totalImages, totalComponents } = loadedAssets
    const imageWeight = 0.7  // 70% for images
    const componentWeight = 0.3  // 30% for components

    const imageProgress = totalImages > 0 ? images / totalImages : 1
    const componentProgress = components / totalComponents

    const totalProgress = (imageProgress * imageWeight) + (componentProgress * componentWeight)
    setProgress(Math.round(totalProgress * 100))
  }, [loadedAssets])

  useEffect(() => {
    updateProgress()
  }, [loadedAssets, updateProgress])

  const incrementImages = useCallback(() => {
    setLoadedAssets(prev => ({
      ...prev,
      images: prev.images + 1
    }))
  }, [])

  const setTotalImages = useCallback((total) => {
    setLoadedAssets(prev => ({
      ...prev,
      totalImages: total
    }))
  }, [])

  const incrementComponents = useCallback(() => {
    setLoadedAssets(prev => ({
      ...prev,
      components: prev.components + 1
    }))
  }, [])

  const preloadImages = useCallback((imageUrls) => {
    setTotalImages(imageUrls.length)

    imageUrls.forEach(url => {
      if (!url) return

      const img = new Image()
      img.onload = incrementImages
      img.onerror = incrementImages // count errors as "loaded" to prevent hanging
      img.src = url
    })
  }, [setTotalImages, incrementImages])

  return {
    progress,
    preloadImages,
    incrementComponents,
    isComplete: progress >= 100
  }
}

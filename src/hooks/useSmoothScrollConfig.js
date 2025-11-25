// hooks/useSmoothScrollConfig.js
import { useEffect, useState } from 'react'

export function useSmoothScrollConfig() {
  const [config, setConfig] = useState({
    duration: 3,
    enabled: true,
  })

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Detect macOS
    const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)

    if (prefersReducedMotion) {
      // Disable custom scroll for users with reduced motion
      setConfig({
        duration: 1,
        enabled: false,
      })
    } else if (isMac) {
      // Shorter duration for Mac (already has smooth scroll)
      setConfig({
        duration: 1.5,
        enabled: true,
      })
    } else {
      // Default for other devices
      setConfig({
        duration: 3,
        enabled: true,
      })
    }
  }, [])

  return config
}

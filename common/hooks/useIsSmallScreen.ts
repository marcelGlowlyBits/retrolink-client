import { useState, useEffect } from 'react';

/**
 * Custom hook to check if the screen width is smaller or equal to iPad size (768px).
 * @returns {boolean} True if the screen width is <= 768px, false otherwise.
 */
const useIsSmallScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isSmallScreen;
};

export default useIsSmallScreen;
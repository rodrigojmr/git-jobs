import { useState, useEffect } from 'react';

const useWindowWidth = (initialWidth = 0) => {
  const [windowWidth, setWindowWidth] = useState({
    width: process.browser ? window.innerWidth : initialWidth
  });

  useEffect(() => {
    const getSize = () => {
      return {
        width: process.browser ? window.innerWidth : initialWidth
      };
    };

    const handleResize = () => {
      setWindowWidth(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

export default useWindowWidth;

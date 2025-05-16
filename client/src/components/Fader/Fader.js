import React, { useState, useEffect } from 'react';
import './FadeText.css'; // Import CSS for fade effect

const FadeText = ({ textArray, intervalDuration = 7000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false); // Fade out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length); // Next text
        setIsVisible(true); // Fade in
      }, 1500); // Match CSS transition duration
    }, intervalDuration);

    return () => clearInterval(timer); // Clean up interval
  }, [textArray, intervalDuration]);

  return (
    <div className={`fade-text ${isVisible ? 'visible' : 'hidden'}`}>
      {textArray[currentIndex]}
    </div>
  );
};

export default FadeText;
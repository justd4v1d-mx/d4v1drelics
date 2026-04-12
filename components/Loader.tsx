import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

const Loader = () => {
  const { active, progress } = useProgress();
  const [visualProgress, setVisualProgress] = useState(0);
  const [show, setShow] = useState(true);

  /* Artificial progress increment to ensure a smooth visual experience */
  useEffect(() => {
    if (active) {
      /* Follow real Three.js progress */
      setVisualProgress(progress);
    } else {
      /* Fake progress to 100% if scene is too light */
      const interval = setInterval(() => {
        setVisualProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [active, progress]);

  /* Hide loader when visual progress hits 100% */
  useEffect(() => {
    if (visualProgress >= 100) {
      const timer = setTimeout(() => setShow(false), 800);
      return () => clearTimeout(timer);
    }
  }, [visualProgress]);

  if (!show) return null;

  return (
    <div 
      className={`loader-overlay ${visualProgress >= 100 ? 'fade-out' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'black',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="loader-content">
        {/* Percentage Counter */}
        <span className="gothic-text loader-num" style={{ color: 'white' }}>
          {Math.round(visualProgress)}%
        </span>
        
        {/* Progress Bar */}
        <div className="loader-bar-container">
          <div 
            className="loader-bar-fill" 
            style={{ 
              width: `${visualProgress}%`,
              height: '100%',
              backgroundColor: 'white',
              transition: 'width 0.1s ease-out'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
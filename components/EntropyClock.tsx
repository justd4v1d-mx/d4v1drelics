import React, { useState, useEffect, useRef } from 'react';

// Define props to communicate with parent component
interface EntropyClockProps {
  onAnomaly: (isCritical: boolean) => void;
}

const EntropyClock: React.FC<EntropyClockProps> = ({ onAnomaly }) => {
  const [localTime, setLocalTime] = useState(new Date());
  const [relativeTime, setRelativeTime] = useState(0);
  const [entropy, setEntropy] = useState(0.00234);
  const [displayDilation, setDisplayDilation] = useState(1.0);
  
  const dilationRef = useRef(1.0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
      const maxDist = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

      // Calculate dilation factor
      const val = 1 + (1 - dist / maxDist) * 6.5;
      dilationRef.current = val;
      setDisplayDilation(val);

      // Trigger anomaly callback if threshold (6.0) is exceeded
      if (val > 6.0) {
        onAnomaly(true);
      } else {
        onAnomaly(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Core telemetry loop
    const timer = setInterval(() => {
      setLocalTime(new Date());
      setEntropy(prev => prev + 0.00001);
      setRelativeTime(prev => prev + (0.1 * dilationRef.current));
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, [onAnomaly]); // Added onAnomaly to dependencies for best practice

  // UI state for the status label
  const isCritical = displayDilation > 6.0;

  return (
    <div className="entropy-panel loader-num">
      <div className="entropy-segment">
        <span className="entropy-label">SYNC:</span>
        <span className="entropy-value">
          {localTime.toLocaleTimeString('en-US', { 
            hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' 
          })}
        </span>
      </div>

      <div className="entropy-segment">
        <span className="entropy-label">DILATION:</span>
        <span className="entropy-value neon-text-amber">{displayDilation.toFixed(3)}x</span>
      </div>

      <div className="entropy-grid">
        <div className="entropy-segment">
          <span className="entropy-label">REL_T:</span>
          <span className="entropy-value">{relativeTime.toFixed(1)}s</span>
        </div>
        <div className="entropy-segment">
          <span className="entropy-label">ENTROPY:</span>
          <span className="entropy-value">{entropy.toFixed(4)}</span>
        </div>
      </div>

      {/* Dynamic status indicator based on proximity */}
      <div className="entropy-footer">
        <span className={isCritical ? "status-critical-blink" : "status-blink"}>
          {isCritical ? " ANOMALY_DETECTED" : "STABLE"}
        </span>
      </div>
    </div>
  );
};

export default EntropyClock;
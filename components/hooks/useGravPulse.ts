import { useEffect, useState } from 'react';

export const useGravPulse = (addLog: (msg: string) => void) => {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const triggerPulse = () => {
      // Delay between pulses (60s to 180s)
      const nextPulse = Math.random() * (180000 - 60000) + 60000;
      
      setTimeout(() => {
        setIsPulsing(true);
        addLog("[CRITICAL] GRAV_PULSE_DETECTION: SPACETIME_INSTABILITY");
        
        setTimeout(() => {
          setIsPulsing(false);
          triggerPulse(); 
        }, 1200); // Slightly longer than the flare for a "heavier" feel
      }, nextPulse);
    };

    triggerPulse();
  }, [addLog]);

  return isPulsing;
};
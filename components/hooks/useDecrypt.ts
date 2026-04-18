import { useState, useEffect } from 'react';

/**
 * Hook to simulate real-time text decryption.
 * @param targetText - The final string to be revealed.
 * @param speed - Interval speed in ms.
 * @param revealStep - Progress increment per tick.
 */
export const useDecrypt = (targetText: string, speed: number = 70, revealStep: number = 2) => {
  const [displayText, setDisplayText] = useState('');
  const chars = '01X#H8&Z$KQA'; // Noise character set

  useEffect(() => {
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((letter, index) => {
            // Reveal actual letter if index is behind the iteration progress
            if (index < iteration) return targetText[index];
            // Otherwise, return a random noise character
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      // Stop once all characters are revealed
      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      
      iteration += revealStep;
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, speed, revealStep]);

  return displayText;
};
import React, { useState, useEffect } from 'react';

const TerminalFeed: React.FC = () => {
  const [logs, setLogs] = useState<string[]>(['[SYSTEM] LINK_ESTABLISHED']);

  // Helpers for random data generation
  const getHex = () => Math.floor(Math.random() * 4096).toString(16).toUpperCase().padStart(3, '0');
  const getPct = () => (Math.random() * 100).toFixed(2);
  const getVal = () => (Math.random() * 0.05).toFixed(4);

  // Dynamic message templates
  const templates = [
    () => `SCANNING_SECTOR_${getHex()}`,
    () => `PHOTON_DEGRADATION: ${getPct()}%`,
    () => `DECRYPTING_PACKET_${getHex()}`,
    () => `SIGNAL_STRENGTH: ${getPct()}%`,
    () => `INTERFERENCE_RATIO: ${getVal()}`,
    () => `SYNC_BUFFER_LOAD: ${getPct()}%`,
    () => `CORE_TEMP_STABILITY: ${98 + Math.random()}%`,
    () => `RECOVERING_FRAGMENT_ID_${getHex()}`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random template and execute it
      const generator = templates[Math.floor(Math.random() * templates.length)];
      const newLog = `> ${generator()}`;
      
      // Keep only the last 5 logs for UI cleanliness
      setLogs(prev => [...prev.slice(-4), newLog]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-feed loader-num">
      {logs.map((log, i) => (
        <div 
          key={i} 
          style={{ 
            opacity: (i + 1) / logs.length,
            transform: `translateX(${i * 2}px)` // Subtle indent for depth
          }}
        >
          {log}
        </div>
      ))}
    </div>
  );
};

export default TerminalFeed;
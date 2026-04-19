import React, { useState, useEffect } from 'react';

interface TerminalFeedProps {
  customLogs?: string[];
}

const TerminalFeed: React.FC<TerminalFeedProps> = ({ customLogs = [] }) => {
  const [internalLogs, setInternalLogs] = useState<string[]>(['[SYSTEM] LINK_ESTABLISHED']);

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
      const generator = templates[Math.floor(Math.random() * templates.length)];
      const newLog = `> ${generator()}`;
      
      setInternalLogs(prev => [...prev.slice(-4), newLog]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

 
  const logsToDisplay = customLogs.length > 0 ? customLogs : internalLogs;

  return (
    <div className="terminal-feed loader-num">
      {logsToDisplay.map((log, i) => (
        <div 
          key={i} 
          style={{ 
            opacity: (i + 1) / logsToDisplay.length,
            transform: `translateX(${i * 2}px)`,
            color: log.includes('CRITICAL') || log.includes('WARNING') ? '#ff0000' : 'inherit'
          }}
        >
          {log}
        </div>
      ))}
    </div>
  );
};

export default TerminalFeed;
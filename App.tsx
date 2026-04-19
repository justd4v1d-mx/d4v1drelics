import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useCallback, useRef } from 'react'; 

/* Core components import block */
import { 
  BlackHoleShader, 
  BackgroundSpace, 
  SocialSlider, 
  AudioPlayer, 
  Loader,
  Fragments, 
  EntropyClock,
  TerminalFeed,
  CommandCLI 
} from './components'; 

/* Custom hook for gravity pulse events */
import { useGravPulse } from './components/hooks/useGravPulse';

import './index.css';

function App() {
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isAnomaly, setIsAnomaly] = useState(false); // Triggered by EntropyClock proximity
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  
  /* Using 'any' for the timer ref to avoid NodeJS/Browser type conflicts in Vite */
  const logTimerRef = useRef<any>(null);

  /* Add logs to the terminal and manage the 7s auto-recovery cycle */
  const addLog = useCallback((msg: string) => {
    setSystemLogs(prev => [...prev.slice(-6), `> ${msg}`]);

    // Reset the recovery timer whenever a new event occurs
    if (logTimerRef.current) clearTimeout(logTimerRef.current);

    // Recovery sequence: 7s of idle -> Recovery message -> 2s -> Return to ambient
    logTimerRef.current = setTimeout(() => {
      setSystemLogs(prev => [...prev.slice(-6), "> INITIALIZING_GRAV_STABILIZERS..."]);
      
      setTimeout(() => {
        setSystemLogs([]); // Emptying logs triggers the green ambient feed in TerminalFeed
      }, 2000);
    }, 7000);
  }, []);

  /* Initialize gravity pulse detection */
  const isPulsing = useGravPulse(addLog);

  /* Command line logic */
  const handleCommand = (cmd: string) => {
    addLog(`executing: ${cmd}`);
    
    switch(cmd.toLowerCase()) {
      case 'clear':
        setSystemLogs([]);
        break;
      case 'reboot':
        addLog("restarting_system_core...");
        setTimeout(() => window.location.reload(), 1000);
        break;
      case 'status':
        addLog(isAnomaly ? "status: EVENT_HORIZON_PROXIMITY" : "status: ORBIT_STABLE");
        break;
      case 'unlock_data':
        addLog("access_granted: archives_opened");
        setIsBlogOpen(true);
        break;
      default:
        addLog(`error: unknown_cmd_${cmd}`);
    }
  };

  return (
    /* Top-level container with dynamic classes for pulse and proximity effects */
    <div className={`app-container ${isPulsing ? 'grav-pulse-active' : ''} ${isAnomaly ? 'anomaly-mode' : ''}`}>
      <Loader />
      
      {/* Administrative terminal - Toggle with backquote or tilde */}
      <CommandCLI onExecute={handleCommand} />

      <AudioPlayer />
      
      {/* Telemetry and data modules */}
      <EntropyClock onAnomaly={setIsAnomaly} />
      <TerminalFeed customLogs={systemLogs} />

      {isBlogOpen && (
        <Fragments onClose={() => setIsBlogOpen(false)} />
      )}

      {/* Main UI Overlay Screen */}
      <div className={`ui-screen ${isBlogOpen ? 'ui-hidden' : ''}`}>
        <div className="main-content">
          <div className="placeholder-group">
            <h1 className="gothic-text title-main">d4v1d reliquary</h1>
            <p className="gothic-text title-sub">2026</p>
          </div>
          <SocialSlider onOpenBlog={() => setIsBlogOpen(true)} />
        </div>
      </div>

      {/* 3D Gravity Simulation Layer */}
      <Canvas gl={{ antialias: true }} camera={{ fov: 75, position: [0, 0, 8] }}>
        <Suspense fallback={null}>
          <BackgroundSpace />
          <BlackHoleShader />
        </Suspense>
      </Canvas>

      {/* Emergency HUD Warning for Gravity Pulses */}
      {isPulsing && (
        <div className="grav-warning loader-num">
           ⚠️ ALERT: MASSIVE_GRAV_PULSE_DETECTED !!
        </div>
      )}
    </div>
  );
}

export default App;
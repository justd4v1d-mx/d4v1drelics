import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { BlackHoleShader, BackgroundSpace, SocialSlider, AudioPlayer } from './components'; 
import './index.css';

function App() {
  return (
    <div className="app-container">
      
      {/* ui limited */}
      <div className="ui-screen">
        <div className="main-content">
          
          {/* act title */}
          <div className="placeholder-group">
            <h1 className="gothic-text title-main">D4V1D RELIQUARY</h1>
            <p className="gothic-text title-sub">2026</p>
          </div>

          {}
          <SocialSlider />
        </div>

        {}
        <AudioPlayer />
      </div>

      {/*blackholebg */}
      <Canvas gl={{ antialias: true }} camera={{ fov: 75, position: [0, 0, 8] }}>
        <Suspense fallback={null}>
          <BackgroundSpace />
          <BlackHoleShader />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
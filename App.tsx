import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
/* Import core components */
import { 
  BlackHoleShader, 
  BackgroundSpace, 
  SocialSlider, 
  AudioPlayer, 
  Loader 
} from './components'; 
import './index.css';

function App() {
  return (
    <div className="app-container">
      /* Minimalist loading overlay */
      <Loader />
      
      {/* UI layer */}
      <div className="ui-screen">
        <div className="main-content">
          
          {/* Main Title and Year Section */}
          <div className="placeholder-group">
            {/* Reliquary Title */}
            <h1 className="gothic-text title-main">d4v1d reliquary</h1>
            
            {/* Current Year */}
            <p className="gothic-text title-sub">2026</p>
          </div>

          <SocialSlider />
        </div>

        <AudioPlayer />
      </div>

      {/* Background 3D Scene */}
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
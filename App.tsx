import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react'; // 1. Added useState
/* Import core components */
import { 
  BlackHoleShader, 
  BackgroundSpace, 
  SocialSlider, 
  AudioPlayer, 
  Loader,
  Fragments // 2. Ensure Fragments is exported from your components index
} from './components'; 
import './index.css';

function App() {
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  return (
    <div className="app-container">
      <Loader />
      
      {/* 1. AudioPlayer stays outside to remain interactive and playing */}
      <AudioPlayer />

      {isBlogOpen && (
        <Fragments onClose={() => setIsBlogOpen(false)} />
      )}

      {/* This layer gets hidden/dimmed, but AudioPlayer is now above it */}
      <div className={`ui-screen ${isBlogOpen ? 'ui-hidden' : ''}`}>
        <div className="main-content">
          <div className="placeholder-group">
            <h1 className="gothic-text title-main">d4v1d reliquary</h1>
            <p className="gothic-text title-sub">2026</p>
          </div>
          <SocialSlider onOpenBlog={() => setIsBlogOpen(true)} />
        </div>
      </div>

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
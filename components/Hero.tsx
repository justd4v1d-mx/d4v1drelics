import { useRef } from 'react';
import * as THREE from 'three'; 

function Hero() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/*placeholder */}
    </group>
  );
}

export default Hero;
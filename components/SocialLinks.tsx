import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three'; 

function SocialLinks() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 2]}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </group>
  );
}

export default SocialLinks;
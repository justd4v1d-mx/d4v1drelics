import { useMemo } from 'react';
import * as THREE from 'three';

const starfieldShader = {
  uniforms: {
    uTime: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    varying vec2 vUv;

    // Función de ruido simple para las estrellas
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      // Generamos estrellas procedimentales
      // Usamos múltiples capas de ruido para profundidad
      
      vec2 uv = vUv * 50.0; // Escala base
      
      float stars = noise(uv);
      stars = pow(stars, 50.0); // Hacemos las estrellas puntuales
      
      float stars2 = noise(uv * 2.0); // Capa 2
      stars2 = pow(stars2, 80.0) * 0.5;
      
      // Paleta Monocromática: Estrellas blancas y grises
      vec3 finalColor = vec3(stars + stars2);
      
      // Pequeño parpadeo dinámico
      finalColor *= 0.8 + 0.2 * sin(uTime * 2.0 + stars * 100.0);

      gl_FragColor = vec4(finalColor, stars + stars2);
    }
  `,
};

function BackgroundSpace() {
  // Material memoizado
  const material = useMemo(() => new THREE.ShaderMaterial({
    ...starfieldShader,
    side: THREE.BackSide, 
    transparent: true,
  }), []);

  return (
   
    <mesh>
      <sphereGeometry args={[100, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default BackgroundSpace;
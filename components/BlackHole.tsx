import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const blackHoleShader = {
  uniforms: { uTime: { value: 0 } },
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

    // ruido y textura
    float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    // ruido 
    float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main() {
      vec2 uv = vUv - 0.5;
      float r = length(uv);
      float angle = atan(uv.y, uv.x); 

      // 1. config core 
      float wobble = noise(vec2(angle, uTime * 0.05)) * 0.002;
      float holeLimit = 0.10 + wobble;
      float holeMask = smoothstep(holeLimit, holeLimit + 0.01, r);

      if (r < holeLimit) {
      
        
        float z = sqrt(max(0.0, pow(holeLimit, 2.0) - pow(r, 2.0)));
        vec3 normal = normalize(vec3(uv.x, uv.y, z));
        
        // textura tipo ruido
        float texture = smoothNoise(uv * 100.0 + uTime * 0.1) * 0.02;
        
        //sim de iluminacion para el volumen 
        float lighting = dot(normal, normalize(vec3(1.0, 1.0, 1.0)));
        
        // textura + iluminación para dar profundidad y volumen al núcleo
        vec3 coreColor = vec3(0.005 + texture + lighting * 0.008);
        
        // efecto de profundidad
        coreColor *= smoothstep(0.0, holeLimit, r);

        gl_FragColor = vec4(coreColor, 1.0);
        return;
      }

      // 2. spin dyna
      float swirl = angle + (0.4 / (r + 0.1)) + uTime * 0.5;
      float waves = pow(sin(r * 35.0 - swirl * 2.0) * 0.5 + 0.5, 8.0);

      // 3. disc dynamic
      float disk = exp(-(uv.y * uv.y) / (0.003 + r * 0.015));
      
      // 4. light and compos
      float intensity = waves * disk * 2.5;
      intensity += exp(-(r - holeLimit) * 20.0) * 0.8; // Rim light intenso

      float alpha = intensity * holeMask * smoothstep(0.5, 0.2, r);

      gl_FragColor = vec4(vec3(1.0) * alpha, alpha);
    }
  `,
};

export default function BlackHoleShader() {
  const material = useMemo(() => new THREE.ShaderMaterial({
    ...blackHoleShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh rotation={[0.4, 0, 0]}>
      <planeGeometry args={[25, 25]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
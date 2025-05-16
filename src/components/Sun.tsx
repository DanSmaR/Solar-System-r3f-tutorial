import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture, Sparkles } from '@react-three/drei';
import type { Mesh } from 'three';
import * as THREE from 'three';
import sunTexture from '../assets/sun_texture.jpg';

export function Sun() {
  const sunRef = useRef<Mesh>(null);
  const props = useTexture({
    map: sunTexture,
  });
  
  useFrame((_state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.05;
    }
  });
  
  return (
    <group>
      {/* Core sun */}
      <mesh ref={sunRef}>
        <pointLight        
          intensity={1000}
          distance={1000000}
          color="#ffffff"
        />
        <Sphere args={[1, 64, 64]}>
          <meshStandardMaterial
            {...props} 
            color="#f8edc5"
            emissive="#fff6da"
            emissiveIntensity={100}
            toneMapped={false}
          />
        </Sphere>
      </mesh>
      
      {/* Inner glow */}
      <Sphere args={[1.2, 32, 32]}>
        <meshBasicMaterial 
          color="#fffcfa"
          transparent={true}
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial 
          color="#fcf4e4"
          transparent={true}
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
      
      <Sparkles 
        count={50}
        scale={[12, 12, 12]}
        size={5}
        speed={0.2}
        color="#ffff80"
      />
    </group>
  );
}
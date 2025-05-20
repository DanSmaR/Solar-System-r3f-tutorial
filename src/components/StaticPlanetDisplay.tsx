import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import type { Mesh } from 'three';
import { planetTextures } from '../utils/planetTextures';
import type { PlanetNames } from '../types';

interface StaticPlanetDisplayProps {
  name: PlanetNames;
  color: string;
  radius?: number;
  rotationSpeed?: number;
}

export function StaticPlanetDisplay({
  name,
  color,
  radius = 0.6,
  rotationSpeed = 0.3,
}: StaticPlanetDisplayProps) {
  const planetRef = useRef<Mesh>(null);
  
  const props = useTexture({
    map: planetTextures[name.toLowerCase() as keyof typeof planetTextures],
  });
  
  useFrame((_state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <mesh ref={planetRef}>
      <Sphere args={[radius, 64, 64]}>
        <meshStandardMaterial {...props} color={color} />
      </Sphere>
    </mesh>
  );
}
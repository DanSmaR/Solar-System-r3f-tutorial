import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import type { Mesh } from 'three';
import { planetTextures } from '../utils/planetTextures';
import type { PlanetProps } from '../types';
import { OrbitPath } from './OrbitPath';

export function Planet({
  name, 
  color,
  radius = 0.2,
  radiusFromSun = 2,
  orbitSpeed = 0.1,
  initialOrbitAngle = 0,
  onDoubleClick,
}: Readonly<PlanetProps>) {
  const planetRef = useRef<Mesh>(null);
  const [orbitAnglePosition, setOrbitAnglePosition] = useState(initialOrbitAngle);

  const props = useTexture({
    map: planetTextures[name.toLowerCase() as keyof typeof planetTextures],
  });
  
  useFrame((_state, delta) => {
    setOrbitAnglePosition(prev => prev + orbitSpeed * delta);
    
    const xCoordinateInOrbit = radiusFromSun * Math.cos(orbitAnglePosition);
    const zCoordinateInOrbit = radiusFromSun * Math.sin(orbitAnglePosition);

    if (planetRef.current) {
      planetRef.current.position.x = xCoordinateInOrbit;
      planetRef.current.position.z = zCoordinateInOrbit;
      planetRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <>
      <OrbitPath orbitRadius={radiusFromSun} color={color} opacity={0.7} />
       
      <mesh
        ref={planetRef}
        onDoubleClick={(e) => {
          e.stopPropagation();
          if (onDoubleClick) onDoubleClick();
        }}
      >
        <Sphere args={[radius, 64, 64]}>
          <meshStandardMaterial
            {...props} 
            color={color} 
          />
        </Sphere>
      </mesh>
    </>
  );
}
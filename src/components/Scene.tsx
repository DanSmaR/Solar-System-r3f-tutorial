import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import universeBackground from '../assets/universe_background.jpg';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { OrbitPath } from './OrbitPath';
import type { SceneProps } from '../types';

export function Scene({ planets, onPlanetDoubleClick }: Readonly<SceneProps>) {
  const props = useTexture({
    map: universeBackground,
  });

  return (
    <>
      <Sun />
      
      {planets.map((planet) => (
        <>
          <OrbitPath
            key={`orbit-${planet.name}`}
            orbitRadius={planet.radiusFromSun}
            color={planet.color}
            opacity={0.7}
          />
          <Planet
            key={planet.name}
            name={planet.name}
            color={planet.color}
            radius={planet.radius}
            radiusFromSun={planet.radiusFromSun}
            initialOrbitAngle={planet.initialOrbitAngle}
            orbitSpeed={planet.orbitSpeed}
            onDoubleClick={() => onPlanetDoubleClick(planet)}
          />
        </>
      ))}
      
      <mesh scale={[-800, 800, 800]}>
        <sphereGeometry args={[1, 64, 32]} />
        <meshBasicMaterial {...props} side={THREE.BackSide} />
      </mesh>
    </>
  );
}
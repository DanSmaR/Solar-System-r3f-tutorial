import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, OrbitControls, Environment, useTexture, Sparkles, Line } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import type { Mesh } from 'three';
import { Vector3 } from 'three';
import * as THREE from 'three';
import universeBackground from './assets/universe_background.jpg';
import sunTexture from './assets/sun_texture.jpg';
import {planetTextures} from './utils/planetTextures';
import './App.css'

function Sun() {
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
  )
}

type PlanetNames = 'Mercury' | 'Venus' | 'Earth' | 'Mars';

type PlanetProps = {
  readonly name: PlanetNames;
  readonly color: string;
  readonly radius?: number;
  readonly radiusFromSun?: number;
  readonly initialOrbitAngle?: number;
  readonly orbitSpeed?: number;
};

function Planet({name, color, radius = 0.2, radiusFromSun = 2, orbitSpeed = 0.1, initialOrbitAngle = 0 }: PlanetProps) {
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
      <OrbitPath radius={radiusFromSun} color={color} opacity={0.7} />
       
      <mesh ref={planetRef} onClick={() => console.log(`Clicked on ${name}`)}>
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

interface OrbitProps {
  readonly orbitRadius: number;
  readonly color?: string;
  readonly opacity?: number;
  readonly lineWidth?: number;
}

function OrbitPath({ orbitRadius, color = "#ffffff", opacity = 0.3, lineWidth = 0.9 }: OrbitProps) {
  const points = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      points.push(
        new Vector3(
          orbitRadius * Math.cos(angle),
          0,
          orbitRadius * Math.sin(angle)
        )
      );
    }
    return points;
  }, [orbitRadius]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={lineWidth}
      transparent
      opacity={opacity}
    />
  );
}

function Scene() {
  const props = useTexture({
    map: universeBackground,
  });

  return (
    <>
      {/* <ambientLight intensity={2} /> */}
      <Sun />
      <OrbitPath orbitRadius={2} />
      <Planet
        name="Mercury"
        color="#3498db"
        radiusFromSun={2}
        initialOrbitAngle={1}
      />
      <OrbitPath orbitRadius={4} />
      <Planet
        name="Venus"
        color="#3498db"
        radiusFromSun={4}
        initialOrbitAngle={2}
      />
      <OrbitPath orbitRadius={6} />
      <Planet
        name="Earth"
        color="#3498db"
        radiusFromSun={6}
        initialOrbitAngle={3}
      />
      <mesh scale={[-800, 800, 800]}>
        <sphereGeometry args={[1, 64, 32]} />
        <meshBasicMaterial {...props} side={THREE.BackSide} />
      </mesh>
    </>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ background: '#000000' }}>
      <Scene />
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        minDistance={0}
        maxDistance={50}
        rotateSpeed={0.5}
      />
      <Environment preset={'sunset'} background={false} environmentIntensity={0.8} />
    </Canvas>
  )
}

export default App

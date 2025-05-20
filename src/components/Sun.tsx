import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture, Sparkles } from '@react-three/drei';
import type { Mesh } from 'three';
import * as THREE from 'three';
import sunTexture from '../assets/sun_texture.jpg';
import { EffectComposer, GodRays } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';

export function Sun() {
  const sunRef = useRef<Mesh>(null);
  const godRaysSunRef = useRef<Mesh>(null);
  const [godRaysReady, setGodRaysReady] = useState(false);

  const props = useTexture({
    map: sunTexture,
  });
  
  useFrame((_state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.05;
    }

    if (godRaysSunRef.current && sunRef.current) {
      godRaysSunRef.current.position.copy(sunRef.current.position);
    }
  });
  
  useEffect(() => {
    if (godRaysSunRef.current) {
      setGodRaysReady(true);
    }
  }, []);

  return (
    <>
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
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={100}
              toneMapped={false}
            />
          </Sphere>
        </mesh>
        
        {/* Inner glow */}
        {/* <Sphere args={[1.2, 32, 32]}>
          <meshBasicMaterial 
            color="#ffffff"
            transparent={true}
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            toneMapped={false}
          />
        </Sphere> */}
        
        {/* Outer glow */}
        {/* <Sphere args={[1.5, 32, 32]}>
          <meshBasicMaterial 
            color="#ffffff"
            transparent={true}
            opacity={0.05}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            toneMapped={false}
          />
        </Sphere> */}
        
        <Sparkles 
          count={50}
          scale={[12, 12, 12]}
          size={5}
          speed={0.2}
          color="#ffffff"
        />
      </group>

      {/* Invisible sun mesh for god rays source - must be outside the group */}
      <mesh ref={godRaysSunRef}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#ffffff" fog={false} />
      </mesh>

      {/* Post-processing effects */}
      {godRaysReady && (
        <EffectComposer>
          <GodRays 
            sun={godRaysSunRef.current!} 
            blendFunction={BlendFunction.SCREEN}
            samples={60}
            density={0.97}
            decay={0.93}
            weight={0.6}
            exposure={0.6}
            clampMax={1}
            kernelSize={KernelSize.LARGE}
            blur={true}
          />
        </EffectComposer>
      )}
    </>
  );
}
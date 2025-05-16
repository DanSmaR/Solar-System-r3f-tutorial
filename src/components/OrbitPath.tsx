import { useMemo } from 'react';
import { Vector3 } from 'three';
import { Line } from '@react-three/drei';
import type { OrbitProps } from '../types';

export function OrbitPath({ orbitRadius, color = "#ffffff", opacity = 0.3, lineWidth = 0.9 }: Readonly<OrbitProps>) {
  const points = useMemo(() => {
    const SEGMENTS = 128;
    const points = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      const angle = (i / SEGMENTS) * Math.PI * 2;
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
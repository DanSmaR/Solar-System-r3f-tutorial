import type { PlanetData } from '../types';

export const planets: PlanetData[] = [
  {
    name: 'Mercury',
    color: '#9c9c9c',
    radius: 0.15,
    radiusFromSun: 2,
    initialOrbitAngle: 1,
    orbitSpeed: 0.12
  },
  {
    name: 'Venus',
    color: '#e8cda2',
    radius: 0.18,
    radiusFromSun: 4,
    initialOrbitAngle: 2,
    orbitSpeed: 0.08
  },
  {
    name: 'Earth',
    color: '#3498db',
    radius: 0.2,
    radiusFromSun: 6,
    initialOrbitAngle: 3,
    orbitSpeed: 0.05
  }
];
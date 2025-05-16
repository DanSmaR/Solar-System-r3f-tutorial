export type PlanetNames = 'Mercury' | 'Venus' | 'Earth' | 'Mars';

export interface PlanetData {
  name: PlanetNames;
  color: string;
  radius?: number;
  radiusFromSun: number;
  initialOrbitAngle?: number;
  orbitSpeed?: number;
}

export interface SceneProps {
  readonly planets: PlanetData[];
  readonly onPlanetDoubleClick: (planetData: PlanetData) => void;
}

export interface PlanetProps {
  readonly name: PlanetNames;
  readonly color: string;
  readonly radius?: number;
  readonly radiusFromSun?: number;
  readonly initialOrbitAngle?: number;
  readonly orbitSpeed?: number;
  readonly onDoubleClick?: () => void;
}

export interface OrbitProps {
  readonly orbitRadius: number;
  readonly color?: string;
  readonly opacity?: number;
  readonly lineWidth?: number;
}
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Scene } from './components/Scene';
import { planets } from './data/planets';
import { useState } from 'react';
import type { PlanetData } from './types';
import { PlanetDetailsModal } from './components/PlanetDetailsModal';
import './App.css';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handlePlanetClick = (planetData: PlanetData) => {
    console.log('Planet clicked:', planetData);
    setSelectedPlanet(planetData)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        style={{ background: '#000000', height: '100vh', width: '100vw' }}
      >
        <Scene planets={planets} onPlanetDoubleClick={handlePlanetClick} />
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          minDistance={0}
          maxDistance={50}
          rotateSpeed={0.5}
        />
        <Environment preset={'sunset'} background={false} environmentIntensity={0.8} />
      </Canvas>
      
      <PlanetDetailsModal 
        planet={selectedPlanet} 
        open={modalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  )
}

export default App

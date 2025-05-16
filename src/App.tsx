import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import './App.css'
import { Scene } from './components/Scene'
import { planets } from './data/planets'

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }} style={{ background: '#000000' }}>
      <Scene planets={planets} />
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

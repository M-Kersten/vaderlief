import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import ParticleField from './ParticleField'

// Vaste, schermvullende achtergrond. pointer-events staat uit (via CSS),
// zodat alle interactie naar de inhoud erboven gaat.
export default function Background() {
  return (
    <div className="bg-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 14], fov: 60 }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  )
}

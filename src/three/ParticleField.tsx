import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '../scrollStore'

// Een enkele, lichte puntenwolk die dienst doet als zowel terminal-"sterren"
// als opstijgende stoom. De voortgang van de scroll bepaalt de stijgsnelheid
// en de kleur (koel groen -> warm amber bij de onthulling).

const COOL = new THREE.Color('#46e6a0')
const WARM = new THREE.Color('#ffb877')
const tmp = new THREE.Color()

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const matRef = useRef<THREE.PointsMaterial>(null)
  const { viewport } = useThree()

  // Minder deeltjes op kleine (mobiele) schermen voor prestaties.
  const count = useMemo(() => {
    if (typeof window === 'undefined') return 900
    return window.innerWidth < 600 ? 900 : 1600
  }, [])

  const { positions, speeds, spread } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const spread = 18
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * spread * 1.6
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 1.6
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread
      speeds[i] = 0.15 + Math.random() * 0.85
    }
    return { positions, speeds, spread }
  }, [count])

  useFrame((_, delta) => {
    const p = pointsRef.current
    const mat = matRef.current
    if (!p || !mat) return

    const dt = Math.min(delta, 0.05)
    const prog = scrollState.progress

    // Stoom intensiveert in het midden (rust/verbinding) en stijgt sneller.
    const rise = 0.25 + prog * 1.7
    const halfH = spread * 1.6
    const pos = p.geometry.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array

    for (let i = 0; i < count; i++) {
      const iy = i * 3 + 1
      arr[iy] += speeds[i] * rise * dt
      if (arr[iy] > halfH) {
        arr[iy] = -halfH
        arr[i * 3] = (Math.random() - 0.5) * spread * 1.6
      }
      // lichte horizontale wiebel = stoomgedrag
      arr[i * 3] += Math.sin((arr[iy] + i) * 0.35) * 0.0025 * (1 + prog * 2)
    }
    pos.needsUpdate = true

    // Trage rotatie geeft diepte zonder zwaar te zijn.
    p.rotation.z += dt * 0.012

    // Kleur en sfeer mengen mee met de voortgang.
    const warmth = THREE.MathUtils.smoothstep(prog, 0.55, 0.92)
    tmp.copy(COOL).lerp(WARM, warmth)
    mat.color.copy(tmp)

    // Stoom is dichter/zachter in het midden, klaart op bij de warme onthulling.
    const mist = Math.sin(Math.min(prog, 1) * Math.PI) // 0 -> 1 -> 0
    mat.opacity = 0.32 + mist * 0.34
    mat.size = (viewport.width < 6 ? 0.05 : 0.06) + mist * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        color={COOL}
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

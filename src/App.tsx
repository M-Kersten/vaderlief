import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Background from './three/Background'
import MatrixRain from './three/MatrixRain'
import { setScrollProgress } from './scrollStore'

import Intro from './sections/Intro'
import Diagnose from './sections/Diagnose'
import Afsluiten from './sections/Afsluiten'
import Rust from './sections/Rust'
import Verbinding from './sections/Verbinding'
import Onthulling from './sections/Onthulling'
import Installatie from './sections/Installatie'
import Systeemcontrole from './sections/Systeemcontrole'
import Formulier from './sections/Formulier'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  // Eén overkoepelende ScrollTrigger voedt de 3D-achtergrond met de
  // totale scroll-voortgang (0 -> 1) zonder React te laten herrenderen.
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setScrollProgress(self.progress, self.getVelocity()),
    })

    // Zorg dat metingen kloppen nadat alles (fonts/canvas) geladen is.
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      st.kill()
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <>
      <MatrixRain />
      <Background />
      <div className="scanlines" aria-hidden="true" />
      <main>
        <Intro />
        <Diagnose />
        <Afsluiten />
        <Rust />
        <Verbinding />
        <Onthulling />
        <Installatie />
        <Systeemcontrole />
        <Formulier />
        <div className="spacer" />
      </main>
    </>
  )
}

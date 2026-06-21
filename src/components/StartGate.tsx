import { useEffect, useRef, useState } from 'react'
import { unlockSound } from '../sound'

// Rijk startscherm: een korte terminal-opstartsequentie ("boot") plus een
// prompt. Het vangt de allereerste tik/toets op — nodig omdat browsers geluid
// pas toestaan ná een echte interactie (scrollen telt niet). Bij die tik wordt
// het geluid ontgrendeld en de muziek synchroon gestart via 'app:start'.

const BOOT = [
  'Kernel laden',
  'Herinneringen koppelen',
  'Geluidsmodule activeren',
  'Verbinding voorbereiden',
]

export default function StartGate({ onStart }: { onStart: () => void }) {
  const [leaving, setLeaving] = useState(false)
  const [shown, setShown] = useState(0)
  const [ready, setReady] = useState(false)
  const leavingRef = useRef(false)

  // Boot-regels één voor één laten verschijnen.
  useEffect(() => {
    if (shown >= BOOT.length) {
      const t = window.setTimeout(() => setReady(true), 250)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => setShown((n) => n + 1), 340)
    return () => window.clearTimeout(t)
  }, [shown])

  function begin() {
    if (leavingRef.current) return
    leavingRef.current = true
    unlockSound()
    // Synchroon: de muziek-handler draait binnen deze tik en mag dus spelen.
    window.dispatchEvent(new Event('app:start'))
    setLeaving(true)
    window.setTimeout(onStart, 600)
  }

  // Ook een toetsaanslag (telt als geldige interactie) start de ervaring.
  useEffect(() => {
    const onKey = () => begin()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`startgate${leaving ? ' is-leaving' : ''}`}
      role="button"
      tabIndex={0}
      aria-label="Start de ervaring met geluid"
      onClick={begin}
      onKeyDown={begin}
    >
      <div className="startgate__inner">
        <p className="eyebrow">// systeemcontrole</p>
        <h1 className="startgate__title glow-accent">Vaderdag 2026</h1>

        <ul className="startgate__boot" aria-hidden="true">
          {BOOT.map((line, i) => (
            <li key={line} className={i < shown ? 'is-on' : ''}>
              <span className="b-cmd">
                <span className="b-prompt">&gt;</span> {line}
              </span>
              <span className="b-ok">ok</span>
            </li>
          ))}
        </ul>

        <div className={`startgate__prompt${ready ? ' is-ready' : ''}`}>
          <span className="startgate__tri" aria-hidden="true" />
          Tik om te starten
        </div>
        <p className="startgate__sub">geluid aan · koptelefoon aanbevolen</p>
      </div>
    </div>
  )
}

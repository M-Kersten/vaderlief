import { useEffect, useRef, useState } from 'react'
import { unlockSound } from '../sound'

// Kort startscherm dat de allereerste tik/toets opvangt. Dat is nodig omdat
// browsers geluid pas toestaan ná een echte interactie (scrollen telt niet).
// Bij de tik wordt het geluid ontgrendeld en — via een synchroon 'app:start'
// event — de achtergrondmuziek gestart, nog binnen dezelfde interactie.

export default function StartGate({ onStart }: { onStart: () => void }) {
  const [leaving, setLeaving] = useState(false)
  const leavingRef = useRef(false)

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
        <p className="eyebrow">// vaderdag 2026</p>
        <div className="startgate__prompt">
          <span className="startgate__tri" aria-hidden="true" />
          Tik om te starten
        </div>
        <p className="startgate__sub">
          geluid aan · koptelefoon aanbevolen
        </p>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { setSoundMuted, unlockSound } from '../sound'

// Loopende achtergrondmuziek op half volume. Zet je nummer als
// public/achtergrond.mp3 (zie public/LEESMIJ-muziek.txt).
//
// Browsers blokkeren autoplay-met-geluid tot de gebruiker iets doet, dus we
// starten zachtjes bij de eerste interactie (tik/scroll). Een kleine knop laat
// pa het geluid aan/uit zetten. Speelt het persoonlijke bericht af, dan duikt
// de muziek automatisch weg ("ducking") zodat jouw stem er bovenuit komt.

const SRC = `${import.meta.env.BASE_URL}achtergrond.mp3`
const BASE_VOL = 0.5
const DUCK_VOL = 0.12

export default function BackgroundMusic() {
  const ref = useRef<HTMLAudioElement>(null)
  const ducked = useRef(false)
  const [muted, setMuted] = useState(false)
  const [available, setAvailable] = useState(true)

  function applyVolume() {
    const a = ref.current
    if (!a) return
    a.volume = ducked.current ? DUCK_VOL : BASE_VOL
  }

  // Foutafhandeling als het bestand (nog) ontbreekt.
  useEffect(() => {
    const a = ref.current
    if (!a) return
    a.volume = BASE_VOL
    const onErr = () => setAvailable(false)
    a.addEventListener('error', onErr)
    return () => a.removeEventListener('error', onErr)
  }, [])

  // Automatisch starten bij de allereerste interactie. Let op: browsers staan
  // geluid pas toe ná een "echte" interactie (tik/klik/toets). Scrollen met een
  // muiswiel telt op desktop meestal NIET — maar op de telefoon telt de eerste
  // aanraking (waarmee je scrolt) wél, dus daar start het vanzelf.
  useEffect(() => {
    let done = false
    const tryStart = () => {
      unlockSound() // sci-fi effecten mogen nu ook spelen
      if (done || muted) return
      const a = ref.current
      if (!a) return
      a.muted = false
      applyVolume()
      a.play()
        .then(() => {
          done = true
          cleanup()
        })
        .catch(() => {
          /* nog niet toegestaan; volgende interactie probeert opnieuw */
        })
    }
    // Capture-fase op document vangt élke eerste interactie op.
    const events = [
      'pointerdown',
      'mousedown',
      'touchstart',
      'click',
      'keydown',
      'scroll',
      'wheel',
    ]
    const opts: AddEventListenerOptions = { capture: true, passive: true }
    const cleanup = () =>
      events.forEach((e) => document.removeEventListener(e, tryStart, opts))
    events.forEach((e) => document.addEventListener(e, tryStart, opts))
    return cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Startscherm: 'app:start' wordt synchroon vanuit de tik gedispatcht, dus
  // de play() hieronder valt nog binnen die interactie en mag geluid geven.
  useEffect(() => {
    const onAppStart = () => {
      const a = ref.current
      if (!a) return
      a.muted = false
      setMuted(false)
      setSoundMuted(false)
      applyVolume()
      a.play().catch(() => {})
    }
    window.addEventListener('app:start', onAppStart)
    return () => window.removeEventListener('app:start', onAppStart)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ducking: zachter zetten terwijl het ingesproken bericht speelt.
  useEffect(() => {
    const duck = () => {
      ducked.current = true
      applyVolume()
    }
    const unduck = () => {
      ducked.current = false
      applyVolume()
    }
    window.addEventListener('voice:play', duck)
    window.addEventListener('voice:pause', unduck)
    return () => {
      window.removeEventListener('voice:play', duck)
      window.removeEventListener('voice:pause', unduck)
    }
  }, [])

  function toggle() {
    unlockSound()
    const next = !muted
    setMuted(next)
    setSoundMuted(next) // dempt ook de sci-fi effecten
    const a = ref.current
    if (a) {
      a.muted = next
      if (!next) a.play().catch(() => {})
    }
  }

  // De knop bestuurt al het geluid (muziek + sci-fi effecten). Ook zonder
  // muziekbestand blijft de knop staan om de effecten te kunnen dempen.
  return (
    <>
      {available && <audio ref={ref} src={SRC} loop preload="auto" />}
      <button
        type="button"
        className={`music-toggle${muted ? ' is-muted' : ''}`}
        onClick={toggle}
        aria-label={muted ? 'Geluid aanzetten' : 'Geluid uitzetten'}
        title={muted ? 'Geluid aan' : 'Geluid uit'}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4z" />
          {muted ? (
            <path className="x" d="M16 9l5 6M21 9l-5 6" />
          ) : (
            <>
              <path className="wave" d="M16.5 8.5a5 5 0 0 1 0 7" />
              <path className="wave" d="M19 6a8.5 8.5 0 0 1 0 12" />
            </>
          )}
        </svg>
      </button>
    </>
  )
}

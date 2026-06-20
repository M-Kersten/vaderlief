import { useEffect, useRef, useState } from 'react'

// Speelt een persoonlijk MP3-berichtje af. Zet je opname als
// `public/papa-bericht.mp3` (of pas de naam hieronder aan). Bestaat het
// bestand nog niet, dan toont de speler netjes "berichtje volgt".

const SRC = `${import.meta.env.BASE_URL}papa-bericht.mp3`

function fmt(t: number): string {
  if (!isFinite(t) || t < 0) t = 0
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioMessage() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [available, setAvailable] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setTime(a.currentTime)
    const onMeta = () => setDuration(a.duration)
    const onEnd = () => {
      setPlaying(false)
      setTime(0)
      // Achtergrondmuziek weer op vol (half) volume.
      window.dispatchEvent(new Event('voice:pause'))
    }
    const onErr = () => setAvailable(false)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('ended', onEnd)
    a.addEventListener('error', onErr)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('ended', onEnd)
      a.removeEventListener('error', onErr)
    }
  }, [])

  function toggle() {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
      window.dispatchEvent(new Event('voice:pause'))
    } else {
      a.play()
        .then(() => {
          setPlaying(true)
          // Laat de achtergrondmuziek wegduiken zodat de stem bovenuit komt.
          window.dispatchEvent(new Event('voice:play'))
        })
        .catch(() => setAvailable(false))
    }
  }

  const pct = duration ? (time / duration) * 100 : 0

  return (
    <div className="audiomsg">
      {/* preload metadata; bij ontbrekend bestand vangt onError dit op */}
      <audio ref={audioRef} src={SRC} preload="metadata" />

      <button
        type="button"
        className="audiomsg__btn"
        onClick={toggle}
        disabled={!available}
        aria-label={playing ? 'Pauzeer berichtje' : 'Speel berichtje af'}
      >
        {!available ? (
          <span className="audiomsg__icon">🎧</span>
        ) : playing ? (
          <span className="audiomsg__icon" aria-hidden="true">
            <span className="bar" />
            <span className="bar" />
          </span>
        ) : (
          <span className="audiomsg__icon tri" aria-hidden="true" />
        )}
      </button>

      <div className="audiomsg__body">
        <span className="audiomsg__label">Een berichtje van je zoon</span>
        {available ? (
          <>
            <div className="audiomsg__track" aria-hidden="true">
              <div className="audiomsg__fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="audiomsg__time">
              {fmt(time)} {duration ? `/ ${fmt(duration)}` : ''}
            </span>
          </>
        ) : (
          <span className="audiomsg__time">berichtje volgt 💚</span>
        )}
      </div>
    </div>
  )
}

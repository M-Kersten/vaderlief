import { useEffect, useRef, useState } from 'react'

// Persoonlijk MP3-berichtje, vormgegeven als een inkomend chatbericht met een
// spraakmemo (afzender "Zoon"). Zet je opname als public/papa-bericht.mp3.
// Bestaat het bestand nog niet, dan toont de bubbel netjes "berichtje volgt".

const SRC = `${import.meta.env.BASE_URL}papa-bericht.mp3`

// Vaste "waveform" — natuurlijk ogende balkjes voor de spraakmemo.
const WAVE = [
  6, 10, 14, 9, 16, 22, 18, 12, 20, 26, 19, 13, 8, 15, 24, 28, 21, 14, 10, 17,
  23, 16, 11, 7, 12, 9,
]

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

  const pct = duration ? time / duration : 0
  const playedBars = Math.round(pct * WAVE.length)

  return (
    <div className="msg">
      <audio ref={audioRef} src={SRC} preload="metadata" />

      <div className="msg__meta">
        <span className="msg__live" />
        Inkomend bericht
      </div>

      <div className="msg__bubble">
        <div className="msg__from">
          <span className="msg__avatar">Z</span>
          <span className="msg__name">Zoon</span>
          {available && duration > 0 && (
            <span className="msg__dur">{fmt(time || duration)}</span>
          )}
        </div>

        {available ? (
          <div className="msg__voice">
            <button
              type="button"
              className={`msg__play${playing ? ' is-playing' : ''}`}
              onClick={toggle}
              aria-label={playing ? 'Pauzeer berichtje' : 'Speel berichtje af'}
            >
              {playing ? (
                <span className="msg__pause" aria-hidden="true">
                  <span />
                  <span />
                </span>
              ) : (
                <span className="msg__tri" aria-hidden="true" />
              )}
            </button>

            <div
              className={`msg__wave${playing ? ' is-playing' : ''}`}
              aria-hidden="true"
            >
              {WAVE.map((h, i) => (
                <span
                  key={i}
                  className={i < playedBars ? 'is-played' : ''}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="msg__placeholder">🎧 Berichtje volgt…</p>
        )}
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'

// Tech-stijl "verbinden": een beveiligde handshake-terminal met een
// voortgangsbalk en een strip van vier foto's van jullie samen die als
// "gedeelde herinneringen" inladen terwijl de verbinding tot stand komt.
//
// Zet je foto's als public/samen-1.jpg t/m public/samen-4.jpg
// (zie public/LEESMIJ-fotos.txt). Ontbreekt er een, dan toont het frame een
// nummer in plaats van de foto.

const BASE = import.meta.env.BASE_URL
const PHOTOS = [1, 2, 3, 4].map((n) => `${BASE}samen-${n}.jpg`)
const PHOTO_AT = [22, 46, 70, 92]

const STEPS: { at: number; text: string; ok?: boolean }[] = [
  { at: 6, text: 'Kanaal openen…' },
  { at: 26, text: 'Handshake vader ⟷ zoon… OK', ok: true },
  { at: 50, text: 'Gedeelde herinneringen laden…' },
  { at: 74, text: 'Synchroniseren… OK', ok: true },
  { at: 92, text: 'Versleutelen… OK', ok: true },
]

function Memory({ src, index, shown }: { src: string; index: number; shown: boolean }) {
  const [ok, setOk] = useState(true)
  return (
    <div className={`mem${shown ? ' is-shown' : ''}`}>
      <div className="mem__frame">
        {ok ? (
          <img
            src={src}
            alt={`Samen ${index}`}
            loading="lazy"
            onError={() => setOk(false)}
          />
        ) : (
          <span className="mem__fallback">0{index}</span>
        )}
        <span className="mem__scan" aria-hidden="true" />
      </div>
      <span className="mem__tag">0{index}</span>
    </div>
  )
}

export default function Verbinding() {
  const ref = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(0)
  const [connected, setConnected] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true
          io.disconnect()
          run()
        }
      },
      { threshold: 0.45 },
    )
    io.observe(el)

    let raf = 0
    function run() {
      const duration = 2600
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 2)
        setPct(Math.round(eased * 100))
        if (t < 1) raf = requestAnimationFrame(tick)
        else setConnected(true)
      }
      raf = requestAnimationFrame(tick)
    }

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  const visibleSteps = STEPS.filter((s) => pct >= s.at)

  return (
    <section className="section section--center" id="verbinding">
      <div className="linkterm terminal" ref={ref}>
        <div className="terminal__bar">
          <span className="dot dot--g" />
          <span className="dot" />
          <span className="dot" />
          <span className="terminal__title">secure_link --connect</span>
        </div>

        <div className="linkterm__head">
          <span className="linkterm__nodes">
            Vader <span className="accent">⟷</span> Zoon
          </span>
          <span className={`linkterm__status${connected ? ' online' : ''}`}>
            {connected ? '● ONLINE' : '● ESTABLISHING'}
          </span>
        </div>

        <div className="linkbar">
          <div className="linkbar__track">
            <div className="linkbar__fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="linkbar__pct">{pct}%</span>
        </div>

        <div className="memories" aria-label="Foto's van ons samen">
          {PHOTOS.map((src, i) => (
            <Memory
              key={src}
              src={src}
              index={i + 1}
              shown={pct >= PHOTO_AT[i]}
            />
          ))}
        </div>

        <div className="linkterm__log">
          {visibleSteps.map((s) => (
            <div className="logline" key={s.at}>
              {s.ok && <span className="ok">✓ </span>}
              {s.text}
            </div>
          ))}
          {!connected && <span className="caret" />}
        </div>
      </div>

      <p className={`lead accent connect__status${connected ? ' show' : ''}`}>
        Verbinding succesvol.
      </p>
    </section>
  )
}

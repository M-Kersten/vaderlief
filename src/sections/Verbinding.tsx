import { useEffect, useRef, useState } from 'react'

// Een foto van vader (links) en zoon (rechts) die naar elkaar toe bewegen,
// met een subtiele verbindingsbalk die tussen hen vol loopt. Zet je foto's als
// public/vader.jpg en public/zoon.jpg (zie public/LEESMIJ-fotos.txt). Ontbreekt
// een foto, dan toont het frame netjes een initiaal.

const VADER = `${import.meta.env.BASE_URL}vader.jpg`
const ZOON = `${import.meta.env.BASE_URL}zoon.jpg`

function Avatar({
  src,
  label,
  initial,
}: {
  src: string
  label: string
  initial: string
}) {
  const [ok, setOk] = useState(true)
  return (
    <div className="person">
      <div className="person__frame">
        {ok ? (
          <img src={src} alt={label} onError={() => setOk(false)} />
        ) : (
          <span className="person__fallback">{initial}</span>
        )}
      </div>
      <span className="person__label">{label}</span>
    </div>
  )
}

export default function Verbinding() {
  const ref = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(0)
  const [active, setActive] = useState(false)
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
      { threshold: 0.5 },
    )
    io.observe(el)

    let raf = 0
    function run() {
      setActive(true) // foto's schuiven naar elkaar toe
      const duration = 2000 // subtiel en rustig
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 2)
        setPct(Math.round(eased * 100))
        if (t < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          setConnected(true)
        }
      }
      raf = requestAnimationFrame(tick)
    }

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="section section--center" id="verbinding">
      <p className="kicker" style={{ marginBottom: '0.4rem' }}>
        {connected ? 'Verbonden' : 'Verbinden'}
        <span className="caret" />
      </p>

      <div
        className={`connect${active ? ' is-active' : ''}${
          connected ? ' is-connected' : ''
        }`}
        ref={ref}
        style={{ ['--p' as string]: `${pct}%` }}
      >
        <div className="connect__people">
          <Avatar src={VADER} label="Vader" initial="V" />

          <div className="connect__link" aria-hidden="true">
            <div className="connect__track">
              <div className="connect__fill" />
            </div>
            <span className="connect__spark">♥</span>
          </div>

          <Avatar src={ZOON} label="Zoon" initial="Z" />
        </div>
      </div>

      <p className={`lead accent connect__status${connected ? ' show' : ''}`}>
        Verbinding succesvol.
      </p>
    </section>
  )
}

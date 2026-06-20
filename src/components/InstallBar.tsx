import { useEffect, useRef, useState } from 'react'

// Een "installer" die vol loopt zodra hij in beeld komt: meerdere fases met
// een meelopend logregeltje, eindigend op 100% — cadeau actief.

type Stage = { to: number; ms: number; log: string }

const STAGES: Stage[] = [
  { to: 28, ms: 750, log: 'Ontspanning uitpakken…' },
  { to: 54, ms: 650, log: 'Samen-tijd configureren…' },
  { to: 79, ms: 800, log: 'Stress verwijderen…' },
  { to: 100, ms: 900, log: 'Goede sfeer activeren…' },
]

export default function InstallBar() {
  const ref = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(0)
  const [log, setLog] = useState('Wachten op start…')
  const [done, setDone] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Start de installatie zodra de balk in beeld scrollt (één keer).
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true
          io.disconnect()
          run()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)

    let raf = 0
    function run() {
      let stageIndex = 0
      let from = 0
      let stageStart = performance.now()
      setLog(STAGES[0].log)

      const tick = (now: number) => {
        const stage = STAGES[stageIndex]
        const t = Math.min(1, (now - stageStart) / stage.ms)
        // easeOutCubic voor een soepele, "echte" vulling
        const eased = 1 - Math.pow(1 - t, 3)
        setPct(Math.round(from + (stage.to - from) * eased))

        if (t >= 1) {
          if (stageIndex < STAGES.length - 1) {
            stageIndex++
            from = stage.to
            stageStart = now
            setLog(STAGES[stageIndex].log)
            raf = requestAnimationFrame(tick)
          } else {
            setPct(100)
            setDone(true)
            setLog('Voltooid')
          }
        } else {
          raf = requestAnimationFrame(tick)
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
    <div className="installbar" ref={ref}>
      <div className="installbar__head">
        <span className="muted">vader_zoon_dag installeren…</span>
        <span className="installbar__pct">{pct}%</span>
      </div>
      <div
        className="installbar__track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="installbar__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="installbar__log">
        {done ? (
          <span className="ok">✓ Cadeau geïnstalleerd en actief</span>
        ) : (
          log
        )}
      </div>
    </div>
  )
}

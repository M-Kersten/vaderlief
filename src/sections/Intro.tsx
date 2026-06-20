import { useEffect, useState } from 'react'
import Terminal, { Row } from '../components/Terminal'

const STATS: { label: string; value: string; tone?: 'good' | 'bad' | 'dim' }[] =
  [
    { label: 'Leeftijd', value: '60 jaar' },
    { label: 'Aantal slechte grappen', value: 'Ontelbaar', tone: 'dim' },
    { label: 'Beschikbare vrije tijd', value: 'Laag', tone: 'bad' },
    { label: 'Kwaliteit van advies', value: 'Uitstekend' },
  ]

export default function Intro() {
  // Korte "boot"-tekst die zichzelf typt onder de titel.
  const full = 'Systeemcontrole'
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(full.slice(0, i))
      if (i >= full.length) clearInterval(id)
    }, 95)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="section section--center" id="intro">
      <div className="panel">
        <p className="eyebrow" style={{ marginBottom: '1.1rem' }}>
          // Initialiseren
        </p>
        <h1 className="display">Vaderdag 2026</h1>
        <p className="kicker" style={{ marginTop: '1.3rem' }}>
          {typed}
          <span className="caret" />
        </p>
      </div>

      <div style={{ marginTop: '2.4rem', width: '100%' }}>
        <Terminal title="boot.seq">
          {STATS.map((s, i) => (
            <Row
              key={s.label}
              label={s.label}
              value={s.value}
              tone={s.tone}
              style={{ animationDelay: `${0.25 + i * 0.45}s` }}
            />
          ))}
        </Terminal>
      </div>

      <div className="scroll-hint">
        <span>scroll</span>
        <span className="chev" />
      </div>
    </section>
  )
}

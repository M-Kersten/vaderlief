import { useEffect, useState } from 'react'
import Terminal, { Row } from '../components/Terminal'
import { sfx } from '../sound'

const STATS: { label: string; value: string; tone?: 'good' | 'bad' | 'dim' }[] =
  [
    { label: 'Leeftijd', value: '57 jaar' },
    { label: 'Herkomst', value: 'Land van Maas en Waal', tone: 'dim' },
    { label: 'Taalmodule', value: 'Plat ✓' },
    { label: 'Beroep', value: 'Websitebouwer' },
    { label: 'Aantal rare grappen', value: 'Ontelbaar', tone: 'dim' },
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
      sfx.type() // zachte toetsaanslag-blip (speelt pas na 1e interactie)
      if (i >= full.length) clearInterval(id)
    }, 95)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="section section--center" id="intro">
      <div className="panel">
        <p className="eyebrow">// wakker worden, papa…</p>
        <h1 className="display">Vaderdag 2026</h1>
        <p className="kicker">
          {typed}
          <span className="caret" />
        </p>
      </div>

      <div className="block">
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

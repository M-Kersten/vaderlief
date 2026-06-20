import Terminal, { Row } from '../components/Terminal'
import Reveal from '../components/Reveal'

const ROWS: { label: string; value: string; tone: 'good' | 'bad' | 'dim' }[] = [
  { label: 'Stressniveau', value: '87%', tone: 'bad' },
  { label: 'Open browsertabs', value: 'Te veel', tone: 'bad' },
  { label: 'Agenda (werk + bands)', value: 'Vol', tone: 'bad' },
  { label: 'Meldingen', value: 'Aan', tone: 'bad' },
  { label: 'Ontspanning', value: 'Niet gevonden', tone: 'dim' },
]

export default function Diagnose() {
  return (
    <section className="section" id="diagnose">
      <div className="panel">
        <Reveal as="p" className="eyebrow">
          // Sectie 01 — Diagnose
        </Reveal>
        <Reveal as="h2" className="title" delay={1}>
          Diagnose
        </Reveal>
      </div>

      <div style={{ width: '100%', marginTop: '0.4rem' }}>
        <Terminal title="diagnose --scan">
          {ROWS.map((r, i) => (
            <Row
              key={r.label}
              label={r.label}
              value={r.value}
              tone={r.tone}
              style={{ animationDelay: `${0.2 + i * 0.4}s` }}
            />
          ))}
          <div className="status-line">
            <span className="muted">Status: </span>
            <span className="accent">Tijd voor onderhoud.</span>
            <span className="caret" />
          </div>
        </Terminal>
      </div>
    </section>
  )
}

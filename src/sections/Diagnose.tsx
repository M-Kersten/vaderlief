import Terminal, { Row } from '../components/Terminal'
import Reveal from '../components/Reveal'

const ROWS: { label: string; value: string; tone: 'crit' | 'bad' | 'dim' }[] = [
  { label: 'Stressniveau', value: '98%', tone: 'crit' },
  { label: 'Open browsertabs', value: 'Te veel', tone: 'bad' },
  { label: 'Agenda', value: 'Overvol', tone: 'crit' },
  { label: 'Meldingen', value: 'Aan', tone: 'bad' },
  { label: 'Ontspanning', value: 'Niet gevonden', tone: 'dim' },
]

const CHORES = [
  'Lekkende kraan in de badkamer',
  'Heg snoeien (alweer)',
  'Dakgoot leegmaken',
  'Boodschappen voor het weekend',
  "Website van de buurman 'even' fixen",
  'Backups draaien',
  'Belastingaangifte',
  'Schuur opruimen',
  'Auto naar de garage',
  'Lampje in de gang vervangen',
  'Nieuwe snaren op de gitaar',
  'Dave uitlaten (voor de derde keer)',
  'Mailbox: 142 ongelezen',
  'Verjaardagscadeau nog regelen',
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
          <div className="alert">Systeem overbelast — onderhoud vereist</div>

          {ROWS.map((r, i) => (
            <Row
              key={r.label}
              label={r.label}
              value={r.value}
              tone={r.tone}
              style={{ animationDelay: `${0.2 + i * 0.35}s` }}
            />
          ))}

          <Row label="Openstaande klusjes" value="∞" tone="crit" />
          <div className="overflow-list" aria-label="Te veel openstaande klusjes">
            {CHORES.map((c) => (
              <div className="chore" key={c}>
                {c}
              </div>
            ))}
            <div className="chore">…en nog 37 andere</div>
          </div>

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

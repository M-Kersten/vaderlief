import Terminal, { Row } from '../components/Terminal'
import { sfx } from '../sound'

const ROWS: { label: string; value: string; tone: 'crit' | 'bad' | 'dim' }[] = [
  { label: 'Stressniveau', value: '98%', tone: 'crit' },
  { label: 'Open browsertabs', value: 'Te veel', tone: 'bad' },
  { label: 'Agenda', value: 'Overvol', tone: 'crit' },
  { label: 'Meldingen', value: 'Aan', tone: 'bad' },
  { label: 'Ontspanning', value: '404 — niet gevonden', tone: 'dim' },
]

const CHORES = [
  'Plugin-updates: 23 beschikbaar',
  "wp-admin: 'even snel' iets fixen",
  'Cache legen (werkt nu wél)',
  'Repeteren repeteren..',
  'SSL-certificaat verloopt bijna',
  'Heg snoeien (alweer)',
  'Dave uitlaten',
  'Mailbox: 142 ongelezen',
  'Backup draaien voor de zekerheid',
]

export default function Diagnose() {
  return (
    <section className="section" id="diagnose">
      <div className="block">
        <Terminal
          title="diagnose --scan"
          onReveal={() => {
            sfx.scan()
            window.setTimeout(() => {
              sfx.glitch()
              sfx.alert()
            }, 480)
          }}
        >
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

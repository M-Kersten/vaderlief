import ExecList, { type ExecStep } from '../components/ExecList'
import Reveal from '../components/Reveal'

const STEPS: ExecStep[] = [
  { cmd: 'Geen kleinkinderen om op te passen (nog niet)...', done: true },
  { cmd: 'Geen websites die vandaag live moeten...', done: true },
  { cmd: 'Dave (Davemans) heeft een oppas...', done: true },
  { cmd: 'Geen klusjes gepland...', done: true },
]

export default function Systeemcontrole() {
  return (
    <section className="section" id="systeemcontrole">
      <div className="panel" style={{ marginBottom: '2rem' }}>
        <Reveal as="p" className="eyebrow">
          // Controle op beschikbaarheid
        </Reveal>
        <Reveal as="h2" className="subtitle" delay={1}>
          Beschikbaarheid controleren<span className="caret" />
        </Reveal>
      </div>

      <ExecList steps={STEPS} />

      <div className="panel" style={{ marginTop: '2.4rem' }}>
        <Reveal as="p" className="lead accent" start="top 82%">
          Systeem gereed.
        </Reveal>
        <Reveal as="p" className="muted" delay={1} start="top 84%">
          Selecteer een datum.
        </Reveal>
      </div>
    </section>
  )
}

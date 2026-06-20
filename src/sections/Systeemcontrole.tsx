import ExecList, { type ExecStep } from '../components/ExecList'
import Reveal from '../components/Reveal'
import { sfx } from '../sound'

const STEPS: ExecStep[] = [
  { cmd: 'Geen kleinkinderen om op te passen (nog niet)...', done: true },
  { cmd: 'Geen websites die vandaag live moeten...', done: true },
  { cmd: 'Geen plugin-updates die écht niet kunnen wachten...', done: true },
  { cmd: 'Dave (Davemans) heeft een oppas...', done: true },
  { cmd: 'Volg het witte konijn...', done: true },
]

export default function Systeemcontrole() {
  return (
    <section className="section" id="systeemcontrole">
      <ExecList steps={STEPS} />

      <div className="panel">
        <Reveal
          as="p"
          className="lead accent"
          start="top 82%"
          onReveal={() => sfx.connect()}
        >
          Systeem gereed.
        </Reveal>
        <Reveal as="p" className="muted" delay={1} start="top 84%">
          Selecteer een datum.
        </Reveal>
      </div>
    </section>
  )
}

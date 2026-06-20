import ExecList, { type ExecStep } from '../components/ExecList'
import Reveal from '../components/Reveal'

const STEPS: ExecStep[] = [
  { cmd: 'Werkmail uitschakelen...', done: true },
  { cmd: 'Onafgemaakte websites laten rusten...', done: true },
  { cmd: 'To-do lijst negeren...', done: true },
  { cmd: 'Telefoon op stil...', done: true },
  { cmd: 'Dave een extra koekje geven...', done: true },
  { cmd: 'Verantwoordelijkheden tijdelijk parkeren...', done: true },
  { cmd: 'Ontspanningsmodus laden...', done: false },
]

export default function Afsluiten() {
  return (
    <section className="section" id="afsluiten">
      <div className="panel" style={{ marginBottom: '2rem' }}>
        <Reveal as="p" className="eyebrow">
          // Sectie 02 — Afsluiten
        </Reveal>
        <Reveal as="h2" className="title" delay={1}>
          Afsluiten
        </Reveal>
      </div>

      <ExecList steps={STEPS} />
    </section>
  )
}

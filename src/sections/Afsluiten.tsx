import ExecList, { type ExecStep } from '../components/ExecList'

const STEPS: ExecStep[] = [
  { cmd: 'Werkmail uitschakelen...', done: true },
  { cmd: 'wp-admin afsluiten...', done: true },
  { cmd: 'Plugin-updates negeren (mag deze keer)...', done: true },
  { cmd: 'Telefoon op stil...', done: true },
  { cmd: 'Dave wat extra brokjes geven...', done: true },
  { cmd: 'Verantwoordelijkheden tijdelijk parkeren...', done: true },
  { cmd: 'Ontspanningsmodus laden...', done: false },
]

export default function Afsluiten() {
  return (
    <section className="section" id="afsluiten">
      <ExecList steps={STEPS} />
    </section>
  )
}

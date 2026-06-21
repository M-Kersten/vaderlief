import Reveal from '../components/Reveal'
import Terminal, { Row } from '../components/Terminal'
import InstallBar from '../components/InstallBar'

export default function Installatie() {
  return (
    <section className="section section--center" id="installatie">
      <div className="block">
        <Terminal title="installer">
          <Row label="pakket" value="vader_zoon_dag" />
          <Row label="versie" value="v1.0" tone="dim" />
          <InstallBar />
        </Terminal>
      </div>

      <Reveal className="badge" delay={1} start="top 86%">
        <span className="pulse" />
        Kado succesvol geïnstalleerd
      </Reveal>

      <p className="version">vader_zoon_dag_v1.0 · status: Actief ✓</p>

      <Reveal as="p" className="lead accent" delay={2} start="top 80%">
        Laatste stap vereist<span className="caret" />
      </Reveal>
    </section>
  )
}

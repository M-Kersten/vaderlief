import Reveal from '../components/Reveal'
import Terminal, { Row } from '../components/Terminal'

export default function Installatie() {
  return (
    <section className="section section--center" id="installatie">
      <Reveal className="badge" start="top 84%">
        <span className="pulse" />
        Cadeau succesvol geïnstalleerd
      </Reveal>

      <div style={{ width: '100%', marginTop: '1.8rem' }}>
        <Terminal title="installer">
          <Row label="pakket" value="vader_zoon_dag" />
          <Row label="versie" value="v1.0" tone="dim" />
          <Row label="status" value="Actief ✓" />
        </Terminal>
      </div>

      <p className="version" style={{ marginTop: '1.4rem' }}>
        vader_zoon_dag_v1.0
      </p>

      <Reveal as="p" className="lead accent" delay={1} start="top 80%">
        Laatste stap vereist<span className="caret" />
      </Reveal>
    </section>
  )
}

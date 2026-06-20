import Reveal from '../components/Reveal'

export default function Verbinding() {
  return (
    <section className="section section--center" id="verbinding">
      <Reveal as="p" className="kicker" start="top 82%">
        Verbinden<span className="caret" />
      </Reveal>

      <div
        className="panel"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          margin: '1.8rem 0',
        }}
      >
        <Reveal className="connect-word" delay={1} start="top 80%">
          Vader
        </Reveal>
        <Reveal className="amp" delay={2} start="top 80%">
          &amp;
        </Reveal>
        <Reveal className="connect-word" delay={3} start="top 80%">
          Zoon
        </Reveal>
      </div>

      <Reveal as="p" className="lead accent" delay={4} start="top 78%">
        Verbinding succesvol.
      </Reveal>
    </section>
  )
}

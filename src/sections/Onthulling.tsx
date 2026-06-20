import Reveal from '../components/Reveal'
import AudioMessage from '../components/AudioMessage'

export default function Onthulling() {
  return (
    <section
      className="section section--center reveal-warm"
      id="onthulling"
      style={{ minHeight: '110svh' }}
    >
      <Reveal as="h2" className="title glow-warm" start="top 80%">
        Vader &amp; Zoon
        <br />
        Dag
      </Reveal>

      <div className="panel" style={{ marginTop: '1.6rem' }}>
        <Reveal as="p" className="lead" delay={2} start="top 84%">
          Een dag om even stil te staan.
        </Reveal>
        <Reveal as="p" className="lead" delay={3} start="top 86%">
          Goed eten. Lekker ontspannen.
        </Reveal>
        <Reveal as="p" className="lead warm" delay={4} start="top 88%">
          En vooral: samen tijd doorbrengen.
        </Reveal>
      </div>

      <Reveal className="panel" delay={4} start="top 90%">
        <AudioMessage />
      </Reveal>
    </section>
  )
}

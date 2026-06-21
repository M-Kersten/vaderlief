import Reveal from '../components/Reveal'
import AudioMessage from '../components/AudioMessage'
import { sfx } from '../sound'

export default function Onthulling() {
  return (
    <section
      className="section section--center reveal-warm"
      id="onthulling"
      style={{ minHeight: '110svh' }}
    >
      <Reveal
        as="h2"
        className="title glow-warm"
        start="top 80%"
        onReveal={() => sfx.whoosh()}
      >
        Vader &amp; Zoon
        <br />
        Dag
      </Reveal>

      <div className="panel">
        <Reveal as="p" className="lead" delay={2} start="top 84%">
          Niet omdat het Vaderdag is.
        </Reveal>
        <Reveal as="p" className="lead" delay={3} start="top 86%">
          Maar omdat je er altijd voor ons was — en nooit om iets vroeg.
        </Reveal>
        <Reveal as="p" className="lead warm" delay={4} start="top 88%">
          Deze keer is het mijn beurt. Gewoon, om je te bedanken.
        </Reveal>
      </div>

      <Reveal className="panel" delay={4} start="top 90%">
        <AudioMessage />
      </Reveal>
    </section>
  )
}

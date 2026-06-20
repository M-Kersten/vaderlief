import DissolveText from '../components/DissolveText'
import Reveal from '../components/Reveal'
import { useReveal } from '../hooks/useReveal'

export default function Rust() {
  // De "uiteenvallende" interface: deze regel lost op in deeltjes/stoom.
  const dissolveRef = useReveal<HTMLDivElement>({ start: 'top 65%', once: true })

  return (
    <section className="section section--center" id="rust">
      <div ref={dissolveRef} className="panel" style={{ marginBottom: '2.5rem' }}>
        <DissolveText
          text="systeem.interface — onderhoud actief"
          className="kicker"
        />
      </div>

      <Reveal as="h2" className="title" start="top 80%">
        Even niets hoeven.
      </Reveal>

      <div className="panel" style={{ marginTop: '1.6rem' }}>
        <Reveal as="p" className="calm-line" delay={1} start="top 82%">
          Geen afspraken.
        </Reveal>
        <Reveal as="p" className="calm-line" delay={2} start="top 84%">
          Geen haast.
        </Reveal>
        <Reveal as="p" className="calm-line" delay={3} start="top 86%">
          Geen afleiding.
        </Reveal>
      </div>
    </section>
  )
}

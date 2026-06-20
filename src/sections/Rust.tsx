import DissolveText from '../components/DissolveText'
import Reveal from '../components/Reveal'
import { useReveal } from '../hooks/useReveal'
import { sfx } from '../sound'

export default function Rust() {
  // De "uiteenvallende" interface: deze regel lost op in deeltjes/stoom.
  const dissolveRef = useReveal<HTMLDivElement>({
    start: 'top 65%',
    once: true,
    onEnter: () => sfx.powerdown(),
  })

  return (
    <section className="section section--center" id="rust">
      <div ref={dissolveRef} className="panel">
        <DissolveText
          text="systeem.interface — onderhoud actief"
          className="kicker"
        />
      </div>

      <Reveal
        as="h2"
        className="title"
        start="top 80%"
        onReveal={() => sfx.calm()}
      >
        Even niets hoeven.
      </Reveal>

      <div className="panel">
        <Reveal as="p" className="calm-line" delay={1} start="top 82%">
          Geen afspraken.
        </Reveal>
        <Reveal as="p" className="calm-line" delay={2} start="top 84%">
          Geen haast.
        </Reveal>
        <Reveal as="p" className="calm-line" delay={3} start="top 86%">
          Geen afleiding.
        </Reveal>
        <Reveal as="p" className="calm-line small" delay={4} start="top 88%">
          Alle drukte mag verdampen… als tranen in de regen.
        </Reveal>
      </div>
    </section>
  )
}

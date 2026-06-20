import { useReveal } from '../hooks/useReveal'
import { sfx } from '../sound'

export type ExecStep = {
  cmd: string
  /** Toon een vinkje (afgerond) of een knipperend "laden..." aan het eind. */
  done?: boolean
}

function Item({ step }: { step: ExecStep }) {
  // Elke regel "voert uit" zodra hij ver genoeg in beeld komt.
  const ref = useReveal<HTMLLIElement>({
    start: 'top 72%',
    onEnter: () => (step.done === false ? sfx.data() : sfx.tick()),
  })
  return (
    <li ref={ref} className="exec-item">
      <span className="cmd">{step.cmd}</span>
      {step.done === false ? (
        <span className="check loading">…</span>
      ) : (
        <span className="check">✓</span>
      )}
    </li>
  )
}

/**
 * Lijst met commando's die één voor één "uitgevoerd" worden tijdens scrollen.
 * (De `run`-class wordt door useReveal als `is-visible` toegevoegd; we mappen
 * dat hier naar de juiste class.)
 */
export default function ExecList({ steps }: { steps: ExecStep[] }) {
  return (
    <ul className="exec">
      {steps.map((step, i) => (
        <Item key={i} step={step} />
      ))}
    </ul>
  )
}

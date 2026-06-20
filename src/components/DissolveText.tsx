import { useMemo } from 'react'

/**
 * Splitst tekst in losse tekens die — zodra de container `is-visible` is —
 * vervagen, opzwellen en wegdrijven: alsof de letters in stoom oplossen.
 */
export default function DissolveText({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const chars = useMemo(() => text.split(''), [text])
  return (
    <span className={`dissolve-word ${className}`.trim()} aria-label={text}>
      {chars.map((ch, i) => {
        const drift = `${(Math.random() - 0.5) * 80}px`
        const delay = `${Math.random() * 0.9}s`
        return (
          <span
            key={i}
            className="ch"
            aria-hidden="true"
            style={{ ['--drift' as string]: drift, animationDelay: delay }}
          >
            {ch}
          </span>
        )
      })}
    </span>
  )
}

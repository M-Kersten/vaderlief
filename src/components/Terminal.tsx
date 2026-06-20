import { type ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

export type Tone = 'good' | 'bad' | 'dim'

export function Row({
  label,
  value,
  tone = 'good',
  style,
}: {
  label: string
  value: string
  tone?: Tone
  style?: React.CSSProperties
}) {
  return (
    <div className="row" style={style}>
      <span className="label">{label}</span>
      <span className="leader" />
      <span className={`value ${tone === 'good' ? '' : tone}`}>{value}</span>
    </div>
  )
}

/**
 * Een terminalvenster met een titelbalk. De `Row`-kinderen krijgen via CSS
 * een gestaffelde "inttypen"-animatie zodra het venster in beeld komt.
 */
export default function Terminal({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="terminal reveal">
      <div className="terminal__bar">
        <span className="dot dot--g" />
        <span className="dot" />
        <span className="dot" />
        <span className="terminal__title">{title}</span>
      </div>
      <div className="terminal__body">{children}</div>
    </div>
  )
}

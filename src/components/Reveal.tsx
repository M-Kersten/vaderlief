import { type ElementType, type ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: 0 | 1 | 2 | 3 | 4
  start?: string
  onReveal?: () => void
}

/** Wrapper die zijn inhoud zacht in beeld laat faden/glijden tijdens scrollen. */
export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  start,
  onReveal,
}: RevealProps) {
  const ref = useReveal<HTMLElement>({
    ...(start ? { start } : {}),
    onEnter: onReveal,
  })
  const delayClass = delay ? ` delay-${delay}` : ''
  return (
    <Tag ref={ref} className={`reveal${delayClass} ${className}`.trim()}>
      {children}
    </Tag>
  )
}

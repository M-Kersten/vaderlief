import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Voegt de class `is-visible` toe zodra het element ver genoeg in beeld
 * scrollt, en haalt 'm weer weg wanneer het volledig voorbij is. De CSS
 * regelt de eigenlijke fade/parallax-overgang, zodat dit hook goedkoop blijft.
 * Optioneel `onEnter` vuurt één keer bij de eerste keer in beeld (voor geluid).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: { start?: string; once?: boolean; onEnter?: () => void } = {},
) {
  const ref = useRef<T>(null)
  const { start = 'top 78%', once = false, onEnter } = options
  const firedRef = useRef(false)
  // Houd de laatste callback bij zonder de trigger opnieuw op te bouwen.
  const cbRef = useRef(onEnter)
  cbRef.current = onEnter

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fire = () => {
      el.classList.add('is-visible')
      if (!firedRef.current) {
        firedRef.current = true
        cbRef.current?.()
      }
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      end: 'bottom 12%',
      onEnter: fire,
      onEnterBack: () => el.classList.add('is-visible'),
      onLeave: () => {
        if (!once) el.classList.remove('is-visible')
      },
      onLeaveBack: () => {
        if (!once) el.classList.remove('is-visible')
      },
    })

    return () => trigger.kill()
  }, [start, once])

  return ref
}

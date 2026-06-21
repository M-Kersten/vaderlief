import { useEffect, useRef } from 'react'
import { scrollState } from '../scrollStore'

// Subtiele "Matrix" digital rain op een licht 2D-canvas. Rustig aanwezig
// bovenaan (terminal-sfeer) en vervaagt verder naar de onthulling — alsof de
// code oplost. Bewust zuinig en ingetogen.

const GLYPHS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノﾊﾋﾌﾍﾎマミムメモ01<>/{}#'

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let columns = 0
    let drops: number[] = []
    let fontSize = 18
    let width = 0
    let height = 0
    let dpr = 1

    function setup() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = width + 'px'
      canvas!.style.height = height + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Iets grotere glyphs = minder kolommen = rustiger en lichter voor mobiel.
      fontSize = width < 600 ? 22 : 20
      columns = Math.ceil(width / fontSize)
      drops = new Array(columns)
        .fill(0)
        .map(() => Math.floor((Math.random() * height) / fontSize))
    }

    setup()

    let raf = 0
    let last = 0
    const frameMs = 1000 / 16 // iets levendiger, klassieke regen

    function draw(now: number) {
      raf = requestAnimationFrame(draw)
      if (now - last < frameMs) return
      last = now

      // Vervaag de groene regen richting het einde (onthulling).
      const fade = 1 - scrollState.progress
      const intensity = Math.max(0, Math.min(1, fade)) * 0.45

      // Lange trails: zacht donker overschilderen (lagere alpha = langere staart).
      ctx!.fillStyle = 'rgba(5, 7, 10, 0.13)'
      ctx!.fillRect(0, 0, width, height)

      ctx!.font = `${fontSize}px 'JetBrains Mono', monospace`
      for (let i = 0; i < columns; i++) {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Felle witgroene "kop" op de regenstroom, daarachter helder groen.
        if (Math.random() > 0.93) {
          ctx!.fillStyle = `rgba(215, 255, 235, ${Math.min(1, intensity + 0.32)})`
        } else {
          ctx!.fillStyle = `rgba(70, 230, 160, ${intensity})`
        }
        ctx!.fillText(ch, x, y)

        if (y > height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }

    if (!reduce) raf = requestAnimationFrame(draw)

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(setup, 150)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(resizeTimer)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />
}

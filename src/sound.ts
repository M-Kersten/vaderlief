// Gesynthetiseerde sci-fi geluidseffecten via de Web Audio API.
// Geen bestanden, geen libraries — alles wordt live opgewekt. Alle effecten
// zijn kort en zacht, en respecteren de globale mute (zelfde knop als de
// achtergrondmuziek). De AudioContext wordt pas gemaakt/ontgrendeld na een
// gebruikersinteractie (browserbeleid).

let ctx: AudioContext | null = null
let master: GainNode | null = null
let muted = false
let unlocked = false

function ac(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!AC) return null
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = 0.13 // bewust zacht
    master.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

/** Op de eerste interactie aanroepen zodat geluid mag spelen. */
export function unlockSound() {
  unlocked = true
  ac()
}

export function setSoundMuted(m: boolean) {
  muted = m
}

function on(): boolean {
  return unlocked && !muted
}

function tone(
  freq: number,
  dur: number,
  opts: {
    type?: OscillatorType
    when?: number
    gain?: number
    slideTo?: number
  } = {},
) {
  const c = ac()
  if (!c || !master || !on()) return
  const { type = 'sine', when = 0, gain = 1, slideTo } = opts
  const t0 = c.currentTime + when
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.setValueAtTime(freq, t0)
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.008)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  o.connect(g)
  g.connect(master)
  o.start(t0)
  o.stop(t0 + dur + 0.03)
}

function noiseSweep(dur: number, from: number, to: number, gain = 0.6) {
  const c = ac()
  if (!c || !master || !on()) return
  const frames = Math.floor(c.sampleRate * dur)
  const buffer = c.createBuffer(1, frames, c.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1
  const src = c.createBufferSource()
  src.buffer = buffer
  const filter = c.createBiquadFilter()
  filter.type = 'bandpass'
  filter.Q.value = 6
  const t0 = c.currentTime
  filter.frequency.setValueAtTime(from, t0)
  filter.frequency.exponentialRampToValueAtTime(to, t0 + dur)
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(gain, t0 + dur * 0.3)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  src.connect(filter)
  filter.connect(g)
  g.connect(master)
  src.start(t0)
  src.stop(t0 + dur + 0.02)
}

// ---- De effecten ----

/** Korte UI-klik (knop/keuze). */
export const sfx = {
  ui: () => tone(1180, 0.06, { type: 'square', gain: 0.5 }),

  /** Toetsaanslag-blip (heel kort, zacht). */
  type: () =>
    tone(1500 + Math.random() * 300, 0.02, { type: 'square', gain: 0.18 }),

  /** Vinkje / regel uitgevoerd. */
  tick: () => tone(880, 0.07, { type: 'triangle', gain: 0.5, slideTo: 1320 }),

  /** Data-blip tijdens voortgang. */
  data: () =>
    tone(360 + Math.random() * 240, 0.03, { type: 'sine', gain: 0.28 }),

  /** Lage waarschuwingswarble (diagnose-overbelasting). */
  alert: () => {
    tone(220, 0.16, { type: 'sawtooth', gain: 0.4, slideTo: 150 })
    tone(220, 0.16, { type: 'sawtooth', gain: 0.3, when: 0.2, slideTo: 150 })
  },

  /** Diagnostische scan: serie oplopende blips. */
  scan: () => {
    for (let i = 0; i < 6; i++)
      tone(500 + i * 130, 0.05, {
        type: 'square',
        gain: 0.22,
        when: i * 0.075,
      })
  },

  /** Korte glitch/ruisburst (systeem hapert). */
  glitch: () => noiseSweep(0.18, 1800, 400, 0.3),

  /** Interface windt af: zachte dalende toon (sectie "Rust"). */
  powerdown: () => {
    tone(620, 1.1, { type: 'sine', gain: 0.32, slideTo: 90 })
    tone(930, 1.1, { type: 'sine', gain: 0.16, slideTo: 140 })
    noiseSweep(1.2, 1200, 120, 0.14)
  },

  /** Warme, rustgevende pad/akkoord ("Even niets hoeven"). */
  calm: () => {
    const notes = [261.63, 329.63, 392.0] // C-majeur, zacht
    notes.forEach((f, i) =>
      tone(f, 1.6, { type: 'sine', gain: 0.22, when: i * 0.12 }),
    )
  },

  /** Handshake-toon (twee tikken). */
  connect: () => {
    tone(660, 0.05, { type: 'square', gain: 0.35 })
    tone(990, 0.06, { type: 'square', gain: 0.35, when: 0.07 })
  },

  /** Oplopend succesakkoord. */
  success: () => {
    const notes = [523.25, 659.25, 783.99, 1046.5]
    notes.forEach((f, i) =>
      tone(f, 0.5, { type: 'triangle', gain: 0.4, when: i * 0.08 }),
    )
  },

  /** Verzend-sweep. */
  transmit: () => {
    tone(300, 0.25, { type: 'sawtooth', gain: 0.35, slideTo: 1400 })
    noiseSweep(0.3, 600, 5000, 0.25)
  },

  /** Onthulling-whoosh. */
  whoosh: () => noiseSweep(0.9, 200, 3000, 0.4),

  /** Foutmelding (dalend). */
  error: () => {
    tone(440, 0.18, { type: 'square', gain: 0.4, slideTo: 220 })
    tone(330, 0.22, { type: 'square', gain: 0.35, when: 0.12, slideTo: 160 })
  },
}

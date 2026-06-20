import { useState, type FormEvent } from 'react'
import Reveal from '../components/Reveal'
import GiftPicker from '../components/GiftPicker'
import { GIFTS } from '../gifts'

// Naar wie het verzoek gestuurd wordt (jij, de zoon). Pas dit gerust aan.
const TO = 'info@merijnkersten.nl'

const PLACEHOLDER = `Bijvoorbeeld:
'Misschien ergens in juli?'
'Na mijn vakantie?'
'Ik kan eigenlijk altijd.'`

function formatDate(value: string): string {
  if (!value) return value
  const d = new Date(value + 'T00:00:00')
  if (isNaN(d.getTime())) return value
  return d.toLocaleDateString('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function Formulier() {
  const [gift, setGift] = useState<string | null>(null)
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const selected = GIFTS.find((g) => g.id === gift) ?? null
  // Voor het concert is een datum een verrassing; voor de overige cadeaus
  // tonen we een datumkiezer (bij 'dagje stad' mag het meerdere dagen zijn).
  const wantsDate = gift === 'wellness' || gift === 'stad'

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!gift || !selected) {
      setError('Kies eerst een cadeau — wat lijkt je het leukst?')
      return
    }

    const datumTekst =
      gift === 'concert'
        ? 'verrassing (datum hoort papa nog van mij)'
        : date
          ? formatDate(date)
          : 'in overleg / flexibel'

    const lines = [
      'Hoi, ik kies voor onze Vader & Zoon Dag:',
      '',
      `Cadeau: ${selected.label}`,
      `Datum: ${datumTekst}`,
      `Bericht: ${message.trim() || '-'}`,
      '',
      '— via vaderdag.site',
    ]

    const subject = `Onze Vader & Zoon Dag — ${selected.title}`
    const href =
      `mailto:${TO}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(lines.join('\n'))}`

    // Opent de mailapp met alles ingevuld; pa hoeft alleen op verzenden te tikken.
    window.location.href = href
    setSent(true)
  }

  if (sent) {
    return (
      <Success
        date={wantsDate && date ? formatDate(date) : ''}
        giftTitle={selected?.title ?? ''}
      />
    )
  }

  return (
    <section className="section section--center" id="formulier">
      <div className="panel panel--wide">
        <Reveal as="h2" className="title" start="top 82%">
          Plan onze dag
        </Reveal>
        <Reveal as="p" className="lead muted" delay={1} start="top 84%">
          Kies je cadeau en laat weten wanneer je samen weg wilt. Eén tik en je
          mail staat klaar.
        </Reveal>
      </div>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label>
            Cadeau <span className="req">*kies er één</span>
          </label>
          <GiftPicker value={gift} onChange={setGift} />
        </div>

        {wantsDate && (
          <div className="field">
            <label htmlFor="datum">
              {gift === 'stad' ? 'Datum (mag ook meerdere dagen)' : 'Datum'}
            </label>
            <input
              id="datum"
              className="input"
              type="date"
              value={date}
              min="2026-06-20"
              onChange={(e) => setDate(e.target.value)}
            />
            {gift === 'stad' && (
              <span className="form-note">
                Een weekendje of meerdere dagen mag ook — zet je voorkeur in het
                bericht.
              </span>
            )}
          </div>
        )}

        {gift === 'concert' && (
          <p className="form-note concert-note">
            🤫 Dit is een verrassing — de datum hou ik nog even geheim. Zeg
            gewoon dat je 'm wil, dan regel ik de rest.
          </p>
        )}

        <div className="field">
          <label htmlFor="bericht">Extra bericht (optioneel)</label>
          <textarea
            id="bericht"
            className="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={PLACEHOLDER}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button className="btn" type="submit">
          Verzoek versturen
        </button>
      </form>
    </section>
  )
}

function Success({ date, giftTitle }: { date: string; giftTitle: string }) {
  return (
    <section className="section section--center" id="verzonden">
      <div className="success">
        <div className="success__ring">
          <svg viewBox="0 0 52 52" aria-hidden="true">
            <path d="M14 27 l8 8 l16 -18" />
          </svg>
        </div>
        <div className="success__lines">
          <p className="kicker accent">Verbinding gemaakt…</p>
          <p className="lead">Je mailtje staat klaar in je mail-app.</p>
          {(giftTitle || date) && (
            <p className="muted">
              {giftTitle && <span className="accent">{giftTitle}</span>}
              {giftTitle && date ? ' · ' : ''}
              {date && <span className="accent">{date}</span>}
            </p>
          )}
          <p className="lead">Tik daar op verzenden — dan zie ik het meteen.</p>
          <p className="lead warm">Ik kijk ernaar uit.</p>
        </div>
        <p className="version" style={{ marginTop: '0.5rem' }}>
          ❤️ Papa &amp; zoon dag
        </p>
      </div>
    </section>
  )
}

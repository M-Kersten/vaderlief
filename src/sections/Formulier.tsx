import { useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import Reveal from '../components/Reveal'
import GiftPicker from '../components/GiftPicker'
import { GIFTS } from '../gifts'
import { emailjsConfig, isEmailConfigured } from '../config'

type Status = 'idle' | 'sending' | 'sent' | 'error'

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
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!gift) {
      setError('Kies eerst een cadeau — wat lijkt je het leukst?')
      return
    }
    if (!date) {
      setError('Kies een datum — dan zetten we de dag op de kaart.')
      return
    }

    const giftLabel = GIFTS.find((g) => g.id === gift)?.label ?? gift
    const prettyDate = formatDate(date)
    const params = {
      cadeau: giftLabel,
      datum: prettyDate,
      datum_iso: date,
      bericht: message.trim() || '(geen extra bericht)',
    }

    if (!isEmailConfigured()) {
      // Geen EmailJS-sleutels ingesteld: toon toch de succesbeleving,
      // maar log een duidelijke hint voor wie de site beheert.
      console.warn(
        '[Vaderlief] EmailJS is nog niet geconfigureerd. Vul je sleutels in ' +
          'via .env (zie .env.example) of als repository-secrets om het ' +
          'verzoek echt te versturen.\nZou verzonden zijn:',
        params,
      )
      setStatus('sent')
      return
    }

    try {
      setStatus('sending')
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        params,
        { publicKey: emailjsConfig.publicKey },
      )
      setStatus('sent')
    } catch (err) {
      console.error('[Vaderlief] Verzenden mislukt:', err)
      setStatus('error')
      setError(
        'Er ging iets mis met versturen. Probeer het zo nog eens, of stuur ' +
          'gewoon even een appje 💚',
      )
    }
  }

  if (status === 'sent') {
    return (
      <Success
        date={formatDate(date)}
        giftTitle={GIFTS.find((g) => g.id === gift)?.title ?? ''}
      />
    )
  }

  return (
    <section className="section section--center" id="formulier">
      <div className="panel">
        <Reveal as="h2" className="title" start="top 82%">
          Plan onze dag
        </Reveal>
        <Reveal as="p" className="lead muted" delay={1} start="top 84%">
          Kies je cadeau en laat weten wanneer je samen een dagje weg wilt.
        </Reveal>
      </div>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label>
            Cadeau <span className="req">*kies er één</span>
          </label>
          <GiftPicker value={gift} onChange={setGift} />
        </div>

        <div className="field">
          <label htmlFor="datum">
            Datum <span className="req">*verplicht</span>
          </label>
          <input
            id="datum"
            className="input"
            type="date"
            value={date}
            min="2026-06-20"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

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

        <button className="btn" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Versturen…' : 'Verzoek versturen'}
        </button>

        {!isEmailConfigured() && (
          <p className="form-note">
            Tip voor de beheerder: stel je EmailJS-sleutels in (zie
            <code> .env.example</code> of de repository-secrets) zodat het
            verzoek echt in je inbox belandt.
          </p>
        )}
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
          <p className="lead">Bericht succesvol verzonden.</p>
          {(giftTitle || date) && (
            <p className="muted">
              {giftTitle && (
                <>
                  <span className="accent">{giftTitle}</span>
                </>
              )}
              {giftTitle && date ? ' · ' : ''}
              {date && <span className="accent">{date}</span>}
            </p>
          )}
          <p className="lead warm">Ik kijk ernaar uit.</p>
        </div>
        <p className="version" style={{ marginTop: '0.5rem' }}>
          ❤️ Papa &amp; zoon dag
        </p>
      </div>
    </section>
  )
}

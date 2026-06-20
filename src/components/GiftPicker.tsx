import { GIFTS } from '../gifts'

/** Kaartjes waaruit pa zijn cadeau kiest. */
export default function GiftPicker({
  value,
  onChange,
}: {
  value: string | null
  onChange: (id: string) => void
}) {
  return (
    <div className="gifts" role="radiogroup" aria-label="Kies een cadeau">
      {GIFTS.map((g) => {
        const selected = value === g.id
        return (
          <button
            type="button"
            key={g.id}
            role="radio"
            aria-checked={selected}
            className={`gift${selected ? ' is-selected' : ''}`}
            onClick={() => onChange(g.id)}
          >
            <span className="gift__icon">{g.icon}</span>
            <span className="gift__text">
              <span className="gift__title">{g.title}</span>
              <span className="gift__desc">{g.desc}</span>
            </span>
            <span className="gift__check" aria-hidden="true">
              {selected ? '✓' : ''}
            </span>
          </button>
        )
      })}
    </div>
  )
}

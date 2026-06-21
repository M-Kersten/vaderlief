// Strakke line-art icoontjes (24×24, stroke = currentColor) voor de cadeaus.

export default function GiftIcon({ id }: { id: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (id === 'wellness') {
    // Sauna/stoom: opstijgende stoomlijnen boven een schaaltje water.
    return (
      <svg {...common}>
        <path d="M4 16h16" />
        <path d="M5 16c0 2.2 3.1 4 7 4s7-1.8 7-4" />
        <path d="M8.5 11.5c1-1 1-2 0-3s-1-2 0-3" />
        <path d="M12 11.5c1-1 1-2 0-3s-1-2 0-3" />
        <path d="M15.5 11.5c1-1 1-2 0-3s-1-2 0-3" />
      </svg>
    )
  }

  if (id === 'concert') {
    // Concert/optreden: een microfoon.
    return (
      <svg {...common}>
        <rect x="9" y="2.5" width="6" height="11" rx="3" />
        <path d="M6 11a6 6 0 0 0 12 0" />
        <path d="M12 17v3.5" />
        <path d="M8.5 20.5h7" />
      </svg>
    )
  }

  // Dagje uit naar een stad: een skyline.
  return (
    <svg {...common}>
      <path d="M3 21h18" />
      <path d="M5 21v-7h4v7" />
      <path d="M9 21v-13h6v13" />
      <path d="M15 21v-9h4v9" />
      <path d="M11.5 11h1M11.5 14h1M11.5 17h1" />
    </svg>
  )
}

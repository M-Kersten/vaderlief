export type Gift = {
  id: string
  /** Wat in de e-mail terechtkomt. */
  label: string
  title: string
  desc: string
  icon: string
}

export const GIFTS: Gift[] = [
  {
    id: 'wellness',
    label: 'Wellness- / saunadag',
    title: 'Wellnessdag',
    desc: 'Sauna, rust en even helemaal niets hoeven. Opladen samen.',
    icon: '♨︎',
  },
  {
    id: 'concert',
    label: 'Verrassingsconcert',
    title: 'Verrassingsconcert',
    desc: 'Samen naar live muziek — want dat zit bij jou in het bloed.',
    icon: '♪',
  },
  {
    id: 'stad',
    label: 'Dagje uit naar een stad',
    title: 'Dagje stad',
    desc: 'Ergens rondlopen, goed eten en een terrasje pakken. Net als vroeger in Arnhem.',
    icon: '⌖',
  },
]
